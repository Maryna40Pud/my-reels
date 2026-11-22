"""Generate a calm, warm ambient pad (original, royalty-free) for the reel.

Chords change every 8 s to match a slow breathing rhythm (4 s in, 4 s out).
Usage: python3 make_music.py <seconds> <out.wav>
"""
import sys, wave
import numpy as np

SR = 44100
dur = float(sys.argv[1]) if len(sys.argv) > 1 else 72
out = sys.argv[2] if len(sys.argv) > 2 else "music.wav"
n = int(SR * dur)
t = np.arange(n) / SR
rng = np.random.default_rng(7)

def hz(m):  # MIDI note -> Hz
    return 440 * 2 ** ((m - 69) / 12)

# D major, warm and open: Dmaj9, Bm7, Gmaj7, Asus2
chords = [
    [50, 57, 62, 66, 69, 76],
    [47, 54, 62, 66, 69, 73],
    [43, 50, 59, 62, 66, 71],
    [45, 52, 57, 64, 69, 71],
]
CH = 8.0  # seconds per chord
left = np.zeros(n); right = np.zeros(n)

for i in range(int(np.ceil(dur / CH)) + 1):
    start = i * CH - 1.5
    seg = (t >= start) & (t < start + CH + 3.0)
    if not seg.any():
        continue
    tt = t[seg] - start
    L = CH + 3.0
    env = np.sin(np.pi * np.clip(tt / L, 0, 1)) ** 1.6  # very soft swell
    for j, m in enumerate(chords[i % 4]):
        f = hz(m)
        amp = 0.16 if j == 0 else 0.10 / (1 + 0.15 * j)
        for det, pan in ((-0.0018, 0.25), (0.0018, 0.75)):
            ph = rng.uniform(0, 2 * np.pi)
            v = np.sin(2 * np.pi * f * (1 + det) * tt + ph)
            v += 0.18 * np.sin(4 * np.pi * f * (1 + det) * tt + ph)
            v *= amp * env
            left[seg] += v * (1 - pan); right[seg] += v * pan

# Sparse soft bells on chord tones, two octaves up
for k, bt in enumerate(np.arange(2.0, dur - 3, 4.0)):
    if rng.random() < 0.35:
        continue
    m = chords[int(bt // CH) % 4][rng.integers(2, 6)] + 12
    s = int(bt * SR); e = min(n, s + int(4.5 * SR))
    tt = t[s:e] - bt
    v = np.sin(2 * np.pi * hz(m) * tt) * np.exp(-tt * 1.3) * (1 - np.exp(-tt * 60)) * 0.05
    pan = rng.uniform(0.3, 0.7)
    left[s:e] += v * (1 - pan); right[s:e] += v * pan

# Gentle "breathing" swell over the whole mix (8 s cycle)
breath = 0.85 + 0.15 * (1 - np.cos(2 * np.pi * t / CH)) / 2
left *= breath; right *= breath

# Simple reverb: convolve with decaying noise
ir_len = int(2.8 * SR)
it = np.arange(ir_len) / SR
def reverb(x, seed):
    ir = np.random.default_rng(seed).standard_normal(ir_len) * np.exp(-it * 2.2)
    ir[0] = 0
    ir /= np.sqrt((ir ** 2).sum())
    size = 1 << int(np.ceil(np.log2(len(x) + ir_len)))
    y = np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(ir, size), size)[: len(x)]
    return 0.65 * x + 0.35 * y
left = reverb(left, 1); right = reverb(right, 2)

# Soft low-pass (one-pole) to keep it warm
def lowpass(x, fc=3200):
    a = np.exp(-2 * np.pi * fc / SR)
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)):
        acc = (1 - a) * x[i] + a * acc
        y[i] = acc
    return y
left = lowpass(left); right = lowpass(right)

# Fade in / out
fade = np.minimum(1, np.minimum(t / 3.0, (dur - t) / 4.0)).clip(0, 1)
left *= fade; right *= fade
peak = max(np.abs(left).max(), np.abs(right).max())
st = (np.stack([left, right], 1) / peak * 0.89 * 32767).astype(np.int16)
with wave.open(out, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(st.tobytes())
print("wrote", out)
