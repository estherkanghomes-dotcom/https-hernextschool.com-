import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { RisingArrow } from "@/components/RisingArrow";
import { PageHero } from "@/components/PageHero";
import { SignupForm } from "@/components/SignupForm";
import { useLang } from "@/lib/i18n";
import { resources } from "@/lib/content";
import { FreeTabs } from "@/components/ProgramTabs";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "무료 자료 | HER NEXT — 첫걸음은 무료입니다" },
      {
        name: "description",
        content:
          "여성 창업자를 위한 AI 시작 가이드, 미국 LLC 설립 체크리스트 등 무료 자료와 뉴스레터. 무료 특강과 AI 코호트 소식을 가장 먼저 받아보세요.",
      },
      { property: "og:title", content: "무료 자료 | HER NEXT" },
      { property: "og:description", content: "실전 창업·머니 팁을 매주 무료로." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Resources,
});

function Resources() {
  const { lang, font } = useLang();

  return (
    <div className={font}>
      <PageHero
        eyebrow={resources.hero.eyebrow[lang]}
        title={resources.hero.title[lang]}
        sub={resources.hero.sub[lang]}
      >
        <FreeTabs current="/resources" />
      </PageHero>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <h2 className="font-serif text-3xl font-semibold text-plum md:text-4xl">
                {resources.guidesHead[lang]}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-4">
              {resources.guides.map((g, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-plum/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-berry/40 hover:shadow-lg">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush text-berry">
                      <RisingArrow className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-plum">{g.title[lang]}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink/65">{g.desc[lang]}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={120}>
            <div id="signup">
              <SignupForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
