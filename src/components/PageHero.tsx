import { Link } from "@tanstack/react-router";
import { Home, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

// MKYU-style page header: bold page title + breadcrumb over a solid rule, then the headline on white.
export function PageHero({
  eyebrow,
  title,
  sub,
  children,
  hideEyebrow = false,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  children?: ReactNode;
  hideEyebrow?: boolean;
}) {
  return (
    <section className="page-hero bg-white text-plum">
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <div className="flex items-end justify-between gap-4 border-b-2 border-plum pb-3">
          {hideEyebrow ? <span /> : <p className="text-lg font-extrabold tracking-tight text-plum md:text-xl">{eyebrow}</p>}
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs text-ink/60">
            <Link to="/" aria-label="Home" className="hover:text-berry">
              <Home className="h-3.5 w-3.5" />
            </Link>
            <ChevronRight className="h-3 w-3 text-ink/40" aria-hidden />
            <span className="font-semibold text-ink/75">{eyebrow}</span>
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-12 md:pb-12 md:pt-14">
        <Reveal className="text-center">
          <h1 className="mx-auto max-w-3xl font-serif text-3xl font-extrabold leading-[1.3] text-plum md:text-[2.75rem]">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">{sub}</p>
          {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
