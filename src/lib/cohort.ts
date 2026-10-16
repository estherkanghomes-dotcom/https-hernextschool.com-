import type { L } from "./content";

// 1기 (founding cohort) schedule — single source for hero, cards, sticky bar and checkout.
export const cohort1 = {
  label: { kr: "1기 모집 중", en: "Cohort 1 enrolling" } as L,
  start: { kr: "11월 2주차 개강", en: "Starts the 2nd week of November" } as L,
  startShort: { kr: "11월 2주차", en: "Nov, week 2" } as L,
  capacity: 8,
  format: { kr: "주 1회 라이브 · 6주", en: "Weekly live · 6 weeks" } as L,
  classes: [
    { id: "mon-am", kr: "월요일 아침반", en: "Monday morning class" },
    { id: "thu-pm", kr: "목요일 저녁반", en: "Thursday evening class" },
  ] as const,
};
export type ClassId = (typeof cohort1.classes)[number]["id"];
