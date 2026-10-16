import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { CohortSections } from "@/components/CohortSections";
import { Reveal } from "@/components/Reveal";
import { RisingArrow } from "@/components/RisingArrow";
import { PageHero } from "@/components/PageHero";
import { IndustryCases } from "@/components/IndustryCases";
import { useLang } from "@/lib/i18n";
import { programs, curriculum, cta } from "@/lib/content";
// Real photo slot: src/assets/esther-program.jpg (navy-tone stage photo).
// Until it exists, a branded "사진 준비 중" placeholder shows — never a stock person.

export const Route = createFileRoute("/programs")({
  validateSearch: (q: Record<string, unknown>) => ({ s: typeof q.s === "string" ? q.s : undefined }),
  head: () => ({
    meta: [
      { title: "프로그램 | HER NEXT — AI로 내 사업 세우기" },
      {
        name: "description",
        content:
          "HER NEXT AI CLASS 2기 초급반(4주) — ChatGPT·Claude 기본부터 실습까지. 초급 → 중급 → 고급 단계별 과정과 1:1 컨설팅.",
      },
      { property: "og:title", content: "프로그램 | HER NEXT" },
      { property: "og:description", content: "미국 창업·법인설립, 처음부터 끝까지." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Programs,
});

function Programs() {
  const { lang, font } = useLang();
  const o = programs.offers;
  const { s: jump } = Route.useSearch();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  // Deep links from the former /curriculum and /program pages land on their section.
  useEffect(() => {
    if (jump) setTimeout(() => go(jump), 150);
  }, [jump]);
  const jumps = [
    { id: "roadmap", kr: "6단계 로드맵", en: "Roadmap" },
    { id: "offers", kr: "참여 방법", en: "How to join" },
    { id: "cohort", kr: "4주 커리큘럼", en: "4-week curriculum" },
    { id: "pricing", kr: "가격 · 포함 사항", en: "Pricing" },
    { id: "faq", kr: "FAQ", en: "FAQ" },
    { id: "cardnews", kr: "카드뉴스", en: "Card news" },
  ];

  return (
    <div className={font}>
      <PageHero
        eyebrow={programs.hero.eyebrow[lang]}
        title={programs.hero.title[lang]}
        sub={programs.hero.sub[lang]}
      >
        {jumps.map((j) => (
          <button
            key={j.id}
            type="button"
            onClick={() => go(j.id)}
            className="rounded-full border border-plum/20 bg-white px-4 py-2 text-sm font-bold text-plum transition-colors hover:border-berry hover:text-berry"
          >
            {j[lang]}
          </button>
        ))}
      </PageHero>


      {/* Roadmap — 6 modules; open a step to see the full curriculum */}
      <section id="roadmap" className="scroll-mt-28 bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-plum md:text-4xl">
              {programs.roadmapHead[lang]}
            </h2>
          </Reveal>
          <p className="mt-3 text-center text-sm text-ink/60">
            {lang === "kr" ? "단계를 누르면 세부 커리큘럼을 볼 수 있습니다." : "Open a step to see its full curriculum."}
          </p>
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
            {curriculum.modules.map((m, i) => (
              <details key={i} className="group rounded-2xl border border-plum/10 bg-white shadow-sm open:shadow-md">
                <summary className="flex cursor-pointer list-none items-start gap-4 p-6 [&::-webkit-details-marker]:hidden">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-plum text-sm font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-bold leading-snug text-plum">{m.title[lang]}</span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-ink/65">{m.goal[lang]}</span>
                  </span>
                  <ChevronDown className="mt-2 h-5 w-5 shrink-0 text-berry transition-transform group-open:rotate-180" />
                </summary>
                <ul className="space-y-2.5 border-t border-plum/10 px-6 pb-6 pt-4">
                  {m.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-ink/80">
                      <RisingArrow className="mt-0.5 h-4 w-4 shrink-0 text-berry" />
                      {it[lang]}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </section>

      <IndustryCases />

      {/* Offers */}
      <section id="offers" className="scroll-mt-28 bg-blush">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-plum md:text-4xl">
              {o.head[lang]}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <Reveal>
              <div className="relative h-full overflow-hidden rounded-3xl border border-berry/30 bg-white p-8 shadow-xl md:p-10">
                <span className="inline-block rounded-full bg-berry/12 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-berry">
                  {o.main.tag[lang]}
                </span>
                <h3 className="mt-5 font-serif text-2xl font-semibold text-plum md:text-3xl">
                  {o.main.title[lang]}
                </h3>
                <p className="mt-4 max-w-2xl leading-relaxed text-ink/75">{o.main.body[lang]}</p>
                <ul className="mt-6 space-y-2.5">
                  {o.main.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-plum">
                      <RisingArrow className="mt-0.5 h-4 w-4 shrink-0 text-berry" />
                      {p[lang]}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/checkout"
                  search={{ item: "cohort" }}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-berry px-7 py-3.5 text-base font-semibold text-berry-foreground transition-transform hover:-translate-y-0.5"
                >
                  {o.main.cta[lang]}
                  <RisingArrow className="h-4 w-4" />
                </Link>
                <Link
                  to="/programs"
                  search={{ s: "cohort" }}
                  className="ml-4 mt-8 inline-flex items-center gap-1.5 border-b-2 border-berry pb-0.5 text-sm font-semibold text-plum transition-colors hover:text-berry"
                >
                  {lang === "kr" ? "4주 커리큘럼 보기" : "See the curriculum"}
                  <span aria-hidden>→</span>
                </Link>
                <p className="mt-3 text-xs text-ink/50">{o.main.note[lang]}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="flex h-full flex-col rounded-3xl border border-plum/10 bg-white p-8 shadow-sm">
                <span className="inline-block self-start rounded-full bg-plum/8 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-plum/70">
                  {o.side.tag[lang]}
                </span>
                <h3 className="mt-5 text-xl font-bold text-plum">{o.side.title[lang]}</h3>
                <p className="mt-4 flex-1 leading-relaxed text-ink/70">{o.side.body[lang]}</p>
                <Link
                  to="/checkout"
                  search={{ item: "consult" }}
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-plum/25 px-6 py-3 text-sm font-semibold text-plum transition-colors hover:bg-plum/5"
                >
                  {o.side.cta[lang]}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <CohortSections />
    </div>
  );
}
