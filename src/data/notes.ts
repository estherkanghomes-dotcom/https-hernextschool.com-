import type { L } from "@/lib/content";
// Article header images are credibility-first: each note names a real-photo slot in
// src/assets. When the founder drops her REAL photo at that path it renders; until
// then a branded "사진 준비 중" placeholder shows (never a stock person). See BrandPhoto.

/*
 * ─── How to add a new episode ──────────────────────────────────────────────
 * Copy one block below and fill it in. Korean is primary; keep `enSummary`
 * to a single paragraph (we do NOT machine-translate the full body).
 *
 *   {
 *     slug: "unique-url-slug",              // becomes /notes/unique-url-slug
 *     category: { kr: "사업 전략", en: "Business Strategy" },
 *     title: { kr: "한글 제목", en: "English title" },
 *     excerpt: { kr: "카드에 보일 2줄 요약", en: "2-line card excerpt" },
 *     readingMin: 5,                        // estimated reading time (minutes)
 *     enSummary: "One-paragraph English summary shown when EN is selected.",
 *     body: [                               // each string = one paragraph
 *       "첫 번째 문단…",
 *       "두 번째 문단…",
 *     ],
 *     pullQuotes: ["강조하고 싶은 핵심 문장"], // optional; matched against body
 *     strategy: {
 *       kr: "이 이야기의 전략 요약 (2~3문장).",
 *       en: "The business lesson in 2-3 sentences.",
 *     },
 *     // draft: true,                       // set while unfinished — hidden on index
 *   },
 * ───────────────────────────────────────────────────────────────────────────
 */

export type Note = {
  slug: string;
  category: L;
  title: L;
  excerpt: L;
  readingMin: number;
  enSummary: string;
  body: string[];
  pullQuotes?: string[];
  strategy: L;
  /** Filename in src/assets for the founder's real header photo, e.g. "note-333-rule.jpg". */
  imageSlot?: string;
  variant?: "letter";
  series?: {
    prev?: { slug: string; label: L };
    next?: { slug: string; label: L };
  };
  draft?: boolean;
};

export const notesMeta = {
  seriesTitle: { kr: "에스더의 성공노트", en: "Esther's Success Notes" },
  seriesSubtitle: {
    kr: "여자라면 사업해라 — 에스더의 실전 에피소드",
    en: "Success Notes — Real episodes from Esther's 20-year journey",
  },
  byline: { kr: "에스더", en: "Esther" },
  readLabel: { kr: "읽기", en: "Read" },
  minLabel: { kr: "분", en: "min read" },
  krNotice: {
    kr: "",
    en: "Full article in Korean",
  },
  strategyHead: {
    kr: "이 이야기의 전략",
    en: "The strategy in this story",
  },
  ctaHead: {
    kr: "이런 전략을 6주 안에 배우고 싶다면",
    en: "Want to learn strategies like this in 6 weeks?",
  },
  ctaProgram: { kr: "프로그램 보기", en: "See the program" },
  ctaNewsletter: { kr: "뉴스레터 구독", en: "Join the newsletter" },
  comingSoon: { kr: "준비 중인 에피소드", en: "Coming soon" },
  prevLabel: { kr: "이전 편", en: "Previous" },
  nextLabel: { kr: "다음 편", en: "Next" },
};

export const notes: Note[] = [
  {
    slug: "comeback-at-29",
    category: { kr: "재기 스토리", en: "Comeback Story" },
    title: {
      kr: "29살 세 아이 엄마가, 한 달 만에 월 1000만원을 벌다",
      en: "A 29-year-old mother of three, earning ₩10M a month in one month",
    },
    excerpt: {
      kr: "무역회사가 하루아침에 무너지고 10억의 빚. 출산 3일 만에 전봇대에 전단지를 붙이며 시작한 재기 이야기. (2부작 1편)",
      en: "A trade company collapsed overnight, $700K in debt. Three days after giving birth, she began again with a flyer on a pole. (Part 1 of 2)",
    },
    readingMin: 4,
    enSummary:
      "At 29, Esther's thriving trade company collapsed overnight in the subprime crisis. With three children — ages 3, 1, and one on the way — she and her husband returned to Korea carrying $700,000 in debt. Three days after giving birth, she was taping yellow tutoring flyers to telephone poles. There was no room even for postpartum depression; responsibility put her in battle mode. Within one month, a single shift in thinking built a tutoring business earning ₩10M a month. Part 1 of 2 — the strategy is revealed in \"한 달 만에 월 1000만원 벌다: 전략의 비밀.\"",
    imageSlot: "note-comeback-at-29.jpg",
    body: [
      "29살, 세 아이의 엄마였던 나는 미국에서 잘 나가던 무역회사가 순식간에 문을 닫는 것을 지켜봐야 했다. 서브프라임 사태와 환율 급등에 무역 사업이 대비하지 못한 것이 원인이었다. 당시 미국에서 세 아이의 베이비시터 비용은 월 5천 달러, 한국 돈으로 약 600만원에 달했다.",
      "이 상황에서 나와 남편은 큰 결정을 내렸다. 모든 것을 정리하고, 어린 아이들을 데리고 잠시 한국에서 키우기로 한 것이다. 그때 아이들은 3살, 1살이었고 나는 만삭이었다. 미국에서의 사업을 급히 정리한 후, 우리는 70만 달러 — 약 10억의 빚을 지고 한국으로 역이민을 했다.",
      "한국에 도착하자마자, 만삭이었던 나는 아이를 출산했다. 사업이 무너지는 동안 산부인과조차 가지 못해, 아이의 정확한 개월 수도 몰랐다. 한국에 도착해서야 내가 막달이라는 것을 알았다.",
      "아이를 낳은 지 3일 만에, 나는 노란색 전단지를 만들어 동네 전봇대에 영어 과외 광고를 붙였다. 나에게는 세 아이를 먹이고 입힐 책임이 있었다. 산후우울증을 느낄 여유조차 없었다. 세 아이를 돌보는 책임감이 나를 전투 모드로 몰아넣었다.",
      "그리고 나만의 전략으로, 한 달 만에 과외로 월 1000만원을 벌었다. 생각의 전환만으로도 새로운 사업 구조를 만들 수 있었다. 나는 나에게 주어진 하루의 시간 안에서 천만원을 벌기 위한 전략을 구상했다. 그 계획은 완벽하게 맞아떨어졌다.",
      "생각만 바꿨을 뿐인데, 수입 구조가 바뀌었다.",
      "— 에스더의 '여자라면 사업해라' 중에서",
    ],
    pullQuotes: [
      "아이를 낳은 지 3일 만에, 나는 노란색 전단지를 만들어 동네 전봇대에 영어 과외 광고를 붙였다. 나에게는 세 아이를 먹이고 입힐 책임이 있었다. 산후우울증을 느낄 여유조차 없었다. 세 아이를 돌보는 책임감이 나를 전투 모드로 몰아넣었다.",
    ],
    strategy: {
      kr: "바닥에서는 속도가 전략입니다 — 완벽한 준비가 아니라, 출산 3일 뒤의 전단지 한 장이 재기의 시작이었습니다. 절박할수록 '지금 당장 할 수 있는 가장 작은 행동'부터 하세요.",
      en: "At rock bottom, speed IS the strategy — the comeback began not with a perfect plan, but with one yellow flyer, three days after giving birth. The more desperate the moment, the more it calls for the smallest action you can take right now.",
    },
    series: {
      next: {
        slug: "value-based-pricing",
        label: {
          kr: "한 달 만에 월 1000만원 벌다: 전략의 비밀",
          en: "How I earned ₩10M a month within weeks",
        },
      },
    },
  },
  {
    slug: "value-based-pricing",
    category: { kr: "사업 전략", en: "Business Strategy" },
    title: { kr: "한 달 만에 월 1000만원 벌다: 전략의 비밀", en: "How I earned ₩10M a month within weeks" },
    excerpt: {
      kr: "50명을 100시간 가르치는 대신, 나는 '팀당' 가격을 매겼다. 같은 20시간으로 5배의 수입을 만든 이야기.",
      en: "Instead of teaching 50 students for 100 hours, I priced per team — the same 20 hours, five times the income.",
    },
    readingMin: 5,
    enSummary:
      "At 29, back in Korea after a failed business in America and nursing her third child, Esther needed to earn ₩10M a month. Instead of teaching 50 students for 100 hours a week, she priced tutoring per TEAM — the same fee whether one student or ten came. Within 3 months she passed ₩10M/month. The lesson: value-based pricing — price the value you deliver, not the hours you work.",
    imageSlot: "note-value-based-pricing.jpg",
    body: [
      "29살에 세 아이의 엄마가 된 나는 미국에서의 사업 실패 후 한국으로 돌아왔다. 베이비시터 비용과 미국의 빚을 갚기 위해, 남편의 수입 외에 나도 최소 천만원을 벌어야 했다. 우유값도 아껴야 하기에 나는 신생아에게 모유수유를 하는 것 외에 다른 선택의 여지가 없었다. 나의 하루는 매우 알뜰하게 사용될 수밖에 없었다.",
      "영어 과외의 평균 수업 비용은 주 2회, 월 8회에 20만원이었다. 월 천만원을 벌기 위해서는 50명의 학생을 가르쳐야 했다. 그러나 50명의 학생을 주 2회 가르치려면 주 100시간의 수업이 필요했다. 모유수유를 하면서 주 100시간 수업은 불가능했다.",
      "그래서 나는 다른 방법을 찾았다. 나의 해결책은 간단했다. 일주일에 두 번 수업, 각 팀당 100만원으로 설정했다. 이 방법으로 일주일에 20시간 수업을 하면 월 1000만원을 벌 수 있는 구조가 만들어졌다. 나는 학생들을 개별적으로 모으지 않고, 몇몇 엄마들과 상담했다. 그리고 엄마들이 팀을 짜와 수업을 시작했다. 팀당 가격을 고정시켜, 한 명이든 열 명이든 100만원을 받았다.",
      "이 접근은 내 수입 구조를 극적으로 변화시켰다. 한국에 도착한 지 3개월 만에 월 천만원 이상을 벌기 시작했다. 나의 시간 대비 최대 수익을 내는 것이 나의 시간의 가치를 높이는 비결이었다.",
      "이 경험은 '가치 기반 가격 책정' 전략의 실제 사례다. 서비스나 제품의 가치를 기준으로 가격을 설정하는 것이다. 내 영어 과외 서비스는 수강생 수에 관계없이 동일한 가치를 제공했기에, 모든 팀에 동일한 가격을 적용했다. 이 전략은 고객에게 명확한 가치를 전달하며, 서비스 제공자에게 효율적인 수입 구조를 제공한다.",
      "가치 기반 가격 책정은 비즈니스 수익을 높이고 고객 만족도를 향상시키는 효과적인 방법이다. 나의 경험은 어려운 상황 속에서도 창의적인 해결책을 찾을 수 있다는 것을 보여준다. 고객이 받는 가치를 중심으로 사업을 구성하면, 결과적으로 더 큰 성공을 이룰 수 있다.",
      "우리는 각자의 방식으로 가치를 창출하고, 그 가치를 통해 성공할 수 있다.",
    ],
    pullQuotes: [
      "팀당 가격을 고정시켜, 한 명이든 열 명이든 100만원을 받았다.",
      "나의 시간 대비 최대 수익을 내는 것이 나의 시간의 가치를 높이는 비결이었다.",
    ],
    strategy: {
      kr: "가치 기반 가격 책정 — 내 시간이 아니라, 고객이 받는 가치에 가격을 매기세요. 같은 20시간으로 5배의 수입을 만든 비결입니다.",
      en: "Value-based pricing — price the value your customer receives, not the hours you work. The same 20 hours, five times the income.",
    },
    series: {
      prev: {
        slug: "comeback-at-29",
        label: {
          kr: "29살 세 아이 엄마가, 한 달 만에 월 1000만원을 벌다",
          en: "A 29-year-old mother of three, earning ₩10M a month",
        },
      },
    },
  },
  {
    slug: "why-i-left-fashion",
    category: { kr: "커리어 전환", en: "Career Pivot" },
    title: {
      kr: "25살 연봉 1억 패션 디자이너가, 20년 동안 사업하는 이유",
      en: "Why a $95K fashion designer at 25 chose 20 years of business",
    },
    excerpt: {
      kr: "맨해튼에서 잘나가던 디자이너가 높은 연봉을 버린 이유. 진짜 원했던 건 돈이 아니라 '내 시간'이었다.",
      en: "A rising Manhattan designer walked away from her salary — because what she really wanted was her own time.",
    },
    readingMin: 4,
    enSummary:
      "At 25, Esther was a rising fashion designer in Manhattan earning $95K a year — and still felt something was missing. Trained at Parsons, she discovered she loved the bigger picture of business more than design itself. The real turning point came with her first child: she wanted the freedom to control her own time. She walked away from the salary, and over 20 years built businesses in trade, education, financial planning, and real estate. The lesson: a high salary buys comfort, but owning your business buys your time.",
    imageSlot: "note-why-i-left-fashion.jpg",
    body: [
      "25살, 그때 나는 패션 디자인의 세계에서 빠르게 성장하고 있었다. 3년 차 디자이너로 연봉 9만 5천 불이라는 큰 금액을 벌고 있었지만, 내 마음 한켠에는 무언가 빠져 있는 듯했다.",
      "맨해튼 파슨스에서 패션 디자인을 공부하며, 나는 항상 무언가를 창조하는 것에 열정을 쏟았다. 그러나 실제 업계에서 일하면서, 나는 창의적인 디자인 그 자체보다 옷을 좋은 가격에 만들어 오고, 마케팅하고, 사업을 키워가는 회사의 큰 그림에 더 매력을 느꼈다. 나는 내가 무엇을 잘하고, 어떤 일을 할 때 가장 큰 기쁨을 느끼는지 깨닫기 시작했다.",
      "그러나 가장 중요한 전환점은 첫 아이를 낳았을 때였다. 아이가 아플 때 내 시간을 스스로 조절할 수 있는 자유를 원했다. 열정을 쏟아 일하는 시간을 내가 정하고 싶었고, 가족을 위해 내 시간을 조절하며 삶을 움직이고 싶었다. 그 순간, 나는 결심했다. 높은 연봉을 버리고 나만의 사업을 시작하기로. 그리고 지금의 연봉보다 훨씬 더 많은 돈을 벌 수 있으리라 확신했다.",
      "사업을 시작한 것은 단순한 경제적 선택이 아니었다. 나만의 길을 찾고, 나만의 방식으로 삶을 살아가고자 하는 열망이었다. 그렇게 패션 업계를 뒤로한 채 나는 새로운 도전을 시작했다. 무역회사를 운영했고, 교육 사업을 15년간 했으며, 현재는 재무설계사와 미국 부동산 리얼터로 일한다. 물론 사업이 항상 쉬운 길은 아니었다. 힘들고 어려운 순간도 많았지만, 그 모든 경험이 오늘날의 나를 만들었다. 그리고 20년간의 사업을 통해 배운 경험과 스킬은 지금 나의 커리어에 크게 한몫하고 있다.",
      "지금 돌이켜보면, 그 결정이 내 인생에서 가장 중요한 순간 중 하나였다고 확신한다. 나는 내가 좋아하는 일을 하며, 나만의 방식으로 성공을 거두었다. 그 과정에서 진정한 시간의 자유와 성공의 만족감을 찾았다. 그리고 지금은, 나와 같은 길을 가고자 하는 후배들을 양성하고 있다.",
      "— 에스더의 '여자라면 사업해라' 중에서",
    ],
    pullQuotes: [
      "그러나 가장 중요한 전환점은 첫 아이를 낳았을 때였다. 아이가 아플 때 내 시간을 스스로 조절할 수 있는 자유를 원했다. 열정을 쏟아 일하는 시간을 내가 정하고 싶었고, 가족을 위해 내 시간을 조절하며 삶을 움직이고 싶었다. 그 순간, 나는 결심했다. 높은 연봉을 버리고 나만의 사업을 시작하기로. 그리고 지금의 연봉보다 훨씬 더 많은 돈을 벌 수 있으리라 확신했다.",
    ],
    strategy: {
      kr: "연봉이 아니라 시간을 벌어라 — 높은 연봉은 안정을 주지만, 내 사업은 내 시간의 주인이 되게 합니다. 커리어를 선택할 때 '얼마를 버는가'와 함께 '내 시간을 누가 통제하는가'를 보세요.",
      en: "Earn time, not just salary — a high salary buys comfort, but your own business makes you the owner of your time. When choosing a career, ask not only how much you earn, but who controls your hours.",
    },
  },
  {
    slug: "333-rule",
    category: { kr: "실전 전략", en: "Field Strategy" },
    title: {
      kr: "첫해 부동산 리얼터로 2억 벌기 — 나만의 3-3-3 법칙",
      en: "Six figures in my first year as a REALTOR — my 3-3-3 Rule",
    },
    excerpt: {
      kr: "매일 3명에게 알리고, 매주 싫은 일 3가지, 매달 3건 클로징. 10개월에 22건을 성사시킨 나만의 법칙.",
      en: "Tell 3 people a day, do 3 dreaded tasks a week, close 3 deals a month — the rule that closed 22 deals in 10 months.",
    },
    readingMin: 5,
    enSummary:
      "In her first year as a REALTOR, Esther earned six figures using a rule she invented for herself: the 3-3-3 Rule. Tell 3 people every day that you're a realtor. Do 3 things you dread every week. Aim to close 3 deals every month. She closed 22 transactions in 10 months — and by year three, reached $1M in commissions on $58M in sales. The rule isn't from any textbook; it's a framework for turning big goals into daily actions.",
    imageSlot: "note-333-rule.jpg",
    body: [
      "오늘은 나만의 '3-3-3 법칙'에 대해 이야기해 보려고 한다.",
      "나는 현재 미국에서 재무설계사이자 부동산 리얼터로 활동하고 있다. 감사하게도 New Jersey Realtors에서 주는 Circle of Excellence 실버상을 받게 되었다. 이 모든 것은 당연히, 나를 믿고 맡겨주신 손님들과 선배 리얼터들의 도움이 있었기에 가능했다.",
      "그리고 리얼터로서의 첫 1년, 나에게는 나름의 성공 법칙이 있었다. 내가 세운 법칙은 '3-3-3 법칙'이다. 너무나 심플하지만, 첫해에 6 figures — 한국 돈으로 약 2억을 벌 수 있었던 것은 이 법칙 덕분이다.",
      "첫 번째 '3'은, 매일 3명에게 내가 리얼터라고 알리는 일이다. 나를 재무설계사로만, 혹은 교육하는 원장으로만 알고 있는 지인들이 많았다. 나는 문자로 알리기 시작했다. 길에서 만나는 모르는 사람들에게도 인사를 하며 리얼터임을 말하고, 집을 구할 때 도움을 드릴 수 있다고 알렸다. 그렇게 만난 손님이 클로징까지 이어졌다. 당연히 쉬운 일은 아니다. 나도 낯을 많이 가린다. 그러나 나를 알리는 것이 첫걸음이니, 이보다 중요한 것은 없다고 생각했다.",
      "두 번째 '3'은, 일주일에 최소 3가지의 '하기 싫은 일'을 해내는 것이다. 지역 부동산 자료 분석, SNS 마케팅, 주말 오픈하우스 방문 — 초보 리얼터에게는 어렵고 낯선 일들이다. 그러나 나는 시간이 없었다. 최소 10년 이상 경력의 선배들처럼 척척 일을 잘하고 싶었다. 그것이 나를 찾는 손님들에 대한 기본 예의라고 생각했다. 하기 싫은 일, 피하고 싶은 일, 귀찮은 일을 월요일마다 적어가며, 한 주 동안 최소 3가지는 해내려고 노력했다.",
      "마지막 '3'은, 한 달에 최소 3건의 거래 클로징이 목표라는 것이다. 프리랜서나 사업가에게 가장 중요한 것은 결과다. 목표가 정확하지 않으면 월급 받는 일보다 못하다. 꿈이 크다고 생각할 수도 있지만, 나는 항상 목표를 내가 할 수 있는 것보다 크게 세운다. 첫해의 클로징 목표는 매달 3건이었다. 목표를 다 이루지는 못했지만, 그 결과 10개월 동안 22건을 클로징할 수 있었다.",
      "나는 리얼터 첫해를 씨를 뿌리는 시간으로 차근차근 걸어왔다. 시장이 추운 겨울 같던 때에도, 아침에 일어나 다시 '3-3-3 법칙'을 적으며 여전히 씨앗을 뿌렸다. 언젠가는 분명 열매가 맺힐 것을 기다리며.",
      "'3-3-3 법칙'은 어디에 나와 있는 공식 같은 룰이 아니다. 그저 내가 나의 목표를 세우고 달성하기 위한 기준이다. 사업을 하는 여성 사업가들에게, 그리고 비전이 있는 모든 이들에게, 자신만의 목표를 향한 법칙을 세워보길 권한다.",
      "그리고 3년 차 — 나는 100만 불(약 15억 원)의 커미션과 5,800만 불어치의 부동산 판매를 달성했다. 첫해에 뿌린 씨앗은, 반드시 열매를 맺는다.",
      "— 에스더의 '여자라면 사업해라' 중에서",
    ],
    pullQuotes: [
      "나는 항상 목표를 내가 할 수 있는 것보다 크게 세운다. 첫해의 클로징 목표는 매달 3건이었다. 목표를 다 이루지는 못했지만, 그 결과 10개월 동안 22건을 클로징할 수 있었다.",
    ],
    strategy: {
      kr: "큰 목표를 매일의 숫자로 바꾸세요 — 매일 3명에게 알리기, 매주 싫은 일 3가지, 매달 3건 클로징. 목표는 항상 내 능력보다 크게, 행동은 오늘 할 수 있는 만큼 작게.",
      en: "Turn big goals into daily numbers — 3 people a day, 3 dreaded tasks a week, 3 closings a month. Set the goal bigger than you, and the action small enough for today.",
    },
  },
  {
    slug: "never-burning-out",
    category: { kr: "마인드", en: "Mindset" },
    title: { kr: "여성 사업가로서, 지치지 않는 힘의 비밀", en: "The secret to never burning out as a woman entrepreneur" },
    excerpt: {
      kr: "'에스더, 어떻게 지치지 않나요?' 20대의 무지, 30대의 책임감, 40대의 경험 — 나이마다 달리는 이유는 달라졌습니다.",
      en: "'Esther, how do you never burn out?' The fearlessness of my 20s, the responsibility of my 30s, the experience of my 40s.",
    },
    readingMin: 5,
    enSummary:
      "People ask Esther how she never burns out. Her twenties: working in Manhattan while pregnant, until the day she gave birth. Her thirties: a failed business and three children — survival mode left no room even for exhaustion. Her forties: another crisis in the pandemic, met with the confidence of experience, which led her to financial planning and real estate. Now approaching her fifties, she trains her body with tennis and holds onto what successful mentors tell her: real wealth and success begin in your fifties. Her deepest reason: her children learn best by watching a parent's passion.",
    imageSlot: "note-never-burning-out.jpg",
    body: [
      "사람들은 종종 묻습니다. '에스더, 어떻게 지치지 않나요?' 브레이크 없는 기차처럼 멈추지 않고 달리는 저를 보며 놀라워합니다. 그러나 제 대답은 항상 같습니다. '나는 지치지 않습니다.' 우리에겐, 지칠 수 없는 이유가 있기 때문입니다.",
      "20대의 어린 나이에 결혼하여, 부모님은 더 이상 저의 방패가 되어주지 못했습니다. 나는 가족을 위해 일해야만 했습니다. 남편은 학교에 다니고 있었고, 저는 첫 아이를 임신한 채 버스를 타고 매일 맨해튼으로 출근했습니다. 아이를 낳으러 가는 날까지 일했습니다. 그러나 지치지 않았습니다. 사실 20대는 어려서 지치는 줄도 몰랐습니다. 다들 이렇게 사는 줄 알았습니다. 어릴 때는, 고생이 뭔지 모르는 법이니까요.",
      "30대에 사업이 무너졌을 때도, 세 아이의 젊은 엄마였던 저는 지치지 않았습니다. 그때는 생존 모드였기에, 지치기보다 오히려 초능력이 나왔던 시기였습니다. 책임감은 우울이나 지친다는 생각조차 허락하지 않았습니다. 물론 번아웃이 찾아오고 멍한 순간들도 있었습니다. 그러나 그때마다 저는 희망의 한 줄기를 붙잡았습니다. 아이들에게 좋은 엄마가 되고, 언젠가 멋진 여성 리더가 될 것이라는 희망을 붙잡고 달렸습니다.",
      "40대가 되어 미국으로 돌아왔을 때, 이제는 좀 덜 달려도 되는 줄 알았습니다. 그러나 또 다른 위기가 기다리고 있었습니다. 팬데믹 속에서 미국과 한국의 사업이 흔들렸습니다. 그러나 어떻게 지칠 수 있겠습니까. 40대의 저에게는 그 어느 때보다 풍부한 경험과 지식이 있었습니다. '이 정도쯤의 위기는 뭐.' 하며 툭툭 털고 나니, 정신이 바싹 차려지더군요.",
      "이 위기를 겪으며 저는 재무 공부를 시작했고, 부동산 리얼터로 일하기 시작했습니다. 이런 위기가 아니었다면 새로운 도전을 하지 않았을 것입니다. 그리고 지금, 매일매일 얼마나 재미있는 일들이 생기는지 모릅니다. 하루하루가 제게는 은혜입니다.",
      "50대에 접어들어도, 저는 여전히 지치지 않을 것입니다. 같은 멘털과 체력을 유지하기 위해 일주일에 2~3번 테니스를 치고, 건강식을 챙기며, 쌓아온 경험과 지식으로 성공의 열매를 맺고자 합니다.",
      "주변의 성공한 분들이 자주 하는 말이 있습니다. '진정한 자산과 성공은 50대부터 시작된다.' 40대에 사업 실패와 파산을 겪은 많은 사업가들이 제게 희망의 메시지를 전합니다. 40대를 그토록 열심히 달려온 에스더라면, 50대에는 지금보다 훨씬 더 큰 사람이 될 것이라고. 이런 격려가 저를 지치지 않게 하는 또 하나의 이유입니다.",
      "삶은 넘어질 수 있고, 며칠을 움츠릴 수도 있습니다. 하지만 우리 가족, 특히 제 아이들을 보세요. 자녀에게 최고의 교육은 부모의 열정과 노력을 보며 배우는 것입니다. 저는 아이들에게 지친 모습이 아닌, 열정적인 모습으로 기억되고 싶습니다.",
      "— 에스더의 '여자라면 사업해라' 중에서",
    ],
    pullQuotes: [
      "자녀에게 최고의 교육은 부모의 열정과 노력을 보며 배우는 것입니다. 저는 아이들에게 지친 모습이 아닌, 열정적인 모습으로 기억되고 싶습니다.",
    ],
    strategy: {
      kr: "지치지 않는 힘은 체력이 아니라 이유에서 나옵니다 — 20대의 무지, 30대의 책임감, 40대의 경험, 50대의 지혜. 나이마다 달리는 이유는 달라져도, 이유가 있는 사람은 멈추지 않습니다.",
      en: "Endurance comes not from stamina but from reasons — the fearlessness of your 20s, the responsibility of your 30s, the experience of your 40s, the wisdom of your 50s. The reasons change; a person with a reason doesn't stop.",
    },
  },
  {
    slug: "letter-to-my-daughter",
    category: { kr: "자녀 머니 교육", en: "Raising Money-Smart Kids" },
    title: {
      kr: "딸에게 알려주고 싶은 기본 재무 원칙 — 그리고 19살, 최연소 리얼터가 된 딸",
      en: "A letter to my daughter on money — and the 19-year-old REALTOR she became",
    },
    excerpt: {
      kr: "매일 두 배로 불어나는 1센트는 30일 뒤 536만 달러가 됩니다. 복리의 힘을 딸에게 전한 편지, 그리고 그 결과.",
      en: "One penny doubling daily becomes $5.3M in 30 days — a letter on compound interest, and what it grew into.",
    },
    readingMin: 5,
    enSummary:
      "A letter Esther wrote to her young daughter Sieun, explaining compound interest through a simple story: one penny doubling every day becomes $5.3 million in 30 days. The principle — patience, consistency, and the power of small beginnings — applies to money and to life. Years later, the daughter she taught from childhood became one of New Jersey's youngest REALTORS at 19, earning Bronze level in her very first year. Money education compounds too.",
    imageSlot: "note-letter-to-my-daughter.jpg",
    variant: "letter",
    body: [
      "시은아,",
      "오늘 엄마가 너에게 '복리의 힘'이라고 불리는 중요한 재무 원칙에 대해 알려줄게. 복리는 복잡한 수학 공식처럼 들릴 수도 있지만, 사실 우리 삶에서 아주 쉽게 발견할 수 있는 원리란다. 네가 그림 그리기를 시작했을 때를 생각해보렴. 처음에는 서툴렀지만, 시간이 흐르면서 네 노력이 모여 점점 실력이 늘었잖아. 복리도 비슷해.",
      "자, 엄마가 30일 동안 돈이 어떻게 불어나는지 숫자로 보여줄게. 첫날, 네가 가진 것은 겨우 1센트야. 하지만 이 작은 동전이 어떤 변화를 겪는지 봐. 2일째에는 2센트, 3일째에는 4센트, 5일째에는 16센트가 돼. 시간이 지날수록 이 작은 변화가 얼마나 쌓이는지 봐. 10일째에는 5.12달러, 15일째에는 163.84달러, 20일째에는 무려 5,242.88달러가 되지. 그리고 30일이 지나면, 너의 1센트는 놀랍게도 536만 8,709달러로 자라나. 믿기 어렵지?",
      "복리는 작은 시작으로부터 엄청난 결과를 만들어내는 놀라운 힘을 가지고 있어. 처음에는 사소해 보여도, 매일 가치가 쌓이면 큰 부를 이룰 수 있단다. 엄마가 사업하며 20년 동안 몰랐던 이 기본 원칙을, 이제는 너에게 꼭 알려주고 싶어.",
      "네가 학교에서 배우고 매일 노력하는 것도 마찬가지야. 처음엔 사소한 변화로 보이겠지만, 시간이 흐르면 그 노력들이 모여 너를 위대한 성공으로 이끌어줄 거야. 그러니까 여기서 배울 점은 인내와 끈기야. 장기적으로 생각하고, 작은 시작을 중시하고, 시간이 흐르며 네가 쌓아 올린 것들이 어떻게 변하는지 지켜보면 돼. 복리의 마법이 너의 재정뿐 아니라 인생의 모든 영역에서 너를 큰 성공으로 이끌 거라 믿어.",
      "— 엄마가",
      "그리고 몇 년 후.",
      "어렸을 때부터 이렇게 돈과 노력의 원리를 배운 딸은, 19살에 뉴저지 최연소 리얼터 중 한 명이 되었습니다. 그리고 첫해에 Bronze Level을 달성했습니다.",
      "아이에게 물려줄 가장 큰 유산은 돈이 아니라, 돈을 다루는 힘이라는 것을 — 딸이 증명해주었습니다. 교육도, 복리로 자랍니다.",
      "— 에스더의 '여자라면 사업해라' 중에서",
    ],
    pullQuotes: [
      "아이에게 물려줄 가장 큰 유산은 돈이 아니라, 돈을 다루는 힘이라는 것을 — 딸이 증명해주었습니다. 교육도, 복리로 자랍니다.",
    ],
    strategy: {
      kr: "자녀 머니 교육도 복리입니다 — 오늘 아이에게 들려준 돈 이야기 하나가, 10년 뒤 아이의 인생 전체를 바꿉니다. 일찍 시작할수록 이자가 붙습니다.",
      en: "Money education compounds too — one conversation about money today changes your child's entire trajectory ten years from now. The earlier you start, the more interest it earns.",
    },
  },
  {
    slug: "my-role-models",
    category: { kr: "마인드", en: "Mindset" },
    title: {
      kr: '사업 성공을 위한 "나의 롤모델"은 누구인가요?',
      en: "Who is your role model for business success?",
    },
    excerpt: {
      kr: "사수도 선배도 없이 시작한 사업. 15년 전 다이어리에 적은 꿈이 현실이 되기까지, 롤모델이 밝혀준 길.",
      en: "No mentor, no senior — just a dream written in a diary 15 years ago, and the role models who lit the path.",
    },
    readingMin: 3,
    enSummary:
      "When Esther started her business at 25, she had no mentor, no senior, no business education — only lessons from failure and from books. In her hardest seasons she found guidance in the books of Kim Mikyung, Korea's beloved mentor for women, and wrote in her diary 15 years ago: \"One day I want to meet her — and become a woman leader like her.\" That dream recently came true, when Esther hosted a meeting between Kim Mikyung and Heather Choi of Show Me Your Heart. The lesson: you don't need to know your role models personally — watching the path they walked lights up your own.",
    imageSlot: "note-my-role-models.jpg",
    body: [
      "여성 리더와 사업가로서, 롤모델의 존재는 생각보다 큽니다. 학교에서는 선생님과 선배들로부터 배웁니다. 존경하는 인물을 롤모델로 삼습니다. 하지만 졸업 후, 사업을 배우는 것은 쉽지 않습니다.",
      "25살에 사업을 시작했을 때, 배울 사람이 없었습니다. 나의 노력과 열정만으로 배웠습니다. 실패한 후에야 교훈을 얻었습니다. 내게는 사수도, 선배도 없었습니다. 대학에서 비즈니스와 경영을 배우지도 못했습니다. 내가 배운 것은 오로지 나의 실패에서 얻은 교훈과, 책으로부터였습니다.",
      "답이 보이지 않을 때는 잠실 서점에서 많은 시간을 보냈습니다. 정답을 찾기 위해 궁금한 책들을 읽었습니다. 힘들 때마다 김미경 강사님의 책이 위로가 되었습니다. 김미경 강사님은 제게 롤모델이자 선배 리더입니다.",
      "15년 전, 나의 다이어리에는 이렇게 적혀 있습니다. '언젠가 김미경 선생님을 가까이에서 만나고 싶다. 제2의 김미경 선생님 같은 영향력 있는 여성 리더가 되고 싶다.' 저는 아직도 그 꿈을 향해 나아가고 있습니다. 그리고 이번에, 김미경 선생님을 조금이나마 가까이에서 만나 뵙게 되었습니다.",
      "또 다른 기적 같은 일도 일어났습니다. 한국에 김미경 선생님 같은 롤모델이 있다면, 미국에는 Show Me Your Heart의 Heather Choi 대표님이 계십니다. 그리고 처음으로, 이 멋진 두 분의 만남을 제가 주최하게 되었습니다. 60세이신 두 분이 자신감과 열정으로 비전을 나누는 모습이 제게 얼마나 감명 깊었는지 모릅니다. 두 분을 멀리서 바라보는 것만으로도 긍정적인 영향을 느낄 수 있었습니다. 이것이 한인 다음 세대에 대한 비전이고, 여성 리더들을 위한 큰 그림입니다.",
      "여성 리더와 사업가로서 성공하는 길에는, 롤모델의 영향이 큽니다.",
      "그들이 보여준 옳은 길을 따라가며, 우리는 우리만의 길을 만들어갈 것입니다.",
      "— 에스더의 '여자라면 사업해라' 중에서",
    ],
    pullQuotes: [
      "15년 전, 나의 다이어리에는 이렇게 적혀 있습니다. '언젠가 김미경 선생님을 가까이에서 만나고 싶다. 제2의 김미경 선생님 같은 영향력 있는 여성 리더가 되고 싶다.' 저는 아직도 그 꿈을 향해 나아가고 있습니다. 그리고 이번에, 김미경 선생님을 조금이나마 가까이에서 만나 뵙게 되었습니다.",
    ],
    strategy: {
      kr: "롤모델을 정하세요 — 직접 만나지 못해도 괜찮습니다. 책으로, 강연으로, 멀리서 바라보는 것만으로도 길이 보입니다. 15년 전 다이어리에 적은 꿈은, 언젠가 현실이 됩니다. 그리고 언젠가 당신도 누군가의 롤모델이 됩니다.",
      en: "Choose a role model — you don't need to meet them in person. Books, talks, even watching from afar lights the path. A dream written in a diary 15 years ago can come true — and one day, you will be someone's role model too.",
    },
  },
];

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}

export const publishedNotes = notes.filter((n) => !n.draft);
