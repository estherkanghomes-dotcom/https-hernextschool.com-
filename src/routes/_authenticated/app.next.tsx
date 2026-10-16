import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { findMyNext } from "@/lib/hn.functions";
import { useActions, useInvalidateApp, weekStart } from "@/lib/app-data";
import { Card, PageTitle, btnGhost, btnPrimary } from "@/components/app/ui";

export const Route = createFileRoute("/_authenticated/app/next")({ component: FindNext });

function FindNext() {
  const { lang, t } = useLang();
  const run = useServerFn(findMyNext);
  const actions = useActions();
  const invalidate = useInvalidateApp();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const week = (actions.data ?? []).filter((a) => a.week_of === weekStart());

  async function generate() {
    setBusy(true); setErr(null);
    const r = await run({ data: { lang } });
    if (!r.ok) setErr(r.error);
    await invalidate();
    setBusy(false);
  }

  return (
    <div>
      <PageTitle eyebrow={t("다음 할 일 찾기", "Find My Next")} title={t("이번 주 가장 중요한 3가지", "Your top 3 moves this week")} sub={t("내 사업 기억을 바탕으로 우선순위를 정했어요.", "Prioritized from your business memory.")} />
      {busy && <Card><p className="animate-pulse text-plum">{t("당신의 사업을 살펴보고 있어요…", "Reviewing your business…")}</p></Card>}
      {!busy && week.length === 0 && (
        <Card className="text-center">
          <p className="text-ink/70">{t("아직 이번 주 추천이 없어요.", "No recommendations yet this week.")}</p>
          <button onClick={generate} className={`${btnPrimary} mt-4`}>{t("나의 다음 찾기", "Find my next")}</button>
        </Card>
      )}
      {!busy && week.length > 0 && (
        <ol className="space-y-4">
          {week.map((a) => (
            <Card key={a.id} className={a.priority === 1 ? "border-berry/50" : ""}>
              <div className="flex items-start gap-4">
                <span className="font-serif text-3xl text-berry">{a.priority}</span>
                <div className="flex-1">
                  <p className={`font-semibold text-plum ${a.status === "done" ? "line-through opacity-60" : ""}`}>{a.title}</p>
                  {a.why && <p className="mt-1 text-sm text-ink/70">{a.why}</p>}
                  {a.workflow_key && a.status !== "done" && (
                    <Link to="/app/coach/$workflow" params={{ workflow: a.workflow_key }} search={{ action: a.id }} className={`${a.priority === 1 ? btnPrimary : btnGhost} mt-4`}>
                      {a.priority === 1 ? t("1번 시작하기 →", "Start #1 →") : t("시작", "Start")}
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          ))}
          <button onClick={generate} className="text-sm text-berry underline">{t("다시 추천받기", "Refresh recommendations")}</button>
        </ol>
      )}
      {err && <p className="mt-4 rounded-xl bg-blush/60 p-3 text-sm text-plum">{err}</p>}
    </div>
  );
}
