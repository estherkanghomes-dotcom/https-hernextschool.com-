export type VideoCategory =
  | "money"
  | "sidehustle"
  | "ai"
  | "usmoney"
  | "mindset";

export type Video = {
  id: string;
  category: VideoCategory;
  title_kr: string;
  title_en: string;
  /**
   * How to add a real video:
   * On YouTube, open the video and copy the part of the URL AFTER "watch?v=".
   * Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ  ->  youtubeId: "dQw4w9WgXcQ"
   * Leave it as "" (empty string) to show the "Coming soon" placeholder card.
   */
  youtubeId: string;
  estherNoteKr: string;
  estherNoteEn: string;
};

export const videoCategories: {
  id: VideoCategory;
  emoji: string;
  label_kr: string;
  label_en: string;
}[] = [
  { id: "money", emoji: "💰", label_kr: "돈 공부 첫걸음", label_en: "Money Basics" },
  { id: "sidehustle", emoji: "🚀", label_kr: "사이드허슬", label_en: "Side Hustles" },
  { id: "ai", emoji: "🤖", label_kr: "AI·앱 활용", label_en: "AI & Apps" },
  { id: "usmoney", emoji: "🇺🇸", label_kr: "미국 생활 머니", label_en: "U.S. Money Life" },
  { id: "mindset", emoji: "💪", label_kr: "마인드", label_en: "Mindset" },
];

export const videos: Video[] = [
  // 💰 돈 공부 첫걸음 / Money Basics
  {
    id: "money-1",
    category: "money",
    title_kr: "월급만으로는 부족한 이유, 돈의 구조부터",
    title_en: "Why a paycheck alone isn't enough — start with how money works",
    youtubeId: "",
    estherNoteKr: "돈 공부를 어디서 시작할지 모르겠다면, 이 영상 하나면 됩니다. 저도 여기서 시작했어요.",
    estherNoteEn: "If you don't know where to begin, start here. This is exactly where I began.",
  },
  {
    id: "money-2",
    category: "money",
    title_kr: "예산 짜기: 가계부보다 중요한 3개의 통장",
    title_en: "Budgeting: the three accounts that matter more than a spreadsheet",
    youtubeId: "",
    estherNoteKr: "복잡한 가계부는 오래 못 갑니다. 통장 3개로 단순하게 시작하세요.",
    estherNoteEn: "Complicated budgets never last. Keep it simple with three accounts.",
  },
  {
    id: "money-3",
    category: "money",
    title_kr: "비상금, 얼마를 어디에 모아야 할까요",
    title_en: "Your emergency fund: how much, and where to keep it",
    youtubeId: "",
    estherNoteKr: "사업을 시작하기 전에 이것부터. 마음의 여유가 곧 실행력입니다.",
    estherNoteEn: "Do this before you start a business. Peace of mind fuels action.",
  },
  {
    id: "money-4",
    category: "money",
    title_kr: "빚을 갚는 순서, 이자부터 이해하기",
    title_en: "Paying off debt in the right order — start with interest",
    youtubeId: "",
    estherNoteKr: "빚이 있어도 시작할 수 있습니다. 순서만 알면 훨씬 빨라져요.",
    estherNoteEn: "You can start even with debt. Knowing the order makes it faster.",
  },

  // 🚀 사이드허슬 / Side Hustles
  {
    id: "sidehustle-1",
    category: "sidehustle",
    title_kr: "내가 이미 가진 것으로 시작하는 첫 부업",
    title_en: "Your first side hustle using what you already have",
    youtubeId: "",
    estherNoteKr: "새로운 걸 배우기 전에, 이미 잘하는 것부터. 거기에 돈이 있습니다.",
    estherNoteEn: "Before learning something new, use what you're already good at. That's where the money is.",
  },
  {
    id: "sidehustle-2",
    category: "sidehustle",
    title_kr: "집에서 시작하는 소규모 서비스 사업",
    title_en: "Starting a small service business from home",
    youtubeId: "",
    estherNoteKr: "아이를 키우면서도 가능합니다. 저희 수강생들이 가장 많이 시작한 형태예요.",
    estherNoteEn: "It works even while raising kids — the most common start among our students.",
  },
  {
    id: "sidehustle-3",
    category: "sidehustle",
    title_kr: "첫 상품 가격, 이렇게 정하세요",
    title_en: "How to price your very first offer",
    youtubeId: "",
    estherNoteKr: "너무 싸게 팔지 마세요. 가격은 자신감입니다.",
    estherNoteEn: "Don't undersell yourself. Your price is your confidence.",
  },
  {
    id: "sidehustle-4",
    category: "sidehustle",
    title_kr: "부업을 사업으로 키우는 타이밍",
    title_en: "When to turn a side hustle into a real business",
    youtubeId: "",
    estherNoteKr: "언제 전업으로 넘어갈지, 숫자로 판단하는 법을 알려드릴게요.",
    estherNoteEn: "I'll show you how to decide when to go full-time — using the numbers.",
  },

  // 🤖 AI·앱 활용 / AI & Apps
  {
    id: "ai-1",
    category: "ai",
    title_kr: "AI로 사업 아이디어 3개 만들기",
    title_en: "Generate 3 business ideas with AI",
    youtubeId: "",
    estherNoteKr: "컴퓨터를 잘 몰라도 괜찮아요. 한 문장만 입력하면 됩니다.",
    estherNoteEn: "You don't need to be techy. One sentence is all it takes.",
  },
  {
    id: "ai-2",
    category: "ai",
    title_kr: "무료 AI 도구로 로고와 홍보물 만들기",
    title_en: "Make a logo and promo graphics with free AI tools",
    youtubeId: "",
    estherNoteKr: "디자이너 없이도 프로처럼 보이게. 첫 브랜드는 이걸로 충분해요.",
    estherNoteEn: "Look professional without a designer. Enough for your first brand.",
  },
  {
    id: "ai-3",
    category: "ai",
    title_kr: "챗봇으로 고객 문의에 빠르게 답하기",
    title_en: "Answer customer questions faster with a chatbot",
    youtubeId: "",
    estherNoteKr: "혼자 일해도 팀처럼 움직일 수 있습니다. 시간을 아껴요.",
    estherNoteEn: "Work solo but move like a team. Save your time.",
  },
  {
    id: "ai-4",
    category: "ai",
    title_kr: "SNS 콘텐츠, AI로 일주일치 한 번에",
    title_en: "A week of social content in one AI session",
    youtubeId: "",
    estherNoteKr: "홍보가 막막했다면 이 방법을 꼭 써보세요. 저도 매주 씁니다.",
    estherNoteEn: "If marketing feels overwhelming, try this. I use it every week.",
  },

  // 🇺🇸 미국 생활 머니 / U.S. Money Life
  {
    id: "usmoney-1",
    category: "usmoney",
    title_kr: "택스 시즌 전에 꼭 알아야 할 기본",
    title_en: "Tax-season basics you must know beforehand",
    youtubeId: "",
    estherNoteKr: "택스 시즌 전에 꼭 보세요. 저는 고객들에게 매년 이 내용을 설명합니다.",
    estherNoteEn: "Watch this before tax season. I explain this to my clients every single year.",
  },
  {
    id: "usmoney-2",
    category: "usmoney",
    title_kr: "미국 크레딧 점수, 처음부터 쌓는 법",
    title_en: "Building your U.S. credit score from zero",
    youtubeId: "",
    estherNoteKr: "크레딧은 미국에서의 신용이자 기회입니다. 늦지 않았어요.",
    estherNoteEn: "Credit is your trust — and your opportunity — in America. It's never too late.",
  },
  {
    id: "usmoney-3",
    category: "usmoney",
    title_kr: "개인 계좌와 사업 계좌, 왜 나눠야 할까",
    title_en: "Why you must separate personal and business accounts",
    youtubeId: "",
    estherNoteKr: "이걸 안 나누면 나중에 정말 힘들어집니다. 처음부터 나누세요.",
    estherNoteEn: "Not separating these will hurt you later. Split them from day one.",
  },
  {
    id: "usmoney-4",
    category: "usmoney",
    title_kr: "은퇴 계좌(IRA·401k) 여성이 꼭 챙기기",
    title_en: "Retirement accounts (IRA / 401k) every woman should claim",
    youtubeId: "",
    estherNoteKr: "미래의 나를 위한 선물입니다. 작게라도 오늘 시작하세요.",
    estherNoteEn: "A gift to your future self. Start today, even if it's small.",
  },

  // 💪 마인드 / Mindset
  {
    id: "mindset-1",
    category: "mindset",
    title_kr: "다시 시작하는 용기, 나이는 숫자입니다",
    title_en: "The courage to start again — age is just a number",
    youtubeId: "",
    estherNoteKr: "쉰 살이라면 아직 인생의 반도 안 왔어요. 저를 믿으세요.",
    estherNoteEn: "If you're fifty, you're not even halfway. Trust me on this.",
  },
  {
    id: "mindset-2",
    category: "mindset",
    title_kr: "실패를 자산으로 바꾸는 법",
    title_en: "Turning failure into your greatest asset",
    youtubeId: "",
    estherNoteKr: "저는 세 번 무너졌습니다. 그 경험이 지금의 저를 만들었어요.",
    estherNoteEn: "I fell three times. Those falls made who I am today.",
  },
  {
    id: "mindset-3",
    category: "mindset",
    title_kr: "완벽하지 않아도 시작하는 사람이 이깁니다",
    title_en: "The one who starts imperfectly wins",
    youtubeId: "",
    estherNoteKr: "준비가 다 될 때까지 기다리면 영원히 못 시작해요. 오늘 한 걸음.",
    estherNoteEn: "Wait until you're fully ready and you'll never start. One step today.",
  },
  {
    id: "mindset-4",
    category: "mindset",
    title_kr: "혼자가 아니라 함께 가야 멀리 갑니다",
    title_en: "You go further together, not alone",
    youtubeId: "",
    estherNoteKr: "곁에 길을 보여주는 한 사람. 그 힘을 저는 압니다.",
    estherNoteEn: "One person to show the way. I know that power firsthand.",
  },
];
