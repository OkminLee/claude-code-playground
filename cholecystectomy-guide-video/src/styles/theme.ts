import { loadFont } from "@remotion/google-fonts/NotoSansKR";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["korean", "latin"],
});

export const FONT_FAMILY = fontFamily;

export const colors = {
  background: "#FFF8F0",
  text: "#2D2D2D",
  accent: "#D97757",
  medical: "#4A9B8E",
  warning: "#E85D4A",
  subText: "#8B8B8B",
  card: "#FFFFFF",
  white: "#FFFFFF",
} as const;

export const FPS = 30;
export const TRANSITION_DURATION = 15;

export const sceneDurations = {
  intro: 4 * FPS,
  postSurgery: 8 * FPS,
  diet: 15 * FPS,
  normalDiet: 10 * FPS,
  tips: 10 * FPS,
  outro: 5 * FPS,
} as const;

export const TOTAL_DURATION =
  Object.values(sceneDurations).reduce((a, b) => a + b, 0) -
  5 * TRANSITION_DURATION;

export const timelinePhases = [
  { id: "postSurgery", label: "수술 직후", position: 0.1 },
  { id: "diet", label: "1~2개월", position: 0.35 },
  { id: "normalDiet", label: "3개월~", position: 0.65 },
  { id: "longTerm", label: "이후", position: 0.9 },
] as const;

export type TimelinePhase = (typeof timelinePhases)[number]["id"];
