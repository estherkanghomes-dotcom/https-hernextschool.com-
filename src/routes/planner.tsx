import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { PageHero } from "@/components/PageHero";
import { RisingArrow } from "@/components/RisingArrow";
import { useLang } from "@/lib/i18n";
import { generateBusinessPlan } from "@/lib/ai-planner.functions";
import { FreeTabs } from "@/components/ProgramTabs";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI 창업 플래너 | HER NEXT — 나만의 AI 사업 시작 로드맵" },
      {
        name: "description",
        content: "사업 아이디어, 경험, 예산을 입력하면 AI가 맞춤형 창업 단계와 AI 활용법을 제안합니다.",
      },
      { property: "og:title", content: "AI 창업 플래너 | HER NEXT" },
      { property: "og:description", content: "아이디어만 있으면 됩니다. AI가 첫 로드맵을 그려드려요." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Planner,
});

const industries = [
  { v: "food", kr: "음식·F&B", en: "Food & beverage" },
  { v: "consulting", kr: "컨설팅·코칭", en: "Consulting & coaching" },
  { v: "ecommerce", kr: "온라인 쇼핑몰", en: "E-commerce" },
  { v: "beauty", kr: "뷰티·웰니스", en: "Beauty & wellness" },
  { v: "education", kr: "교육·클래스", en: "Education & classes" },
  { v: "other", kr: "기타", en: "Other" },
];

const budgets = [
  { kr: "$1,000 미만", en: "Under $1,000" },
  { kr: "$1,000 – $5,000", en: "$1,000 – $5,000" },
  { kr: "$5,000 – $20,000", en: "$5,000 – $20,000" },
  { kr: "$20,000 이상", en: "$20,000+" },
];

function Planner() {
  const { lang, font } = useLang();
  const kr = lang === "kr";
  const run = useServerFn(generateBusinessPlan);
  const [industry, setIndustry] = useState("food");
  const [idea, setIdea] = useState("");
  const [experience, setExperience] = useState("");
  const [budget, setBudget] = useState(budgets[0].en);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (idea.trim().length < 5) {
      setError(kr ? "사업 아이디어를 조금 더 적어주세요." : "Please describe your idea a bit more.");
      return;
    }
    setError("");
    setResult("");
    setLoading(true);
    try {
      const ind = industries.find((i) => i.v === industry)?.en ?? industry;
      const res = await run({ data: { idea, experience, budget, industry: ind, lang } });
      if (res.ok) setResult(res.text);
      else setError(res.error);
    } catch {
      setError(kr ? "잠시 문제가 생겼어요. 다시 시도해주세요." : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const field =
    "mt-1.5 w-full rounded-lg border border-plum/15 bg-cream px-4 py-3 text-ink outline-none focus-visible:border-berry focus-visible:ring-2 focus-visible:ring-berry/40";

  return (
    <div className={font}>
      <PageHero
        eyebrow={kr ? "AI 창업 플래너" : "AI Startup Planner"}
        title={kr ? "AI 사업 계획 플래너" : "AI Business Plan Planner"}
        sub={
          kr
            ? "사업 아이디어, 경력, 예산을 입력하면 맞춤형 실행 로드맵 초안을 생성합니다."
            : "Enter your idea, experience and budget to generate a tailored roadmap draft."
        }
      >
        <FreeTabs current="/planner" />
      </PageHero>
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 lg:grid-cols-[1fr_1.3fr]">
          <form onSubmit={onSubmit} className="h-fit rounded-3xl bg-white p-8 shadow-xl shadow-plum/5">
            <label className="text-sm font-medium text-plum">{kr ? "업종" : "Industry"}</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {industries.map((i) => (
                <button
                  type="button"
                  key={i.v}
                  onClick={() => setIndustry(i.v)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                    industry === i.v ? "border-berry bg-berry text-berry-foreground" : "border-plum/15 text-plum hover:border-berry/50"
                  }`}
                >
                  {i[lang]}
                </button>
              ))}
            </div>

            <label htmlFor="p-idea" className="mt-6 block text-sm font-medium text-plum">
              {kr ? "사업 아이디어 *" : "Business idea *"}
            </label>
            <textarea
              id="p-idea"
              rows={4}
              maxLength={1500}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder={kr ? "예: LA에서 건강한 한식 도시락을 온라인으로 주문받아 배달하고 싶어요." : "e.g. Healthy Korean lunch boxes delivered in LA, ordered online."}
              className={field}
            />

            <label htmlFor="p-exp" className="mt-5 block text-sm font-medium text-plum">
              {kr ? "경험·배경" : "Experience & background"}
            </label>
            <textarea
              id="p-exp"
              rows={3}
              maxLength={1000}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder={kr ? "예: 한국에서 10년 요리, 미국 거주 5년, AI는 ChatGPT만 조금 써봤어요." : "e.g. 10 years cooking in Korea, 5 years in the US, a little ChatGPT."}
              className={field}
            />

            <label htmlFor="p-budget" className="mt-5 block text-sm font-medium text-plum">
              {kr ? "시작 예산" : "Starting budget"}
            </label>
            <select id="p-budget" value={budget} onChange={(e) => setBudget(e.target.value)} className={field}>
              {budgets.map((b) => (
                <option key={b.en} value={b.en}>
                  {b[lang]}
                </option>
              ))}
            </select>

            {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-berry px-6 py-3.5 font-semibold text-berry-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? (kr ? "AI가 로드맵을 만드는 중…" : "Building your roadmap…") : kr ? "맞춤 로드맵 받기" : "Get my roadmap"}
              <RisingArrow className="h-4 w-4" />
            </button>
            <p className="mt-3 text-center text-xs text-ink/50">
              {kr ? "AI 제안은 참고용이며, 법률·세무는 전문가 확인을 권장합니다." : "AI suggestions are for guidance; confirm legal/tax matters with a professional."}
            </p>
          </form>

          <div className="rounded-3xl border border-plum/10 bg-white p-8 shadow-sm">
            {loading && (
              <div className="space-y-3" aria-live="polite">
                <p className="text-sm text-berry">{kr ? "에스더의 AI 코치가 분석하고 있어요…" : "Your AI coach is thinking…"}</p>
                {[80, 95, 70, 90, 60].map((w, i) => (
                  <div key={i} className="h-3 animate-pulse rounded bg-blush" style={{ width: `${w}%` }} />
                ))}
              </div>
            )}
            {!loading && result && (
              <article className="prose-planner text-ink/85">
                <ReactMarkdown>{result}</ReactMarkdown>
              </article>
            )}
            {!loading && !result && (
              <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
                <RisingArrow className="h-10 w-10 text-berry" />
                <p className="mt-4 font-serif text-xl text-plum">
                  {kr ? "여기에 당신만의 AI 창업 로드맵이 나타나요" : "Your AI startup roadmap appears here"}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
