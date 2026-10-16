export type Lang = "kr" | "en";
export type L = { kr: string; en: string };

/* ---------------------------------------------------------------- Navigation */
export const navLinks = [
  { to: "/", label: { kr: "홈", en: "Home" } },
  {
    to: "/about",
    label: { kr: "소개", en: "About" },
    children: [
      { to: "/about", label: { kr: "HER NEXT 소개", en: "About HER NEXT" } },
      { to: "/story", label: { kr: "에스더 스토리", en: "Esther's Story" } },
      { to: "/notes", label: { kr: "성공노트", en: "Success Notes" } },
    ],
  },
  // No dropdown: goes straight to the overview; in-page tabs switch between the 3 program pages.
  { to: "/programs", label: { kr: "프로그램", en: "Programs" }, also: ["/curriculum", "/program"] },
  {
    to: "/picks",
    label: { kr: "무료 콘텐츠", en: "Free" },
    children: [
      { to: "/ai-diagnosis", label: { kr: "무료 AI 진단 (1분)", en: "Free AI assessment (1 min)" }, static: true },
      { to: "/picks", label: { kr: "에스더의 픽", en: "Esther's Picks" } },
      { to: "/resources", label: { kr: "무료 자료", en: "Free Resources" } },
      { to: "/planner", label: { kr: "AI 플래너", en: "AI Planner" } },
    ],
  },
  { to: "/stories", label: { kr: "성과·후기", en: "Stories" } },
  { to: "/contact", label: { kr: "문의", en: "Contact" } },
] as { to: string; label: L; children?: { to: string; label: L; static?: boolean }[]; also?: string[] }[];

/* Extra links surfaced in the footer only (detail pages) */
export const footerLinks = [
  { to: "/story", label: { kr: "에스더 스토리", en: "Esther's Story" } },
  { to: "/notes", label: { kr: "성공노트", en: "Success Notes" } },
] as { to: string; label: L }[];

export const cta = {
  apply: { kr: "무료 상담 신청", en: "Book a free consult" },
  join: { kr: "지금 시작하기", en: "Start now" },
  learn: { kr: "자세히 보기", en: "Learn more" },
};

/* --------------------------------------------------------------------- Home */
export const home = {
  hero: {
    eyebrow: {
      kr: "미국 한인 여성을 위한 AI 비즈니스 스쿨 · New Jersey",
      en: "An AI business school for Korean women in America · New Jersey",
    },
    titlePre: { kr: "당신의 ", en: "Your " },
    titleMark: { kr: "다음 챕터", en: "next chapter" },
    titlePost: { kr: "를 AI와 함께 엽니다.", en: " starts with AI." },
    sub: {
      kr: "AI를 내 사업의 직원처럼 쓰는 법을 가르칩니다. 아이디어 발굴부터 브랜딩·마케팅·운영 자동화까지, 20년의 실전 경험과 AI를 결합해 당신의 시간을 줄여드립니다.",
      en: "We teach you to use AI like an employee for your business. From idea discovery to branding, marketing, and automation — 20 years of real experience, supercharged by AI.",
    },
    subShort: {
      kr: "리얼터 한 명이 AI 3명과 팀처럼 일하는 법, 그대로 알려드립니다.",
      en: "How one realtor works with three AIs like a team — taught exactly as it's done.",
    },
    ctaPrimary: { kr: "무료 상담 신청", en: "Book a free consult" },
    ctaSecondary: { kr: "프로그램 보기", en: "View programs" },
  },
  learnTitle: { kr: "무엇을 배우나요", en: "What you'll learn" },
  learnHead: {
    kr: "AI를 도구가 아니라, 내 사업의 팀으로 만듭니다",
    en: "Turn AI from a tool into your business team",
  },
  learnSub: {
    kr: "컴퓨터를 잘 몰라도 괜찮습니다. 미국에서 여성이 AI로 진짜 사업을 세우는 데 필요한 것만, 순서대로.",
    en: "No tech background needed. Only what women actually need to build a real AI-powered business in the U.S. — in order.",
  },
  learn: [
    {
      no: "01",
      title: { kr: "AI로 사업 아이디어 찾기", en: "Find your idea with AI" },
      desc: {
        kr: "ChatGPT·Claude로 내 경험을 분석해 돈이 되는 아이디어를 뽑고, 시장 검증까지.",
        en: "Use ChatGPT & Claude to mine your experience for profitable ideas and validate the market.",
      },
    },
    {
      no: "02",
      title: { kr: "AI 브랜딩·콘텐츠", en: "AI branding & content" },
      desc: {
        kr: "AI로 로고·웹페이지·SNS 콘텐츠를 직접 만듭니다. 디자이너 없이, 하루 만에.",
        en: "Create your logo, webpage, and SNS content yourself with AI — no designer, in a day.",
      },
    },
    {
      no: "03",
      title: { kr: "AI 마케팅·첫 고객", en: "AI marketing & first client" },
      desc: {
        kr: "AI가 써주는 세일즈 문구와 광고로 첫 고객, 첫 수입을 만듭니다.",
        en: "Land your first customer and income with AI-written sales copy and ads.",
      },
    },
    {
      no: "04",
      title: { kr: "AI 운영 자동화", en: "AI-powered operations" },
      desc: {
        kr: "예약·고객 응대·문서 작업을 AI로 자동화해 혼자서도 회사처럼 일합니다.",
        en: "Automate booking, customer replies, and paperwork with AI — work like a company, solo.",
      },
    },
  ] as { no: string; title: L; desc: L }[],
  founder: {
    eyebrow: { kr: "설립자", en: "The founder" },
    name: "Esther",
    role: { kr: "HER NEXT 설립자 · 공인중개사", en: "Founder, HER NEXT · Licensed Realtor" },
    quote: {
      kr: "“저는 세 번 무너졌고 세 번 다시 일어났습니다. 이제 AI라는 무기가 생겼습니다. 그 길에서 배운 공식을, 당신은 훨씬 짧게 걸었으면 합니다.”",
      en: "“I fell three times and rose three times. Now we have a new weapon — AI. The formula I learned the hard way, I want your path to be far shorter.”",
    },
    body: {
      kr: "10살에 영어 한마디 없이 미국에 도착해, 20가지가 넘는 일과 20개가 넘는 자격증을 거쳤습니다. 완전한 실패도, 밀리언 달러 커미션도 경험했습니다. 지금 제 사업은 AI 위에서 돌아갑니다. HER NEXT는 그 경험과 AI 활용법을 여성들에게 나누기 위해 시작됐습니다.",
      en: "I arrived in America at ten without a word of English, then lived 20+ jobs and earned 20+ certifications. I've known total failure — and a million-dollar year. Today my business runs on AI. HER NEXT exists to pass that experience and AI know-how on to other women.",
    },
    link: { kr: "에스더 스토리 읽기", en: "Read Esther's story" },
    teaser: {
      kr: "14살부터 46살까지, 20가지의 일을 거쳐 여기까지 왔습니다.",
      en: "From 14 to 46 — twenty jobs brought me here.",
    },
    certsTeaser: {
      kr: "자격증과 수료증 20여 개 — 전부 생존이 만든 자산입니다.",
      en: "20+ certifications — every one an asset born of survival.",
    },
  },
  finalCta: {
    head: { kr: "당신의 다음은, AI와 함께 지금부터.", en: "Your next chapter starts now — with AI." },
    sub: {
      kr: "첫 상담은 무료입니다. AI로 무엇을 할 수 있는지, 지금 어디에 있든 다음 한 걸음을 함께 설계해요.",
      en: "The first consult is free. Wherever you are today, let's design your next AI-powered step together.",
    },
  },
  storyBand: {
    eyebrow: { kr: "에스더 스토리", en: "Esther's story" },
    head: {
      kr: "무너질 때마다, 다시 배웠습니다",
      en: "Every fall taught me to begin again",
    },
    sub: {
      kr: "10살 이민에서 밀리언 달러 커미션까지 — 그리고 지금은 AI가 제 곁에 있습니다.",
      en: "From arriving at ten to a million-dollar year — and now, AI is at my side.",
    },
    link: { kr: "에스더 스토리 읽기", en: "Read Esther's story" },
  },
  programBand: {
    eyebrow: { kr: "프로그램", en: "The program" },
    head: {
      kr: "AI와 함께라면, 혼자서도 충분합니다",
      en: "With AI, solo is enough",
    },
    sub: {
      kr: "4주 AI 클래스 초급반에서 나만의 AI 비서를 만들고, 중급·고급으로 이어갑니다.",
      en: "Build your own AI assistant in the 4-week beginner class, then continue to intermediate and advanced.",
    },
    cta: { kr: "프로그램 보기", en: "View programs" },
  },
};

/* -------------------------------------------------------------------- About */
export const about = {
  hero: {
    eyebrow: { kr: "HER NEXT 소개", en: "About HER NEXT" },
    title: { kr: "HER NEXT 소개", en: "About HER NEXT" },
    sub: { kr: "미국 한인 여성 창업자를 위한 AI 비즈니스 교육 기관입니다.", en: "An AI business school for Korean-American women founders." },
  },
  storyHead: { kr: "20년이 걸렸습니다", en: "It took twenty years" },
  story: [
    {
      kr: "열 살, 영어 한마디 없이 미국에 도착했습니다. 아무도 길을 알려주지 않았고, 생존이 곧 배움이었습니다.",
      en: "At ten I arrived in America with no English. No one showed me the way — survival was the only teacher.",
    },
    {
      kr: "20가지가 넘는 일을 했고, 20개가 넘는 자격증을 땄습니다. 29살에는 사업이 완전히 무너져 손에 남은 것이 없었습니다.",
      en: "I worked 20+ jobs and earned 20+ certifications. At 29 my business collapsed and nothing was left in my hands.",
    },
    {
      kr: "그리고 다시 일어섰습니다. 무역과 교육 사업, 그리고 부동산에서 3년 만에 밀리언 달러 커미션을 달성했습니다. 배움이 곧 자본이었습니다.",
      en: "Then I rose again. Trade, education, and real estate — a million-dollar commission year within three years. Learning was my capital.",
    },
    {
      kr: "그리고 지금, AI를 만났습니다. 예전에는 직원이 필요했던 일을 이제는 AI와 혼자 해냅니다. 곁에서 길을 보여주는 사람이 한 명만 있었다면, 제 20년은 훨씬 짧았을 것입니다. HER NEXT는 바로 그 마음에서 시작됐습니다.",
      en: "And now, I've met AI. Work that once required employees, I now do alone with AI. With one person to show the way, my twenty years could have taken a fraction of the time. HER NEXT was born from exactly that.",
    },
  ] as L[],
  credTitle: { kr: "라이센스 · 자격 · 성과", en: "Licenses · credentials · results" },
  credNote: {
    kr: "* 아래 항목은 예시 자료입니다. 실제 자격·수상 내역으로 교체 예정입니다.",
    en: "* The items below are placeholders and will be replaced with real credentials.",
  },
  creds: [
    { kr: "뉴저지주 공인중개사 (Licensed Realtor, NJ)", en: "Licensed Realtor, New Jersey" },
    { kr: "보험 라이센스 (Life & Health)", en: "Insurance License (Life & Health)" },
    { kr: "20+ 개 직업·산업 라이센스 보유", en: "20+ professional licenses across industries" },
    { kr: "부동산 3년차 $1M 커미션 달성", en: "$1M in commissions by year three" },
    { kr: "Rising Star 2025 (예시)", en: "Rising Star 2025 (placeholder)" },
    { kr: "200+ 명의 여성 창업 멘토링", en: "Mentored 200+ women entrepreneurs" },
  ] as L[],
  values: {
    head: { kr: "HER NEXT가 믿는 것", en: "What we believe" },
    items: [
      {
        title: { kr: "AI는 겁내는 것이 아니라 쓰는 것", en: "AI is to be used, not feared" },
        desc: {
          kr: "AI는 어려운 기술이 아니라, 배우면 누구나 쓸 수 있는 가장 싼 직원입니다.",
          en: "AI isn't scary tech — it's the cheapest employee anyone can learn to use.",
        },
      },
      {
        title: { kr: "정보가 아니라 실행", en: "Execution over information" },
        desc: {
          kr: "정보는 이미 넘칩니다. 우리는 다음 한 걸음을 함께 실행합니다.",
          en: "Information is everywhere. We take the next step with you.",
        },
      },
      {
        title: { kr: "혼자가 아니라 함께", en: "Together, not alone" },
        desc: {
          kr: "같은 길을 걷는 여성 커뮤니티가 끝까지 함께합니다.",
          en: "A community of women walking the same path, all the way.",
        },
      },
    ] as { title: L; desc: L }[],
  },
};

/* ----------------------------------------------------------------- Programs */
export const programs = {
  hero: {
    eyebrow: { kr: "프로그램", en: "Programs" },
    title: { kr: "프로그램 안내", en: "Programs" },
    sub: { kr: "AI 로드맵을 바탕으로 4주 AI 클래스(초급 → 중급 → 고급)와 1:1 컨설팅을 운영합니다.", en: "An AI roadmap, delivered through the 4-week AI Class (beginner → intermediate → advanced) and 1:1 consulting." },
  },
  roadmapHead: { kr: "6단계 AI 로드맵", en: "The 6-step AI roadmap" },
  roadmap: [
    {
      no: "01",
      title: { kr: "AI 아이디어 · 검증", en: "AI idea & validation" },
      desc: {
        kr: "ChatGPT·Claude로 내 경험·재능을 수입 아이디어로 바꾸고, AI로 시장을 빠르게 검증합니다.",
        en: "Turn your experience into income ideas with ChatGPT & Claude, and validate the market fast with AI.",
      },
    },
    {
      no: "02",
      title: { kr: "AI 브랜드 만들기", en: "Build your brand with AI" },
      desc: {
        kr: "AI로 사업 이름·로고·한 페이지 웹사이트·SNS 채널까지 직접 만듭니다.",
        en: "Create your business name, logo, one-page website, and SNS channels yourself with AI.",
      },
    },
    {
      no: "03",
      title: { kr: "법인 · 세무 · 은행", en: "Incorporate · tax · banking" },
      desc: {
        kr: "LLC 설립, EIN, 비즈니스 계좌 — AI의 도움으로 서류도 두렵지 않게.",
        en: "LLC, EIN, business banking — with AI's help, even the paperwork stops being scary.",
      },
    },
    {
      no: "04",
      title: { kr: "AI 마케팅 · 첫 고객", en: "AI marketing & first client" },
      desc: {
        kr: "AI가 만드는 콘텐츠와 세일즈 문구로 첫 고객, 첫 수입을 만듭니다.",
        en: "AI-generated content and sales copy bring your first client and first income.",
      },
    },
    {
      no: "05",
      title: { kr: "AI 운영 · 자동화", en: "AI operations & automation" },
      desc: {
        kr: "고객 응대·예약·문서를 AI로 자동화하고, 수입을 자산으로 키우는 구조를 만듭니다.",
        en: "Automate replies, bookings, and documents with AI — and turn income into lasting assets.",
      },
    },
  ] as { no: string; title: L; desc: L }[],
  offers: {
    head: { kr: "함께하는 방법", en: "Ways to work with us" },
    main: {
      tag: { kr: "2기 초급반 · 4주 AI 클래스", en: "Cohort 2 · 4-week AI Class" },
      title: { kr: "HER NEXT AI CLASS", en: "HER NEXT AI CLASS" },
      body: {
        kr: "반별 8~10명 소수 정예로 4주간 ChatGPT·Claude 기본부터 실습까지 배웁니다. 이메일·문서·SNS 게시물을 직접 만들고, 수료할 때는 나만의 AI 비서(My AI Assistant)가 생깁니다.",
        en: "In small classes of 8–10, you'll learn ChatGPT and Claude from the basics to hands-on practice over four weeks. You'll make your own emails, documents and SNS posts, and graduate with your own AI assistant.",
      },
      points: [
        { kr: "주 1회 2시간 (강의 90분 + 그룹 코칭 30분) · 4주", en: "2 hours a week (90-min class + 30-min coaching) · 4 weeks" },
        { kr: "전용 워크북 + 매주 과제와 피드백", en: "Dedicated workbook + weekly practice and feedback" },
        { kr: "초급 → 중급 → 고급, 단계별로 이어지는 과정", en: "Beginner → intermediate → advanced, step by step" },
      ] as L[],
      cta: { kr: "2기 수강 신청", en: "Enroll in Cohort 2" },
      note: { kr: "2기 한정 50% 할인 · 3기부터 정가", en: "Cohort 2 only: 50% off · regular price from Cohort 3" },
    },
    side: {
      tag: { kr: "1:1 컨설팅", en: "1:1 Consulting" },
      title: { kr: "AI 사업 설계 세션", en: "AI business design session" },
      body: {
        kr: "지금 상황에서 AI로 무엇을 할 수 있는지 진단하고, 사업 구조와 첫 90일 계획을 함께 세우는 90분 세션. 방향이 막힌 분께 권합니다.",
        en: "A 90-minute session to diagnose what AI can do for you right now and design your structure and first 90 days. For anyone feeling stuck.",
      },
      cta: { kr: "문의하기", en: "Inquire" },
    },
  },
};

/* --------------------------------------------------------------- Curriculum */
export const curriculum = {
  hero: {
    eyebrow: { kr: "커리큘럼", en: "Curriculum" },
    title: { kr: "커리큘럼", en: "Curriculum" },
    sub: { kr: "단계별 모듈로 구성된 실무 중심 AI 비즈니스 과정입니다.", en: "A practical, module-based AI business program." },
  },
  modules: [
    {
      no: "M1",
      title: { kr: "AI로 사업 아이디어 & 검증", en: "AI idea & validation" },
      goal: { kr: "완성물: 한 문장 사업 아이디어 + AI 검증 노트", en: "Deliverable: one-line idea + AI validation notes" },
      items: [
        { kr: "AI와 함께 내 자산 인벤토리 만들기", en: "Build your asset inventory with AI" },
        { kr: "AI로 타깃 고객·시장 분석", en: "Analyze your target customer & market with AI" },
        { kr: "저비용 시장 검증", en: "Low-cost market validation" },
      ] as L[],
    },
    {
      no: "M2",
      title: { kr: "AI 브랜딩 & 웹사이트", en: "AI branding & website" },
      goal: { kr: "완성물: 내 사업 이름·로고·한 페이지 웹사이트", en: "Deliverable: your name, logo & one-page website" },
      items: [
        { kr: "AI로 사업 이름·슬로건 짓기", en: "Name your business & slogan with AI" },
        { kr: "AI로 로고·브랜드 컬러 만들기", en: "Create your logo & brand colors with AI" },
        { kr: "AI로 한 페이지 웹사이트 완성", en: "Finish your one-page website with AI" },
      ] as L[],
    },
    {
      no: "M3",
      title: { kr: "법인 · 세무 · 은행", en: "Incorporate · tax · banking" },
      goal: { kr: "완성물: 등록된 나의 사업체 + EIN + 비즈니스 계좌", en: "Deliverable: your registered company + EIN + business account" },
      items: [
        { kr: "LLC vs 개인사업자, AI와 함께 결정", en: "LLC vs sole prop — decide with AI" },
        { kr: "EIN 발급 & 계좌 개설 실습", en: "Get your EIN & open an account, step by step" },
        { kr: "세금 캘린더 & 기본 장부", en: "Tax calendar & basic bookkeeping" },
      ] as L[],
    },
    {
      no: "M4",
      title: { kr: "AI 콘텐츠 & SNS 마케팅", en: "AI content & SNS marketing" },
      goal: { kr: "완성물: 한 달치 SNS 콘텐츠 + 채널 운영 시작", en: "Deliverable: a month of SNS content + live channels" },
      items: [
        { kr: "AI로 글·이미지·영상 콘텐츠 만들기", en: "Create posts, images & video with AI" },
        { kr: "콘텐츠 캘린더 자동화", en: "Automate your content calendar" },
        { kr: "첫 오퍼 만들기", en: "Craft your first offer" },
      ] as L[],
    },
    {
      no: "M5",
      title: { kr: "AI 세일즈 & 첫 고객", en: "AI sales & first client" },
      goal: { kr: "완성물: 첫 고객 · 첫 수입", en: "Deliverable: first client, first income" },
      items: [
        { kr: "AI로 세일즈 문구·이메일 쓰기", en: "Write sales copy & emails with AI" },
        { kr: "가격 책정하는 법", en: "How to price" },
        { kr: "세일즈 대화와 클로징", en: "Sales conversations & closing" },
      ] as L[],
    },
    {
      no: "M6",
      title: { kr: "AI 운영 자동화 & 성장", en: "AI automation & scale" },
      goal: { kr: "완성물: 나만의 AI 운영 시스템 + 90일 성장 플랜", en: "Deliverable: your AI operating system + 90-day plan" },
      items: [
        { kr: "고객 응대·예약·문서 자동화", en: "Automate replies, bookings & documents" },
        { kr: "수입을 자산으로", en: "Turn income into assets" },
        { kr: "지속 가능한 성장 리듬", en: "A sustainable growth rhythm" },
      ] as L[],
    },
  ] as { no: string; title: L; goal: L; items: L[] }[],
};

/* ------------------------------------------------------------------ Stories */
export const stories = {
  hero: {
    eyebrow: { kr: "성과 · 후기", en: "Stories" },
    title: { kr: "수강 성과 및 후기", en: "Results & Testimonials" },
    sub: { kr: "HER NEXT 수강생들의 진행 사례와 후기입니다.", en: "Progress and feedback from HER NEXT participants." },
  },
  testimonials: [
    {
      quote: {
        kr: "AI는 저와는 먼 이야기라고 생각했어요. 수업을 들으며 하나씩 직접 해보니 자신감이 생겼고, 머릿속에만 있던 아이디어들을 실제 계획으로 정리할 수 있었어요. 그렇게 우리 동네에 도움이 되는 로컬 플랫폼, Nearo를 시작하게 되었습니다.",
        en: "I used to think AI had nothing to do with me. Trying things hands-on in class gave me confidence, and I finally turned the ideas in my head into a real plan. That's how I started Nearo, a local platform that helps our community.",
      },
      name: { kr: "R. Kang · 뉴저지", en: "R. Kang · New Jersey" },
      role: { kr: "Nearo 플랫폼 창업", en: "Founder, Nearo" },
    },
    {
      quote: {
        kr: "본업 업무에 AI 자동화를 세팅한 뒤로 고객 문의가 눈에 띄게 늘었어요. 반복 업무를 AI가 맡아주니 시간이 생겼고, 지금은 그 시간으로 유튜브와 프린터블 온라인 비즈니스까지 함께 하고 있어요.",
        en: "After setting up AI automations for my main job, client leads clearly picked up. With AI handling the repetitive work, I gained time — and now I'm also running a YouTube channel and a printables business on the side.",
      },
      name: { kr: "M.J.", en: "M.J." },
      role: { kr: "리얼터 · 유튜브 크리에이터", en: "Realtor · YouTube creator" },
    },
    {
      quote: {
        kr: "수업을 들으며 이커머스 상품 고르기부터 마케팅, 고객 리드 관리까지 AI로 자동화했어요. 손이 덜 가는 만큼 새로운 비즈니스 아이디어가 계속 떠올라서, 요즘은 다음 계획을 세우는 게 즐거워요.",
        en: "During the class I automated my e-commerce work with AI — from picking products to marketing and managing leads. With less busywork, new business ideas keep coming, and planning what's next is now the fun part.",
      },
      name: { kr: "J. Kim · 뉴저지", en: "J. Kim · New Jersey" },
      role: { kr: "온라인 비즈니스", en: "Online business" },
    },
  ] as { quote: L; name: L; role: L }[],
};

/* ---------------------------------------------------------------- Resources */
export const resources = {
  hero: {
    eyebrow: { kr: "무료 자료", en: "Free resources" },
    title: { kr: "무료 자료실", en: "Free Resources" },
    sub: { kr: "창업 준비와 AI 활용에 필요한 자료를 무료로 제공합니다.", en: "Free materials for business planning and AI adoption." },
  },
  guidesHead: { kr: "무료 가이드", en: "Free guides" },
  guides: [
    {
      title: { kr: "여성 창업자를 위한 AI 시작 가이드", en: "The AI starter guide for women founders" },
      desc: { kr: "ChatGPT·Claude, 오늘 처음 켜는 분을 위한 첫 10가지.", en: "Your first 10 things to try in ChatGPT & Claude today." },
    },
    {
      title: { kr: "AI로 만드는 내 사업 브랜드", en: "Build your brand with AI" },
      desc: { kr: "이름·로고·웹페이지, 디자이너 없이 만드는 법.", en: "Name, logo, and a webpage — no designer needed." },
    },
    {
      title: { kr: "미국 LLC 설립 체크리스트", en: "U.S. LLC setup checklist" },
      desc: { kr: "설립 전 꼭 확인할 10가지.", en: "10 things to check before you file." },
    },
  ] as { title: L; desc: L }[],
  formHeading: { kr: "무료 특강 & 뉴스레터 신청", en: "Free seminar & newsletter" },
  formBody: {
    kr: "AI로 내 사업을 시작하는 법 — 첫 무료 특강에 초대합니다.",
    en: "How to start your business with AI — you're invited to the first free seminar.",
  },
};

/* ------------------------------------------------------------------ Contact */
export type Channel = { label: string | L; href?: string; copy?: string };

export const contact = {
  hero: {
    eyebrow: { kr: "문의 · 신청", en: "Contact" },
    title: { kr: "상담 및 신청", en: "Consultation & Enrollment" },
    sub: { kr: "프로그램 상담과 수강 신청을 받고 있습니다.", en: "Inquiries and enrollment for HER NEXT programs." },
  },
  email: "esther@hernextschool.com",
  location: { kr: "New Jersey, USA", en: "New Jersey, USA" },
  channelsHead: { kr: "커뮤니티", en: "Community" },
  channels: [
    { label: "Instagram @i.m_possible.esther", href: "https://www.instagram.com/i.m_possible.esther/" },
    { label: "YouTube @EstherKangHomes", href: "https://www.youtube.com/@EstherKangHomes" },
    { label: { kr: "카카오톡 ID: esther3hground", en: "KakaoTalk ID: esther3hground" }, copy: "esther3hground" },
  ] as Channel[],
};

/* --------------------------------------------------------------- Signup form */
export const signup = {
  cardHeading: { kr: "무료 특강 & 뉴스레터 신청", en: "Free seminar & newsletter" },
  cardBody: {
    kr: "AI로 내 사업을 시작하는 법 — 소식을 가장 먼저 받아보세요.",
    en: "How to start your business with AI — be the first to know.",
  },
  nameLabel: { kr: "이름", en: "Name" },
  emailLabel: { kr: "이메일", en: "Email" },
  submit: { kr: "신청하기", en: "Sign up" },
  submitting: { kr: "신청 중...", en: "Signing up..." },
  privacy: { kr: "스팸 없이, 유익한 것만 보냅니다.", en: "No spam. Only what's useful." },
  successTitle: { kr: "신청이 완료되었습니다!", en: "You're on the list!" },
  successBody: {
    kr: "가장 먼저 소식을 받아보실 수 있도록 준비할게요. 곧 이메일로 인사드립니다.",
    en: "We'll make sure you hear the news first. Look out for an email soon.",
  },
  errorMsg: {
    kr: "문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    en: "Something went wrong. Please try again in a moment.",
  },
};

/* -------------------------------------------------------------------- Footer */
export const footer = {
  mission: {
    kr: "미국에 사는 한인 여성이 AI를 무기로 자신의 이름으로 사업을 세우고, 인생의 다음 챕터를 설계하는 AI 비즈니스 스쿨.",
    en: "An AI business school where Korean women in America build a company in their own name — with AI as their weapon — and design their next chapter.",
  },
  bottom: {
    kr: "© 2026 HER NEXT · hernextschool.com — 당신의 다음은, 지금부터.",
    en: "© 2026 HER NEXT · hernextschool.com — Your next chapter starts now.",
  },
};

/* -------------------------------------------------------- Picks (landing) */
export const picks = {
  landingEyebrow: { kr: "에스더의 픽", en: "Esther's Picks" },
  landingHead: {
    kr: "AI와 돈 공부, 여기서부터 무료로 배우세요",
    en: "Learn AI and money here — for free",
  },
  landingSub: {
    kr: "에스더가 직접 고른 유튜브 영상 라이브러리. AI 활용부터 머니까지, 한 편씩 편하게 시작하세요.",
    en: "A YouTube library hand-picked by Esther. From AI skills to money — start one clip at a time.",
  },
  viewAll: { kr: "전체 라이브러리 보기", en: "See the full library" },
  hero: {
    eyebrow: { kr: "에스더의 픽 · 무료 학습", en: "Esther's Picks · Free learning" },
    title: { kr: "에스더의 픽", en: "Esther's Picks" },
    sub: { kr: "에스더가 선정한 AI 활용 및 비즈니스·재무 학습 영상 모음입니다.", en: "Curated videos on AI, business and personal finance." },
  },
  esterNoteLabel: { kr: "에스더의 한 줄", en: "Esther's note" },
  comingSoon: { kr: "영상 준비 중", en: "Coming soon" },
  play: { kr: "재생하기", en: "Play" },
  allTab: { kr: "전체", en: "All" },
};

/* ------------------------------------------- Program (HER NEXT AI CLASS · 4 weeks) */
export const program = {
  hero: {
    eyebrow: { kr: "HER NEXT AI CLASS · 2기 초급반", en: "HER NEXT AI CLASS · Cohort 2 Beginner" },
    title: { kr: "4주 AI 클래스 · 초급반", en: "4-Week AI Class · Beginner" },
    sub: { kr: "4주 뒤, 나만의 AI 비서가 생깁니다. ChatGPT·Claude 기본부터 실습까지, 듣고 끝나는 강의가 아니라 내 일에 바로 쓰는 과정입니다.", en: "In four weeks, you'll have your own AI assistant. From ChatGPT and Claude basics to hands-on practice — not a lecture you just listen to, but skills you use at work right away." },
  },
  weeksHead: { kr: "초급반 · 4주 커리큘럼", en: "Beginner · 4-week curriculum" },
  weekLabels: {
    session: { kr: "세션 내용", en: "Session" },
    homework: { kr: "이번 주 과제", en: "Homework" },
    outcome: { kr: "결과물", en: "Outcome" },
  },
  weeks: [
    {
      no: "WEEK 1",
      title: { kr: "AI는 어떻게 답을 만들까", en: "How AI builds its answers" },
      session: { kr: "원리 이해, 틀린 답 구별하는 법", en: "Understanding how it works, and how to spot a wrong answer" },
      homework: { kr: "배운 내용을 내 일에 바로 써보고 피드백 받기", en: "Use it in your own work right away and get feedback" },
      outcome: null,
    },
    {
      no: "WEEK 2",
      title: { kr: "질문 잘하는 법", en: "Asking good questions" },
      session: { kr: "원하는 결과가 나오는 지시 5요소", en: "The five elements of an instruction that gets the result you want" },
      homework: { kr: "배운 내용을 내 일에 바로 써보고 피드백 받기", en: "Use it in your own work right away and get feedback" },
      outcome: null,
    },
    {
      no: "WEEK 3",
      title: { kr: "용도별 도구 고르기", en: "Choosing the right tool for the job" },
      session: { kr: "이메일 · 문서 · SNS 게시물 직접 만들기", en: "Making emails, documents and SNS posts yourself" },
      homework: { kr: "배운 내용을 내 일에 바로 써보고 피드백 받기", en: "Use it in your own work right away and get feedback" },
      outcome: null,
    },
    {
      no: "WEEK 4",
      title: { kr: "안전하게, 매일 쓰기", en: "Using AI safely, every day" },
      session: { kr: "개인정보 지키는 법, 나만의 AI 루틴", en: "Protecting personal information, and building your own AI routine" },
      homework: null,
      outcome: { kr: "수료 결과물 — My AI Assistant", en: "Your graduation project — My AI Assistant" },
    },
  ] as { no: string; title: L; session: L; homework: L | null; outcome: L | null }[],
  finalOutcome: { kr: "My AI Assistant", en: "My AI Assistant" },
  finalOutcomeLabel: { kr: "수료 결과물", en: "Graduation project" },
  howHead: { kr: "듣고 끝나는 강의가 아닙니다", en: "Not a lecture you just sit through" },
  how: [
    { big: { kr: "주 1회 2시간", en: "2 hours a week" }, desc: { kr: "강의 90분 + 그룹 코칭 30분", en: "90-min class + 30-min group coaching" } },
    { big: { kr: "소수 정예", en: "Small groups" }, desc: { kr: "반별 8~10명, 한 명씩 챙깁니다", en: "8–10 per class, with personal attention" } },
    { big: { kr: "워크북", en: "Workbook" }, desc: { kr: "수업 내용을 정리한 전용 교재", en: "A dedicated workbook for every class" } },
    { big: { kr: "매주 과제", en: "Weekly practice" }, desc: { kr: "내 일에 바로 써보고 피드백", en: "Use it in your work, then get feedback" } },
  ] as { big: L; desc: L }[],
  levelsHead: { kr: "다음 단계도 준비되어 있어요", en: "The next steps are ready too" },
  levels: [
    { tag: { kr: "초급", en: "Beginner" }, title: { kr: "AI 비서", en: "AI assistant" }, now: true },
    { tag: { kr: "중급", en: "Intermediate" }, title: { kr: "AI 업무 흐름", en: "AI workflows" }, now: false },
    { tag: { kr: "고급", en: "Advanced" }, title: { kr: "내 웹사이트 · 앱", en: "Your own website & app" }, now: false },
  ] as { tag: L; title: L; now: boolean }[],
  levelsNote: { kr: "1기 수료생과 함께 다듬은 2기 과정", en: "Refined together with Cohort 1 graduates" },
  includedHead: { kr: "포함 사항", en: "What's included" },
  included: [
    { kr: "주 1회 2시간 라이브 (강의 90분 + 그룹 코칭 30분) · 4주", en: "Weekly 2-hour live session (90-min class + 30-min group coaching) · 4 weeks" },
    { kr: "수업 내용을 정리한 전용 워크북", en: "A dedicated workbook for every class" },
    { kr: "매주 과제 — 내 일에 바로 써보고 피드백", en: "Weekly practice — use it in your work, then get feedback" },
    { kr: "반별 8~10명 소수 정예", en: "Small classes of 8–10" },
    { kr: "수료 결과물: My AI Assistant", en: "Graduation project: My AI Assistant" },
  ] as L[],
  pricing: {
    tag: { kr: "2기 초급반 · 4주 과정", en: "Cohort 2 Beginner · 4 weeks" },
    regularLabel: { kr: "정가", en: "Regular" },
    regular: "$998",
    special: "$499",
    specialLabel: { kr: "2기 한정 50% 할인", en: "Cohort 2 · 50% off" },
    discountLabel: { kr: "2기 한정 50% 할인", en: "Cohort 2 discount (50%)" },
    afterNote: { kr: "3기부터 정가", en: "Regular price from Cohort 3" },
    note: {
      kr: "반별 8~10명 · 11/16 월 오전반 / 11/19 목 저녁반 · 반별 정원이 차면 선착순 마감",
      en: "8–10 per class · Mon 11/16 morning or Thu 11/19 evening · first come, first served",
    },
    cta: { kr: "오픈 알림 신청", en: "Get notified" },
  },
  consult: {
    tag: { kr: "1:1 컨설팅", en: "1:1 Consulting" },
    title: { kr: "AI 사업 아이디어 컨설팅 1:1", en: "AI Business Idea Consulting 1:1" },
    price: { kr: "90분 $250", en: "90 minutes, $250" },
    body: {
      kr: "지금 가진 것에서 AI로 만들 수 있는 수입 아이디어를 찾고 첫 계획을 세웁니다.",
      en: "Find an AI-powered income idea in what you already have and build your first plan.",
    },
    cta: { kr: "문의하기", en: "Inquire" },
  },
  forHead: { kr: "이런 분께 추천합니다", en: "Who this is for" },
  forWhom: [
    { kr: "내 사업을 혼자 다 챙기느라 바쁜 대표님", en: "Business owners juggling everything alone" },
    { kr: "리얼터 · 보험 · 영업처럼 고객 연락이 많은 분", en: "Realtors, insurance and sales pros with lots of client contact" },
    { kr: "회사 업무를 더 빠르게 끝내고 싶은 직장인", en: "Employees who want to finish work faster" },
    { kr: "SNS · 블로그 · 유튜브를 시작하고 싶은 분", en: "Anyone starting SNS, a blog or YouTube" },
    { kr: "사이드 허슬이나 창업을 준비하는 분", en: "Anyone preparing a side hustle or a business" },
    { kr: "AI가 궁금하지만 어디서부터 할지 모르는 분", en: "Curious about AI but not sure where to start" },
  ] as L[],
  faqHead: { kr: "자주 묻는 질문", en: "Frequently asked questions" },
  faq: [
    {
      q: { kr: "코딩을 몰라도 되나요?", en: "Do I need to know how to code?" },
      a: {
        kr: "괜찮습니다. 초급반은 코딩 없이 ChatGPT·Claude 기본부터 시작해요.",
        en: "Not at all. The beginner class starts from ChatGPT and Claude basics — no coding.",
      },
    },
    {
      q: { kr: "영어를 잘 못해도 되나요?", en: "Do I need to speak English well?" },
      a: {
        kr: "네. 모든 세션은 한국어로 진행되고, AI도 한국어로 사용하는 법을 배웁니다.",
        en: "No. Every session is in Korean, and you'll learn to use AI in Korean too.",
      },
    },
    {
      q: { kr: "컴퓨터를 잘 못 다뤄도 되나요?", en: "What if I'm not good with computers?" },
      a: {
        kr: "네. AI 도구 사용은 처음 켜는 것부터 함께 배웁니다. 오히려 이런 분께 가장 추천합니다.",
        en: "That's fine. We learn every AI tool from the very first click — this program is made exactly for you.",
      },
    },
    {
      q: { kr: "AI를 한 번도 써본 적 없는데 괜찮을까요?", en: "I've never used AI. Is that okay?" },
      a: {
        kr: "완전히 괜찮습니다. 1주차에 AI가 어떻게 답을 만드는지부터 함께 시작합니다.",
        en: "Absolutely. Week 1 starts with how AI builds its answers.",
      },
    },
    {
      q: { kr: "시간이 많지 않아도 가능한가요?", en: "Can I do this without much free time?" },
      a: {
        kr: "수업은 주 1회 2시간입니다. 과제는 내 일에 바로 써보는 것이라 따로 시간을 많이 내지 않아도 돼요.",
        en: "Class is 2 hours a week. Practice means using AI in your real work, so it doesn't take much extra time.",
      },
    },
    {
      q: { kr: "신청은 어떻게 하나요?", en: "How do I apply?" },
      a: {
        kr: "수강 신청서를 보내주시면 1~2일 안에 확인 연락과 결제 안내를 드립니다. 결제 순서대로 자리가 확정되고, 반별 정원이 차면 마감됩니다.",
        en: "Send the application form and we'll follow up within 1–2 days with a confirmation and payment instructions. Seats are confirmed in order of payment until each class is full.",
      },
    },
    {
      q: { kr: "환불 규정은 어떻게 되나요?", en: "What is the refund policy?" },
      a: {
        kr: "첫 세션 후 만족하지 못하시면 전액 환불해드립니다.",
        en: "If you're not satisfied after the first session, we'll refund you in full.",
      },
    },
  ] as { q: L; a: L }[],
  detailLink: { kr: "커리큘럼 자세히 보기", en: "See the full curriculum" },
};

/* --------------------------------------------------------------- Story page */
export const story = {
  hero: {
    eyebrow: { kr: "에스더 스토리", en: "Esther's Story" },
    title: { kr: "에스더 스토리", en: "Esther's Story" },
    sub: { kr: "HER NEXT 설립자 에스더가 걸어온 경력과 이야기입니다.", en: "The career and journey of HER NEXT founder Esther." },
  },
  sections: [
    {
      title: { kr: "열 살, 아무도 가르쳐주지 않았습니다", en: "At ten, no one taught me" },
      body: {
        kr: "저는 열 살에 미국에 왔습니다. 영어 한마디 못 하는 아이에게 미국은 친절하지 않았습니다. 그 시절 이민자 부모님들은 자녀를 학원에 데려다주고 진로를 설계해줄 여유가 없었습니다. 하루하루 생존하는 것이 전부였으니까요. 그래서 저는 어려서부터 스스로 배웠습니다. 영어도, 돈도, 세상도. 그때는 그것이 불행인 줄 알았습니다. 지금 돌아보면, 그것이 제 인생 최고의 자산이었습니다.",
        en: "I came to America at ten years old. To a child who couldn't speak a word of English, America was not kind. Back then, immigrant parents had no room to drive their kids to lessons or map out their futures — surviving each day was everything. So from a young age, I taught myself. English, money, the world. At the time I thought it was misfortune. Looking back, it became the greatest asset of my life.",
      },
    },
    {
      title: { kr: "스무 가지가 넘는 일, 스무 개가 넘는 자격증", en: "More Than Twenty Jobs, More Than Twenty Certifications" },
      body: {
        kr: "열네 살부터 일을 시작해서, 지금까지 스무 가지가 넘는 일을 해봤습니다. 그리고 스무 개가 넘는 라이센스와 자격을 취득했습니다. 저에게는 물려받은 것이 없었고, 그래서 배우는 것만이 유일한 자본이었습니다. 그 과정에서 확실히 알게 됐습니다 — 능력은 타고나는 것이 아니라 만들어지는 것이라는 걸. 그것도 생각보다 훨씬 빠르게요.",
        en: "I started working at fourteen, and since then I've done more than twenty different jobs. I've earned over twenty licenses and certifications. I inherited nothing, so learning was my only capital. Along the way I learned one thing for certain — ability isn't something you're born with, it's something you build. And far faster than you'd think.",
      },
    },
    {
      title: { kr: "세 번 무너지고, 세 번 일어났습니다", en: "I fell three times, and rose three times" },
      body: {
        kr: "스물아홉 살, 저는 완전히 망했습니다. 사업이 무너졌고, 손에 남은 것이 없었습니다. 그때 저를 다시 일으킨 것은 돈도, 인맥도, 운도 아니었습니다. 열네 살부터 몸으로 쌓아온 경험들, 그리고 '나는 다시 배워서 다시 시작할 수 있다'는 확신이었습니다. 그 후로 무역업에서, 교육 사업에서, 그리고 지금의 부동산에서 — 저는 세 번 성공했습니다. 부동산에서는 시작한 지 3년 만에 밀리언 달러 커미션을 달성했습니다.",
        en: "At twenty-nine, I lost everything. My business collapsed and nothing was left in my hands. What lifted me back up wasn't money, connections, or luck. It was the experience I'd built with my own hands since I was fourteen — and the conviction that 'I can learn again and start again.' After that, in trade, in education, and now in real estate, I succeeded three times. In real estate, I reached a million dollars in commissions within three years of starting.",
      },
    },
    {
      title: { kr: "저에게 없었던 것은 능력이 아니었습니다", en: "What I lacked was never ability" },
      body: {
        kr: "제가 그토록 오래 돌아온 이유는 능력이 부족해서가 아니었습니다. 아이디어를 보여주는 사람이 없었고, 먼저 해본 사람이 없었고, 주변에 성공한 여성이 없었고, '너도 할 수 있다'고 말해주는 사람이 없었기 때문입니다. 저는 20년 걸려 몸으로 배웠습니다. 곁에서 길을 보여주는 사람이 한 명만 있었다면, 그 시간은 훨씬 짧았을 것입니다.",
        en: "The reason I took such a long way around was never a lack of ability. It was that no one showed me the possibilities, no one had gone before me, there were no successful women around me, and no one told me 'you can do this too.' It took me twenty years to learn the hard way. Had there been just one person beside me to show the path, it would have taken a fraction of the time.",
      },
    },
    {
      title: { kr: "그래서 HER NEXT를 만들었습니다", en: "So I built HER NEXT" },
      body: {
        kr: "HER NEXT는 제가 제 딸에게 가르치고 싶은 것을 가르치는 곳입니다. 제 친구에게, 홀로 아이를 키우는 싱글맘에게, 아이를 다 키우고 '이제 나는 뭘 하지' 묻는 여성에게 — 제가 20년 걸려 배운 것을 훨씬 짧은 시간 안에 전하고 싶습니다. 우리는 100세 시대를 삽니다. 쉰 살이라면, 아직 인생의 반도 살지 않았습니다. 그리고 이제 우리에게는 AI라는, 제 시절에는 없던 강력한 무기가 있습니다.",
        en: "HER NEXT teaches what I would want to teach my own daughter. To my friends, to single moms raising children alone, to the woman who has finished raising her kids and asks 'what do I do now' — I want to pass on what took me twenty years, in far less time. We live in the age of one hundred years. If you're fifty, you haven't even lived half of your life yet. And now we have AI — a powerful weapon my generation never had.",
      },
    },
    {
      title: { kr: "HER NEXT가 약속하는 것", en: "What HER NEXT promises" },
      body: {
        kr: "돈 버는 능력만 가르치지 않습니다. AI를 내 것으로 만드는 능력, 능력 있는 엄마, 능력 있는 할머니, 능력 있는 여성이 되는 것. 그 능력으로 몸도 마음도 건강하게, 여행하고, 운동하고, 새로운 것에 도전하며 인생을 즐기는 것. 성공한 사람이 아니라, 다시 일어나 본 사람에게 배우세요. 당신의 다음은, 지금부터 시작됩니다. — 에스더",
        en: "We don't only teach how to make money. We teach you to make AI your own — to become a capable mother, a capable grandmother, a capable woman — and use that capability to stay healthy in body and mind, to travel, to move, to try new things, and to enjoy your life. Don't learn from someone who merely succeeded — learn from someone who got back up. Your next chapter starts now. — Esther",
      },
    },
  ] as { title: L; body: L }[],
  ctaProgram: { kr: "프로그램 보기", en: "View the program" },
  ctaSeminar: { kr: "무료 특강 신청", en: "Join the free seminar" },
  readFull: { kr: "전체 스토리 읽기", en: "Read the full story" },
  jobs: {
    title: { kr: "14살부터 46살까지, 제가 해온 일들", en: "Every job I've held, from 14 to 46" },
    sub: {
      kr: "부끄러운 일은 하나도 없습니다. 이 모든 일이 지금의 저를 만들었으니까요.",
      en: "I'm not ashamed of a single one. Every job on this list built who I am today.",
    },
    list: [
      { kr: "과외 선생님", en: "Private tutor" },
      { kr: "생선가게 판매", en: "Fish market sales" },
      { kr: "네일가게 알바", en: "Nail salon assistant" },
      { kr: "마트 캐셔", en: "Grocery store cashier" },
      { kr: "커피숍 서빙", en: "Coffee shop server" },
      { kr: "과일가게 판매", en: "Fruit stand sales" },
      { kr: "패션 디자이너", en: "Fashion designer" },
      { kr: "프리마켓 판매", en: "Flea market vendor" },
      { kr: "의류 매장 운영", en: "Clothing store owner" },
      { kr: "무역업 홀세일", en: "Wholesale trading" },
      { kr: "온라인 도매 이커머스", en: "Online wholesale e-commerce" },
      { kr: "아동복 매장 운영", en: "Children's clothing store owner" },
      { kr: "아마존 화장품 판매", en: "Amazon cosmetics seller" },
      { kr: "Etsy 온라인 판매", en: "Etsy online seller" },
      { kr: "학원 사업", en: "Education academy owner" },
      { kr: "전국 교재 프로그램 납품", en: "Nationwide textbook program supplier" },
      { kr: "미술심리 코칭", en: "Art therapy coaching" },
      { kr: "입시 컨설팅", en: "College admissions consultant" },
      { kr: "재무 및 보험 컨설턴트", en: "Financial & insurance consultant" },
      { kr: "부동산 리얼터", en: "Real estate REALTOR®" },
    ] as L[],
    nowLabel: { kr: "현재", en: "Now" },
    closing: {
      kr: "그리고 21번째는, 당신을 가르치는 일입니다.",
      en: "And number 21 is teaching you.",
    },
  },
  certs: {
    eyebrow: "CERTIFIED. TRUSTED. EMPOWERING.",
    title: { kr: "어쩌다 모은 자격증들", en: "My Accidental Certifications" },
    intro: {
      kr: "처음 공부를 시작한 이유는 단 하나였습니다. 먹고 살기 위해서. 세 아이를 키우며 살아남기 위한 최선의 선택이었습니다. 생존을 위해 견뎌온 '증'들은, 이제 나의 가장 큰 자산이 되었습니다.",
      en: "I started studying for one reason only: to survive. It was the best choice I could make while raising three children. The certificates I earned to survive have become my greatest asset.",
    },
    photoCaption: {
      kr: "에스더의 실제 자격증 벽",
      en: "Esther's actual certification wall",
    },
    firstBadge: { kr: "첫 번째 증", en: "The first one" },
    groups: [
      {
        label: { kr: "금융 · 부동산", en: "Finance & Real Estate" },
        items: [
          { kr: "Financial Planner 재무설계사", en: "Financial Planner" },
          { kr: "NJ Real Estate Agent 공인중개사", en: "NJ Real Estate Agent" },
          { kr: "Home Staging & Color Consultant", en: "Home Staging & Color Consultant" },
          { kr: "Annuity/보험 전문 과정 수료", en: "Annuity / Insurance Specialist Program" },
        ] as L[],
      },
      {
        label: { kr: "교육 · 상담", en: "Education & Counseling" },
        items: [
          { kr: "청소년상담사 1급", en: "Youth Counselor, Level 1" },
          { kr: "심리상담사 1급", en: "Psychological Counselor, Level 1" },
          { kr: "아동미술 심리상담사 1급", en: "Child Art Therapy Counselor, Level 1" },
          { kr: "진로적성 상담사 1급", en: "Career Aptitude Counselor, Level 1" },
          { kr: "대학 진로진학 컨설팅", en: "College Admissions Consulting" },
          { kr: "한국학습 심리측정 연구 교육이사", en: "Korean Learning Psychometrics — Education Director" },
          { kr: "인재양성 지도사", en: "Talent Development Instructor" },
        ] as L[],
      },
      {
        label: { kr: "경영 · 비즈니스", en: "Business & Management" },
        items: [
          { kr: "경영지도사(마케팅) 1급", en: "Management Consultant (Marketing), Level 1" },
          { kr: "에듀플랫 경영컨설턴트", en: "EduPlat Management Consultant" },
          { kr: "CEO사관학교 6기", en: "CEO Academy, 6th Cohort" },
          { kr: "비전로드맵 디자이너", en: "Vision Roadmap Designer" },
          { kr: "제빵 창업 Master", en: "Bakery Startup Master" },
          { kr: "성공책 글쓰기 수료", en: "Success Book Writing Program" },
        ] as L[],
      },
      {
        label: { kr: "학력 · 기초", en: "Education & Foundations" },
        items: [
          { kr: "뉴욕 파슨스 디자인스쿨 졸업", en: "Parsons School of Design, NY — Graduate" },
          { kr: "Business, Accounting, Public Speaking 과정", en: "Business, Accounting & Public Speaking Courses" },
          { kr: "27년 된 운전면허 — 나의 첫 번째 '증'", en: "27-year-old driver's license — my very first certificate", first: true },
        ] as (L & { first?: boolean })[],
      },
    ],
    quotes: {
      one: { kr: "떨어지면, 또 하면 되지.", en: "If I fail, I'll just try again." },
      two: {
        kr: "이제는 자격증보다, AI를 어떻게 다룰 것인가를 배워야 하는 시대입니다.",
        en: "Today, the skill to learn isn't another certificate — it's how to work with AI.",
      },
      closing: {
        kr: "나 같은 사람도 할 수 있다면, 누구나 할 수 있습니다.",
        en: "If someone like me could do it, anyone can.",
      },
    },
    closingLine: {
      kr: "공부를 좋아해서가 아닙니다. 필요하면 그냥 도전했을 뿐입니다. 그리고 그 방법을, HER NEXT에서 알려드립니다.",
      en: "Not because I love studying — I simply tried whenever it was needed. And at HER NEXT, I'll show you how.",
    },
    cta: { kr: "프로그램 보기", en: "See the Program" },
  },
};
