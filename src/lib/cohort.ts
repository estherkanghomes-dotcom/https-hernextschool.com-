import type { L } from "./content";

// 2기 초급반 (Cohort 2, beginner) schedule — single source for hero, cards, sticky bar and checkout.
export const cohort = {
  label: { kr: "2기 초급반 모집 중", en: "Cohort 2 enrolling" } as L,
  name: { kr: "2기 초급반", en: "Cohort 2 · Beginner" } as L,
  start: { kr: "11/16(월) · 11/19(목) 개강", en: "Starts Mon 11/16 or Thu 11/19" } as L,
  startShort: { kr: "11/16 월 · 11/19 목", en: "Mon 11/16 · Thu 11/19" } as L,
  capacity: { kr: "반별 8~10명", en: "8–10 per class" } as L,
  format: { kr: "주 1회 2시간 · 4주", en: "Weekly 2-hour live · 4 weeks" } as L,
  classes: [
    {
      id: "mon-am",
      kr: "11/16 월요일 오전반",
      en: "Monday morning class (starts 11/16)",
      note: { kr: "아이 등교 후, 출근 전 오전 시간이 편한 분", en: "For mornings after school drop-off, before work" } as L,
    },
    {
      id: "thu-pm",
      kr: "11/19 목요일 저녁반",
      en: "Thursday evening class (starts 11/19)",
      note: { kr: "퇴근 후, 하루를 마치고 저녁 시간이 편한 분", en: "For evenings, after the workday" } as L,
    },
  ] as const,
};
export type ClassId = (typeof cohort.classes)[number]["id"];
