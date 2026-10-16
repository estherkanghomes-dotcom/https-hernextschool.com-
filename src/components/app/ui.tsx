import type { ReactNode } from "react";

export function PageTitle({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="mb-8">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.22em] text-berry">{eyebrow}</p>}
      <h1 className="mt-2 font-serif text-3xl leading-tight text-plum sm:text-4xl">{title}</h1>
      {sub && <p className="mt-3 text-ink/70">{sub}</p>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-plum/10 bg-background/80 p-5 shadow-sm ${className}`}>{children}</div>;
}

export const btnPrimary = "inline-flex items-center justify-center rounded-full bg-plum px-6 py-3 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5 disabled:opacity-60";
export const btnGhost = "inline-flex items-center justify-center rounded-full border border-plum/25 px-6 py-3 text-sm font-semibold text-plum disabled:opacity-60";
export const field = "w-full rounded-xl border border-plum/20 bg-background px-4 py-3 text-ink outline-none focus:border-berry";
