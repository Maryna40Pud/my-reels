import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { sans, serif } from "./fonts";

export const MantraScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Safe area"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 64,
        padding: "300px 150px 480px 120px",
        textAlign: "center",
        opacity: interpolate(frame, [4.2 * fps, 5 * fps], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.45, 0, 0.55, 1),
        }),
        translate: interpolate(frame, [4.2 * fps, 5 * fps], ["0px 0px", "0px -28px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.45, 0, 0.55, 1),
        }),
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: serif,
          fontWeight: 600,
          fontSize: 168,
          lineHeight: 1.02,
          color: "#3a2a1f",
        }}
      >
        <Interactive.Div
          name="Word 1"
          style={{
            opacity: interpolate(frame, [0.1 * fps, 1.3 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.33, 0, 0.2, 1),
            }),
            translate: interpolate(frame, [0.1 * fps, 1.3 * fps], ["0px 48px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.33, 0, 0.2, 1),
            }),
          }}
        >
          Дихай.
        </Interactive.Div>
        <Interactive.Div
          name="Word 2"
          style={{
            color: "#a5583e",
            opacity: interpolate(frame, [0.6 * fps, 1.8 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.33, 0, 0.2, 1),
            }),
            translate: interpolate(frame, [0.6 * fps, 1.8 * fps], ["0px 48px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.33, 0, 0.2, 1),
            }),
          }}
        >
          Відчувай.
        </Interactive.Div>
        <Interactive.Div
          name="Word 3"
          style={{
            color: "#4f5232",
            opacity: interpolate(frame, [1.1 * fps, 2.3 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.33, 0, 0.2, 1),
            }),
            translate: interpolate(frame, [1.1 * fps, 2.3 * fps], ["0px 48px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.33, 0, 0.2, 1),
            }),
          }}
        >
          Живи.
        </Interactive.Div>
      </div>
      <Interactive.Div
        name="Subtitle"
        style={{
          fontFamily: sans,
          fontSize: 46,
          fontWeight: 500,
          lineHeight: 1.4,
          color: "#3b2c22",
          maxWidth: 800,
          opacity: interpolate(frame, [1.8 * fps, 3 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.33, 0, 0.2, 1),
          }),
          translate: interpolate(frame, [1.8 * fps, 3 * fps], ["0px 36px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.33, 0, 0.2, 1),
          }),
        }}
      >
        Простір живої психологічної підтримки та відновлення для жінок в&nbsp;Україні та за&nbsp;її&nbsp;межами
      </Interactive.Div>
    </AbsoluteFill>
  );
};
