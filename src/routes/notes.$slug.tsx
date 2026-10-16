import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { RisingArrow } from "@/components/RisingArrow";
import { useLang } from "@/lib/i18n";
import { getNote, notesMeta } from "@/data/notes";
import { BrandPhoto } from "@/components/BrandPhoto";
import { Prose } from "@/components/Prose";

export const Route = createFileRoute("/notes/$slug")({
  loader: ({ params }) => {
    const note = getNote(params.slug);
    if (!note || note.draft) throw notFound();
    return { note };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "찾을 수 없는 노트 | HER NEXT" },
          { name: "robots", content: "noindex" },
          { name: "description", content: "HER NEXT 성공노트에서 다른 글을 읽어보세요." },
          { property: "og:title", content: "찾을 수 없는 노트 | HER NEXT" },
          { property: "og:description", content: "HER NEXT 성공노트에서 다른 글을 읽어보세요." },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ],
      };
    }
    const { note } = loaderData;
    return {
      meta: [
        { title: `${note.title.kr} | 에스더의 성공노트` },
        { name: "description", content: note.excerpt.kr },
        { property: "og:title", content: note.title.kr },
        { property: "og:description", content: note.excerpt.kr },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: NoteArticle,
  notFoundComponent: NoteNotFound,
  errorComponent: NoteError,
});

function NoteArticle() {
  const { note } = Route.useLoaderData();
  const { lang, font } = useLang();
  const pulls = new Set(note.pullQuotes ?? []);

  return (
    <div className={font}>
      <article className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <Reveal>
            <Link
              to="/notes"
              className="text-sm font-medium text-ink/50 transition-colors hover:text-berry"
            >
              ← {notesMeta.seriesTitle[lang]}
            </Link>
            <span className="mt-6 block w-fit rounded-full bg-berry/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-berry">
              {note.category[lang]}
            </span>
            <h1 className="mt-5 font-serif text-3xl font-semibold leading-[1.15] text-plum md:text-4xl">
              {note.title[lang]}
            </h1>
            <div className="mt-5 flex items-center gap-3 text-sm text-ink/55">
              <span className="font-semibold text-plum">
                {notesMeta.byline[lang]}
              </span>
              <span aria-hidden>·</span>
              <span>
                {note.readingMin} {notesMeta.minLabel[lang]}
              </span>
            </div>
          </Reveal>

          {note.imageSlot && (
            <Reveal delay={40}>
              {/* Real photo slot: src/assets/<imageSlot>. Renders at natural aspect on
                  mobile when the founder's real photo exists; branded placeholder otherwise. */}
              <figure className="mt-10 overflow-hidden rounded-2xl shadow-lg">
                <BrandPhoto
                  slot={note.imageSlot}
                  alt={note.title[lang]}
                  width={1280}
                  height={832}
                  className="aspect-[16/10] w-full"
                  imgClassName="h-auto w-full"
                />
              </figure>
            </Reveal>
          )}

          {lang === "en" && (
            <Reveal delay={40}>
              <div className="mt-10 rounded-2xl border border-plum/10 bg-blush/60 p-6">
                <p className="text-base leading-relaxed text-ink/80">
                  {note.enSummary}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-berry">
                  Full article in Korean
                </p>
              </div>
            </Reveal>
          )}

          <div
            className={
              note.variant === "letter"
                ? "mt-10 space-y-6 rounded-2xl border border-plum/10 bg-blush/30 p-8 font-serif text-[1.0625rem] italic leading-[2] text-ink/85 [max-width:65ch] md:p-10"
                : "mt-10 space-y-6 text-[1.0625rem] leading-[1.95] text-ink/85 [max-width:65ch]"
            }
          >
            {note.body.map((para: string, i: number) =>
              pulls.has(para) ? (
                <Reveal key={i}>
                  <blockquote className="my-8 border-l-4 border-berry pl-6 font-serif text-xl italic leading-snug text-plum md:text-2xl">
                    {para}
                  </blockquote>
                </Reveal>
              ) : (
                <Prose key={i} text={para} gap="space-y-6" />
              ),
            )}
          </div>

          {/* Strategy callout */}
          <Reveal delay={40}>
            <aside className="mt-14 rounded-r-2xl border-l-4 border-berry bg-blush/50 p-7">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-berry">
                {notesMeta.strategyHead[lang]}
              </h2>
              <p className="mt-3 font-serif text-lg leading-relaxed text-plum">
                {note.strategy[lang]}
              </p>
            </aside>
          </Reveal>
        </div>
      </article>

      {/* Series navigation */}
      {note.series && (
        <section className="bg-cream">
          <div className="mx-auto max-w-3xl px-6 pb-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {note.series.prev && (
                <Link
                  to="/notes/$slug"
                  params={{ slug: note.series.prev.slug }}
                  className="group flex flex-col rounded-2xl border border-plum/10 bg-blush/40 p-6 transition-transform hover:-translate-y-0.5 sm:col-start-1"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-berry">
                    ← {notesMeta.prevLabel[lang]}
                  </span>
                  <span className="mt-2 font-serif text-lg font-semibold leading-snug text-plum transition-colors group-hover:text-berry">
                    {note.series.prev.label[lang]}
                  </span>
                </Link>
              )}
              {note.series.next && (
                <Link
                  to="/notes/$slug"
                  params={{ slug: note.series.next.slug }}
                  className="group flex flex-col rounded-2xl border border-plum/10 bg-blush/40 p-6 text-right transition-transform hover:-translate-y-0.5 sm:col-start-2"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-berry">
                    {notesMeta.nextLabel[lang]} →
                  </span>
                  <span className="mt-2 font-serif text-lg font-semibold leading-snug text-plum transition-colors group-hover:text-berry">
                    {note.series.next.label[lang]}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA band */}
      <section className="bg-plum text-cream">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold leading-tight md:text-4xl">
              {notesMeta.ctaHead[lang]}
            </h2>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/program"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-berry px-8 py-4 text-base font-semibold text-berry-foreground transition-transform hover:-translate-y-0.5"
              >
                {notesMeta.ctaProgram[lang]}
                <RisingArrow className="h-4 w-4" />
              </Link>
              <Link
                to="/resources"
                hash="signup"
                className="inline-flex items-center justify-center rounded-full border border-cream/35 px-8 py-4 text-base font-semibold text-cream transition-colors hover:bg-cream/10"
              >
                {notesMeta.ctaNewsletter[lang]}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function NoteNotFound() {
  const { lang } = useLang();
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-serif text-3xl font-semibold text-plum">
          {lang === "kr" ? "찾을 수 없는 에피소드입니다" : "Episode not found"}
        </h1>
        <Link
          to="/notes"
          className="mt-6 inline-block border-b-2 border-berry pb-0.5 font-semibold text-plum transition-colors hover:text-berry"
        >
          {lang === "kr" ? "성공노트로 돌아가기" : "Back to Success Notes"}
        </Link>
      </div>
    </div>
  );
}

function NoteError({ reset }: { reset: () => void }) {
  const router = useRouter();
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-serif text-2xl font-semibold text-plum">
          문제가 발생했습니다 / Something went wrong
        </h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-berry px-6 py-3 text-sm font-semibold text-berry-foreground"
        >
          다시 시도 / Retry
        </button>
      </div>
    </div>
  );
}
