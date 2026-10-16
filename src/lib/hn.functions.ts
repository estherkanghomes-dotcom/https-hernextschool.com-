import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { workflows, workflowByKey } from "./workflows";

const DAILY_LIMIT = 30;

type Sb = { from: (t: string) => any };

async function checkAndLog(supabase: Sb, userId: string, kind: string, kr: boolean) {
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const { count } = await supabase.from("ai_usage").select("id", { count: "exact", head: true }).eq("user_id", userId).gte("created_at", since);
  if ((count ?? 0) >= DAILY_LIMIT) return kr ? "오늘 사용 한도에 도달했어요. 내일 다시 이어가요." : "You've reached today's limit. Let's continue tomorrow.";
  await supabase.from("ai_usage").insert({ user_id: userId, kind });
  return null;
}

async function callAI(system: string, prompt: string) {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw Object.assign(new Error("no key"), { statusCode: 401 });
  const { createOpenAI } = await import("@ai-sdk/openai");
  const { streamText } = await import("ai");
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system,
    prompt,
    providerOptions: {
      openai: { forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", store: false, include: ["reasoning.encrypted_content"] },
    },
  });
  return await result.text;
}

function errMsg(e: unknown, kr: boolean) {
  const s = (e as { statusCode?: number })?.statusCode;
  console.error("hn ai error", s, e);
  if (s === 429) return kr ? "요청이 많아요. 잠시 후 다시 시도해주세요." : "Too many requests. Try again shortly.";
  if (s === 402 || s === 403) return kr ? "AI 사용이 일시 중지되었어요. 관리자에게 문의해주세요." : "AI is paused. Please contact the admin.";
  return kr ? "잠시 문제가 생겼어요. 다시 시도해주세요." : "Something went wrong. Please try again.";
}

async function loadMemory(supabase: Sb, userId: string) {
  const { data } = await supabase.from("business_memory").select("memory, answers").eq("user_id", userId).maybeSingle();
  const mem = (data?.memory ?? {}) as Record<string, string>;
  return Object.entries(mem).filter(([, v]) => v).map(([k, v]) => `- ${k}: ${String(v).slice(0, 600)}`).join("\n") || "(empty)";
}

const COACH_PERSONA = `You are Esther's AI business execution partner at HER NEXT, for Korean women entrepreneurs in the US who may be new to AI. Be warm, concrete, and practical. Never invent statistics. For legal/tax topics, suggest confirming with a professional.`;

export const findMyNext = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { lang: "kr" | "en" }) => z.object({ lang: z.enum(["kr", "en"]) }).parse(d))
  .handler(async ({ data, context }) => {
    const kr = data.lang === "kr";
    const supabase = context.supabase as unknown as Sb;
    const limit = await checkAndLog(supabase, context.userId, "next", kr);
    if (limit) return { ok: false as const, error: limit };
    const memory = await loadMemory(supabase, context.userId);
    const list = workflows.map((w) => `${w.key}: ${w.title.en}`).join("\n");
    try {
      const text = await callAI(
        `${COACH_PERSONA}\nReturn only json: {"actions":[{"workflow_key":string,"title":string,"why":string}]} with exactly 3 actions ordered by priority. workflow_key must be one of the listed keys. title under 60 chars, why under 160 chars, written ${kr ? "in Korean (존댓말)" : "in English"}.`,
        `Business memory:\n${memory}\n\nAvailable workflows:\n${list}\n\nChoose the 3 highest-impact next actions for this week.`,
      );
      const m = text.match(/\{[\s\S]*\}/);
      const parsed = m ? JSON.parse(m[0]) : { actions: [] };
      const acts = (parsed.actions ?? [])
        .filter((a: { workflow_key?: string }) => a && workflowByKey(String(a.workflow_key)))
        .slice(0, 3);
      if (!acts.length) return { ok: false as const, error: kr ? "추천을 만들지 못했어요. 다시 시도해주세요." : "Couldn't build recommendations." };
      const weekOf = new Date();
      weekOf.setUTCDate(weekOf.getUTCDate() - ((weekOf.getUTCDay() + 6) % 7));
      const week = weekOf.toISOString().slice(0, 10);
      await supabase.from("actions").delete().eq("user_id", context.userId).eq("week_of", week).eq("status", "todo");
      const rows = acts.map((a: { workflow_key: string; title: string; why: string }, i: number) => ({
        user_id: context.userId, workflow_key: a.workflow_key, area: workflowByKey(a.workflow_key)!.area,
        title: String(a.title).slice(0, 120), why: String(a.why ?? "").slice(0, 300), priority: i + 1, week_of: week,
      }));
      const { error } = await supabase.from("actions").insert(rows);
      if (error) throw error;
      return { ok: true as const };
    } catch (e) {
      return { ok: false as const, error: errMsg(e, kr) };
    }
  });

export const runCoach = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { lang: "kr" | "en"; workflowKey: string; answers: Record<string, string>; previous?: string; feedback?: string }) =>
    z.object({
      lang: z.enum(["kr", "en"]),
      workflowKey: z.string().max(50),
      answers: z.record(z.string(), z.string().max(1500)),
      previous: z.string().max(20000).optional(),
      feedback: z.string().max(1500).optional(),
    }).parse(d))
  .handler(async ({ data, context }) => {
    const kr = data.lang === "kr";
    const wf = workflowByKey(data.workflowKey);
    if (!wf) return { ok: false as const, error: "Unknown workflow" };
    const supabase = context.supabase as unknown as Sb;
    const limit = await checkAndLog(supabase, context.userId, "coach", kr);
    if (limit) return { ok: false as const, error: limit };
    const memory = await loadMemory(supabase, context.userId);
    const qa = wf.questions.map((q) => `${q.q.en}: ${data.answers[q.key] ?? ""}`).join("\n");
    const revision = data.previous ? `\n\nPrevious draft:\n${data.previous}\n\nRevise it according to this feedback: ${data.feedback ?? ""}` : "";
    try {
      const text = await callAI(
        `${COACH_PERSONA}\nWrite ${kr ? "in natural Korean (존댓말)" : "in clear English"}. Output exactly three sections with these literal markers on their own lines:\n===JUDGMENT===\n(2-3 sentences: why this is the right move now, grounded in her business memory)\n===DELIVERABLE===\n(the finished, ready-to-use work in Markdown: ${wf.deliverable.en}. Keep under about 700 words.)\n===NEXT===\n(one sentence: the single best next step after this)`,
        `Task: ${wf.title.en}\nBusiness memory:\n${memory}\n\nHer answers:\n${qa}${revision}`,
      );
      const part = (k: string) => {
        const m = text.split(`===${k}===`)[1];
        return (m ?? "").split(/===[A-Z]+===/)[0].trim();
      };
      const deliverable = part("DELIVERABLE") || text.trim();
      if (!deliverable) return { ok: false as const, error: kr ? "결과물을 만들지 못했어요." : "No result produced." };
      return { ok: true as const, judgment: part("JUDGMENT"), deliverable, next: part("NEXT") };
    } catch (e) {
      return { ok: false as const, error: errMsg(e, kr) };
    }
  });
