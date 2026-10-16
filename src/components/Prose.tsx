// Splits long copy into short, readable paragraphs (max `per` sentences each)
// so multi-line text never runs as one dense block. Existing line breaks are kept.
export function splitParagraphs(text: string, per = 2): string[] {
  const out: string[] = [];
  for (const block of text.split(/\n+/).map((b) => b.trim()).filter(Boolean)) {
    const sentences = block.split(/(?<=[.!?。…])(?=\s+[^\s.!?])\s+/).filter(Boolean);
    for (let i = 0; i < sentences.length; i += per) out.push(sentences.slice(i, i + per).join(" "));
  }
  return out;
}

export function Prose({
  text,
  className = "",
  gap = "space-y-4",
  per = 2,
}: {
  text: string;
  className?: string;
  gap?: string;
  per?: number;
}) {
  return (
    <div className={gap}>
      {splitParagraphs(text, per).map((p, i) => (
        <p key={i} className={className}>
          {p}
        </p>
      ))}
    </div>
  );
}
