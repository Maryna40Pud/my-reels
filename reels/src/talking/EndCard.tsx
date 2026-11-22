import { Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { sans, serif } from "../breathe/fonts";

// Rendered inside a <Sequence>, so frame 0 = when the card starts
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const breath = (1 - Math.cos((2 * Math.PI * frame) / (8 * fps))) / 2;

  return (
    <>
      {/* Warm wash over the blurred footage */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(176,87,59,0.55) 0%, rgba(110,45,42,0.78) 65%, rgba(80,35,38,0.88) 100%)",
          opacity: interpolate(frame, [0, 1 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.33, 0, 0.2, 1),
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "260px 110px 440px",
        }}
      >
        <Interactive.Div
          name="Invite card"
          style={{
            position: "relative",
            width: 860,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "72px 56px 76px",
            borderRadius: 60,
            background: "linear-gradient(165deg, #f9efe2 0%, #f1dcc6 100%)",
            boxShadow: "0 40px 120px rgba(40,15,10,0.45)",
            border: "3px solid rgba(240,196,138,0.9)",
            textAlign: "center",
            overflow: "hidden",
            opacity: interpolate(frame, [0.3 * fps, 1.3 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.33, 0, 0.2, 1),
            }),
            translate: interpolate(frame, [0.3 * fps, 1.5 * fps], ["0px 60px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.33, 0, 0.2, 1),
            }),
            scale: interpolate(frame, [0.3 * fps, 1.5 * fps], [0.94, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.33, 0, 0.2, 1),
              output: "perceptual-scale",
            }),
          }}
        >
          {/* breathing warm glow inside the card */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "42%",
              width: 760,
              height: 760,
              marginLeft: -380,
              marginTop: -380,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(232,160,110,0.38) 0%, rgba(232,160,110,0) 65%)",
              scale: String(0.85 + breath * 0.25),
            }}
          />
          <div style={{ position: "relative", fontFamily: sans, fontWeight: 700, fontSize: 40, letterSpacing: 8, textTransform: "uppercase", color: "#a4492f" }}>
            Ефір-знайомство
          </div>
          <div style={{ position: "relative", width: 120, height: 4, borderRadius: 2, backgroundColor: "#e0a86e", margin: "30px 0 18px" }} />
          <div style={{ position: "relative", fontFamily: serif, fontWeight: 600, fontSize: 170, lineHeight: 0.95, color: "#5e2a2f" }}>
            18 грудня
          </div>
          <div style={{ position: "relative", fontFamily: serif, fontWeight: 600, fontSize: 104, lineHeight: 1.1, color: "#a4492f" }}>
            о 19:00
          </div>
          <div style={{ position: "relative", fontFamily: sans, fontWeight: 600, fontSize: 46, color: "#3a2a1f", marginTop: 34 }}>
            Подробиці в описі
          </div>
          <div style={{ position: "relative", fontFamily: sans, fontWeight: 500, fontSize: 38, color: "#6b4a3a", marginTop: 8 }}>
            або напиши в дірект
          </div>
        </Interactive.Div>
      </div>
    </>
  );
};
