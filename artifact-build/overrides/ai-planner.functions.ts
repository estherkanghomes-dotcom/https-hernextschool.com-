// Artifact build: the AI planner runs through the page's Claude ("sample") capability
// instead of the Lovable server function, so visitors get a real plan on the published page.
export type PlannerInput = { idea: string; experience: string; budget: string; industry: string; lang: "kr" | "en" };
export type PlannerResult = { ok: true; text: string } | { ok: false; error: string };

type Sample = ((input: string, opts?: Record<string, unknown>) => Promise<{ text: string }>) | null;
declare global {
  interface Window { claude?: { use?: (name: string) => Promise<unknown> } }
}

export const generateBusinessPlan = async ({ data }: { data: PlannerInput }): Promise<PlannerResult> => {
  const kr = data.lang === "kr";
  if ((data.idea ?? "").trim().length < 5)
    return { ok: false, error: kr ? "사업 아이디어를 조금 더 자세히 적어주세요." : "Please describe your idea in a bit more detail." };
  let sample: Sample = null;
  try {
    sample = ((await window.claude?.use?.("sample")) as Sample) ?? null;
  } catch {
    sample = null;
  }
  if (!sample)
    return { ok: false, error: kr ? "이 화면에서는 AI 플래너를 사용할 수 없어요. claude.ai에서 페이지를 열어주세요." : "The AI planner isn't available in this view." };

  const system = `You are Esther Kang's AI business coach at HER NEXT, an AI business school for Korean women entrepreneurs in the United States.
Give a practical, encouraging, personalized plan for starting the user's business in the US using AI tools (ChatGPT, Claude, Canva, Notion, Zapier, etc.).
Respond ${kr ? "in natural, warm Korean (존댓말)" : "in clear English"} using Markdown with these sections:
1. 한 줄 진단 / One-line diagnosis
2. 맞춤 시작 단계 (5–7 numbered steps, each with a concrete AI tool and an example prompt)
3. 예산 배분 제안 fitting their stated budget (a small table)
4. 이번 주 할 일 (3 checkbox items)
5. 주의할 점 (US legal/tax items like LLC, EIN, licenses — advise confirming with a professional).
Keep it under about 600 words. Do not invent statistics.`;

  const prompt = `Industry: ${data.industry || "unspecified"}
Business idea: ${data.idea}
Experience/background: ${data.experience || "none given"}
Budget: ${data.budget || "not specified"}`;

  try {
    const res = await sample(`${system}\n\n---\n${prompt}`, { modelTier: "default", cache: false });
    const text = (res?.text ?? "").trim();
    if (!text) return { ok: false, error: kr ? "답변을 만들지 못했어요. 내용을 조금 바꿔 다시 시도해주세요." : "No answer was produced." };
    return { ok: true, text };
  } catch (e: unknown) {
    const code = (e as { code?: string })?.code;
    if (code === "not_granted")
      return { ok: false, error: kr ? "AI 사용이 허용되지 않았어요. 권한을 허용한 뒤 다시 시도해주세요." : "AI access was not allowed." };
    if (code === "rate_limited")
      return { ok: false, error: kr ? "요청이 많아요. 잠시 후 다시 시도해주세요." : "Too many requests. Please try again shortly." };
    return { ok: false, error: kr ? "잠시 문제가 생겼어요. 다시 시도해주세요." : "Something went wrong. Please try again." };
  }
};
