import { Audio, Video } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Captions } from "./Captions";
import { EndCard } from "./EndCard";

const CARD_START = 68; // seconds — after "18 грудня"

export const TalkingReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const blur = interpolate(frame, [CARD_START * fps, (CARD_START + 1) * fps], [0, 18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#5e2a2f" }}>
      <AbsoluteFill style={{ filter: `blur(${blur}px)`, scale: String(1 + blur / 300) }}>
        {/* last frame held after the footage ends, behind the end card */}
        <Img src={staticFile("source/lastframe.jpg")} style={{ width: "100%", height: "100%" }} />
        {/* Original footage, colour untouched. Audio replaced by the levelled voice track. */}
        <Video name="Footage" src={staticFile("source/footage.mp4")} muted style={{ position: "absolute", inset: 0 }} />
      </AbsoluteFill>
      <Audio name="Voice" src={staticFile("source/voice.m4a")} />
      <Audio
        name="Rain"
        src={staticFile("music/rain-window.mp3")}
        volume={(f) =>
          interpolate(f, [0, 1.5 * fps, 70.8 * fps, 72 * fps, durationInFrames - 1], [0, 0.23, 0.23, 0.38, 0.38], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

      <Captions hideFrom={CARD_START - 0.1} />

      <Sequence name="End card" from={CARD_START * fps} layout="none">
        <EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
