import { useState } from "react";
import { Play } from "lucide-react";
import { RisingArrow } from "@/components/RisingArrow";
import { useLang } from "@/lib/i18n";
import { picks } from "@/lib/content";
import type { Video } from "@/data/videos";

export function VideoCard({ video }: { video: Video }) {
  const { lang } = useLang();
  const [playing, setPlaying] = useState(false);
  const title = lang === "kr" ? video.title_kr : video.title_en;
  const note = lang === "kr" ? video.estherNoteKr : video.estherNoteEn;
  const hasVideo = video.youtubeId.trim().length > 0;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-plum/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-video w-full overflow-hidden bg-plum-deep">
        {hasVideo && playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : hasVideo ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${picks.play[lang]}: ${title}`}
            className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry-soft"
          >
            <img
              src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-plum-deep/25 transition-colors group-hover:bg-plum-deep/10" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-berry text-berry-foreground shadow-lg transition-transform group-hover:scale-110">
              <Play className="ml-0.5 h-7 w-7 fill-current" />
            </span>
          </button>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-plum-deep to-plum text-cream">
            <RisingArrow className="h-9 w-9 text-berry-soft" />
            <p className="mt-3 text-sm font-semibold tracking-wide">
              {picks.comingSoon[lang]}
            </p>
            <p className="text-xs text-cream/60">Coming soon</p>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-lg font-semibold leading-snug text-plum">{title}</h3>
        <div className="mt-4 flex-1 rounded-2xl bg-blush/60 p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-berry">
            {picks.esterNoteLabel[lang]}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink/75">“{note}”</p>
        </div>
      </div>
    </article>
  );
}
