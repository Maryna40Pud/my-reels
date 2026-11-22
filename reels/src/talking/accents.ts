// Accent words, timed (in seconds) to the spoken words in the source video.
// Each part fades in at its own `at` time; the whole pill stays until `to`.
export type Tone = "body" | "feeling" | "space";

export type Accent = {
  from: number;
  to: number;
  tone: Tone;
  parts: { text: string; at: number }[];
};

export const accents: Accent[] = [
  { from: 0.0, to: 1.7, tone: "body", parts: [{ text: "Відчуй", at: 0.0 }] },
  { from: 2.15, to: 4.5, tone: "body", parts: [{ text: "дихання", at: 2.15 }] },
  {
    from: 7.45,
    to: 12.85,
    tone: "body",
    parts: [
      { text: "щелепа", at: 7.45 },
      { text: "очі", at: 9.6 },
      { text: "міжбрівка", at: 11.85 },
    ],
  },
  { from: 13.35, to: 15.6, tone: "body", parts: [{ text: "руки", at: 13.35 }] },
  { from: 17.35, to: 18.8, tone: "body", parts: [{ text: "кулаки", at: 17.35 }] },
  {
    from: 19.2,
    to: 21.6,
    tone: "body",
    parts: [{ text: "тіло не може розслабитися", at: 19.2 }],
  },
  { from: 23.85, to: 25.1, tone: "body", parts: [{ text: "терпнуть пальці", at: 23.85 }] },
  { from: 25.3, to: 27.75, tone: "body", parts: [{ text: "живіт", at: 25.3 }] },
  { from: 28.2, to: 29.3, tone: "feeling", parts: [{ text: "не просто втома", at: 28.2 }] },
  {
    from: 33.25,
    to: 35.95,
    tone: "feeling",
    parts: [
      { text: "тривоги", at: 33.25 },
      { text: "страхи", at: 33.8 },
      { text: "сльози", at: 34.45 },
    ],
  },
  { from: 36.6, to: 40.95, tone: "body", parts: [{ text: "тіло тримає це все", at: 36.6 }] },
  { from: 41.25, to: 42.95, tone: "feeling", parts: [{ text: "і у нього є край", at: 41.25 }] },
  { from: 48.75, to: 50.0, tone: "space", parts: [{ text: "простір", at: 48.75 }] },
  { from: 50.0, to: 51.9, tone: "space", parts: [{ text: "місце всім почуттям", at: 50.0 }] },
  {
    from: 53.65,
    to: 56.05,
    tone: "space",
    parts: [{ text: "для жінок по всьому світу", at: 53.65 }],
  },
  {
    from: 61.6,
    to: 65.2,
    tone: "space",
    parts: [
      { text: "Дихай", at: 61.6 },
      { text: "Відчувай", at: 62.4 },
      { text: "Живи", at: 63.2 },
    ],
  },
];

export const toneColor: Record<Tone, string> = {
  body: "#8a4330", // deep terracotta
  feeling: "#3a2a1f", // warm dark brown
  space: "#4f5232", // deep olive
};
