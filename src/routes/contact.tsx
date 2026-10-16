import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { RisingArrow } from "@/components/RisingArrow";
import { PageHero } from "@/components/PageHero";
import { SignupForm } from "@/components/SignupForm";
import { useLang } from "@/lib/i18n";
import { contact } from "@/lib/content";
import { ChannelLink } from "@/components/ChannelLink";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "문의·신청 | HER NEXT — 다음 한 걸음, 같이 정해요" },
      {
        name: "description",
        content:
          "HER NEXT 무료 상담 신청. AI로 무엇을 시작할 수 있을지, 다음 한 걸음을 함께 설계합니다. esther@hernextschool.com",
      },
      { property: "og:title", content: "문의·신청 | HER NEXT" },
      { property: "og:description", content: "첫 상담은 무료입니다." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { lang, font } = useLang();

  return (
    <div className={font}>
      <PageHero
        eyebrow={contact.hero.eyebrow[lang]}
        title={contact.hero.title[lang]}
        sub={contact.hero.sub[lang]}
      />

      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-8">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-berry">
                  {lang === "kr" ? "이메일" : "Email"}
                </h2>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-2 inline-flex items-center gap-2 font-serif text-2xl font-semibold text-plum transition-colors hover:text-berry"
                >
                  {contact.email}
                  <RisingArrow className="h-5 w-5 text-berry" />
                </a>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-berry">
                  {lang === "kr" ? "위치" : "Location"}
                </h2>
                <p className="mt-2 text-lg text-plum">{contact.location[lang]}</p>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-berry">
                  {contact.channelsHead[lang]}
                </h2>
                <ul className="mt-3 space-y-2">
                  {contact.channels.map((c, i) => (
                    <li key={i}>
                      <ChannelLink
                        c={c}
                        className="inline-flex items-center gap-2 text-left text-lg text-plum transition-colors hover:text-berry"
                      >
                        <RisingArrow className="h-4 w-4 text-berry" />
                      </ChannelLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SignupForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
