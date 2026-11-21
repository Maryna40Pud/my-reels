import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { sans, serif } from "./fonts";

export const InviteScene: React.FC = () => {
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
        gap: 56,
        padding: "300px 150px 480px 120px",
        textAlign: "center",
        opacity: interpolate(frame, [5.4 * fps, 6 * fps], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.45, 0, 0.55, 1),
        }),
      }}
    >
      <Interactive.Div
        name="Label"
        style={{
          fontFamily: sans,
          fontSize: 44,
          fontWeight: 600,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#a5583e",
          opacity: interpolate(frame, [0.2 * fps, 1.4 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.33, 0, 0.2, 1),
          }),
          translate: interpolate(frame, [0.2 * fps, 1.4 * fps], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.33, 0, 0.2, 1),
          }),
        }}
      >
        Ефір-знайомство
      </Interactive.Div>
      <Interactive.Div
        name="Date"
        style={{
          fontFamily: serif,
          fontSize: 132,
          fontWeight: 600,
          lineHeight: 1.05,
          color: "#3a2a1f",
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
        18 грудня
        <br />о 19:00
      </Interactive.Div>
      <Interactive.Div
        name="Call to action"
        style={{
          fontFamily: sans,
          fontSize: 46,
          fontWeight: 500,
          lineHeight: 1.4,
          color: "#3b2c22",
          maxWidth: 800,
          padding: "40px 48px",
          borderRadius: 40,
          backgroundColor: "rgba(255, 249, 240, 0.62)",
          opacity: interpolate(frame, [1.4 * fps, 2.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.33, 0, 0.2, 1),
          }),
          translate: interpolate(frame, [1.4 * fps, 2.6 * fps], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.33, 0, 0.2, 1),
          }),
        }}
      >
        Напиши в&nbsp;дірект або коментарі, щоб отримати посилання
      </Interactive.Div>
    </AbsoluteFill>
  );
};
