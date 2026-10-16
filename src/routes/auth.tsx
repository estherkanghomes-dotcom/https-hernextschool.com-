import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/auth")({
  validateSearch: (s) => z.object({ mode: z.enum(["signin", "signup"]).optional() }).parse(s),
  head: () => ({
    meta: [
      { title: "로그인 | HER NEXT" },
      { name: "description", content: "HER NEXT 앱에 로그인하거나 무료로 가입하세요." },
      { property: "og:title", content: "Sign in | HER NEXT" },
      { property: "og:description", content: "Sign in or create your free HER NEXT account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { t } = useLang();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">(search.mode ?? "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s) navigate({ to: "/app" });
    });
    supabase.auth.getSession().then(({ data: d }) => d.session && navigate({ to: "/app" }));
    return () => data.subscription.unsubscribe();
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/app` } });
      if (error) setMsg(error.message);
      else if (!data.session) setMsg(t("확인 메일을 보냈어요. 메일의 링크를 눌러 시작하세요.", "Check your email and click the link to begin."));
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg(t("이메일 또는 비밀번호를 확인해주세요.", "Please check your email or password."));
    }
    setBusy(false);
  }

  async function google() {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/auth` });
    if (r.error) setMsg(r.error.message);
  }

  const input = "w-full rounded-xl border border-plum/20 bg-background px-4 py-3 text-ink outline-none focus:border-berry";
  return (
    <section className="mx-auto max-w-md px-5 py-16">
      <h1 className="font-serif text-4xl text-plum">{mode === "signup" ? t("나의 다음을 시작해요", "Start Her Next") : t("다시 오셨네요", "Welcome back")}</h1>
      <button onClick={google} className="mt-8 w-full rounded-full border border-plum/25 bg-background py-3 font-semibold text-plum">
        {t("Google로 계속하기", "Continue with Google")}
      </button>
      <div className="my-6 text-center text-xs uppercase tracking-widest text-ink/50">{t("또는", "or")}</div>
      <form onSubmit={submit} className="space-y-3">
        <input className={input} type="email" required placeholder={t("이메일", "Email")} value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={input} type="password" required minLength={8} placeholder={t("비밀번호 (8자 이상)", "Password (8+ characters)")} value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={busy} className="w-full rounded-full bg-plum py-3 font-semibold text-cream disabled:opacity-60">
          {busy ? "…" : mode === "signup" ? t("가입하기", "Create account") : t("로그인", "Sign in")}
        </button>
      </form>
      {msg && <p className="mt-4 rounded-xl bg-blush/60 p-3 text-sm text-plum">{msg}</p>}
      <button onClick={() => setMode(mode === "signup" ? "signin" : "signup")} className="mt-6 text-sm text-berry underline">
        {mode === "signup" ? t("이미 계정이 있어요 · 로그인", "Have an account? Sign in") : t("처음이에요 · 가입하기", "New here? Create an account")}
      </button>
    </section>
  );
}
