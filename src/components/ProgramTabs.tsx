import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";

type Tab = { to: string; kr: string; en: string };

// Pill tab bar used under a page title to switch between sibling pages.
export function SubTabs({ tabs, current, label }: { tabs: readonly Tab[]; current: string; label: string }) {
  const { lang } = useLang();
  return (
    <nav aria-label={label} className="inline-flex max-w-full overflow-x-auto rounded-full border border-plum/15 bg-white p-1">
      {tabs.map((t) => (
        <Link
          key={t.to}
          to={t.to}
          aria-current={current === t.to ? "page" : undefined}
          className={
            "!rounded-full whitespace-nowrap px-5 py-2 text-sm font-bold transition-colors " +
            (current === t.to ? "bg-plum text-white" : "text-plum hover:text-berry")
          }
        >
          {t[lang]}
        </Link>
      ))}
    </nav>
  );
}

// 프로그램 안내 · 커리큘럼 · 6주 AI 코호트
const programTabs = [
  { to: "/programs", kr: "프로그램 안내", en: "Overview" },
  { to: "/curriculum", kr: "커리큘럼", en: "Curriculum" },
  { to: "/program", kr: "6주 AI 코호트", en: "6-Week Cohort" },
] as const;

export function ProgramTabs({ current }: { current: (typeof programTabs)[number]["to"] }) {
  return <SubTabs tabs={programTabs} current={current} label="Program menu" />;
}

// HER NEXT 소개 · 에스더 스토리 · 성공노트
const aboutTabs = [
  { to: "/about", kr: "HER NEXT 소개", en: "About HER NEXT" },
  { to: "/story", kr: "에스더 스토리", en: "Esther's Story" },
  { to: "/notes", kr: "성공노트", en: "Success Notes" },
] as const;

export function AboutTabs({ current }: { current: (typeof aboutTabs)[number]["to"] }) {
  return <SubTabs tabs={aboutTabs} current={current} label="About menu" />;
}

// 에스더의 픽 · 무료 자료 · AI 플래너
const freeTabs = [
  { to: "/picks", kr: "에스더의 픽", en: "Esther's Picks" },
  { to: "/resources", kr: "무료 자료", en: "Free Resources" },
  { to: "/planner", kr: "AI 플래너", en: "AI Planner" },
] as const;

export function FreeTabs({ current }: { current: (typeof freeTabs)[number]["to"] }) {
  return <SubTabs tabs={freeTabs} current={current} label="Free content menu" />;
}
