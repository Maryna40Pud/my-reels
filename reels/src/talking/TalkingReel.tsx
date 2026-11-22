import { Audio, Video } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { sans, serif } from "../breathe/fonts";
import { AccentPill } from "./AccentPill";
import { accents } from "./accents";

export const TalkingReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* Original footage (colour untouched). Its audio is replaced by the levelled voice track. */}
      <Video name="Footage" src={staticFile("source/video.mp4")} muted />
      <Audio name="Voice" src={staticFile("source/voice.m4a")} />
      <Audio
        name="Music"
        src={staticFile("music/calm-breath.mp3")}
        volume={(f) =>
          interpolate(f, [0, 2 * fps, durationInFrames - 2 * fps, durationInFrames], [0, 0.15, 0.15, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

      {accents.map((a) => (
        <Sequence
          key={a.from}
          name={a.parts.map((p) => p.text).join(" · ")}
          from={Math.round(a.from * fps)}
          durationInFrames={Math.round((a.to - a.from) * fps)}
          layout="none"
        >
          <AccentPill accent={a} />
        </Sequence>
      ))}

      {/* Invitation card for the last seconds */}
      <Sequence name="Invite" from={65.3 * fps} layout="none">
        <Interactive.Div
          name="Invite card"
          style={{
            position: "absolute",
            left: 110,
            right: 150,
            bottom: 320,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            padding: "26px 40px 30px",
            borderRadius: 48,
            backgroundColor: "rgba(255, 248, 238, 0.88)",
            boxShadow: "0 18px 50px rgba(80, 50, 30, 0.18)",
            textAlign: "center",
            opacity: interpolate(frame, [65.3 * fps, 66 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.33, 0, 0.2, 1),
            }),
            translate: interpolate(frame, [65.3 * fps, 66.2 * fps], ["0px 26px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.33, 0, 0.2, 1),
            }),
          }}
        >
          <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 34, letterSpacing: 5, textTransform: "uppercase", color: "#8a4330" }}>
            Ефір-знайомство
          </div>
          <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 84, lineHeight: 1.05, color: "#3a2a1f" }}>
            18 грудня · 19:00
          </div>
          <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 36, color: "#3a2a1f" }}>
            подробиці в описі
          </div>
        </Interactive.Div>
      </Sequence>
    </AbsoluteFill>
  );
};
