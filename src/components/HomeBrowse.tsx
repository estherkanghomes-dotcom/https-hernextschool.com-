import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  BadgeDollarSign, BookOpen, ChevronLeft, ChevronRight, Gift, Landmark, Lightbulb,
  Megaphone, Palette, PlayCircle, Sparkles, UserRound, Workflow,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { RisingArrow } from "./RisingArrow";
import { BrandPhoto } from "./BrandPhoto";
import { CohortSummaryCard } from "./HomeExtras";
import { useLang } from "@/lib/i18n";
import { home, curriculum, story } from "@/lib/content";
import { notesMeta, publishedNotes } from "@/data/notes";
import { products, fmtUSD } from "@/lib/products";

/* ---------------- Main banner carousel (Class101 / Kyobo style) ---------------- */
export function HomeBanner() {
  const { lang } = useLang();
  const kr = lang === "kr";
  const h = home.hero;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = 3;
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 7000);
    return () => clearInterval(t);
  }, [paused]);
  const note = publishedNotes[0];

  const slides: ReactNode[] = [
    // 1 — cohort
    <div key="c" className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
      <div>
        <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] text-berry">
          <span aria-hidden className="h-px w-8 bg-berry" />
          {h.eyebrow[lang]}
        </p>
        <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.15] [&_.block]:whitespace-nowrap sm:text-5xl md:text-6xl">
          {kr ? (
            <>
              <span className="block">AI, 아직도</span>
              <span className="block">
                <span className="relative inline-block">
                  <span className="relative z-10">검색창처럼</span>
                  <span aria-hidden className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-berry/80 md:h-2" />
                </span>
              </span>
              <span className="block">쓰고 계신가요?</span>
            </>
          ) : (
            <>
              <span className="block">Still using AI</span>
              <span className="block">
                <span className="relative inline-block">
                  <span className="relative z-10">like a search box?</span>
                  <span aria-hidden className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-berry/80 md:h-2" />
                </span>
              </span>
            </>
          )}
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/75 md:text-lg">{h.subShort[lang]}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/checkout" search={{ item: "cohort" }} className="inline-flex items-center justify-center gap-2 rounded-md bg-berry px-7 py-4 text-base font-bold text-white transition-transform hover:-translate-y-0.5">
            {kr ? `2기 수강 신청 · ${fmtUSD(products.cohort.price)}` : `Enroll · ${fmtUSD(products.cohort.price)}`}
            <RisingArrow className="h-4 w-4" />
          </Link>
          <Link to="/planner" className="inline-flex items-center justify-center rounded-md border border-plum/30 bg-white px-7 py-4 text-base font-bold text-plum transition-colors hover:border-berry hover:text-berry">
            {kr ? "무료 AI 플래너 해보기 →" : "Try the free AI planner →"}
          </Link>
        </div>
      </div>
      <CohortSummaryCard />
    </div>,
    // 2 — free AI planner
    <div key="p" className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-berry/10 px-3 py-1 text-sm font-bold text-berry">
          <Sparkles className="h-4 w-4" /> {kr ? "무료 · 1분" : "Free · 1 minute"}
        </span>
        <h2 className="mt-6 font-serif text-4xl font-semibold leading-[1.15] [&_.block]:whitespace-nowrap sm:text-5xl md:text-6xl">
          {kr ? (<><span className="block">내 아이디어로</span><span className="block">AI 로드맵 받기</span></>) : (<><span className="block">Your idea,</span><span className="block">your AI roadmap</span></>)}
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/75 md:text-lg">
          {kr ? "업종, 아이디어, 예산만 입력하면 AI가 맞춤 실행 계획 초안을 만들어 드립니다." : "Enter your industry, idea and budget — AI drafts a tailored action plan."}
        </p>
        <Link to="/planner" className="mt-8 inline-flex items-center gap-2 rounded-md bg-plum px-7 py-4 text-base font-bold text-white transition-transform hover:-translate-y-0.5">
          {kr ? "무료 AI 플래너 시작하기" : "Start the free planner"} <RisingArrow className="h-4 w-4" />
        </Link>
      </div>
      <div className="hidden rounded-2xl border border-plum/10 bg-blush p-7 lg:block">
        {(kr ? ["업종 선택", "사업 아이디어 입력", "경험 · 예산 입력", "맞춤 로드맵 생성"] : ["Pick an industry", "Describe your idea", "Add experience & budget", "Get your roadmap"]).map((t, k) => (
          <div key={k} className="flex items-center gap-4 border-b border-plum/10 py-4 last:border-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-plum text-sm font-bold text-white">{k + 1}</span>
            <span className="font-bold text-plum">{t}</span>
          </div>
        ))}
      </div>
    </div>,
    // 3 — success notes
    <div key="n" className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-berry/10 px-3 py-1 text-sm font-bold text-berry">
          <BookOpen className="h-4 w-4" /> {kr ? `성공노트 ${publishedNotes.length}편` : `${publishedNotes.length} Success Notes`}
        </span>
        <h2 className="mt-6 font-serif text-4xl font-semibold leading-[1.2] sm:text-5xl">{note?.title[lang]}</h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/75 md:text-lg">{note?.excerpt[lang]}</p>
        <Link to="/notes/$slug" params={{ slug: note?.slug ?? "" }} className="mt-8 inline-flex items-center gap-2 rounded-md bg-plum px-7 py-4 text-base font-bold text-white transition-transform hover:-translate-y-0.5">
          {kr ? "칼럼 읽기" : "Read the column"} <RisingArrow className="h-4 w-4" />
        </Link>
      </div>
      {note?.imageSlot && (
        <div className="hidden overflow-hidden rounded-2xl shadow-xl lg:block">
          <BrandPhoto slot={note.imageSlot} alt="" className="aspect-[4/3] w-full" imgClassName="h-full w-full object-cover" />
        </div>
      )}
    </div>,
  ];

  return (
    <section
      className="relative bg-white text-plum"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-10 md:pt-12">
        <div className="min-h-[430px]">
          {slides.map((s, k) => (
            <div key={k} className={k === i ? "animate-in fade-in duration-500" : "hidden"} aria-hidden={k !== i}>
              {s}
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button type="button" aria-label="prev" onClick={() => setI((i + n - 1) % n)} className="flex h-9 w-9 items-center justify-center rounded-full border border-plum/15 text-plum hover:border-berry hover:text-berry">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-1.5">
            {Array.from({ length: n }).map((_, k) => (
              <button key={k} type="button" aria-label={`slide ${k + 1}`} onClick={() => setI(k)} className={"h-1.5 rounded-full transition-all " + (k === i ? "w-8 bg-berry" : "w-4 bg-plum/15")} />
            ))}
          </div>
          <button type="button" aria-label="next" onClick={() => setI((i + 1) % n)} className="flex h-9 w-9 items-center justify-center rounded-full border border-plum/15 text-plum hover:border-berry hover:text-berry">
            <ChevronRight className="h-4 w-4" />
          </button>
          <span className="ml-1 text-xs font-semibold tabular-nums text-ink/50">{i + 1} / {n}</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Category icon row ---------------- */
const icons = [Lightbulb, Palette, Landmark, Megaphone, BadgeDollarSign, Workflow];
export function CategoryRow() {
  const { lang } = useLang();
  const kr = lang === "kr";
  const shortcut = (t: string) => t.replace(/^AI로 |^AI /, "").replace(/ & .*/, "").replace(/ · .*/, "");
  const items = [
    ...curriculum.modules.map((m, k) => ({ key: "m" + k, Icon: icons[k] ?? Lightbulb, label: shortcut(m.title[lang]), to: "/programs" as const, search: { s: "roadmap" } })),
    { key: "planner", Icon: Sparkles, label: kr ? "AI 플래너" : "AI Planner", to: "/planner" as const },
    { key: "notes", Icon: BookOpen, label: kr ? "성공노트" : "Notes", to: "/notes" as const },
    { key: "story", Icon: UserRound, label: kr ? "에스더 스토리" : "Esther", to: "/story" as const },
    { key: "free", Icon: Gift, label: kr ? "무료 자료" : "Free", to: "/resources" as const },
  ];
  return (
    <section className="border-y border-plum/10 bg-white">
      <div className="mx-auto max-w-6xl overflow-x-auto px-6 py-7">
        <ul className="flex min-w-max justify-between gap-6 md:min-w-0">
          {items.map(({ key, Icon, label, to, ...rest }) => (
            <li key={key}>
              <Link to={to} search={(rest as { search?: Record<string, string> }).search} className="group flex w-20 flex-col items-center gap-2 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blush text-plum transition-colors group-hover:bg-berry group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-[13px] font-bold leading-tight text-plum group-hover:text-berry">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Horizontal card row with arrows ---------------- */
function Row({ title, more, children }: { title: string; more?: { to: string; label: string }; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const by = (d: number) => ref.current?.scrollBy({ left: d * (ref.current.clientWidth * 0.8), behavior: "smooth" });
  return (
    <div className="mx-auto flex max-w-6xl flex-col px-6 py-12">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-extrabold text-plum md:text-[26px]">{title}</h2>
        <div className="flex items-center gap-2">
          {more && (
            <Link to={more.to} className="mr-2 text-sm font-semibold text-ink/60 hover:text-berry">{more.label} ›</Link>
          )}
          <button type="button" aria-label="prev" onClick={() => by(-1)} className="hidden h-8 w-8 items-center justify-center rounded-full border border-plum/15 text-plum hover:border-berry md:flex"><ChevronLeft className="h-4 w-4" /></button>
          <button type="button" aria-label="next" onClick={() => by(1)} className="hidden h-8 w-8 items-center justify-center rounded-full border border-plum/15 text-plum hover:border-berry md:flex"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
      <div ref={ref} className="-mx-6 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}

export function NotesRow() {
  const { lang } = useLang();
  const kr = lang === "kr";
  return (
    <section className="bg-white">
      <Row title={kr ? "에스더의 성공노트" : "Esther's Success Notes"} more={{ to: "/notes", label: kr ? "전체보기" : "See all" }}>
        {publishedNotes.map((n) => (
          <Link key={n.slug} to="/notes/$slug" params={{ slug: n.slug }} className="group w-[260px] shrink-0 snap-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-blush">
              {n.imageSlot && (
                <BrandPhoto slot={n.imageSlot} alt="" className="h-full w-full" imgClassName="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
              )}
              <span className="absolute left-3 top-3 rounded bg-white/95 px-2 py-0.5 text-[11px] font-bold text-berry">{n.category[lang]}</span>
            </div>
            <p className="mt-3 line-clamp-2 font-bold leading-snug text-plum group-hover:text-berry">{n.title[lang]}</p>
            <p className="mt-1 text-xs text-ink/55">{n.readingMin} {notesMeta.minLabel[lang]}</p>
          </Link>
        ))}
      </Row>
    </section>
  );
}

export function FreeRow() {
  const { lang } = useLang();
  const kr = lang === "kr";
  const items = [
    { to: "/planner", Icon: Sparkles, tag: kr ? "AI 도구" : "AI tool", title: kr ? "무료 AI 사업 계획 플래너" : "Free AI business planner", sub: kr ? "아이디어 입력 → 맞춤 로드맵" : "Idea in → roadmap out", tone: "bg-plum text-white" },
    { to: "/picks", Icon: PlayCircle, tag: kr ? "학습 영상" : "Videos", title: kr ? "에스더의 픽" : "Esther's Picks", sub: kr ? "AI · 비즈니스 · 재무 영상 모음" : "AI, business & money videos", tone: "bg-blush text-plum" },
    { to: "/resources", Icon: Gift, tag: kr ? "자료실" : "Resources", title: kr ? "무료 자료" : "Free resources", sub: kr ? "창업 준비 체크리스트 · 템플릿" : "Checklists & templates", tone: "bg-berry/10 text-plum" },
    { to: "/story", Icon: UserRound, tag: kr ? "스토리" : "Story", title: kr ? "에스더 스토리" : "Esther's Story", sub: kr ? `설립자 이야기 · ${story.sections.length}개 챕터` : `The founder's journey · ${story.sections.length} chapters`, tone: "bg-blush text-plum" },
  ];
  return (
    <section className="bg-white">
      <Row title={kr ? "무료로 먼저 시작해 보세요" : "Start free"}>
        {items.map(({ to, Icon, tag, title, sub, tone }) => (
          <Link key={to} to={to} className={"group flex w-[260px] shrink-0 snap-start flex-col justify-between rounded-xl p-6 transition-transform hover:-translate-y-1 " + tone} style={{ minHeight: 190 }}>
            <Icon className="h-8 w-8 opacity-90" />
            <div>
              <p className="text-xs font-bold opacity-70">{tag}</p>
              <p className="mt-1 text-lg font-extrabold leading-snug">{title}</p>
              <p className="mt-1 text-sm opacity-75">{sub}</p>
            </div>
          </Link>
        ))}
      </Row>
    </section>
  );
}

export { Reveal };
