"""Generate a cosy 'rain behind the window' ambience (original, royalty-free).

Usage: python3 make_rain.py <seconds> <out.wav>
"""
import sys, wave
import numpy as np

SR = 44100
dur = float(sys.argv[1]) if len(sys.argv) > 1 else 75
out = sys.argv[2] if len(sys.argv) > 2 else "rain.wav"
n = int(SR * dur)
t = np.arange(n) / SR
rng = np.random.default_rng(11)
freqs = np.fft.rfftfreq(n, 1 / SR)

def shape(x, gain_fn):
    return np.fft.irfft(np.fft.rfft(x) * gain_fn(freqs), n)

def band(lo, hi, slope=2):
    def g(f):
        f = np.maximum(f, 1)
        return 1 / (1 + (lo / f) ** (2 * slope)) / (1 + (f / hi) ** (2 * slope))
    return g

def channel(seed):
    r = np.random.default_rng(seed)
    # 1. Steady rain hiss: pink-ish noise, band-limited, muffled by the glass
    hiss = shape(r.standard_normal(n), lambda f: band(350, 5200)(f) / np.sqrt(np.maximum(f, 20) / 400))
    # slow, irregular intensity changes
    mod = shape(r.standard_normal(n), band(0.02, 0.25, 1))
    mod = 0.8 + 0.2 * mod / np.abs(mod).max()
    hiss *= mod
    # 2. Low roof rumble
    rumble = shape(r.standard_normal(n), band(40, 220))
    # 3. Small drops: short filtered noise bursts
    drops = np.zeros(n)
    count = int(dur * 55)
    for _ in range(count):
        s = r.integers(0, n - 2000)
        L = r.integers(200, 900)
        env = np.exp(-np.arange(L) / (L / 5))
        drops[s:s + L] += r.standard_normal(L) * env * r.uniform(0.2, 1.0)
    drops = shape(drops, band(1200, 6500))
    # 4. A few gentle taps on the window glass
    taps = np.zeros(n)
    for _ in range(int(dur * 1.6)):
        s = r.integers(0, n - 3000)
        L = 2600
        tt = np.arange(L) / SR
        f0 = r.uniform(1800, 3200)
        taps[s:s + L] += np.sin(2 * np.pi * f0 * tt) * np.exp(-tt * 90) * r.uniform(0.3, 1.0)
    def norm(x):
        return x / np.sqrt(np.mean(x ** 2))
    return 1.0 * norm(hiss) + 0.35 * norm(rumble) + 0.45 * norm(drops) + 0.12 * norm(taps) * 3

left = channel(1); right = channel(2)
mid = (left + right) / 2
left = 0.75 * left + 0.25 * mid; right = 0.75 * right + 0.25 * mid
fade = np.minimum(1, np.minimum(t / 3.0, (dur - t) / 3.5)).clip(0, 1)
left *= fade; right *= fade
peak = max(np.abs(left).max(), np.abs(right).max())
st = (np.stack([left, right], 1) / peak * 0.89 * 32767).astype(np.int16)
with wave.open(out, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(st.tobytes())
print("wrote", out)
