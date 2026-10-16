import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { RisingArrow } from "./RisingArrow";
import { useLang } from "@/lib/i18n";

type L = { kr: string; en: string };
const cases: { tag: L; title: L; steps: { tool: string; use: L }[]; result: L }[] = [
  {
    tag: { kr: "음식·F&B", en: "Food & Beverage" },
    title: { kr: "한식 도시락 배달 창업", en: "Korean lunch-box delivery" },
    steps: [
      { tool: "ChatGPT", use: { kr: "지역 경쟁사 분석·메뉴 가격 책정", en: "Local competitor & menu pricing analysis" } },
      { tool: "Canva AI", use: { kr: "메뉴판·인스타 피드 30개 디자인", en: "Menu board & 30 Instagram posts" } },
      { tool: "Claude", use: { kr: "식품 허가·Food Handler 체크리스트 정리", en: "Food permit & handler checklist" } },
      { tool: "Zapier", use: { kr: "주문 폼 → 주방 알림 자동화", en: "Order form → kitchen alert automation" } },
    ],
    result: { kr: "실습 결과물 예시: 메뉴 초안·브랜드 시안·주문 페이지", en: "Practice deliverables: menu draft, brand concept & order page" },
  },
  {
    tag: { kr: "컨설팅·코칭", en: "Consulting" },
    title: { kr: "이민 가정 교육 컨설팅", en: "Immigrant-family education consulting" },
    steps: [
      { tool: "ChatGPT", use: { kr: "타깃 고객 페르소나 3종 정의", en: "Define 3 client personas" } },
      { tool: "Gamma", use: { kr: "상담 소개 자료·제안서 자동 생성", en: "Auto-built pitch deck & proposal" } },
      { tool: "Notion AI", use: { kr: "상담 노트 요약·후속 메일 초안", en: "Session summaries & follow-up emails" } },
      { tool: "Calendly", use: { kr: "무료 상담 예약 퍼널 구축", en: "Free-consult booking funnel" } },
    ],
    result: { kr: "실습 결과물 예시: 상담 패키지 초안·예약 페이지", en: "Practice deliverables: consulting packages & booking page" },
  },
  {
    tag: { kr: "온라인 쇼핑", en: "E-commerce" },
    title: { kr: "K-뷰티 온라인 쇼핑몰", en: "K-beauty online store" },
    steps: [
      { tool: "ChatGPT", use: { kr: "상품 상세페이지 영어 카피 작성", en: "English product descriptions" } },
      { tool: "AI 이미지", use: { kr: "상품 연출 사진·배너 제작", en: "Product lifestyle shots & banners" } },
      { tool: "Shopify Magic", use: { kr: "스토어 세팅·SEO 문구 자동화", en: "Store setup & SEO copy" } },
      { tool: "Klaviyo AI", use: { kr: "재구매 이메일 시퀀스 설계", en: "Repeat-purchase email flows" } },
    ],
    result: { kr: "실습 결과물 예시: 상품 상세페이지·스토어 시안", en: "Practice deliverables: product page & store concept" },
  },
];

export function IndustryCases() {
  const { lang } = useLang();
  const kr = lang === "kr";
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-berry">
            {kr ? "업종별 AI 적용 사례" : "AI by industry"}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-plum md:text-4xl">
            {kr ? "내 업종에서는 AI를 이렇게 씁니다" : "How AI works in your industry"}
          </h2>
          <p className="mt-4 max-w-2xl text-ink/70">
            {kr
              ? "업종별 실습 예시와 직접 만들어 볼 결과물입니다. 1기 수강생의 검증된 성과를 뜻하지 않습니다."
              : "Industry practice examples and deliverables to create. These are not verified alumni outcomes."}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="flex h-full flex-col rounded-3xl border border-plum/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <span className="self-start rounded-full bg-berry/12 px-3 py-1 text-xs font-semibold text-berry">
                  {c.tag[lang]}
                </span>
                <h3 className="mt-4 font-serif text-xl font-semibold text-plum">{c.title[lang]}</h3>
                <ol className="mt-5 flex-1 space-y-3">
                  {c.steps.map((s, j) => (
                    <li key={j} className="flex gap-3 text-sm">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-plum text-[10px] font-semibold text-cream">
                        {j + 1}
                      </span>
                      <span className="text-ink/75">
                        <b className="text-plum">{s.tool}</b> — {s.use[lang]}
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 rounded-xl bg-blush px-4 py-3 text-sm font-medium text-plum">{c.result[lang]}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link
            to="/planner"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-berry px-7 py-3.5 font-semibold text-berry-foreground transition-transform hover:-translate-y-0.5"
          >
            {kr ? "내 업종 맞춤 AI 로드맵 받기" : "Get my industry AI roadmap"}
            <RisingArrow className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
