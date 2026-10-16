import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { RisingArrow } from "@/components/RisingArrow";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLang } from "@/lib/i18n";
import { program } from "@/lib/content";
import { Prose } from "@/components/Prose";
import { CardNewsGallery } from "@/components/HomeProof";

// 4-week AI Class details (weeks, how we learn, levels, pricing & consult, who it's for, FAQ, card news, final CTA) — part of the single /programs page.
export function CohortSections() {
  const { lang } = useLang();
  return (
    <>
      {/* Week-by-week timeline */}
      <section id="cohort" className="scroll-mt-28 bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-plum md:text-4xl">
              {program.weeksHead[lang]}
            </h2>
          </Reveal>
          <ol className="mt-12 space-y-6 border-l-2 border-berry/25 pl-8">
            {program.weeks.map((w, i) => (
              <Reveal key={w.no} delay={i * 60}>
                <li className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[2.65rem] top-4 flex h-6 w-6 items-center justify-center rounded-full bg-berry text-berry-foreground ring-4 ring-cream"
                  >
                    <RisingArrow className="h-3.5 w-3.5" />
                  </span>
                  <Accordion type="single" collapsible defaultValue={i === 0 ? w.no : undefined}>
                    <AccordionItem
                      value={w.no}
                      className="rounded-2xl border border-plum/10 bg-white px-6 shadow-sm"
                    >
                      <AccordionTrigger className="py-5 hover:no-underline">
                        <span className="flex flex-col text-left">
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-berry">
                            {w.no}
                          </span>
                          <span className="mt-1 font-serif text-xl font-semibold text-plum">
                            {w.title[lang]}
                          </span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <div className="space-y-5">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-berry">
                              {program.weekLabels.session[lang]}
                            </p>
                            <p className="mt-1.5 leading-relaxed text-ink/75">
                              {w.session[lang]}
                            </p>
                          </div>
                          {w.homework && (
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-berry">
                                {program.weekLabels.homework[lang]}
                              </p>
                              <p className="mt-1.5 leading-relaxed text-ink/75">
                                {w.homework[lang]}
                              </p>
                            </div>
                          )}
                          {w.outcome && (
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-berry">
                                {program.weekLabels.outcome[lang]}
                              </p>
                              <p className="mt-1.5 font-semibold leading-relaxed text-plum">
                                {w.outcome[lang]}
                              </p>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-plum px-7 py-6 text-cream">
              <span className="text-sm text-cream/75">{program.finalOutcomeLabel[lang]}</span>
              <span className="font-serif text-2xl font-semibold text-berry-soft">{program.finalOutcome[lang]}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How we learn + levels */}
      <section id="how" className="scroll-mt-28 bg-plum text-cream">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-berry-soft">How we learn</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">{program.howHead[lang]}</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {program.how.map((h, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="h-full rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                  <p className="font-serif text-2xl font-semibold text-berry-soft">{h.big[lang]}</p>
                  <p className="mt-2 text-sm leading-relaxed text-cream/80">{h.desc[lang]}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 rounded-2xl bg-cream p-7 text-plum">
              <p className="text-sm font-semibold text-berry">{program.levelsHead[lang]}</p>
              <ol className="mt-4 grid gap-3 sm:grid-cols-3">
                {program.levels.map((l, i) => (
                  <li key={i} className={"rounded-xl px-5 py-4 " + (l.now ? "bg-plum text-cream" : "border border-plum/15 bg-white")}>
                    <span className={"text-xs font-bold " + (l.now ? "text-berry-soft" : "text-berry")}>
                      {l.tag[lang]}
                      {l.now && (lang === "kr" ? " · 이번 2기" : " · Cohort 2 now")}
                    </span>
                    <p className="mt-1 text-lg font-bold">{l.title[lang]}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-ink/60">{program.levelsNote[lang]}</p>
            </div>
          </Reveal>
        </div>
      </section>


      {/* Included + Pricing */}
      <section id="pricing" className="scroll-mt-28 bg-blush">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-24 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div className="rounded-3xl border border-plum/10 bg-white p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-semibold text-plum">
                {program.includedHead[lang]}
              </h2>
              <ul className="mt-6 space-y-4">
                {program.included.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-berry/15 text-berry">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="leading-relaxed text-ink/80">{item[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={80}>
              <div className="rounded-3xl border-2 border-berry bg-plum p-8 text-cream shadow-lg">
                <span className="inline-block rounded-full bg-berry px-3 py-1 text-xs font-semibold text-berry-foreground">
                  {program.pricing.tag[lang]}
                </span>
                <div className="mt-6 flex items-end gap-3">
                  <span className="font-serif text-5xl font-semibold text-cream">
                    {program.pricing.special}
                  </span>
                  <span className="pb-1.5 text-lg text-cream/50 line-through">
                    {program.pricing.regular}
                  </span>
                </div>
                <p className="mt-1 text-sm text-berry-soft">
                  {program.pricing.regularLabel[lang]} {program.pricing.regular} →{" "}
                  {program.pricing.specialLabel[lang]} {program.pricing.special} · {program.pricing.afterNote[lang]}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-cream/75">
                  {program.pricing.note[lang]}
                </p>
                <Link
                  to="/checkout"
                  search={{ item: "cohort" }}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-berry px-6 py-3.5 text-base font-semibold text-berry-foreground transition-transform hover:-translate-y-0.5"
                >
                  {lang === "kr" ? "수강 신청하기" : "Enroll now"}
                  <RisingArrow className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="rounded-3xl border border-plum/10 bg-white p-8 shadow-sm">
                <span className="inline-block rounded-full bg-blush px-3 py-1 text-xs font-semibold text-berry">
                  {program.consult.tag[lang]}
                </span>
                <h3 className="mt-4 font-serif text-xl font-semibold text-plum">
                  {program.consult.title[lang]}
                </h3>
                <p className="mt-1 text-lg font-semibold text-berry">
                  {program.consult.price[lang]}
                </p>
                <div className="mt-3">
                  <Prose text={program.consult.body[lang]} className="leading-relaxed text-ink/75" gap="space-y-2" />
                </div>
                <Link
                  to="/checkout"
                  search={{ item: "consult" }}
                  className="mt-5 inline-flex items-center gap-1.5 border-b-2 border-berry pb-0.5 text-sm font-semibold text-plum transition-colors hover:text-berry"
                >
                  {lang === "kr" ? "예약 · 결제하기" : "Book & pay"}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section id="for" className="scroll-mt-28 bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-plum md:text-4xl">
              {program.forHead[lang]}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {program.forWhom.map((f, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="h-full rounded-2xl border border-plum/10 bg-white p-7 shadow-sm">
                  <RisingArrow className="h-6 w-6 text-berry" />
                  <p className="mt-4 font-semibold leading-snug text-plum">{f[lang]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-28 bg-blush">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-plum md:text-4xl">
              {program.faqHead[lang]}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Accordion type="single" collapsible className="mt-8">
              {program.faq.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-plum/15"
                >
                  <AccordionTrigger className="text-left font-serif text-lg font-semibold text-plum hover:no-underline">
                    {item.q[lang]}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-ink/75">
                    {item.a[lang]}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <CardNewsGallery />

      {/* CTA */}
      <section id="apply" className="scroll-mt-28 bg-plum text-cream">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">
              {lang === "kr" ? "2기 등록, 지금 받습니다" : "Cohort 2 enrollment is open"}
            </h2>
            <p className="mt-4 text-cream/75">{program.pricing.note[lang]}</p>
            <Link
              to="/checkout"
              search={{ item: "cohort" }}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-berry px-8 py-4 text-base font-semibold text-berry-foreground transition-transform hover:-translate-y-0.5"
            >
              {lang === "kr" ? "수강 신청하기" : "Enroll now"}
              <RisingArrow className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
