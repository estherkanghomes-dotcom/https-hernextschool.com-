import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { useActions, useMemory, useVault } from "@/lib/app-data";
import { Card, PageTitle } from "@/components/app/ui";

export const Route = createFileRoute("/_authenticated/app/progress")({ component: Progress });

function Progress() {
  const { t } = useLang();
  const actions = useActions().data ?? [];
  const vault = useVault().data ?? [];
  const mem = useMemory().data;
  const done = actions.filter((a) => a.status === "done").length;
  const systems = vault.filter((v) => ["sops", "plans", "website"].includes(v.folder)).length;
  const content = vault.filter((v) => ["content", "brand", "marketing"].includes(v.folder)).length;
  const followups = vault.filter((v) => v.folder === "emails").length;
  // 90-day goal progress: 12 completed actions ≈ one per week for a quarter.
  const pct = Math.min(100, Math.round((done / 12) * 100));
  const stats = [
    [t("완성한 시스템", "Systems completed"), systems],
    [t("만든 콘텐츠", "Content created"), content],
    [t("후속 연락 준비", "Follow-ups ready"), followups],
    [t("완료한 할 일", "Actions completed"), done],
  ] as const;
  return (
    <div>
      <PageTitle eyebrow={t("진행", "Progress")} title={t("당신이 이룬 것", "What you've achieved")} />
      <Card className="mb-6">
        <p className="text-sm text-ink/60">{t("90일 목표", "90-day goal")}</p>
        <p className="mt-1 font-serif text-xl text-plum">{mem?.answers?.goal90 ?? "—"}</p>
        <div className="mt-4 h-3 rounded-full bg-blush"><div className="h-3 rounded-full bg-berry transition-all" style={{ width: `${pct}%` }} /></div>
        <p className="mt-2 text-sm text-ink/60">{pct}% · {t("주 1개씩 12주 완료가 목표예요", "Goal: one completed action per week for 12 weeks")}</p>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        {stats.map(([label, n]) => (
          <Card key={label}>
            <p className="font-serif text-4xl text-plum">{n}</p>
            <p className="mt-1 text-sm text-ink/60">{label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
