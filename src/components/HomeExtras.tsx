import { Link } from "@tanstack/react-router";
import { ChevronDown, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import { program } from "@/lib/content";
import { products, fmtUSD } from "@/lib/products";
import { cohort1 } from "@/lib/cohort";

// Hero side card: everything a buyer needs at a glance.
export function CohortSummaryCard() {
  const { lang } = useLang();
  const kr = lang === "kr";
  const p = products.cohort;
  const rows = [
    [kr ? "개강" : "Start", cohort1.startShort[lang]],
    [kr ? "수업" : "Format", cohort1.format[lang]],
    [kr ? "반" : "Classes", cohort1.classes.map((c) => c[lang]).join(" / ")],
    [kr ? "정원" : "Seats", kr ? `${cohort1.capacity}명 소수 정예` : `${cohort1.capacity} per class`],
  ];
  return (
    <div className="w-full rounded-2xl bg-plum p-7 text-white shadow-2xl">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-berry px-3 py-1 text-xs font-bold">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
        {cohort1.label[lang]}
      </span>
      <p className="mt-4 text-2xl font-extrabold">{p.name[lang]}</p>
      <dl className="mt-5 space-y-2.5 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-4 border-b border-white/10 pb-2.5">
            <dt className="w-12 shrink-0 text-white/60">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 flex items-baseline gap-2">
        {p.regular && <span className="text-white/50 line-through">{fmtUSD(p.regular)}</span>}
        <span className="text-3xl font-extrabold text-berry-soft">{fmtUSD(p.price)}</span>
        {p.regular && <span className="rounded bg-berry px-2 py-0.5 text-xs font-bold">{Math.round((1 - p.price / p.regular) * 100)}% OFF</span>}
      </div>
      <Link
        to="/checkout"
        search={{ item: "cohort" }}
        className="mt-5 block rounded-md bg-berry py-3.5 text-center text-base font-bold text-white transition-transform hover:-translate-y-0.5"
      >
        {kr ? "1기 수강 신청하기" : "Enroll in Cohort 1"}
      </Link>
    </div>
  );
}

// 6-week curriculum preview: titles only, links to the full program page.
export function WeeksPreview() {
  const { lang } = useLang();
  const kr = lang === "kr";
  return (
    <section className="bg-blush">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-berry">{kr ? "6주 커리큘럼" : "6-week curriculum"}</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-plum md:text-4xl">{kr ? "6주 동안 이렇게 진행됩니다" : "How the six weeks run"}</h2>
        </Reveal>
        <ol className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {program.weeks.map((w, i) => (
            <li key={i}>
              <Link
                to="/programs"
                search={{ s: "cohort" }}
                className="group flex h-full items-start gap-4 rounded-xl border border-plum/10 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-berry hover:shadow-md"
              >
                <span className="shrink-0 rounded-md bg-plum px-2.5 py-1 text-xs font-bold text-white">WEEK {i + 1}</span>
                <span className="font-bold leading-snug text-plum group-hover:text-berry">{w.title[lang]}</span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Link to="/programs" search={{ s: "cohort" }} className="inline-flex items-center gap-1.5 border-b-2 border-berry pb-0.5 text-sm font-bold text-plum hover:text-berry">
            {kr ? "주차별 상세 내용 보기" : "See each week in detail"} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Free AI planner promo — lead magnet.
export function PlannerPromo() {
  const { lang } = useLang();
  const kr = lang === "kr";
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-berry/25 bg-gradient-to-r from-berry/10 via-white to-white p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-berry shadow-sm">
                <Sparkles className="h-3.5 w-3.5" /> {kr ? "무료 · 1분" : "Free · 1 minute"}
              </span>
              <h2 className="mt-3 text-2xl font-extrabold text-plum md:text-3xl">{kr ? "내 아이디어로 AI 사업 로드맵 받아보기" : "Get an AI business roadmap for your idea"}</h2>
              <p className="mt-2 text-ink/70">{kr ? "업종, 아이디어, 예산만 입력하면 AI가 맞춤 실행 계획 초안을 만들어 드립니다." : "Enter your industry, idea and budget — AI drafts a tailored action plan."}</p>
            </div>
            <Link to="/planner" className="shrink-0 rounded-md bg-plum px-7 py-4 text-base font-bold text-white transition-transform hover:-translate-y-0.5">
              {kr ? "무료 AI 플래너 해보기 →" : "Try the free AI planner →"}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Three pre-purchase questions on the home page.
export function HomeFaq() {
  const { lang } = useLang();
  const kr = lang === "kr";
  const pick = [4, 0, 2].map((i) => program.faq[i]).filter(Boolean);
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <Reveal>
          <h2 className="text-center font-serif text-3xl font-semibold text-plum md:text-4xl">{kr ? "신청 전에 많이 묻는 질문" : "Before you enroll"}</h2>
        </Reveal>
        <div className="mt-10 divide-y divide-plum/10 border-y border-plum/10">
          {pick.map((f, i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-plum [&::-webkit-details-marker]:hidden">
                {f.q[lang]}
                <ChevronDown className="h-5 w-5 shrink-0 text-berry transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 leading-relaxed text-ink/75">{f.a[lang]}</p>
            </details>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/programs" search={{ s: "faq" }} className="text-sm font-bold text-plum underline-offset-4 hover:text-berry hover:underline">
            {kr ? "FAQ 전체 보기 →" : "All FAQs →"}
          </Link>
        </div>
      </div>
    </section>
  );
}
