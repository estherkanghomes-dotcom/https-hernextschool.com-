import { useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { curriculum, story } from "@/lib/content";
import { publishedNotes } from "@/data/notes";

type Hit = { label: string; sub: string; go: () => void };

// Header search (Kyobo / Class101 style): pages, roadmap modules, story chapters and notes.
export function SiteSearch() {
  const { lang } = useLang();
  const kr = lang === "kr";
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const index = useMemo<Hit[]>(() => {
    const page = (label: string, sub: string, to: string, search?: Record<string, string>): Hit => ({ label, sub, go: () => nav({ to, search } as never) });
    return [
      page(kr ? "6주 AI 코호트 수강 신청" : "Enroll in the 6-week cohort", kr ? "결제" : "Checkout", "/checkout", { item: "cohort" }),
      page(kr ? "1:1 컨설팅 예약" : "Book 1:1 consulting", kr ? "결제" : "Checkout", "/checkout", { item: "consult" }),
      page(kr ? "프로그램 안내" : "Programs", kr ? "프로그램" : "Programs", "/programs"),
      page(kr ? "6주 코호트 일정" : "Cohort weeks", kr ? "프로그램" : "Programs", "/programs", { s: "cohort" }),
      page(kr ? "가격 · 포함 사항" : "Pricing", kr ? "프로그램" : "Programs", "/programs", { s: "pricing" }),
      page("FAQ", kr ? "프로그램" : "Programs", "/programs", { s: "faq" }),
      page(kr ? "무료 AI 플래너" : "Free AI planner", kr ? "무료 콘텐츠" : "Free", "/planner"),
      page(kr ? "에스더의 픽" : "Esther's Picks", kr ? "무료 콘텐츠" : "Free", "/picks"),
      page(kr ? "무료 자료" : "Free resources", kr ? "무료 콘텐츠" : "Free", "/resources"),
      page(kr ? "HER NEXT 소개" : "About", kr ? "소개" : "About", "/about"),
      page(kr ? "에스더 스토리" : "Esther's Story", kr ? "소개" : "About", "/story"),
      page(kr ? "성과 · 후기" : "Stories", kr ? "후기" : "Stories", "/stories"),
      page(kr ? "문의 · 무료 상담" : "Contact", kr ? "문의" : "Contact", "/contact"),
      ...curriculum.modules.map((m) => page(m.title[lang], kr ? "6단계 로드맵" : "Roadmap", "/programs", { s: "roadmap" })),
      ...story.sections.map((s, i) => ({ label: s.title[lang], sub: kr ? "에스더 스토리" : "Esther's Story", go: () => nav({ to: "/chapter/$n", params: { n: String(i + 1) } }) })),
      ...publishedNotes.map((n) => ({ label: n.title[lang], sub: kr ? "성공노트" : "Success Notes", go: () => nav({ to: "/notes/$slug", params: { slug: n.slug } }) })),
    ];
  }, [lang, kr, nav]);

  const hits = q.trim()
    ? index.filter((h) => (h.label + " " + h.sub).toLowerCase().includes(q.trim().toLowerCase())).slice(0, 8)
    : index.slice(0, 6);

  const pick = (h: Hit) => {
    setOpen(false);
    setQ("");
    h.go();
  };

  return (
    <div ref={box} className="relative w-full max-w-md" onBlur={(e) => !box.current?.contains(e.relatedTarget as Node) && setOpen(false)}>
      <div className="flex items-center rounded-full border-2 border-plum/80 bg-white px-4 focus-within:border-berry">
        <Search className="h-4 w-4 shrink-0 text-plum" />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => { if (e.key === "Enter" && hits[0]) pick(hits[0]); if (e.key === "Escape") setOpen(false); }}
          placeholder={kr ? "강의, 칼럼, 커리큘럼 검색" : "Search classes, columns, curriculum"}
          className="w-full bg-transparent px-2.5 py-2 text-sm text-plum placeholder:text-ink/45 focus:outline-none"
          aria-label={kr ? "사이트 검색" : "Site search"}
        />
      </div>
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-plum/10 bg-white py-2 shadow-xl">
          {!q.trim() && <p className="px-4 pb-1 pt-1 text-[11px] font-bold text-ink/45">{kr ? "추천 바로가기" : "Suggested"}</p>}
          {hits.length ? hits.map((h, k) => (
            <button key={k} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => pick(h)} className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left hover:bg-blush">
              <span className="truncate text-sm font-semibold text-plum">{h.label}</span>
              <span className="shrink-0 text-[11px] font-semibold text-berry">{h.sub}</span>
            </button>
          )) : <p className="px-4 py-3 text-sm text-ink/55">{kr ? "검색 결과가 없습니다." : "No results."}</p>}
        </div>
      )}
    </div>
  );
}
