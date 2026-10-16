import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { Home, Sparkle, Briefcase, Archive, TrendingUp, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLang, type Lang } from "@/lib/i18n";
import { useMemory } from "@/lib/app-data";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({ meta: [{ title: "HER NEXT App" }, { name: "robots", content: "noindex" }] }),
  component: AppShell,
});

const tabs = [
  { to: "/app", icon: Home, kr: "홈", en: "Home", exact: true },
  { to: "/app/studio", icon: Sparkle, kr: "액션 스튜디오", en: "Studio" },
  { to: "/app/profile", icon: Briefcase, kr: "내 사업", en: "My Business" },
  { to: "/app/vault", icon: Archive, kr: "금고", en: "Vault" },
  { to: "/app/progress", icon: TrendingUp, kr: "진행", en: "Progress" },
] as const;

function AppShell() {
  const { lang, setLang } = useLang();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const mem = useMemory();

  useEffect(() => {
    if (mem.isSuccess && !mem.data?.onboarded && path !== "/app/discover") navigate({ to: "/app/discover" });
  }, [mem.isSuccess, mem.data, path, navigate]);

  return (
    <div className="min-h-screen bg-cream pb-24 text-ink lg:pb-0">
      <header className="sticky top-0 z-40 border-b border-plum/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <Link to="/" className="font-serif text-lg font-semibold text-plum">HER NEXT <span className="text-berry">→</span></Link>
          <nav className="hidden gap-5 text-sm font-medium lg:flex">
            {tabs.map((tb) => (
              <Link key={tb.to} to={tb.to} activeOptions={{ exact: "exact" in tb }} activeProps={{ className: "text-berry" }} className="text-ink/70 hover:text-berry">
                {lang === "kr" ? tb.kr : tb.en}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex overflow-hidden rounded-full border border-plum/20 text-xs font-semibold">
              {(["kr", "en"] as Lang[]).map((l) => (
                <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`px-2.5 py-1 uppercase ${lang === l ? "bg-berry text-berry-foreground" : "text-ink/60"}`}>{l}</button>
              ))}
            </div>
            <button aria-label="Sign out" onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/" }); }} className="p-2 text-plum/70 hover:text-berry">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8">
        <Outlet />
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-plum/10 bg-cream/95 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5">
          {tabs.map((tb) => (
            <Link key={tb.to} to={tb.to} activeOptions={{ exact: "exact" in tb }} activeProps={{ className: "text-berry" }} className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-ink/60">
              <tb.icon className="h-5 w-5" />
              {lang === "kr" ? tb.kr : tb.en}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
