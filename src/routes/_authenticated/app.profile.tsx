import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { memorySections } from "@/lib/workflows";
import { saveMemory, useInvalidateApp, useMemory } from "@/lib/app-data";
import { Card, PageTitle, btnGhost, btnPrimary, field } from "@/components/app/ui";

export const Route = createFileRoute("/_authenticated/app/profile")({ component: Profile });

function Profile() {
  const { lang, t } = useLang();
  const mem = useMemory();
  const invalidate = useInvalidateApp();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (mem.data) setDraft(mem.data.memory ?? {}); }, [mem.data]);

  async function save(confirm: boolean) {
    setSaving(true);
    await saveMemory({ memory: draft, ...(confirm ? { confirmed: true } : {}) });
    await invalidate();
    setSaving(false);
    setEditing(false);
    if (confirm) navigate({ to: "/app/next" });
  }

  return (
    <div>
      <PageTitle eyebrow={t("내 사업 기억", "Business Memory")} title={t("나의 비즈니스 프로필", "My Business Profile")} sub={t("AI 코치는 이 내용을 기억하고 모든 결과물에 반영해요.", "Your coach remembers this and uses it in every deliverable.")} />
      <div className="grid gap-4 sm:grid-cols-2">
        {memorySections.map((s) => (
          <Card key={s.key}>
            <p className="font-serif text-lg text-plum">{s.label[lang]}</p>
            <p className="text-xs text-ink/50">{s.hint[lang]}</p>
            {editing ? (
              <textarea className={`${field} mt-3 min-h-24 text-sm`} value={draft[s.key] ?? ""} onChange={(e) => setDraft({ ...draft, [s.key]: e.target.value })} maxLength={3000} />
            ) : (
              <p className="mt-3 whitespace-pre-line text-sm text-ink/80">{draft[s.key] || <span className="text-ink/40">{t("아직 비어 있어요", "Not filled yet")}</span>}</p>
            )}
          </Card>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {editing ? (
          <button disabled={saving} onClick={() => save(false)} className={btnPrimary}>{t("저장", "Save")}</button>
        ) : (
          <button onClick={() => setEditing(true)} className={btnGhost}>{t("수정하기", "Edit")}</button>
        )}
        {!mem.data?.confirmed && !editing && (
          <button disabled={saving} onClick={() => save(true)} className={btnPrimary}>{t("맞아요, 다음 할 일 찾기 →", "Looks right — find my next →")}</button>
        )}
        <Link to="/app/discover" className={btnGhost}>{t("질문 다시 하기", "Retake questions")}</Link>
      </div>
    </div>
  );
}
