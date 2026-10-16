import { useState, type ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import type { Channel } from "@/lib/content";

// One community channel: an external link, or (for KakaoTalk ID) a button that copies the ID.
export function ChannelLink({ c, className, children }: { c: Channel; className?: string; children?: ReactNode }) {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);
  const label = typeof c.label === "string" ? c.label : c.label[lang];
  if (c.href) {
    return (
      <a href={c.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        {label}
      </a>
    );
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(c.copy ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the ID is visible in the label
    }
  };
  return (
    <button type="button" onClick={copy} className={className} title={lang === "kr" ? "ID 복사" : "Copy ID"}>
      {children}
      {label}
      <span className="text-xs opacity-60">{copied ? (lang === "kr" ? "· 복사됨" : "· copied") : lang === "kr" ? "· ID 복사" : "· copy ID"}</span>
    </button>
  );
}
