"""Generate a soft crackling-fireplace ambience (original, royalty-free).

Low warm rumble of the flame + random small crackles and occasional pops.
Usage: python3 make_fire.py <seconds> <out.wav>
"""
import sys, wave
import numpy as np

SR = 44100
dur = float(sys.argv[1]) if len(sys.argv) > 1 else 72
out = sys.argv[2] if len(sys.argv) > 2 else "fire.wav"
n = int(SR * dur)
t = np.arange(n) / SR
rng = np.random.default_rng(11)


def onepole_lp(x, fc):
    """Vectorised-enough one-pole low-pass via FFT filter (smooth, cheap)."""
    size = 1 << int(np.ceil(np.log2(len(x))))
    f = np.fft.rfftfreq(size, 1 / SR)
    h = 1 / np.sqrt(1 + (f / fc) ** 2)
    return np.fft.irfft(np.fft.rfft(x, size) * h, size)[: len(x)]


def bandpass(x, lo, hi):
    size = 1 << int(np.ceil(np.log2(len(x))))
    f = np.fft.rfftfreq(size, 1 / SR)
    h = 1 / np.sqrt(1 + (f / hi) ** 4) * (1 - 1 / np.sqrt(1 + (f / lo) ** 4))
    return np.fft.irfft(np.fft.rfft(x, size) * h, size)[: len(x)]


chans = []
for ch in range(2):
    r = np.random.default_rng(100 + ch)
    # 1) flame rumble: low-passed noise with slow breathing amplitude
    rumble = onepole_lp(r.standard_normal(n), 180)
    rumble /= np.abs(rumble).max()
    flicker = 0.7 + 0.3 * onepole_lp(r.standard_normal(n), 0.6) / 0.05
    rumble *= np.clip(flicker, 0.4, 1.2) * 0.35

    # 2) hiss of burning wood: band-limited noise, very quiet
    hiss = bandpass(r.standard_normal(n), 1500, 6000)
    hiss = hiss / np.abs(hiss).max() * 0.04

    # 3) crackles: short decaying noise bursts at random times
    crack = np.zeros(n)
    rate = 7.0  # crackles per second on average
    times = np.cumsum(r.exponential(1 / rate, int(dur * rate * 1.5)))
    times = times[times < dur - 0.1]
    for tc in times:
        s = int(tc * SR)
        L = int(r.uniform(0.004, 0.03) * SR)
        e = min(n, s + L)
        tt = np.arange(e - s) / SR
        amp = r.uniform(0.05, 0.35) ** 1.6
        burst = r.standard_normal(e - s) * np.exp(-tt * r.uniform(120, 400))
        crack[s:e] += burst * amp
    # occasional bigger pops
    for tc in np.cumsum(r.exponential(2.2, int(dur))):
        if tc > dur - 0.2:
            break
        s = int(tc * SR); L = int(0.06 * SR); e = min(n, s + L)
        tt = np.arange(e - s) / SR
        crack[s:e] += r.standard_normal(e - s) * np.exp(-tt * 70) * r.uniform(0.3, 0.6)
    crack = bandpass(crack, 900, 7000)

    chans.append(rumble + hiss + crack)

left, right = chans
fade = np.minimum(1, np.minimum(t / 2.5, (dur - t) / 3.5)).clip(0, 1)
left *= fade; right *= fade
peak = max(np.abs(left).max(), np.abs(right).max())
st = (np.stack([left, right], 1) / peak * 0.89 * 32767).astype(np.int16)
with wave.open(out, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(st.tobytes())
print("wrote", out)
