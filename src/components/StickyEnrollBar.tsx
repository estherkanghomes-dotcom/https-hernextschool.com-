import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { products, fmtUSD } from "@/lib/products";
import { cohort1 } from "@/lib/cohort";

// Bottom bar that follows the scroll: cohort status + price + enroll.
export function StickyEnrollBar() {
  const { lang } = useLang();
  const kr = lang === "kr";
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (path.startsWith("/checkout") || path.startsWith("/app") || path.startsWith("/auth")) return null;
  const p = products.cohort;
  return (
    <div
      className={
        "fixed inset-x-0 bottom-0 z-40 border-t border-plum/10 bg-white/95 backdrop-blur transition-transform duration-300 " +
        (show ? "translate-y-0" : "translate-y-full")
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <div className="min-w-0 text-sm">
          <span className="mr-2 rounded bg-berry px-2 py-0.5 text-xs font-bold text-white">{cohort1.label[lang]}</span>
          <span className="font-bold text-plum">{p.name[lang]}</span>
          <span className="hidden text-ink/60 sm:inline"> · {cohort1.start[lang]} · {kr ? `정원 ${cohort1.capacity}명` : `${cohort1.capacity} seats`}</span>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden text-lg font-extrabold text-berry sm:inline">{fmtUSD(p.price)}</span>
          <Link to="/checkout" search={{ item: "cohort" }} className="rounded-md bg-berry px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">
            {kr ? "수강 신청" : "Enroll"}
          </Link>
        </div>
      </div>
    </div>
  );
}
