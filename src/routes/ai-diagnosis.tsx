import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import appHtml from "@/content/ai-diagnosis.html?raw";

// The free "내 사업 AI 진단" app is a self-contained HTML page. It renders in a same-origin
// srcdoc iframe so its styles and script stay isolated, and the frame grows to fit its content.
export const Route = createFileRoute("/ai-diagnosis")({
  head: () => ({
    meta: [
      { title: "무료 AI 진단 | HER NEXT — 내 사업 AI 진단 1분" },
      {
        name: "description",
        content: "질문 8개에 답하면 내 사업에서 무엇을 어디에 알리고 AI에게 무엇을 맡길지 4주 계획으로 정리해드립니다.",
      },
      { property: "og:title", content: "내 사업 AI 진단 (1분, 무료) | HER NEXT" },
      { property: "og:description", content: "질문 8개로 정리하는 내 사업의 마케팅과 AI 활용 4주 계획" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AiDiagnosis,
});

function AiDiagnosis() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(900);

  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    let ro: ResizeObserver | undefined;
    const fit = () => {
      const doc = frame.contentDocument;
      if (doc?.documentElement) setHeight(Math.max(600, doc.documentElement.scrollHeight));
    };
    const onLoad = () => {
      fit();
      const doc = frame.contentDocument;
      const win = frame.contentWindow;
      if (doc?.body) {
        ro = new ResizeObserver(fit);
        ro.observe(doc.body);
      }
      // The frame never scrolls itself, so the app's "back to top" between questions
      // scrolls the page to the frame instead.
      if (win) {
        win.scrollTo = ((_x?: unknown, y?: unknown) => {
          const top = frame.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: Math.max(0, top + (typeof y === "number" ? y : 0)) });
        }) as typeof win.scrollTo;
      }
    };
    frame.addEventListener("load", onLoad);
    return () => {
      frame.removeEventListener("load", onLoad);
      ro?.disconnect();
    };
  }, []);

  return (
    <iframe
      ref={ref}
      title="내 사업 AI 진단"
      srcDoc={appHtml}
      allow="clipboard-write"
      className="block w-full border-0"
      style={{ height }}
    />
  );
}
