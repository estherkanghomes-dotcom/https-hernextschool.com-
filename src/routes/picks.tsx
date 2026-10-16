import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { VideoCard } from "@/components/VideoCard";
import { useLang } from "@/lib/i18n";
import { picks } from "@/lib/content";
import { videos, videoCategories, type VideoCategory } from "@/data/videos";
import { FreeTabs } from "@/components/ProgramTabs";

export const Route = createFileRoute("/picks")({
  head: () => ({
    meta: [
      { title: "에스더의 픽 | HER NEXT — 무료 유튜브 학습 라이브러리" },
      {
        name: "description",
        content:
          "돈 공부 첫걸음부터 사이드허슬, AI, 미국 생활 머니, 마인드까지. 에스더가 직접 고른 무료 유튜브 학습 라이브러리.",
      },
      { property: "og:title", content: "에스더의 픽 | HER NEXT" },
      {
        property: "og:description",
        content: "에스더가 직접 고르고 한 줄 코멘트를 남긴 무료 학습 영상.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Picks,
});

function Picks() {
  const { lang, font } = useLang();
  const [active, setActive] = useState<VideoCategory | "all">("all");

  const filtered =
    active === "all" ? videos : videos.filter((v) => v.category === active);

  return (
    <div className={font}>
      <PageHero
        eyebrow={picks.hero.eyebrow[lang]}
        title={picks.hero.title[lang]}
        sub={picks.hero.sub[lang]}
      >
        <FreeTabs current="/picks" />
      </PageHero>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Reveal>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => setActive("all")}
                aria-pressed={active === "all"}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry/50 ${
                  active === "all"
                    ? "bg-plum text-cream"
                    : "border border-plum/20 text-ink/70 hover:border-berry hover:text-berry"
                }`}
              >
                {picks.allTab[lang]}
              </button>
              {videoCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(c.id)}
                  aria-pressed={active === c.id}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry/50 ${
                    active === c.id
                      ? "bg-plum text-cream"
                      : "border border-plum/20 text-ink/70 hover:border-berry hover:text-berry"
                  }`}
                >
                  <span aria-hidden className="mr-1.5">
                    {c.emoji}
                  </span>
                  {lang === "kr" ? c.label_kr : c.label_en}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((v, i) => (
              <Reveal key={v.id} delay={(i % 3) * 70}>
                <VideoCard video={v} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
