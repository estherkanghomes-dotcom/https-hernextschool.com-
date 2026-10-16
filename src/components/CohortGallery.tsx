import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { RisingArrow } from "./RisingArrow";
import { BrandPhoto } from "./BrandPhoto";
import { useLang } from "@/lib/i18n";

// Only verified cohort photos belong in the remaining slots. Never substitute founder portraits.
const shots = [
  { slot: "esther-candid-1.jpg", kr: "에스더의 일상", en: "Esther, day to day" },
  { slot: "esther-candid-2.jpg", kr: "수업 준비 중", en: "Prepping a session" },
  { slot: "cohort1-03.jpg", kr: "1기 활동 사진을 올려주세요", en: "Please upload a Cohort 1 activity photo" },
  { slot: "cohort1-04.jpg", kr: "1기 활동 사진을 올려주세요", en: "Please upload a Cohort 1 activity photo" },
  { slot: "cohort1-05.jpg", kr: "1기 활동 사진을 올려주세요", en: "Please upload a Cohort 1 activity photo" },
  { slot: "cohort1-06.jpg", kr: "1기 활동 사진을 올려주세요", en: "Please upload a Cohort 1 activity photo" },
];

// Photo grid hidden on request. Set to true to show the gallery photos again.
const SHOW_PHOTOS = false;

export function CohortGallery() {
  const { lang } = useLang();
  const kr = lang === "kr";
  return (
    <section className="bg-blush">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-berry">
            {kr ? "1기 갤러리" : "Cohort 1 Gallery"}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-plum md:text-4xl">
            {kr ? "1기는 이미 달리고 있습니다" : "Cohort 1 is already running"}
          </h2>
          <p className="mt-4 max-w-2xl text-ink/70">
            {kr
              ? "1기 대표님들이 AI로 브랜드를 만들고, 법인을 세우고, 첫 고객을 만나는 현장입니다. 이제 2기가 1기와 함께 합류합니다."
              : "Cohort 1 founders building brands, forming LLCs and meeting first customers with AI. Cohort 2 now joins alongside them."}
          </p>
        </Reveal>
        {SHOW_PHOTOS && (
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {shots.map((s, i) => (
            <Reveal key={s.slot} delay={(i % 3) * 60}>
              <figure className="group overflow-hidden rounded-2xl bg-white">
                <BrandPhoto
                  slot={s.slot}
                  alt={s[lang]}
                  className="aspect-[4/3] w-full"
                  imgClassName="aspect-[4/3] w-full object-contain bg-cream transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="px-4 py-3 text-sm font-medium text-plum">{s[lang]}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        )}
        <Reveal>
          <div className="mt-12 flex flex-col items-start gap-4 rounded-3xl bg-plum px-8 py-10 text-cream sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-berry-soft">
                {kr ? "2기 모집 중" : "Now enrolling Cohort 2"}
              </p>
              <p className="mt-2 font-serif text-2xl font-semibold">
                {kr ? "1기 선배들과 함께하는 2기 모임에 합류하세요" : "Join Cohort 2 — alongside Cohort 1 alumni"}
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-berry px-7 py-3.5 font-semibold text-berry-foreground transition-transform hover:-translate-y-0.5"
            >
              {kr ? "2기 신청하기" : "Apply for Cohort 2"}
              <RisingArrow className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
