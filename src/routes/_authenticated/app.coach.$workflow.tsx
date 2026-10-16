import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { z } from "zod";
import { useLang } from "@/lib/i18n";
import { runCoach } from "@/lib/hn.functions";
import { workflowByKey, vaultFolders } from "@/lib/workflows";
import { currentUserId, saveMemory, useInvalidateApp, useMemory } from "@/lib/app-data";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageTitle, btnGhost, btnPrimary, field } from "@/components/app/ui";

export const Route = createFileRoute("/_authenticated/app/coach/$workflow")({
  validateSearch: (s) => z.object({ action: z.string().optional() }).parse(s),
  component: Coach,
});

type Result = { judgment: string; deliverable: string; next: string };

function Coach() {
  const { workflow } = Route.useParams();
  const { action } = Route.useSearch();
  const { lang, t } = useLang();
  const wf = workflowByKey(workflow);
  const run = useServerFn(runCoach);
  const mem = useMemory();
  const invalidate = useInvalidateApp();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [feedback, setFeedback] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  if (!wf) return <p>{t("찾을 수 없는 워크플로예요.", "Workflow not found.")}</p>;
  const stage = saved ? 4 : result ? 3 : 1;
  const steps = [t("질문", "Question"), t("판단", "Judgment"), t("결과물", "Deliverable"), t("승인", "Approval"), t("다음", "Next")];

  async function generate(revise = false) {
    setBusy(true); setErr(null);
    const r = await run({ data: { lang, workflowKey: wf!.key, answers, ...(revise && result ? { previous: result.deliverable, feedback } : {}) } });
    if (r.ok) { setResult({ judgment: r.judgment, deliverable: r.deliverable, next: r.next }); setFeedback(""); }
    else setErr(r.error);
    setBusy(false);
  }

  async function approve() {
    if (!result) return;
    setBusy(true);
    const uid = await currentUserId();
    const { error } = await supabase.from("vault_items").insert({ user_id: uid!, folder: wf!.folder, title: wf!.title[lang], content: result.deliverable, workflow_key: wf!.key });
    if (error) { setErr(error.message); setBusy(false); return; }
    if (action) await supabase.from("actions").update({ status: "done", completed_at: new Date().toISOString() }).eq("id", action);
    const m = mem.data?.memory ?? {};
    const stamp = new Date().toLocaleDateString();
    await saveMemory({ memory: { ...m, my_work: `${m.my_work ? m.my_work + "\n" : ""}• ${wf!.title.en} (${stamp})`, my_next: result.next } });
    await invalidate();
    setSaved(true); setBusy(false);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow={t("AI 코치", "AI Coach")} title={wf.title[lang]} sub={wf.deliverable[lang]} />
      <ol className="mb-8 flex flex-wrap gap-2 text-xs font-semibold">
        {steps.map((s, i) => (
          <li key={s} className={`rounded-full px-3 py-1 ${i <= stage ? "bg-berry text-berry-foreground" : "bg-blush/60 text-ink/50"}`}>{i + 1}. {s}</li>
        ))}
      </ol>

      {!result && (
        <Card>
          <div className="space-y-5">
            {wf.questions.map((q) => (
              <label key={q.key} className="block">
                <span className="font-medium text-plum">{q.q[lang]}</span>
                <textarea className={`${field} mt-2 min-h-20`} placeholder={q.placeholder[lang]} value={answers[q.key] ?? ""} maxLength={1500} onChange={(e) => setAnswers({ ...answers, [q.key]: e.target.value })} />
              </label>
            ))}
          </div>
          <button disabled={busy || wf.questions.some((q) => !answers[q.key]?.trim())} onClick={() => generate()} className={`${btnPrimary} mt-6`}>
            {busy ? t("만드는 중… (30초 정도)", "Creating… (about 30s)") : t("결과물 만들기 →", "Create it →")}
          </button>
        </Card>
      )}

      {result && (
        <div className="space-y-5">
          {result.judgment && (
            <Card className="bg-blush/50">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-berry">{t("코치의 판단", "Coach's judgment")}</p>
              <div className="prose-planner mt-2 text-ink/85"><ReactMarkdown>{result.judgment}</ReactMarkdown></div>
            </Card>
          )}
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-berry">{t("결과물", "Deliverable")}</p>
              <button onClick={() => navigator.clipboard.writeText(result.deliverable)} className="text-xs text-berry underline">{t("복사", "Copy")}</button>
            </div>
            <article className="prose-planner text-ink/85"><ReactMarkdown>{result.deliverable}</ReactMarkdown></article>
          </Card>
          {!saved ? (
            <Card>
              <div className="flex flex-wrap gap-3">
                <button disabled={busy} onClick={approve} className={btnPrimary}>{t("승인하고 금고에 저장", "Approve & save to Vault")}</button>
              </div>
              <div className="mt-5">
                <textarea className={`${field} min-h-16 text-sm`} placeholder={t("고치고 싶은 점을 알려주세요 (예: 더 짧게, 더 따뜻하게)", "What should change? (e.g. shorter, warmer)")} value={feedback} onChange={(e) => setFeedback(e.target.value)} maxLength={1500} />
                <button disabled={busy || !feedback.trim()} onClick={() => generate(true)} className={`${btnGhost} mt-3`}>{busy ? "…" : t("수정 요청", "Request changes")}</button>
              </div>
            </Card>
          ) : (
            <Card className="bg-plum text-cream">
              <p className="text-xs uppercase tracking-[0.2em] text-berry-soft">{t("저장 완료 · 다음 단계", "Saved · Next step")}</p>
              <p className="mt-2 font-serif text-xl">{result.next || t("다음 할 일을 찾아볼까요?", "Shall we find your next move?")}</p>
              <p className="mt-1 text-sm text-cream/70">{t("저장 위치", "Saved to")}: {vaultFolders.find((f) => f.key === wf.folder)?.label[lang]}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/app" className="rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-plum">{t("나의 한 주로", "Back to My Week")}</Link>
                <Link to="/app/vault" className="rounded-full border border-cream/40 px-5 py-2.5 text-sm font-semibold">{t("금고 보기", "Open Vault")}</Link>
              </div>
            </Card>
          )}
        </div>
      )}
      {err && <p className="mt-4 rounded-xl bg-blush/60 p-3 text-sm text-plum">{err}</p>}
    </div>
  );
}
