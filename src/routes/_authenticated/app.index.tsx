import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { useActions, useInvalidateApp, useMemory, weekStart } from "@/lib/app-data";
import { supabase } from "@/integrations/supabase/client";
import { workflowByKey } from "@/lib/workflows";
import { Card, PageTitle, btnPrimary } from "@/components/app/ui";

export const Route = createFileRoute("/_authenticated/app/")({ component: MyWeek });

function MyWeek() {
  const { lang, t } = useLang();
  const mem = useMemory();
  const actions = useActions();
  const invalidate = useInvalidateApp();
  const week = (actions.data ?? []).filter((a) => a.week_of === weekStart());
  const done = week.filter((a) => a.status === "done").length;
  const nextBest = week.find((a) => a.status !== "done");

  async function toggle(id: string, status: string) {
    const nextStatus = status === "done" ? "todo" : "done";
    await supabase.from("actions").update({ status: nextStatus, completed_at: nextStatus === "done" ? new Date().toISOString() : null }).eq("id", id);
    invalidate();
  }

  return (
    <div>
      <PageTitle eyebrow={t("나의 한 주", "My Week")} title={t("이번 주, 당신의 다음", "Your next, this week")} sub={mem.data?.memory?.my_goals || undefined} />
      {nextBest?.workflow_key && (
        <Card className="mb-6 bg-plum text-cream">
          <p className="text-xs uppercase tracking-[0.2em] text-berry-soft">{t("지금 이어서 하기", "Continue where you left off")}</p>
          <p className="mt-2 font-serif text-2xl">{nextBest.title}</p>
          <Link to="/app/coach/$workflow" params={{ workflow: nextBest.workflow_key }} search={{ action: nextBest.id }} className="mt-4 inline-flex rounded-full bg-cream px-6 py-3 text-sm font-semibold text-plum">
            {t("계속하기 →", "Continue →")}
          </Link>
        </Card>
      )}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-serif text-xl text-plum">{t("이번 주 Top 3", "This week's Top 3")}</h2>
        <span className="text-sm text-ink/60">{done}/{week.length || 3} {t("완료", "done")}</span>
      </div>
      {week.length === 0 ? (
        <Card className="text-center">
          <p className="text-ink/70">{t("이번 주 할 일을 함께 정해볼까요?", "Shall we set this week's moves?")}</p>
          <Link to="/app/next" className={`${btnPrimary} mt-4`}>{t("나의 다음 찾기", "Find my next")}</Link>
        </Card>
      ) : (
        <ul className="space-y-3">
          {week.map((a) => (
            <Card key={a.id}>
              <div className="flex items-center gap-4">
                <button aria-label="toggle" onClick={() => toggle(a.id, a.status)} className={`h-6 w-6 shrink-0 rounded-full border-2 ${a.status === "done" ? "border-berry bg-berry" : "border-plum/30"}`} />
                <div className="flex-1">
                  <p className={`font-medium text-plum ${a.status === "done" ? "line-through opacity-60" : ""}`}>{a.title}</p>
                  {a.workflow_key && <p className="text-xs text-ink/50">{workflowByKey(a.workflow_key)?.title[lang]}</p>}
                </div>
              </div>
            </Card>
          ))}
        </ul>
      )}
      <div className="mt-8 grid grid-cols-2 gap-3">
        <Link to="/app/studio" className="rounded-2xl border border-plum/10 bg-blush/50 p-5 font-serif text-lg text-plum">{t("액션 스튜디오 →", "Action Studio →")}</Link>
        <Link to="/app/vault" className="rounded-2xl border border-plum/10 bg-blush/50 p-5 font-serif text-lg text-plum">{t("비즈니스 금고 →", "Business Vault →")}</Link>
      </div>
    </div>
  );
}
