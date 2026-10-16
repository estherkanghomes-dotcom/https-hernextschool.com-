import { useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { sendContactNotification } from "@/lib/contact.functions";
import { signup } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { RisingArrow } from "./RisingArrow";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
});

export function SignupForm() {
  const { lang } = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const parsed = schema.safeParse({ name, email });
    if (!parsed.success) {
      setError(signup.errorMsg[lang]);
      setStatus("error");
      return;
    }
    setStatus("loading");
    const { error: dbError } = await supabase
      .from("newsletter_signups")
      .insert({ name: parsed.data.name, email: parsed.data.email });
    if (dbError) {
      setError(signup.errorMsg[lang]);
      setStatus("error");
      return;
    }
    // Notify the site owner by email; a failed notification must not block the signup.
    try {
      await sendContactNotification({ data: parsed.data });
    } catch {
      // logged server-side; signup itself already succeeded
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-xl shadow-plum/5 sm:p-10">
        <RisingArrow className="mx-auto h-12 w-12 text-berry" />
        <h3 className="mt-5 text-xl font-bold text-plum">{signup.successTitle[lang]}</h3>
        <p className="mt-3 leading-relaxed text-ink/70">{signup.successBody[lang]}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white p-8 shadow-xl shadow-plum/5 sm:p-10">
      <h3 className="font-serif text-2xl font-semibold text-plum">{signup.cardHeading[lang]}</h3>
      <p className="mt-3 leading-relaxed text-ink/70">{signup.cardBody[lang]}</p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="signup-name" className="text-sm font-medium text-plum">
            {signup.nameLabel[lang]}
          </label>
          <input
            id="signup-name"
            type="text"
            required
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-plum/15 bg-cream px-4 py-3 text-ink outline-none transition-colors focus-visible:border-berry focus-visible:ring-2 focus-visible:ring-berry/40"
          />
        </div>
        <div>
          <label htmlFor="signup-email" className="text-sm font-medium text-plum">
            {signup.emailLabel[lang]}
          </label>
          <input
            id="signup-email"
            type="email"
            required
            maxLength={255}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-plum/15 bg-cream px-4 py-3 text-ink outline-none transition-colors focus-visible:border-berry focus-visible:ring-2 focus-visible:ring-berry/40"
          />
        </div>
      </div>

      {status === "error" && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-berry px-6 py-3.5 text-base font-semibold text-berry-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60"
      >
        {status === "loading" ? signup.submitting[lang] : signup.submit[lang]}
        <RisingArrow className="h-4 w-4" />
      </button>
      <p className="mt-4 text-center text-xs text-ink/50">{signup.privacy[lang]}</p>
    </form>
  );
}
