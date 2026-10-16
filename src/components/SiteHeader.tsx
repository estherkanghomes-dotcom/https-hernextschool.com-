import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { SiteSearch } from "./SiteSearch";
import { navLinks, cta } from "@/lib/content";

function Wordmark() {
  return (
    <span className="font-serif text-2xl font-extrabold tracking-tight text-plum">
      HER NEXT
      <span className="text-berry" aria-hidden="true">
        →
      </span>
    </span>
  );
}

// MKYU-style two-tier header: logo + utility links on top, evenly spaced main menu below.
export function SiteHeader() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e5e5] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 pt-4 pb-3 sm:px-6">
        <Link to="/" onClick={() => setOpen(false)} className="shrink-0">
          <Wordmark />
        </Link>

        <div className="hidden flex-1 justify-center px-4 md:flex">
          <SiteSearch />
        </div>

        <div className="flex items-center gap-3 text-[13px] text-ink/75">
          <a href="/ai-diagnosis/" className="whitespace-nowrap rounded border border-berry px-2.5 py-1 font-bold text-berry transition-colors hover:bg-berry hover:text-white">
            {lang === "kr" ? "무료 AI 진단" : "Free AI check"}
          </a>
          <Link to="/checkout" search={{ item: "cohort" }} className="hidden whitespace-nowrap rounded bg-berry px-3 py-1 font-bold text-white hover:opacity-90 sm:inline">
            {lang === "kr" ? "수강 신청" : "Enroll"}
          </Link>
          <span className="hidden text-ink/30 sm:inline" aria-hidden="true">|</span>
          <Link to="/auth" className="hidden whitespace-nowrap font-medium hover:text-berry sm:inline">
            {lang === "kr" ? "로그인" : "Log in"}
          </Link>
          <span className="hidden text-ink/30 sm:inline" aria-hidden="true">|</span>
          <div className="flex items-center gap-1 font-semibold">
            {(["kr", "en"] as Lang[]).map((l, i) => (
              <span key={l} className="flex items-center gap-1">
                {i > 0 && <span className="text-ink/30" aria-hidden="true">·</span>}
                <button
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry/50 ${
                    lang === l ? "text-plum underline underline-offset-4" : "text-ink/50 hover:text-berry"
                  }`}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-plum lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <nav className="mx-auto hidden max-w-6xl items-center justify-between px-5 pb-3 sm:px-6 lg:flex">
        {navLinks.map((l) =>
          l.children ? (
            <div key={l.to} className="group relative">
              <Link
                to={l.to}
                className={
                  "relative inline-flex items-center gap-1 whitespace-nowrap py-1 text-[15px] font-bold transition-colors hover:text-berry focus-visible:outline-none " +
                  (l.children.some((c) => path === c.to || path.startsWith(c.to + "/"))
                    ? "!text-berry after:absolute after:inset-x-0 after:-bottom-3 after:h-0.5 after:bg-berry"
                    : "text-plum")
                }
              >
                {l.label[lang]}
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
              </Link>
              {/* hover / keyboard-focus dropdown */}
              <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="min-w-[180px] overflow-hidden rounded-lg border border-plum/10 bg-white py-2 shadow-xl">
                  {l.children.map((c) => c.static ? (
                    <a
                      key={c.to}
                      href={c.to}
                      className="block whitespace-nowrap px-5 py-2.5 text-sm font-bold text-berry transition-colors hover:bg-blush"
                    >
                      ✦ {c.label[lang]}
                    </a>
                  ) : (
                    <Link
                      key={c.to}
                      to={c.to}
                      className={
                        "block whitespace-nowrap px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-blush hover:text-berry " +
                        (path === c.to || path.startsWith(c.to + "/") ? "text-berry" : "text-plum")
                      }
                    >
                      {c.label[lang]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
          <Link
            key={l.to}
            to={l.to}
            activeOptions={{ exact: l.to === "/" }}
            activeProps={{ className: "!text-berry after:absolute after:inset-x-0 after:-bottom-3 after:h-0.5 after:bg-berry" }}
            className={(l.also?.some((a) => path === a || path.startsWith(a + "/")) ? "!text-berry after:absolute after:inset-x-0 after:-bottom-3 after:h-0.5 after:bg-berry " : "") + "relative whitespace-nowrap py-1 text-[15px] font-bold text-plum transition-colors hover:text-berry focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry/40"}
          >
            {l.label[lang]}
          </Link>
          ),
        )}
      </nav>

      {open && (
        <div className="border-t border-[#e5e5e5] bg-white lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-6">
            <div className="py-2 md:hidden"><SiteSearch /></div>
            {navLinks.flatMap((l) => (l.children ? [l, ...l.children.map((c) => ({ ...c, sub: true }))] : [l])).map((l, i) => "static" in l && l.static ? (
              <a
                key={l.to + i}
                href={l.to}
                onClick={() => setOpen(false)}
                className="border-b border-[#f0f0f0] py-3 pl-4 text-base font-bold text-berry"
              >
                ✦ {l.label[lang]}
              </a>
            ) : (
              <Link
                key={l.to + i}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-berry" }}
                className={"border-b border-[#f0f0f0] py-3 text-base transition-colors hover:text-berry " + ("sub" in l ? "pl-4 font-medium text-ink/75" : "font-bold text-plum")}
              >
                {l.label[lang]}
              </Link>
            ))}
            <Link to="/checkout" search={{ item: "cohort" }} onClick={() => setOpen(false)} className="py-3 text-base font-bold text-berry sm:hidden">
              {lang === "kr" ? "수강 신청" : "Enroll"}
            </Link>
            <Link to="/auth" onClick={() => setOpen(false)} className="py-3 text-base font-medium text-ink/75 sm:hidden">
              {lang === "kr" ? "로그인" : "Log in"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
