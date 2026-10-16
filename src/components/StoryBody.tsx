import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { RisingArrow } from "@/components/RisingArrow";
import { useLang } from "@/lib/i18n";
import { story } from "@/lib/content";
import { BrandPhoto } from "@/components/BrandPhoto";
import { Prose } from "@/components/Prose";
// Credibility-first imagery: only the founder's REAL photos render, otherwise a
// branded "사진 준비 중" placeholder (never a stock person). Drop-in real photos at:
//   src/assets/esther-story.jpg       — founder portrait (bright white-tone seminar)
//   src/assets/esther-certs-wall.jpg  — real office wall (20+ certs + Parsons diploma)
//   src/assets/esther-academy.jpg     — academy years collage

// Esther's story sections (shared by the merged "에스더 스토리 & 성공노트" page).
export function StoryBody() {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      {open !== null && <ChapterModal index={open} onChange={setOpen} onClose={() => setOpen(null)} />}

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-4 md:pb-20">

          {/* Chapter index: titles only — each opens its own page */}
          <ol className="divide-y divide-plum/10 border-y border-plum/10">
            {story.sections.map((s, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group flex w-full items-center gap-4 py-5 text-left transition-colors"
                >
                  <span className="w-8 shrink-0 font-serif text-xl font-semibold text-berry">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-serif text-lg font-semibold leading-snug text-plum group-hover:text-berry md:text-xl">
                    {s.title[lang]}
                  </span>
                  <span aria-hidden className="text-ink/40 transition-transform group-hover:translate-x-1 group-hover:text-berry">→</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Every job — the living proof */}
      <section className="bg-blush">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-plum md:text-4xl">
              {story.jobs.title[lang]}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-[1.9] text-ink/75">
              {story.jobs.sub[lang]}
            </p>
          </Reveal>

          {/* Compact chip list: number + job on one line, wrapping */}
          <Reveal>
            <ol className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-2.5">
              {story.jobs.list.map((job, i) => {
                const num = String(i + 1).padStart(2, "0");
                const isLast = i === story.jobs.list.length - 1;
                return (
                  <li
                    key={i}
                    className={
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[15px] font-semibold " +
                      (isLast
                        ? "border-transparent bg-berry text-berry-foreground shadow-md"
                        : "border-plum/10 bg-white text-plum")
                    }
                  >
                    <span className={"text-xs font-bold tabular-nums " + (isLast ? "text-berry-foreground/80" : "text-berry")}>
                      {num}
                    </span>
                    {job[lang]}
                    {isLast && (
                      <span className="rounded-full bg-berry-foreground/20 px-2 py-0.5 text-[11px] font-bold">
                        {story.jobs.nowLabel[lang]}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-10 text-center font-serif text-xl italic text-plum md:text-2xl">
              {story.jobs.closing[lang]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Certifications — the wall of survival */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-berry">
              {story.certs.eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-plum md:text-4xl">
              {story.certs.title[lang]}
            </h2>
            <div className="mx-auto mt-5 max-w-2xl">
              <Prose text={story.certs.intro[lang]} className="text-[17px] leading-[1.9] text-ink/80" gap="space-y-3" />
            </div>
          </Reveal>

          {/* Photo-led: real office-wall photo carries the section's visual weight.
              Renders at natural aspect (full width, auto height) so nothing is cropped on mobile. */}
          <Reveal delay={60}>
            <figure className="mt-12">
              <div className="overflow-hidden rounded-lg border-8 border-cream bg-cream p-1 shadow-xl ring-1 ring-plum/15">
                <BrandPhoto
                  slot="esther-certs-wall.jpg"
                  alt="에스더의 실제 사무실 — 20개가 넘는 자격증과 수료증"
                  width={1280}
                  height={896}
                  className="aspect-[16/11] w-full rounded-sm"
                  imgClassName="h-auto w-full rounded-sm"
                />
              </div>
              <figcaption className="mt-4 text-center font-serif text-sm italic text-berry">
                에스더의 실제 사무실 — 20개가 넘는 자격증과 수료증 / Esther's actual office — 20+ certifications and diplomas
              </figcaption>
            </figure>
          </Reveal>

          {/* Pull quote 1 */}
          <Reveal delay={40}>
            <blockquote className="mx-auto mt-16 max-w-3xl text-center font-serif text-2xl italic leading-snug text-plum md:text-3xl">
              “{story.certs.quotes.one[lang]}”
            </blockquote>
          </Reveal>

          {/* Secondary photo: academy years. Natural aspect on mobile (no cropping). */}
          <Reveal delay={40}>
            <figure className="mx-auto mt-16 max-w-3xl">
              <div className="overflow-hidden rounded-lg border-8 border-cream bg-cream p-1 shadow-xl ring-1 ring-plum/15">
                <BrandPhoto
                  slot="esther-academy.jpg"
                  alt="학원 원장 시절 — 학생들과 함께"
                  width={1280}
                  height={896}
                  className="aspect-[16/11] w-full rounded-sm"
                  imgClassName="h-auto w-full rounded-sm"
                />
              </div>
              <figcaption className="mt-4 text-center font-serif text-sm italic text-berry">
                학원 원장 시절 — 학생들과 함께 / Her years running an education academy
              </figcaption>
            </figure>
          </Reveal>

          {/* Certificate grid grouped by category — compact, since the real photos carry the weight */}
          <div className="mt-14 space-y-10">
            {story.certs.groups.map((group, gi) => (
              <Reveal key={gi} delay={40}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-berry">
                    {group.label[lang]}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {group.items.map((item, ii) => {
                      const isFirst = Boolean(
                        (item as { first?: boolean }).first,
                      );
                      return (
                        <div
                          key={ii}
                          className={
                            "flex min-h-[72px] flex-col justify-center rounded-md border p-3 text-center transition-transform hover:-translate-y-0.5 " +
                            (isFirst
                              ? "border-berry/40 bg-blush shadow-sm ring-1 ring-berry/20"
                              : "border-plum/15 bg-cream shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]")
                          }
                        >
                          {isFirst && (
                            <span className="mx-auto mb-1.5 w-fit rounded-full bg-berry/15 px-2 py-0.5 text-[10px] font-semibold text-berry">
                              {story.certs.firstBadge.kr} / {story.certs.firstBadge.en}
                            </span>
                          )}
                          <p
                            className={
                              "font-serif text-xs leading-snug " +
                              (isFirst ? "font-semibold text-berry" : "text-plum")
                            }
                          >
                            {item[lang]}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Pull quote 2 */}
          <Reveal delay={40}>
            <blockquote className="mx-auto mt-16 max-w-3xl text-center font-serif text-2xl italic leading-snug text-plum md:text-3xl">
              “{story.certs.quotes.two[lang]}”
            </blockquote>
          </Reveal>

          {/* Closing quote + line + CTA */}
          <Reveal delay={60}>
            <div className="mx-auto mt-16 max-w-3xl text-center">
              <p className="font-serif text-3xl font-semibold leading-snug text-plum md:text-4xl">
                “{story.certs.quotes.closing[lang]}”
              </p>
              <p className="mx-auto mt-8 max-w-2xl text-base leading-[1.9] text-ink/75">
                {story.certs.closingLine[lang]}
              </p>
              <Link
                to="/program"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-berry px-8 py-4 text-base font-semibold text-berry-foreground transition-transform hover:-translate-y-0.5"
              >
                {story.certs.cta[lang]}
                <RisingArrow className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}

// Closing call-to-action band of the story (rendered after the Success Notes on the merged page).
export function StoryClosing() {
  const { lang } = useLang();
  return (
    <>
      <section className="bg-plum text-cream">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">
              {lang === "kr" ? "당신의 다음은, 지금부터." : "Your next chapter starts now."}
            </h2>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/program"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-berry px-8 py-4 text-base font-semibold text-berry-foreground transition-transform hover:-translate-y-0.5"
              >
                {story.ctaProgram[lang]}
                <RisingArrow className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-cream/35 px-8 py-4 text-base font-semibold text-berry-foreground transition-colors hover:bg-cream/10"
              >
                {story.ctaSeminar[lang]}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

// Chapter reader shown as a centered popup over a translucent backdrop.
function ChapterModal({
  index,
  onChange,
  onClose,
}: {
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const { lang } = useLang();
  const kr = lang === "kr";
  const total = story.sections.length;
  const s = story.sections[index];
  const prev = index > 0 ? index - 1 : null;
  const next = index < total - 1 ? index + 1 : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && prev !== null) onChange(prev);
      if (e.key === "ArrowRight" && next !== null) onChange(next);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [prev, next, onChange, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={s.title[lang]}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-plum/45 p-4 backdrop-blur-[3px] animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-plum/10 px-7 pb-5 pt-6">
          <div>
            <p className="text-xs font-bold tabular-nums text-berry">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <h3 className="mt-1.5 font-serif text-xl font-bold leading-snug text-plum md:text-2xl">{s.title[lang]}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={kr ? "닫기" : "Close"}
            className="-mr-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-blush hover:text-plum"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-7 py-6">
          <Prose text={s.body[lang]} className="text-[16.5px] leading-[1.9] text-ink/85" gap="space-y-4" />
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-plum/10 bg-blush/60 px-7 py-4">
          {prev !== null ? (
            <button
              type="button"
              onClick={() => onChange(prev)}
              className="group flex min-w-0 items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5 shrink-0 text-berry" />
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold text-ink/55">{kr ? "이전 글" : "Previous"}</span>
                <span className="block truncate text-sm font-bold text-plum group-hover:text-berry">{story.sections[prev].title[lang]}</span>
              </span>
            </button>
          ) : (
            <span />
          )}
          {next !== null ? (
            <button
              type="button"
              onClick={() => onChange(next)}
              className="group flex min-w-0 items-center justify-end gap-2 rounded-lg px-2 py-2 text-right transition-colors hover:bg-white"
            >
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold text-ink/55">{kr ? "다음 글" : "Next"}</span>
                <span className="block truncate text-sm font-bold text-plum group-hover:text-berry">{story.sections[next].title[lang]}</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-berry" />
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}
