import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { areas, workflows } from "@/lib/workflows";
import { PageTitle } from "@/components/app/ui";

export const Route = createFileRoute("/_authenticated/app/studio")({ component: Studio });

function Studio() {
  const { lang, t } = useLang();
  return (
    <div>
      <PageTitle eyebrow={t("액션 스튜디오", "Action Studio")} title={t("오늘 무엇을 만들까요?", "What shall we create today?")} sub={t("영역을 고르면 AI 코치가 단계별로 함께 완성해요.", "Pick an area and your coach guides you step by step.")} />
      <div className="grid gap-4 sm:grid-cols-2">
        {areas.map((a) => (
          <div key={a.key} className="rounded-2xl border border-plum/10 bg-background/80 p-5">
            <p className="font-serif text-xl text-plum">{a.label[lang]}</p>
            <p className="text-sm text-ink/60">{a.desc[lang]}</p>
            <div className="mt-4 space-y-2">
              {workflows.filter((w) => w.area === a.key).map((w) => (
                <Link key={w.key} to="/app/coach/$workflow" params={{ workflow: w.key }} search={{}} className="block rounded-xl bg-blush/50 px-4 py-3 text-sm font-medium text-plum hover:bg-blush">
                  {w.title[lang]} <span className="text-berry">→</span>
                  <span className="block text-xs font-normal text-ink/60">{w.deliverable[lang]}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
