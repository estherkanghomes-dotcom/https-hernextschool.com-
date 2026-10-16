import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import type { L } from "@/lib/content";

// Proof sections from the Cohort 2 card news: Esther's real AI day, real numbers, real apps.

const tools = {
  Muse: "bg-[#6b4385]",
  Claude: "bg-[#a94f2a]",
  ChatGPT: "bg-[#1f6e5c]",
} as const;

const day: { time: string; tool: keyof typeof tools; task: L }[] = [
  { time: "06:00", tool: "Muse", task: { kr: "카드뉴스가 자동으로 도착", en: "Card news arrives automatically" } },
  { time: "09:00", tool: "Claude", task: { kr: "메일 정리, 답장 초안 완성", en: "Inbox sorted, reply drafts ready" } },
  { time: "11:00", tool: "Claude", task: { kr: "계약서 날짜 · 금액 오류 체크", en: "Contract dates and amounts checked" } },
  { time: "17:00", tool: "ChatGPT", task: { kr: "마케팅 · 새 사업 기획", en: "Marketing and new business planning" } },
  { time: "20:00", tool: "Muse", task: { kr: "카페 칼럼 업로드", en: "Community column uploaded" } },
];

export function MyDayWithAI() {
  const { lang } = useLang();
  const kr = lang === "kr";
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-berry">My day with AI</p>
          <h2 className="mt-3 max-w-2xl font-serif text-3xl font-semibold leading-tight text-plum md:text-4xl">
            {kr ? "30분 지시하고, 몇 시간의 일을 돌려받습니다" : "Thirty minutes of instructions, hours of work handed back"}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <ol className="divide-y divide-plum/10 border-y border-plum/10">
            {day.map((d, i) => (
              <Reveal key={i} delay={i * 60}>
                <li className="flex items-center gap-4 py-4 sm:gap-6">
                  <span className="w-14 shrink-0 font-mono text-lg font-semibold tabular-nums text-plum">{d.time}</span>
                  <span className={"w-24 shrink-0 rounded-full py-1.5 text-center text-sm font-bold text-white " + tools[d.tool]}>{d.tool}</span>
                  <span className="text-[15px] leading-snug text-ink/80 sm:text-base">{d.task[lang]}</span>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-plum/10 bg-white p-7 shadow-sm">
              <p className="text-sm font-semibold text-berry">{kr ? "예를 들면" : "For example"}</p>
              <p className="mt-3 font-serif text-2xl font-semibold leading-snug text-plum">
                {kr ? "“무브인 패키지 메일 찾아줘” 한 줄이면 영문 팔로업 초안까지" : "One line — “find the move-in package email” — and the English follow-up is drafted"}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/65">
                {kr ? "이 하루를 그대로 수업에서 보여드립니다." : "We walk through this exact day in class."}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const results: { num: string; label: L }[] = [
  { num: "229", label: { kr: "장 · 카드뉴스, 31일 연속 발행", en: "card-news slides, 31 days in a row" } },
  { num: "166", label: { kr: "건 · 네이버 카페 원고, 30일 동안", en: "community posts in 30 days" } },
  { num: "30+", label: { kr: "개 · 코딩 없이 만든 웹사이트 · 앱", en: "websites and apps built without coding" } },
  { num: "15", label: { kr: "개 · 내가 자는 동안 도는 자동화", en: "automations that run while I sleep" } },
];

export function RealResults() {
  const { lang } = useLang();
  const kr = lang === "kr";
  return (
    <section className="bg-plum text-cream">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-berry-soft">Real results</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight md:text-4xl">
            {kr ? "말이 아니라 숫자로 보여드립니다" : "Not words — numbers"}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-cream/75">
            {kr ? "직원 없이, 리얼터 한 명이 AI와 만든 실제 결과물입니다." : "Real output from one realtor working with AI — no staff."}
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((r, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="h-full rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <p className="font-serif text-5xl font-semibold text-berry-soft">{r.num}</p>
                <p className="mt-3 text-sm leading-relaxed text-cream/80">{r.label[lang]}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 text-sm text-cream/60">
            {kr ? "개발자가 아니어도 앱을 만듭니다 — 주말 어디 가?, NJ Play 피클볼 리그 앱" : "You don't need to be a developer to build apps — Weekend NY·NJ, the NJ Play pickleball league app"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const cards = Object.entries(
  import.meta.glob("/src/assets/cardnews/cohort2-*.webp", { eager: true, query: "?url", import: "default" }) as Record<string, string>,
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);

// The original Cohort 2 card news, swipeable like Instagram. Click to enlarge.
export function CardNewsGallery() {
  const { lang } = useLang();
  const kr = lang === "kr";
  const [open, setOpen] = useState<number | null>(null);
  if (!cards.length) return null;
  const go = (d: number) => setOpen((i) => (i === null ? i : (i + d + cards.length) % cards.length));
  return (
    <section id="cardnews" className="scroll-mt-28 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-berry">{kr ? "카드뉴스" : "Card news"}</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-plum md:text-4xl">
            {kr ? "2기 모집 안내, 한눈에 보기" : "Cohort 2 at a glance"}
          </h2>
        </Reveal>
        <div className="-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 [scrollbar-width:thin]">
          {cards.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setOpen(i)}
              className="w-[220px] shrink-0 snap-start overflow-hidden rounded-xl border border-plum/10 shadow-sm transition-transform hover:-translate-y-1 sm:w-[260px]"
            >
              <img src={src} alt={kr ? `2기 모집 카드뉴스 ${i + 1}/${cards.length}` : `Cohort 2 card ${i + 1}/${cards.length}`} loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      {open !== null && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onClick={() => setOpen(null)}>
          <button type="button" aria-label="close" className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" onClick={() => setOpen(null)}>
            <X className="h-5 w-5" />
          </button>
          <button type="button" aria-label="prev" className="absolute left-2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-6" onClick={(e) => { e.stopPropagation(); go(-1); }}>
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img src={cards[open]} alt="" className="max-h-[88vh] w-auto max-w-full rounded-lg" onClick={(e) => e.stopPropagation()} />
          <button type="button" aria-label="next" className="absolute right-2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-6" onClick={(e) => { e.stopPropagation(); go(1); }}>
            <ChevronRight className="h-6 w-6" />
          </button>
          <span className="absolute bottom-4 text-sm text-white/70">{open + 1} / {cards.length}</span>
        </div>
      )}
    </section>
  );
}
