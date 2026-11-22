import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { sans } from "../breathe/fonts";
import captions from "./captions.json";

type Tone = "body" | "feeling" | "space" | null;
type Word = { text: string; start: number; end: number; tone: Tone };
type Page = { words: Word[] };

const pages = captions as Page[];

// Accent marker colours, taken from the room: fireplace terracotta, rose-wine, olive
const marker: Record<Exclude<Tone, null>, string> = {
  body: "#b0573b",
  feeling: "#86404d",
  space: "#5f6337",
};

const ease = Easing.bezier(0.33, 0, 0.2, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Captions: React.FC<{ hideFrom: number }> = ({ hideFrom }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const idx = pages.findIndex((p, i) => {
    const from = p.words[0].start - 0.12;
    const last = p.words[p.words.length - 1].end;
    const next = pages[i + 1]?.words[0].start ?? Infinity;
    const to = Math.min(next - 0.04, last + 0.9);
    return t >= from && t < to;
  });
  if (idx === -1) return null;
  const page = pages[idx];
  const from = page.words[0].start - 0.12;
  const enter = interpolate(t, [from, from + 0.22], [0, 1], { ...clamp, easing: ease });
  const hide = interpolate(t, [hideFrom, hideFrom + 0.4], [1, 0], clamp);

  return (
    <>
    {/* soft milky glow behind the text, no hard edges, keeps it readable over the dark TV */}
    <div
      style={{
        position: "absolute",
        top: 120,
        left: -60,
        right: -60,
        height: 520,
        background:
          "radial-gradient(ellipse 50% 42% at 50% 50%, rgba(255,248,238,0.62) 0%, rgba(255,248,238,0.35) 55%, rgba(255,248,238,0) 100%)",
        opacity: enter * hide,
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 240,
        left: 90,
        right: 90,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 18,
        rowGap: 10,
        fontFamily: sans,
        fontWeight: 700,
        fontSize: 68,
        lineHeight: 1.3,
        color: "#33241a",
        textAlign: "center",
        opacity: enter * hide,
        translate: `0px ${(1 - enter) * 16}px`,
        textShadow:
          "0 0 26px rgba(255,248,238,0.95), 0 0 8px rgba(255,248,238,0.95), 0 0 2px rgba(255,248,238,1)",
      }}
    >
      {page.words.map((w) => {
        const spoken = interpolate(t, [w.start - 0.05, w.start + 0.1], [0, 1], clamp);
        if (!w.tone) {
          return (
            <span key={w.start} style={{ opacity: 0.55 + 0.45 * spoken }}>
              {w.text}
            </span>
          );
        }
        const pop = interpolate(t, [w.start - 0.05, w.start + 0.12, w.start + 0.4], [1, 1.09, 1], {
          ...clamp,
          easing: ease,
        });
        return (
          <span
            key={w.start}
            style={{
              position: "relative",
              display: "inline-block",
              padding: "0 16px 4px",
              scale: String(pop),
              opacity: 0.55 + 0.45 * spoken,
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 16,
                backgroundColor: marker[w.tone],
                opacity: spoken,
                boxShadow: "0 8px 22px rgba(80,40,25,0.25)",
              }}
            />
            <span
              style={{
                position: "relative",
                color: spoken > 0.5 ? "#fff6ea" : "#33241a",
                textShadow: spoken > 0.5 ? "none" : undefined,
              }}
            >
              {w.text}
            </span>
          </span>
        );
      })}
    </div>
    </>
  );
};
