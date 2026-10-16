// Client-safe definitions for the HER NEXT app: onboarding, memory, studio, vault.
export type L = { kr: string; en: string };

export type OnboardingQ = { key: string; q: L; options: L[]; allowText?: boolean };

export const onboarding: OnboardingQ[] = [
  { key: "stage", q: { kr: "지금 사업은 어느 단계인가요?", en: "Where is your business today?" }, options: [
    { kr: "아이디어만 있어요", en: "Just an idea" }, { kr: "막 시작했어요", en: "Just started" },
    { kr: "운영 중이에요", en: "Already running" }, { kr: "키우고 싶어요", en: "Ready to grow" } ] },
  { key: "problem", q: { kr: "지금 가장 큰 고민은 무엇인가요?", en: "What is your biggest challenge right now?" }, options: [
    { kr: "무엇부터 할지 모르겠어요", en: "Not sure where to start" }, { kr: "고객이 부족해요", en: "Not enough customers" },
    { kr: "시간이 부족해요", en: "Not enough time" }, { kr: "브랜드가 약해요", en: "My brand feels weak" } ], allowText: true },
  { key: "goal90", q: { kr: "90일 뒤 이루고 싶은 목표는?", en: "What do you want to achieve in 90 days?" }, options: [
    { kr: "첫 고객 만들기", en: "Land my first customers" }, { kr: "월 매출 올리기", en: "Grow monthly revenue" },
    { kr: "법인/사업자 등록", en: "Register my business" }, { kr: "온라인 존재감 만들기", en: "Build my online presence" } ], allowText: true },
  { key: "time", q: { kr: "일주일에 사업에 쓸 수 있는 시간은?", en: "How much time can you give each week?" }, options: [
    { kr: "3시간 이하", en: "Under 3 hours" }, { kr: "3–7시간", en: "3–7 hours" },
    { kr: "7–15시간", en: "7–15 hours" }, { kr: "15시간 이상", en: "15+ hours" } ] },
  { key: "ai", q: { kr: "AI나 디지털 도구는 얼마나 써보셨나요?", en: "How familiar are you with AI and digital tools?" }, options: [
    { kr: "처음이에요", en: "Brand new" }, { kr: "조금 써봤어요", en: "Tried a little" },
    { kr: "자주 써요", en: "Use it often" } ] },
  { key: "industry", q: { kr: "어떤 업종인가요?", en: "What is your industry?" }, options: [
    { kr: "음식/베이킹", en: "Food & baking" }, { kr: "뷰티/웰니스", en: "Beauty & wellness" },
    { kr: "코칭/컨설팅/교육", en: "Coaching, consulting, education" }, { kr: "온라인 쇼핑", en: "Online shop" } ], allowText: true },
  { key: "customers", q: { kr: "주요 고객은 누구인가요?", en: "Who are your customers?" }, options: [
    { kr: "미국 한인", en: "Korean Americans" }, { kr: "현지 미국인", en: "Local Americans" },
    { kr: "엄마/가족", en: "Moms & families" }, { kr: "직장인/전문직", en: "Professionals" } ], allowText: true },
  { key: "revenue", q: { kr: "현재 매출 단계는?", en: "What is your revenue stage?" }, options: [
    { kr: "아직 없음", en: "No revenue yet" }, { kr: "월 $1,000 이하", en: "Under $1k/month" },
    { kr: "월 $1,000–5,000", en: "$1k–5k/month" }, { kr: "월 $5,000 이상", en: "$5k+/month" } ] },
];

export const memorySections: { key: string; label: L; hint: L }[] = [
  { key: "who_i_am", label: { kr: "나는 누구인가", en: "Who I Am" }, hint: { kr: "나의 배경, 단계, 시간", en: "Background, stage, time" } },
  { key: "who_i_serve", label: { kr: "나의 고객", en: "Who I Serve" }, hint: { kr: "누구를 돕나요?", en: "Who do you help?" } },
  { key: "what_i_sell", label: { kr: "내가 파는 것", en: "What I Sell" }, hint: { kr: "업종, 상품, 가격", en: "Industry, offers, pricing" } },
  { key: "my_brand", label: { kr: "나의 브랜드", en: "My Brand" }, hint: { kr: "톤, 메시지, 이야기", en: "Tone, message, story" } },
  { key: "my_goals", label: { kr: "나의 목표", en: "My Goals" }, hint: { kr: "90일 목표와 고민", en: "90-day goal and challenge" } },
  { key: "my_work", label: { kr: "내가 만든 것", en: "My Work" }, hint: { kr: "완성한 결과물", en: "Completed deliverables" } },
  { key: "my_progress", label: { kr: "나의 진행", en: "My Progress" }, hint: { kr: "달성한 것", en: "What you've achieved" } },
  { key: "my_next", label: { kr: "나의 다음", en: "My Next" }, hint: { kr: "다음 할 일", en: "Your next move" } },
];

export type Memory = Record<string, string>;

export function memoryFromAnswers(a: Record<string, string>, lang: "kr" | "en" = "kr"): Memory {
  const kr = lang === "kr";
  return {
    who_i_am: kr ? `단계: ${a.stage ?? ""} · 주간 시간: ${a.time ?? ""} · AI 경험: ${a.ai ?? ""}` : `Stage: ${a.stage ?? ""}. Weekly time: ${a.time ?? ""}. AI experience: ${a.ai ?? ""}.`,
    who_i_serve: a.customers ?? "",
    what_i_sell: kr ? `업종: ${a.industry ?? ""} · 매출: ${a.revenue ?? ""}` : `Industry: ${a.industry ?? ""}. Revenue: ${a.revenue ?? ""}.`,
    my_brand: "",
    my_goals: kr ? `90일 목표: ${a.goal90 ?? ""} · 가장 큰 고민: ${a.problem ?? ""}` : `90-day goal: ${a.goal90 ?? ""}. Biggest challenge: ${a.problem ?? ""}.`,
    my_work: "",
    my_progress: "",
    my_next: "",
  };
}

export const vaultFolders: { key: string; label: L }[] = [
  { key: "brand", label: { kr: "브랜드", en: "Brand" } },
  { key: "customers", label: { kr: "고객", en: "Customers" } },
  { key: "offers", label: { kr: "상품·가격", en: "Offers & Pricing" } },
  { key: "website", label: { kr: "웹사이트", en: "Website" } },
  { key: "content", label: { kr: "콘텐츠", en: "Content" } },
  { key: "emails", label: { kr: "이메일", en: "Emails" } },
  { key: "marketing", label: { kr: "마케팅", en: "Marketing" } },
  { key: "sops", label: { kr: "업무 매뉴얼", en: "SOPs" } },
  { key: "plans", label: { kr: "사업 계획", en: "Business Plans" } },
];

export type Workflow = {
  key: string; area: string; title: L; deliverable: L; folder: string;
  questions: { key: string; q: L; placeholder: L }[];
};

export const areas: { key: string; label: L; desc: L }[] = [
  { key: "start", label: { kr: "사업 시작하기", en: "Start My Business" }, desc: { kr: "아이디어를 실행 계획으로", en: "Turn an idea into a plan" } },
  { key: "brand", label: { kr: "브랜드 만들기", en: "Build My Brand" }, desc: { kr: "나다운 메시지와 톤", en: "Your message and voice" } },
  { key: "customers", label: { kr: "고객 늘리기", en: "Get More Customers" }, desc: { kr: "첫 고객부터 단골까지", en: "From first to loyal" } },
  { key: "content", label: { kr: "콘텐츠 만들기", en: "Create Content" }, desc: { kr: "인스타·블로그 글", en: "Posts that sell" } },
  { key: "website", label: { kr: "웹사이트 만들기", en: "Build a Website" }, desc: { kr: "홈페이지 문구 완성", en: "Website copy, done" } },
  { key: "email", label: { kr: "이메일·후속 연락", en: "Email & Follow-Up" }, desc: { kr: "놓치지 않는 연락", en: "Never miss a follow-up" } },
  { key: "organize", label: { kr: "사업 정리하기", en: "Organize My Business" }, desc: { kr: "업무를 시스템으로", en: "Turn tasks into systems" } },
  { key: "automate", label: { kr: "업무 자동화", en: "Automate My Work" }, desc: { kr: "반복 업무 줄이기", en: "Less repetitive work" } },
];

export const workflows: Workflow[] = [
  { key: "launch-plan", area: "start", folder: "plans", title: { kr: "30일 사업 시작 계획", en: "30-day launch plan" }, deliverable: { kr: "주차별 실행 계획 + 미국 등록 체크리스트", en: "Week-by-week plan + US registration checklist" },
    questions: [ { key: "idea", q: { kr: "어떤 사업을 하고 싶으세요?", en: "What business do you want to start?" }, placeholder: { kr: "예: 집에서 만드는 한식 도시락", en: "e.g. Homemade Korean lunch boxes" } },
      { key: "state", q: { kr: "어느 주에 계신가요?", en: "Which state are you in?" }, placeholder: { kr: "예: 캘리포니아", en: "e.g. California" } } ] },
  { key: "brand-story", area: "brand", folder: "brand", title: { kr: "브랜드 한 줄 소개 + 스토리", en: "Brand one-liner + story" }, deliverable: { kr: "한 줄 소개 3안, 브랜드 스토리, 톤 가이드", en: "3 one-liners, brand story, voice guide" },
    questions: [ { key: "why", q: { kr: "왜 이 사업을 시작하셨나요?", en: "Why did you start this business?" }, placeholder: { kr: "나의 이야기를 편하게 적어주세요", en: "Share your story in your own words" } },
      { key: "feel", q: { kr: "고객이 어떤 느낌을 받길 원하세요?", en: "How should customers feel?" }, placeholder: { kr: "예: 따뜻하고 믿음직한", en: "e.g. warm and trusted" } } ] },
  { key: "first-customers", area: "customers", folder: "marketing", title: { kr: "첫 고객 10명 만들기", en: "Land your first 10 customers" }, deliverable: { kr: "고객 찾는 곳, 연락 메시지, 2주 계획", en: "Where to find them, outreach messages, 2-week plan" },
    questions: [ { key: "offer", q: { kr: "무엇을 얼마에 파시나요?", en: "What do you sell and at what price?" }, placeholder: { kr: "예: 도시락 $15", en: "e.g. Lunch box $15" } },
      { key: "network", q: { kr: "지금 연결된 사람들/커뮤니티는?", en: "What networks or communities do you have?" }, placeholder: { kr: "예: 교회, 학부모 단톡방", en: "e.g. church, parents' group chat" } } ] },
  { key: "content-week", area: "content", folder: "content", title: { kr: "일주일 인스타 콘텐츠", en: "One week of Instagram content" }, deliverable: { kr: "게시물 5개 (캡션·해시태그·사진 아이디어)", en: "5 posts with captions, hashtags, photo ideas" },
    questions: [ { key: "topic", q: { kr: "이번 주에 알리고 싶은 것은?", en: "What do you want to promote this week?" }, placeholder: { kr: "예: 추석 선물 세트", en: "e.g. Holiday gift set" } },
      { key: "lang", q: { kr: "어떤 언어로 쓸까요?", en: "Which language should posts use?" }, placeholder: { kr: "예: 한국어+영어", en: "e.g. Korean + English" } } ] },
  { key: "website-copy", area: "website", folder: "website", title: { kr: "홈페이지 문구", en: "Website copy" }, deliverable: { kr: "메인·소개·상품·문의 페이지 문구", en: "Home, about, offers, contact copy" },
    questions: [ { key: "offers", q: { kr: "대표 상품/서비스 3개는?", en: "Your top 3 offers?" }, placeholder: { kr: "예: 도시락, 케이터링, 클래스", en: "e.g. lunch boxes, catering, classes" } },
      { key: "action", q: { kr: "방문자가 무엇을 하길 원하세요?", en: "What should visitors do?" }, placeholder: { kr: "예: 카톡으로 주문", en: "e.g. Order by text" } } ] },
  { key: "follow-up", area: "email", folder: "emails", title: { kr: "후속 이메일 3통", en: "3-email follow-up" }, deliverable: { kr: "문의 고객용 이메일 시퀀스", en: "Follow-up sequence for leads" },
    questions: [ { key: "who", q: { kr: "누구에게 보내는 메일인가요?", en: "Who are these emails for?" }, placeholder: { kr: "예: 상담만 받고 결정 안 한 고객", en: "e.g. Leads who had a consult" } },
      { key: "goal", q: { kr: "메일의 목표는?", en: "What is the goal?" }, placeholder: { kr: "예: 첫 구매", en: "e.g. First purchase" } } ] },
  { key: "sop", area: "organize", folder: "sops", title: { kr: "업무 매뉴얼(SOP)", en: "Standard operating procedure" }, deliverable: { kr: "단계별 업무 매뉴얼 + 체크리스트", en: "Step-by-step SOP + checklist" },
    questions: [ { key: "task", q: { kr: "정리하고 싶은 반복 업무는?", en: "Which recurring task to systemize?" }, placeholder: { kr: "예: 주문 받기부터 배달까지", en: "e.g. From order to delivery" } },
      { key: "pain", q: { kr: "지금 어디서 막히나요?", en: "Where does it break down?" }, placeholder: { kr: "예: 주문을 자주 놓쳐요", en: "e.g. I miss orders" } } ] },
  { key: "automation", area: "automate", folder: "sops", title: { kr: "자동화 설계도", en: "Automation blueprint" }, deliverable: { kr: "쉬운 도구로 만드는 자동화 단계", en: "Simple-tool automation steps" },
    questions: [ { key: "task", q: { kr: "매주 반복하는 귀찮은 일은?", en: "What repetitive task bugs you weekly?" }, placeholder: { kr: "예: 예약 확인 문자", en: "e.g. Booking confirmation texts" } },
      { key: "tools", q: { kr: "지금 쓰는 도구는?", en: "Which tools do you use now?" }, placeholder: { kr: "예: 구글 시트, 카카오톡", en: "e.g. Google Sheets, Instagram" } } ] },
];

export const workflowByKey = (k: string) => workflows.find((w) => w.key === k);
