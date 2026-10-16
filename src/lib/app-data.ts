import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Memory } from "./workflows";

export async function currentUserId() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}

export function weekStart(d = new Date()) {
  const x = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  x.setUTCDate(x.getUTCDate() - ((x.getUTCDay() + 6) % 7));
  return x.toISOString().slice(0, 10);
}

export type MemoryRow = { user_id: string; answers: Record<string, string>; memory: Memory; onboarded: boolean; confirmed: boolean };
export type ActionRow = { id: string; title: string; why: string | null; area: string; workflow_key: string | null; priority: number; status: string; week_of: string; completed_at: string | null; created_at: string };
export type VaultRow = { id: string; folder: string; title: string; content: string; workflow_key: string | null; created_at: string; updated_at: string };

export function useMemory() {
  return useQuery({
    queryKey: ["hn-memory"],
    queryFn: async (): Promise<MemoryRow | null> => {
      const uid = await currentUserId();
      if (!uid) return null;
      const { data, error } = await supabase.from("business_memory").select("*").eq("user_id", uid).maybeSingle();
      if (error) throw error;
      return (data as unknown as MemoryRow) ?? null;
    },
  });
}

export async function saveMemory(patch: Partial<Omit<MemoryRow, "user_id">>) {
  const uid = await currentUserId();
  if (!uid) throw new Error("Not signed in");
  const { error } = await supabase.from("business_memory").upsert({ user_id: uid, ...patch, updated_at: new Date().toISOString() } as never);
  if (error) throw error;
}

export function useActions() {
  return useQuery({
    queryKey: ["hn-actions"],
    queryFn: async (): Promise<ActionRow[]> => {
      const { data, error } = await supabase.from("actions").select("*").order("week_of", { ascending: false }).order("priority");
      if (error) throw error;
      return (data ?? []) as ActionRow[];
    },
  });
}

export function useVault() {
  return useQuery({
    queryKey: ["hn-vault"],
    queryFn: async (): Promise<VaultRow[]> => {
      const { data, error } = await supabase.from("vault_items").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as VaultRow[];
    },
  });
}

export function useInvalidateApp() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ predicate: (q) => String(q.queryKey[0]).startsWith("hn-") });
}
