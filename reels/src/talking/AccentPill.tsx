import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { serif } from "../breathe/fonts";
import { Accent, toneColor } from "./accents";

const ease = Easing.bezier(0.33, 0, 0.2, 1);

// Rendered inside a <Sequence> that starts at accent.from
export const AccentPill: React.FC<{ accent: Accent }> = ({ accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const len = (accent.to - accent.from) * fps;
  const fadeIn = 0.35 * fps;
  const fadeOut = 0.4 * fps;

  const opacity = interpolate(frame, [0, fadeIn, len - fadeOut, len], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const lift = interpolate(frame, [0, fadeIn * 1.6], [26, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 110,
        right: 150,
        bottom: 340,
        display: "flex",
        justifyContent: "center",
        opacity,
        translate: `0px ${lift}px`,
      }}
    >
      <div
        style={{
          fontFamily: serif,
          fontWeight: 600,
          fontSize: 78,
          lineHeight: 1.08,
          color: toneColor[accent.tone],
          textAlign: "center",
          padding: "14px 44px 20px",
          borderRadius: 64,
          backgroundColor: "rgba(255, 248, 238, 0.84)",
          boxShadow: "0 18px 50px rgba(80, 50, 30, 0.18)",
        }}
      >
        {accent.parts.map((p, i) => {
          const at = (p.at - accent.from) * fps;
          return (
            <span
              key={p.text}
              style={{
                opacity: interpolate(frame, [at, at + 0.3 * fps], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: ease,
                }),
              }}
            >
              {i > 0 ? <span style={{ opacity: 0.45 }}> · </span> : null}
              {p.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
