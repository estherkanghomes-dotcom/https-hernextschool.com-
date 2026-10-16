import { createFileRoute } from "@tanstack/react-router";
import { StoryPage } from "@/components/StoryAndNotes";
export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "에스더 스토리 | HER NEXT" },
      {
        name: "description",
        content:
          "열 살에 미국에 온 에스더가 세 번 무너지고 세 번 일어나 HER NEXT를 만들기까지. 성공한 사람이 아니라, 다시 일어나 본 사람에게 배우세요.",
      },
      { property: "og:title", content: "에스더 스토리 | HER NEXT" },
      { property: "og:description", content: "다시 일어나 본 사람에게 배우세요." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Story,
});

function Story() {
  return <StoryPage />;
}
