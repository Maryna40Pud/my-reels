import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

// Breathing cycle: 4 s inhale + 4 s exhale
const BREATH_SECONDS = 8;

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // 0 → 1 → 0 over one breath, eased like a calm sine wave
  const breath = (1 - Math.cos((2 * Math.PI * t) / BREATH_SECONDS)) / 2;
  // Very slow drift for the gradient itself
  const drift = Math.sin((2 * Math.PI * t) / 24);
  const drift2 = Math.cos((2 * Math.PI * t) / 24);

  return (
    <AbsoluteFill style={{ backgroundColor: "#efe3d2", overflow: "hidden" }}>
      {/* Base warm gradient: milky → beige → terracotta → olive */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(${172 + drift * 6}deg, #f7f0e6 0%, #efdfca 34%, #dcb79c 62%, #b97a5f 84%, #5f6140 100%)`,
        }}
      />
      {/* Soft terracotta glow, drifting slowly */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${18 + drift * 6}% ${70 + drift2 * 4}%, rgba(196,120,90,0.35) 0%, rgba(196,120,90,0) 45%)`,
        }}
      />
      {/* Deep olive shade in the lower corner */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${88 - drift * 5}% ${96 - drift2 * 3}%, rgba(78,82,48,0.55) 0%, rgba(78,82,48,0) 50%)`,
        }}
      />
      {/* Breathing light circle */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "44%",
          width: 1100,
          height: 1100,
          marginLeft: -550,
          marginTop: -550,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,250,242,0.85) 0%, rgba(255,247,236,0.45) 38%, rgba(255,245,232,0) 70%)",
          scale: String(0.78 + breath * 0.3),
          opacity: 0.75 + breath * 0.25,
        }}
      />
      {/* Very soft vignette to keep the edges warm and deep */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(60,40,25,0.18) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
