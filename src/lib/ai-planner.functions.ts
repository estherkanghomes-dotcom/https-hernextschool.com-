import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  idea: z.string().trim().min(5).max(1500),
  experience: z.string().trim().max(1000),
  budget: z.string().trim().max(100),
  industry: z.string().trim().max(50),
  lang: z.enum(["kr", "en"]),
});

export type PlannerInput = z.infer<typeof inputSchema>;
export type PlannerResult = { ok: true; text: string } | { ok: false; error: string };

export const generateBusinessPlan = createServerFn({ method: "POST" })
  .inputValidator((input: PlannerInput) => inputSchema.parse(input))
  .handler(async ({ data }): Promise<PlannerResult> => {
    const kr = data.lang === "kr";
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) return { ok: false, error: kr ? "AI 설정 오류입니다." : "AI is not configured." };

    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText } = await import("ai");

    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });

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
      const result = streamText({
        model: provider.responses("openai/gpt-6-astra"),
        system,
        prompt,
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "low",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });
      const text = await result.text;
      if (!text.trim()) {
        return { ok: false, error: kr ? "답변을 만들지 못했어요. 내용을 조금 바꿔 다시 시도해주세요." : "No answer was produced." };
      }
      return { ok: true, text };
    } catch (e: unknown) {
      const status = (e as { statusCode?: number })?.statusCode;
      console.error("planner error", status, e);
      if (status === 429)
        return { ok: false, error: kr ? "요청이 많아요. 잠시 후 다시 시도해주세요." : "Too many requests. Please try again shortly." };
      if (status === 402)
        return { ok: false, error: kr ? "AI 사용 한도에 도달했어요. 관리자에게 문의해주세요." : "AI credits are exhausted." };
      return { ok: false, error: kr ? "잠시 문제가 생겼어요. 다시 시도해주세요." : "Something went wrong. Please try again." };
    }
  });
