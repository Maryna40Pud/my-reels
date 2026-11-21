import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { serif } from "./fonts";

export const FirstThingsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Safe area"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "300px 150px 480px 120px",
      }}
    >
      <Interactive.Div
        name="Text"
        style={{
          fontFamily: serif,
          fontSize: 96,
          fontWeight: 500,
          lineHeight: 1.18,
          color: "#3b2c22",
          textAlign: "center",
          opacity: interpolate(
            frame,
            [0.2 * fps, 1.6 * fps, 3.2 * fps, 4 * fps],
            [0, 1, 1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.33, 0, 0.2, 1),
                Easing.linear,
                Easing.bezier(0.45, 0, 0.55, 1),
              ],
            },
          ),
          translate: interpolate(
            frame,
            [0.2 * fps, 1.6 * fps, 3.2 * fps, 4 * fps],
            ["0px 48px", "0px 0px", "0px 0px", "0px -28px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.33, 0, 0.2, 1),
                Easing.linear,
                Easing.bezier(0.45, 0, 0.55, 1),
              ],
            },
          ),
        }}
      >
        ...здається, що спочатку треба розібратися з&nbsp;усіма справами — і&nbsp;тільки потім видихнути.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
