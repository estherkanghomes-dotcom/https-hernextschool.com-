import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/start")({
  head: () => ({
    meta: [
      { title: "Start Her Next | 나의 다음을 시작하세요" },
      { name: "description", content: "AI를 몰라도 괜찮아요. HER NEXT가 지금 할 일을 정하고, 실제 결과물을 함께 만들고, 내 사업을 기억합니다." },
      { property: "og:title", content: "Start Her Next | Your AI business execution partner" },
      { property: "og:description", content: "Find your next move, create the actual work, and keep your business memory in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: StartPage,
});

function StartPage() {
  const { t } = useLang();
  const steps = [
    [t("나를 알아가기", "Discover me"), t("8가지 질문으로 내 사업을 정리해요", "8 quick questions map your business")],
    [t("다음 할 일 찾기", "Find my next"), t("지금 가장 중요한 3가지를 정해드려요", "Your top 3 moves, prioritized")],
    [t("함께 만들기", "Create the work"), t("AI 코치와 실제 결과물을 완성해요", "Finish real deliverables with your coach")],
    [t("기억하고 성장하기", "Remember & grow"), t("모든 결과물이 내 비즈니스 금고에 쌓여요", "Everything saves to your Business Vault")],
  ];
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-berry">HER NEXT 2.0</p>
      <h1 className="mt-4 font-serif text-4xl leading-tight text-plum sm:text-6xl">
        {t("What's Your Next?", "What's Your Next?")}
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink/75">
        {t(
          "AI를 몰라도 괜찮아요. 무엇을 먼저 해야 할지 정해드리고, 실제 결과물을 함께 만들고, 당신의 사업을 기억하는 실행 파트너입니다.",
          "No AI experience needed. Your execution partner decides what to do next, helps you create the actual work, and remembers your business.",
        )}
      </p>
      <ol className="mt-10 grid gap-4 sm:grid-cols-2">
        {steps.map(([h, d], i) => (
          <li key={h} className="rounded-2xl border border-plum/10 bg-background/70 p-5">
            <span className="font-serif text-2xl text-berry">0{i + 1}</span>
            <p className="mt-2 font-semibold text-plum">{h}</p>
            <p className="mt-1 text-sm text-ink/70">{d}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link to="/auth" search={{ mode: "signup" }} className="inline-flex justify-center rounded-full bg-plum px-8 py-4 font-semibold text-cream transition-transform hover:-translate-y-0.5">
          {t("무료로 시작하기 →", "Start free →")}
        </Link>
        <Link to="/auth" search={{ mode: "signin" }} className="inline-flex justify-center rounded-full border border-plum/25 px-8 py-4 font-semibold text-plum">
          {t("이미 계정이 있어요", "I have an account")}
        </Link>
      </div>
    </section>
  );
}
