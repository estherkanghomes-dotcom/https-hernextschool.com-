import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { NotesPage } from "@/components/StoryAndNotes";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "성공노트 | HER NEXT" },
      {
        name: "description",
        content:
          "여자라면 사업해라 — 에스더가 20년간 현장에서 배운 실전 비즈니스와 AI 활용 전략을 에피소드로 풀어냅니다.",
      },
      { property: "og:title", content: "에스더의 성공노트 | HER NEXT" },
      {
        property: "og:description",
        content: "에스더의 실전 비즈니스 에피소드. 각 이야기 끝엔 전략 요약이 함께합니다.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NotesLayout,
});

function NotesLayout() {
  // Render child article routes (/notes/$slug) when matched; otherwise the index.
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/notes/$slug");
  if (isChild) return <Outlet />;
  return <NotesIndex />;
}

function NotesIndex() {
  return <NotesPage />;
}
