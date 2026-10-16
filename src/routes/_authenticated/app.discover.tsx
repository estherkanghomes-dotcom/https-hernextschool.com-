import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { onboarding, memoryFromAnswers } from "@/lib/workflows";
import { saveMemory, useInvalidateApp, useMemory } from "@/lib/app-data";
import { btnGhost, btnPrimary, field } from "@/components/app/ui";

export const Route = createFileRoute("/_authenticated/app/discover")({ component: Discover });

function Discover() {
  const { lang, t } = useLang();
  const navigate = useNavigate();
  const invalidate = useInvalidateApp();
  const mem = useMemory();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(mem.data?.answers ?? {});
  const [other, setOther] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const q = onboarding[i];

  async function choose(v: string) {
    const next = { ...answers, [q.key]: v };
    setAnswers(next);
    setOther("");
    if (i < onboarding.length - 1) return setI(i + 1);
    try {
      await saveMemory({ answers: next, memory: { ...memoryFromAnswers(next, lang), ...pickNonEmpty(mem.data?.memory, ["my_brand", "my_work", "my_progress", "my_next"]) }, onboarded: true, confirmed: false });
      await invalidate();
      navigate({ to: "/app/profile" });
    } catch (e) {
      setErr(String((e as Error).message));
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-berry">{t("나를 알아가기", "Discover Me")} · {i + 1}/{onboarding.length}</p>
      <div className="mt-3 h-1 rounded-full bg-blush"><div className="h-1 rounded-full bg-berry transition-all" style={{ width: `${((i + 1) / onboarding.length) * 100}%` }} /></div>
      <h1 className="mt-8 font-serif text-3xl leading-snug text-plum sm:text-4xl">{q.q[lang]}</h1>
      <div className="mt-8 grid gap-3">
        {q.options.map((o) => (
          <button key={o.en} onClick={() => choose(o[lang])} className={`rounded-2xl border px-5 py-4 text-left font-medium transition-colors ${answers[q.key] === o[lang] ? "border-berry bg-blush/60 text-plum" : "border-plum/15 bg-background/80 text-ink hover:border-berry"}`}>
            {o[lang]}
          </button>
        ))}
        <div className="flex gap-2">
          <input className={field} value={other} onChange={(e) => setOther(e.target.value)} placeholder={t("직접 입력", "Type your own")} maxLength={300} />
          <button disabled={!other.trim()} onClick={() => choose(other.trim())} className={btnPrimary}>{t("다음", "Next")}</button>
        </div>
      </div>
      {err && <p className="mt-4 text-sm text-destructive">{err}</p>}
      {i > 0 && <button onClick={() => setI(i - 1)} className={`${btnGhost} mt-8`}>← {t("이전", "Back")}</button>}
    </div>
  );
}

function pickNonEmpty(m: Record<string, string> | undefined, keys: string[]) {
  const out: Record<string, string> = {};
  for (const k of keys) if (m?.[k]) out[k] = m[k];
  return out;
}
