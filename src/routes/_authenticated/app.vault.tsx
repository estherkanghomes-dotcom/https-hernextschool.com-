import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLang } from "@/lib/i18n";
import { vaultFolders } from "@/lib/workflows";
import { useInvalidateApp, useVault } from "@/lib/app-data";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageTitle, btnGhost, btnPrimary, field } from "@/components/app/ui";

export const Route = createFileRoute("/_authenticated/app/vault")({ component: Vault });

function Vault() {
  const { lang, t } = useLang();
  const vault = useVault();
  const invalidate = useInvalidateApp();
  const [folder, setFolder] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [edit, setEdit] = useState<{ id: string; content: string } | null>(null);
  const items = (vault.data ?? []).filter((v) => !folder || v.folder === folder);

  async function saveEdit() {
    if (!edit) return;
    await supabase.from("vault_items").update({ content: edit.content, updated_at: new Date().toISOString() }).eq("id", edit.id);
    setEdit(null); invalidate();
  }

  return (
    <div>
      <PageTitle eyebrow={t("비즈니스 금고", "Business Vault")} title={t("내가 만든 모든 것", "Everything you've built")} sub={t("승인한 결과물은 여기 저장되고, AI 코치가 다시 활용해요.", "Approved work lives here and your coach reuses it.")} />
      <div className="mb-6 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-10">
        <button onClick={() => setFolder(null)} className={`rounded-xl px-3 py-2 text-xs font-semibold ${!folder ? "bg-plum text-cream" : "bg-blush/50 text-plum"}`}>{t("전체", "All")}</button>
        {vaultFolders.map((f) => {
          const n = (vault.data ?? []).filter((v) => v.folder === f.key).length;
          return (
            <button key={f.key} onClick={() => setFolder(f.key)} className={`rounded-xl px-3 py-2 text-xs font-semibold ${folder === f.key ? "bg-plum text-cream" : "bg-blush/50 text-plum"}`}>
              {f.label[lang]} <span className="opacity-60">{n}</span>
            </button>
          );
        })}
      </div>
      {items.length === 0 ? (
        <Card className="text-center text-ink/60">{t("아직 저장된 결과물이 없어요. 액션 스튜디오에서 첫 결과물을 만들어보세요.", "Nothing here yet. Create your first deliverable in the Action Studio.")}</Card>
      ) : (
        <div className="space-y-3">
          {items.map((v) => (
            <Card key={v.id}>
              <button onClick={() => setOpen(open === v.id ? null : v.id)} className="flex w-full items-center justify-between text-left">
                <span>
                  <span className="font-semibold text-plum">{v.title}</span>
                  <span className="block text-xs text-ink/50">{vaultFolders.find((f) => f.key === v.folder)?.label[lang]} · {new Date(v.created_at).toLocaleDateString()}</span>
                </span>
                <span className="text-berry">{open === v.id ? "−" : "+"}</span>
              </button>
              {open === v.id && (
                <div className="mt-4 border-t border-plum/10 pt-4">
                  {edit?.id === v.id ? (
                    <>
                      <textarea className={`${field} min-h-64 text-sm`} value={edit.content} onChange={(e) => setEdit({ id: v.id, content: e.target.value })} />
                      <div className="mt-3 flex gap-2"><button onClick={saveEdit} className={btnPrimary}>{t("저장", "Save")}</button><button onClick={() => setEdit(null)} className={btnGhost}>{t("취소", "Cancel")}</button></div>
                    </>
                  ) : (
                    <>
                      <article className="prose-planner text-ink/85"><ReactMarkdown>{v.content}</ReactMarkdown></article>
                      <div className="mt-4 flex gap-3 text-sm">
                        <button onClick={() => navigator.clipboard.writeText(v.content)} className="text-berry underline">{t("복사", "Copy")}</button>
                        <button onClick={() => setEdit({ id: v.id, content: v.content })} className="text-berry underline">{t("수정", "Edit")}</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
