import { CohortGallery } from "@/components/CohortGallery";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { RisingArrow } from "@/components/RisingArrow";
import { VideoCard } from "@/components/VideoCard";
import { useLang } from "@/lib/i18n";
import { home, picks } from "@/lib/content";
import { videos } from "@/data/videos";
import { notesMeta, publishedNotes } from "@/data/notes";
import { BrandPhoto } from "@/components/BrandPhoto";
import { ProductCards } from "@/components/ProductCards";
import { WeeksPreview, HomeFaq } from "@/components/HomeExtras";
import { HomeBanner, CategoryRow, NotesRow, FreeRow } from "@/components/HomeBrowse";
import { MyDayWithAI, RealResults } from "@/components/HomeProof";
// Photos are credibility-first: only the founder's REAL photos render.
// Drop-in slots: src/assets/esther-hero.jpg (landing hero seminar stage photo),
// src/assets/esther-story.jpg (founder portrait). Until a real file exists at the
// path, an elegant branded "사진 준비 중" placeholder shows — never a stock person.

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HER NEXT | 미국 한인 여성을 위한 AI 비즈니스 스쿨" },
      {
        name: "description",
        content:
          "HER NEXT AI CLASS 2기 초급반 모집. 리얼터 한 명이 AI 3명과 팀처럼 일하는 법을 4주 동안 그대로 알려드립니다. 11/16 월 오전반 · 11/19 목 저녁반.",
      },
      { property: "og:title", content: "HER NEXT | 미국 한인 여성을 위한 비즈니스 스쿨" },
      {
        property: "og:description",
        content: "당신의 다음 챕터를 함께 엽니다. Founded by Esther.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { lang, font } = useLang();
  const h = home.hero;

  return (
    <div className={font}>
      <HomeBanner />

      <CategoryRow />

      <MyDayWithAI />

      <RealResults />

      <ProductCards />

      <WeeksPreview />

      <NotesRow />

      <FreeRow />

      {/* What you'll learn */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-berry">
              {home.learnTitle[lang]}
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl font-semibold leading-tight text-plum md:text-4xl">
              {home.learnHead[lang]}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
              {home.learnSub[lang]}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {home.learn.map((l, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="group h-full rounded-2xl border border-plum/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-berry/40 hover:shadow-xl">
                  <span className="font-serif text-2xl font-semibold text-berry/40">
                    {l.no}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-plum">{l.title[lang]}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/65">{l.desc[lang]}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <Link
                to="/curriculum"
                className="inline-flex items-center gap-1.5 border-b-2 border-berry pb-0.5 text-sm font-semibold text-plum transition-colors hover:text-berry"
              >
                {lang === "kr" ? "전체 커리큘럼 보기" : "See the full curriculum"}
                <span aria-hidden>→</span>
              </Link>
              <Link
                to="/program"
                className="inline-flex items-center gap-1.5 border-b-2 border-berry pb-0.5 text-sm font-semibold text-plum transition-colors hover:text-berry"
              >
                {lang === "kr" ? "4주 AI 클래스 자세히 보기" : "See the 4-week AI Class"}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-blush">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <Reveal>
            <div className="relative">
              {/* Real photo slot: src/assets/esther-story.jpg (founder portrait) */}
              <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
                <BrandPhoto
                  slot="esther-portrait.png"
                  alt="Esther, founder of HER NEXT"
                  className="h-full w-full"
                  imgClassName="h-full w-full object-cover object-top"
                />
              </div>
              <div
                aria-hidden
                className="absolute -bottom-5 -right-5 hidden h-24 w-24 items-center justify-center rounded-2xl bg-berry text-berry-foreground md:flex"
              >
                <RisingArrow className="h-10 w-10" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-berry">
              {home.founder.eyebrow[lang]}
            </p>
            <blockquote className="mt-5 font-serif text-2xl font-medium leading-snug text-plum md:text-3xl">
              {home.founder.quote[lang]}
            </blockquote>
            <p className="mt-6 leading-relaxed text-ink/75">{home.founder.body[lang]}</p>
            <Link
              to="/story"
              className="mt-6 block border-l-2 border-berry/50 pl-4 font-serif text-lg italic text-plum/90 transition-colors hover:text-berry"
            >
              {home.founder.teaser[lang]}
            </Link>
            <Link
              to="/story"
              className="mt-3 block border-l-2 border-berry/50 pl-4 font-serif text-lg italic text-plum/90 transition-colors hover:text-berry"
            >
              {home.founder.certsTeaser[lang]}
            </Link>
            <p className="mt-6 text-sm font-semibold text-plum">
              {home.founder.name} ·{" "}
              <span className="font-normal text-ink/60">{home.founder.role[lang]}</span>
            </p>
            <Link
              to="/story"
              className="mt-6 inline-flex items-center gap-1.5 border-b-2 border-berry pb-0.5 text-sm font-semibold text-plum transition-colors hover:text-berry"
            >
              {home.founder.link[lang]}
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <HomeFaq />

      {/* Final CTA */}
      <section className="bg-plum text-cream">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold leading-tight md:text-4xl">
              {home.finalCta.head[lang]}
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-cream/80">
              {home.finalCta.sub[lang]}
            </p>
            <Link
              to="/checkout"
              search={{ item: "cohort" }}
              className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-berry px-8 py-4 text-base font-semibold text-berry-foreground transition-transform hover:-translate-y-0.5"
            >
              {lang === "kr" ? "2기 수강 신청하기" : "Enroll in Cohort 2"}
              <RisingArrow className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
