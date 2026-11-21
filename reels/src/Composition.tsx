import {
  AbsoluteFill,
  Composition,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const MyComposition = () => {
  return (
    <Composition
      id="Reel"
      component={Reel}
      durationInFrames={150}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

export const Reel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Scene"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 48,
        padding: "100px 80px",
        background: "linear-gradient(160deg, #1b1035 0%, #4a1d6e 55%, #e2557a 100%)",
        fontFamily: "Helvetica, Arial, sans-serif",
        color: "white",
        textAlign: "center",
      }}
    >
      <Interactive.Div
        name="Accent bar"
        style={{
          width: 160,
          height: 12,
          borderRadius: 6,
          backgroundColor: "#ffd166",
          scale: interpolate(frame, [0, 0.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 200 }),
            output: "perceptual-scale",
          }),
        }}
      />
      <Interactive.Div
        name="Headline"
        style={{
          fontSize: 132,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: -2,
          opacity: interpolate(frame, [0.3 * fps, 1.2 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [0.3 * fps, 1.2 * fps], ["0px 80px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Your Reel Starts Here
      </Interactive.Div>
      <Interactive.Div
        name="Subtitle"
        style={{
          fontSize: 52,
          fontWeight: 500,
          opacity: interpolate(
            frame,
            [1.2 * fps, 2 * fps, durationInFrames - 20, durationInFrames],
            [0, 0.85, 0.85, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.linear,
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
        }}
      >
        Edit the text in Remotion Studio
      </Interactive.Div>
    </AbsoluteFill>
  );
};
