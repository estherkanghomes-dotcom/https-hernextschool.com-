import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { RisingArrow } from "@/components/RisingArrow";
import { PageHero } from "@/components/PageHero";
import { CohortGallery } from "@/components/CohortGallery";
import { useLang } from "@/lib/i18n";
import { stories, cta } from "@/lib/content";
// No-stock-humans rule: the CTA band no longer uses a stock people photo —
// it's an abstract brand band.

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "성과·후기 | HER NEXT — AI로 다음 챕터를 연 여성들" },
      {
        name: "description",
        content: "HER NEXT와 함께 AI로 자신의 사업을 시작한 여성들의 이야기와 성과.",
      },
      { property: "og:title", content: "성과·후기 | HER NEXT" },
      { property: "og:description", content: "당신의 이야기가 다음이 되기를." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Stories,
});

function Stories() {
  const { lang, font } = useLang();

  return (
    <div className={font}>
      <PageHero
        eyebrow={stories.hero.eyebrow[lang]}
        title={stories.hero.title[lang]}
        sub={stories.hero.sub[lang]}
      />

      <section className="bg-blush">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <dl className="grid grid-cols-3 gap-6 text-center">
            {stories.stats.map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <dt className="font-serif text-4xl font-semibold text-berry md:text-5xl">
                  {s.num}
                </dt>
                <dd className="mt-2 text-sm leading-snug text-ink/70">{s.label[lang]}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-6 md:grid-cols-3">
            {stories.testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <figure className="flex h-full flex-col rounded-3xl border border-plum/10 bg-white p-8 shadow-sm">
                  <RisingArrow className="h-6 w-6 text-berry" />
                  <blockquote className="mt-4 flex-1 text-base italic leading-relaxed text-plum">
                    {t.quote[lang]}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-plum/10 pt-4">
                    <p className="text-sm font-semibold text-plum">{t.name[lang]}</p>
                    <p className="text-sm text-ink/60">{t.role[lang]}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CohortGallery />

      <section className="relative isolate overflow-hidden bg-plum">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_140%_at_15%_0%,color-mix(in_oklab,var(--color-berry)_28%,transparent)_0%,transparent_60%)]"
        />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center text-cream">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">
              {lang === "kr" ? "다음 성공 사례는 당신입니다" : "You could be the next story"}
            </h2>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-berry px-8 py-4 text-base font-semibold text-berry-foreground transition-transform hover:-translate-y-0.5"
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
