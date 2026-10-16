import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Prose } from "@/components/Prose";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/lib/i18n";
import { story } from "@/lib/content";

// Esther's Story — one chapter per page, with previous / next navigation.
export const Route = createFileRoute("/chapter/$n")({
  loader: ({ params }) => {
    const i = Number(params.n) - 1;
    if (!Number.isInteger(i) || i < 0 || i >= story.sections.length) throw notFound();
    return { i };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${story.sections[loaderData?.i ?? 0]?.title.kr ?? "에스더 스토리"} | 에스더 스토리 | HER NEXT` }],
  }),
  component: Chapter,
});

function Chapter() {
  const { lang, font } = useLang();
  const { i } = Route.useLoaderData();
  const s = story.sections[i];
  const total = story.sections.length;
  const prev = i > 0 ? i : null; // 1-based index of previous chapter
  const next = i < total - 1 ? i + 2 : null;
  const kr = lang === "kr";

  return (
    <div className={font}>
      <PageHero
        eyebrow={kr ? "에스더 스토리" : "Esther's Story"}
        title={s.title[lang]}
        sub={`${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 pb-20">
          <Reveal>
            <Prose text={s.body[lang]} className="text-[17px] leading-[1.95] text-ink/85" gap="space-y-5" />
          </Reveal>

          <nav className="mt-16 grid grid-cols-[1fr_auto_1fr] items-stretch gap-3 border-t border-plum/10 pt-8">
            {prev ? (
              <Link
                to="/chapter/$n"
                params={{ n: String(prev) }}
                className="group flex items-center gap-3 rounded-xl border border-plum/10 bg-white p-4 text-left transition-colors hover:border-berry"
              >
                <ChevronLeft className="h-5 w-5 shrink-0 text-berry" />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-ink/55">{kr ? "이전 글" : "Previous"}</span>
                  <span className="block truncate text-sm font-bold text-plum group-hover:text-berry">
                    {story.sections[prev - 1].title[lang]}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            <Link
              to="/story"
              className="flex flex-col items-center justify-center gap-1 rounded-xl border border-plum/10 px-4 text-xs font-semibold text-ink/70 transition-colors hover:border-berry hover:text-berry"
            >
              <List className="h-4 w-4" />
              {kr ? "목록" : "All"}
            </Link>
            {next ? (
              <Link
                to="/chapter/$n"
                params={{ n: String(next) }}
                className="group flex items-center justify-end gap-3 rounded-xl border border-plum/10 bg-white p-4 text-right transition-colors hover:border-berry"
              >
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-ink/55">{kr ? "다음 글" : "Next"}</span>
                  <span className="block truncate text-sm font-bold text-plum group-hover:text-berry">
                    {story.sections[next - 1].title[lang]}
                  </span>
                </span>
                <ChevronRight className="h-5 w-5 shrink-0 text-berry" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </section>
    </div>
  );
}
