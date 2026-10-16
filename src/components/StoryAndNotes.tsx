import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { PageHero } from "./PageHero";
import { AboutTabs } from "./ProgramTabs";
import { StoryBody, StoryClosing } from "./StoryBody";
import { useLang } from "@/lib/i18n";
import { story } from "@/lib/content";
import { notesMeta, publishedNotes } from "@/data/notes";

// /story — Esther's Story (under 소개)
export function StoryPage() {
  const { lang, font } = useLang();
  return (
    <div className={font}>
      <PageHero eyebrow={story.hero.eyebrow[lang]} title={story.hero.title[lang]} sub={story.hero.sub[lang]}>
        <AboutTabs current="/story" />
      </PageHero>
      <StoryBody />
      <StoryClosing />
    </div>
  );
}

// /notes — Success Notes (under 소개)
export function NotesPage() {
  const { lang, font } = useLang();
  const kr = lang === "kr";
  return (
    <div className={font}>
      <PageHero
        eyebrow={kr ? "성공노트" : "Success Notes"}
        title={kr ? "성공노트" : "Success Notes"}
        sub={kr ? "에스더가 현장에서 정리한 실전 비즈니스 칼럼입니다." : "Practical business columns drawn from Esther's field experience."}
      >
        <AboutTabs current="/notes" />
      </PageHero>
      <section className="bg-blush">
        <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {publishedNotes.map((note, i) => (
              <Reveal key={note.slug} delay={Math.min(i * 40, 200)}>
                <Link
                  to="/notes/$slug"
                  params={{ slug: note.slug }}
                  className="group flex h-full flex-col rounded-2xl border border-plum/10 bg-cream p-7 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="w-fit rounded-full bg-berry/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-berry">
                    {note.category[lang]}
                  </span>
                  <h2 className="mt-4 font-serif text-2xl font-semibold leading-snug text-plum">
                    {note.title[lang]}
                  </h2>
                  <p className="mt-3 line-clamp-2 text-base leading-relaxed text-ink/70">
                    {note.excerpt[lang]}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <span className="text-xs font-medium uppercase tracking-wide text-ink/50">
                      {note.readingMin} {notesMeta.minLabel[lang]}
                    </span>
                    <span className="inline-flex items-center gap-1 border-b-2 border-berry pb-0.5 text-sm font-semibold text-plum transition-colors group-hover:text-berry">
                      {notesMeta.readLabel[lang]}
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
