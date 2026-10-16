import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { navLinks, footerLinks, footer, contact } from "@/lib/content";

export function SiteFooter() {
  const { lang } = useLang();

  return (
    <footer className="bg-plum-deep text-cream/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <span className="font-serif text-xl font-semibold text-cream">
            HER NEXT <span className="text-berry-soft">→</span>
          </span>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/65">
            {footer.mission[lang]}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-berry-soft">
            {lang === "kr" ? "메뉴" : "Menu"}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-cream">
                  {l.label[lang]}
                </Link>
              </li>
            ))}
            {footerLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-cream">
                  {l.label[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-berry-soft">
            {contact.channelsHead[lang]}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {contact.channels.map((c, i) => (
              <li key={i}>
                <a href={c.href} className="transition-colors hover:text-cream">
                  {typeof c.label === "string" ? c.label : c.label[lang]}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${contact.email}`} className="transition-colors hover:text-cream">
                {contact.email}
              </a>
            </li>
            <li className="text-cream/50">{contact.location[lang]}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-cream/50">
          {footer.bottom[lang]}
        </p>
      </div>
    </footer>
  );
}