import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import { products, fmtUSD } from "@/lib/products";

// Home: MKYU-style product cards with price and a direct "enroll" path.
export function ProductCards() {
  const { lang } = useLang();
  const kr = lang === "kr";
  const list = [products.cohort, products.consult];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-berry">{kr ? "수강 신청" : "Enroll"}</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-plum md:text-4xl">{kr ? "지금 신청할 수 있는 프로그램" : "Programs open now"}</h2>
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-plum/10 bg-white shadow-sm transition-shadow hover:shadow-lg">
                {p.id === "cohort" && (
                  <span className="absolute left-0 top-5 rounded-r-full bg-berry px-4 py-1 text-xs font-bold text-white">
                    {kr ? "추천" : "Featured"}
                  </span>
                )}
                <div className={"px-7 pb-6 pt-14 " + (p.id === "cohort" ? "bg-plum text-white" : "bg-blush text-plum")}>
                  <p className={"text-xs font-bold " + (p.id === "cohort" ? "text-berry-soft" : "text-berry")}>{p.tag[lang]}</p>
                  <h3 className="mt-2 text-2xl font-extrabold">{p.name[lang]}</h3>
                  <p className={"mt-1 text-sm " + (p.id === "cohort" ? "text-white/80" : "text-ink/70")}>{p.meta[lang]}</p>
                </div>
                <div className="flex flex-1 flex-col px-7 py-6">
                  <p className="text-sm leading-relaxed text-ink/75">{p.desc[lang]}</p>
                  <div className="mt-5 flex items-baseline gap-2">
                    {p.regular && <span className="text-base text-ink/45 line-through">{fmtUSD(p.regular)}</span>}
                    <span className="text-3xl font-extrabold text-berry">{fmtUSD(p.price)}</span>
                    {p.regular && (
                      <span className="rounded bg-berry/10 px-2 py-0.5 text-xs font-bold text-berry">
                        {Math.round((1 - p.price / p.regular) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <div className="mt-auto flex gap-2 pt-6">
                    <Link
                      to="/checkout"
                      search={{ item: p.id }}
                      className="flex-1 rounded-md bg-berry px-5 py-3 text-center text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                    >
                      {kr ? "수강 신청하기" : "Enroll now"}
                    </Link>
                    <Link
                      to="/programs"
                      search={{ s: p.id === "cohort" ? "cohort" : "pricing" }}
                      className="rounded-md border border-plum/20 px-5 py-3 text-sm font-bold text-plum transition-colors hover:border-berry hover:text-berry"
                    >
                      {kr ? "자세히" : "Details"}
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
