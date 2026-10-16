import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { RisingArrow } from "@/components/RisingArrow";
import { PageHero } from "@/components/PageHero";
import { AboutTabs } from "@/components/ProgramTabs";
import { useLang } from "@/lib/i18n";
import { about, cta } from "@/lib/content";
import { BrandPhoto } from "@/components/BrandPhoto";
import { Prose } from "@/components/Prose";
// Credibility-first imagery: only the founder's REAL photos render.
// Portrait drop-in slot: src/assets/esther-story.jpg. The values band no longer
// uses a stock person — it's an abstract brand band per the no-stock-humans rule.

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "소개 | HER NEXT — 에스더, 그리고 HER NEXT" },
      {
        name: "description",
        content:
          "10살에 미국에 도착해 20가지가 넘는 일과 20개가 넘는 자격증, 세 번의 재기를 거친 에스더. 그 경험과 AI 활용법으로 미국 한인 여성의 창업을 돕습니다.",
      },
      { property: "og:title", content: "소개 | HER NEXT" },
      { property: "og:description", content: "성공이 아니라, 다시 일어난 사람에게 배우세요." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  const { lang, font } = useLang();

  return (
    <div className={font}>
      <PageHero
        eyebrow={about.hero.eyebrow[lang]}
        title={about.hero.title[lang]}
        sub={about.hero.sub[lang]}
      >
        <AboutTabs current="/about" />
      </PageHero>

      {/* Story */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1fr_0.85fr] md:items-start">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-plum md:text-4xl">
              {about.storyHead[lang]}
            </h2>
            <div className="mt-6 space-y-5">
              {about.story.map((p, i) => (
                <Prose key={i} text={p[lang]} className="text-[17px] leading-[1.9] text-ink/80" gap="space-y-3" />
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            {/* Real photo slot: src/assets/esther-story.jpg (founder portrait) */}
            <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
              <BrandPhoto
                slot="esther-portrait.png"
                alt="Esther, founder of HER NEXT"
                className="h-full w-full"
                imgClassName="h-full w-full object-cover object-top"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-blush">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-plum md:text-4xl">
              {about.credTitle[lang]}
            </h2>
            <p className="mt-3 text-sm text-ink/50">{about.credNote[lang]}</p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.creds.map((c, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex h-full items-start gap-3 rounded-2xl bg-white p-6 shadow-sm">
                  <RisingArrow className="mt-0.5 h-5 w-5 shrink-0 text-berry" />
                  <p className="text-sm font-medium leading-relaxed text-plum">{c[lang]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values band — abstract brand band (no stock person) */}
      <section className="relative isolate overflow-hidden bg-plum">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_140%_at_85%_0%,color-mix(in_oklab,var(--color-berry)_28%,transparent)_0%,transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-cream">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">
              {about.values.head[lang]}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {about.values.items.map((v, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="border-t border-cream/25 pt-5">
                  <h3 className="font-serif text-xl font-semibold text-berry-soft">
                    {v.title[lang]}
                  </h3>
                  <p className="mt-3 leading-relaxed text-cream/80">{v.desc[lang]}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link
              to="/contact"
              className="mt-12 inline-flex items-center justify-center gap-2 rounded-full bg-berry px-7 py-3.5 text-base font-semibold text-berry-foreground transition-transform hover:-translate-y-0.5"
            >
              {cta.apply[lang]}
              <RisingArrow className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
