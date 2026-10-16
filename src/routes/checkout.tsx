import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useLang } from "@/lib/i18n";
import { products, fmtUSD, type ProductId } from "@/lib/products";
import { program } from "@/lib/content";
import { cohort, type ClassId } from "@/lib/cohort";
import { submitEnrollmentApplication } from "@/lib/contact.functions";

// Application form: no payment is taken on the site. Esther gets the application by email,
// then sends a confirmation and payment instructions (application → confirmation → payment).

export const Route = createFileRoute("/checkout")({
  validateSearch: (q: Record<string, unknown>) => ({
    item: (q.item === "consult" ? "consult" : "cohort") as ProductId,
  }),
  head: () => ({ meta: [{ title: "수강 신청서 | HER NEXT" }] }),
  component: Checkout,
});

const inputCls =
  "mt-1.5 w-full rounded-md border border-plum/15 bg-white px-3.5 py-2.5 text-[15px] text-plum placeholder:text-ink/35 focus:border-plum focus:outline-none";

const KAKAO_ID = "esther3hground";

function Checkout() {
  const { lang, font } = useLang();
  const kr = lang === "kr";
  const { item } = Route.useSearch();
  const p = products[item];
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", agree: false });
  const [cls, setCls] = useState<ClassId | "">("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email.trim())) return setErr(kr ? "이름과 올바른 이메일을 입력해주세요." : "Enter your name and a valid email.");
    if (form.phone.replace(/\D/g, "").length < 7) return setErr(kr ? "확인 연락을 받을 연락처를 입력해주세요." : "Enter a phone number so we can confirm.");
    if (item === "cohort" && !cls) return setErr(kr ? "수강할 반을 선택해주세요." : "Please choose a class.");
    if (!form.agree) return setErr(kr ? "신청 안내에 동의해주세요." : "Please accept the application terms.");
    setBusy(true);
    try {
      await submitEnrollmentApplication({
        data: {
          item,
          classId: item === "cohort" ? (cls as ClassId) : undefined,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim() || undefined,
        },
      });
      setDone(true);
      window.scrollTo({ top: 0 });
    } catch {
      setErr(
        kr
          ? `신청서를 보내지 못했어요. 잠시 후 다시 시도하시거나 카카오톡(${KAKAO_ID})으로 연락 주세요.`
          : `We couldn't send your application. Please try again, or message us on KakaoTalk (${KAKAO_ID}).`,
      );
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className={font}>
        <section className="bg-white">
          <div className="mx-auto max-w-xl px-6 py-24 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-berry" />
            <h1 className="mt-5 text-3xl font-extrabold text-plum">{kr ? "신청서가 접수되었습니다" : "Application received"}</h1>
            <p className="mt-3 leading-relaxed text-ink/70">
              {kr
                ? `${form.name}님, 신청해 주셔서 감사합니다. 1~2일 안에 확인 연락과 결제 안내를 보내드릴게요. 결제 순서대로 자리가 확정됩니다.`
                : `Thank you, ${form.name}. We'll send a confirmation and payment instructions within 1–2 days. Seats are confirmed in order of payment.`}
            </p>
            <div className="mx-auto mt-8 max-w-sm rounded-xl border border-plum/10 bg-blush/60 p-5 text-left text-sm">
              <div className="flex justify-between gap-4"><span className="text-ink/60">{kr ? "신청 과정" : "Program"}</span><span className="text-right font-semibold text-plum">{p.name[lang]}</span></div>
              {cls && (
                <div className="mt-2 flex justify-between gap-4"><span className="text-ink/60">{kr ? "반" : "Class"}</span><span className="text-right font-semibold text-plum">{cohort.classes.find((c) => c.id === cls)?.[lang]}</span></div>
              )}
              <div className="mt-2 flex justify-between gap-4"><span className="text-ink/60">{kr ? "수강료" : "Tuition"}</span><span className="font-bold text-berry">{fmtUSD(p.price)}</span></div>
              <div className="mt-2 flex justify-between gap-4"><span className="text-ink/60">{kr ? "연락받을 이메일" : "Email"}</span><span className="text-right text-plum">{form.email}</span></div>
            </div>
            <p className="mt-5 text-sm text-ink/60">
              {kr ? `급한 문의는 카카오톡 ${KAKAO_ID}로 주세요.` : `For anything urgent, KakaoTalk: ${KAKAO_ID}`}
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Link to="/" className="rounded-md border border-plum/20 px-5 py-3 text-sm font-bold text-plum hover:border-berry hover:text-berry">{kr ? "홈으로" : "Home"}</Link>
              <Link to="/programs" search={{ s: undefined }} className="rounded-md bg-plum px-5 py-3 text-sm font-bold text-white">{kr ? "프로그램 보기" : "View program"}</Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const steps = kr
    ? ["신청서 작성", "확인 연락과 결제 안내 받기", "결제 순서대로 자리 확정"]
    : ["Fill in the application", "Get a confirmation and payment instructions", "Your seat is confirmed in order of payment"];

  return (
    <div className={font}>
      <PageHero
        eyebrow={kr ? "수강 신청" : "Apply"}
        title={kr ? "수강 신청서" : "Application"}
        sub={kr ? "신청서를 보내주시면 확인 연락과 결제 안내를 드립니다. 이 페이지에서는 결제하지 않아요." : "Send your application and we'll follow up with a confirmation and payment instructions. No payment is taken on this page."}
      />
      <section className="bg-blush">
        <div className="mx-auto max-w-5xl px-6 pb-20">
          <ol className="mb-6 grid gap-3 sm:grid-cols-3">
            {steps.map((s, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-plum shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-plum text-xs font-bold text-white">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <form onSubmit={submit} className="rounded-2xl border border-plum/10 bg-white p-7 shadow-sm" noValidate>
              <h2 className="text-lg font-extrabold text-plum">{kr ? "1. 신청자 정보" : "1. Your details"}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-plum">{kr ? "이름" : "Name"} *<input className={inputCls} value={form.name} onChange={set("name")} autoComplete="name" placeholder={kr ? "홍길동" : "Jane Kim"} /></label>
                <label className="text-sm font-semibold text-plum">{kr ? "이메일" : "Email"} *<input className={inputCls} type="email" value={form.email} onChange={set("email")} autoComplete="email" placeholder="name@email.com" /></label>
                <label className="text-sm font-semibold text-plum sm:col-span-2">{kr ? "연락처" : "Phone"} *<input className={inputCls} type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="+1 (201) 000-0000" /></label>
              </div>

              {item === "cohort" && (
                <>
                  <h2 className="mt-8 text-lg font-extrabold text-plum">{kr ? "2. 반 선택" : "2. Choose a class"}</h2>
                  <p className="mt-1 text-sm text-ink/60">{cohort.name[lang]} · {cohort.format[lang]} · {cohort.capacity[lang]} · {kr ? "선착순 마감" : "first come, first served"}</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {cohort.classes.map((c) => (
                      <label key={c.id} className={"flex cursor-pointer items-center gap-3 rounded-lg border p-4 text-sm font-bold transition-colors " + (cls === c.id ? "border-berry bg-berry/5 text-plum" : "border-plum/15 text-plum hover:border-plum/40")}>
                        <input type="radio" name="cls" className="h-4 w-4 shrink-0 accent-[#e15b64]" checked={cls === c.id} onChange={() => setCls(c.id)} />
                        <span>
                          <span className="block">{c[lang]}</span>
                          <span className="mt-0.5 block text-xs font-normal text-ink/60">{c.note[lang]}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </>
              )}

              <h2 className="mt-8 text-lg font-extrabold text-plum">
                {item === "cohort" ? (kr ? "3. 남기실 말씀 (선택)" : "3. Anything to add? (optional)") : kr ? "2. 남기실 말씀 (선택)" : "2. Anything to add? (optional)"}
              </h2>
              <textarea
                className={inputCls + " min-h-[110px] resize-y"}
                value={form.message}
                onChange={set("message")}
                maxLength={1000}
                placeholder={kr ? "하시는 일, AI를 써 본 경험, 궁금한 점 등을 편하게 적어주세요." : "Your work, your experience with AI, or any questions."}
              />

              <label className="mt-6 flex items-start gap-2.5 text-sm text-ink/75">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-[#e15b64]" checked={form.agree} onChange={set("agree")} />
                {kr ? "신청 후 확인 연락과 결제 안내를 받으며, 결제 순서대로 자리가 확정되는 것에 동의합니다." : "I understand I'll receive a confirmation and payment instructions, and seats are confirmed in order of payment."}
              </label>
              {err && <p className="mt-4 text-sm font-semibold text-berry">{err}</p>}
              <button type="submit" disabled={busy} className="mt-6 w-full rounded-md bg-berry py-3.5 text-base font-bold text-white transition-opacity disabled:opacity-60">
                {busy ? (kr ? "보내는 중…" : "Sending…") : kr ? "신청서 보내기" : "Send application"}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink/55">
                <MessageCircle className="h-3.5 w-3.5" />
                {kr ? `카카오톡 ${KAKAO_ID}로도 신청하실 수 있어요.` : `You can also apply on KakaoTalk: ${KAKAO_ID}`}
              </p>
            </form>

            <aside className="h-fit rounded-2xl border border-plum/10 bg-white p-7 shadow-sm">
              <h2 className="text-lg font-extrabold text-plum">{kr ? "신청 과정" : "Program"}</h2>
              <div className="mt-4 flex gap-2">
                {(["cohort", "consult"] as ProductId[]).map((id) => (
                  <Link key={id} to="/checkout" search={{ item: id }} className={"flex-1 rounded-md border px-3 py-2 text-center text-xs font-bold " + (id === item ? "border-plum bg-plum text-white" : "border-plum/15 text-plum hover:border-berry")}>
                    {products[id].name[lang].replace(" 1:1", "")}
                  </Link>
                ))}
              </div>
              <p className="mt-5 text-xs font-bold text-berry">{p.tag[lang]}</p>
              <p className="mt-1 text-xl font-extrabold text-plum">{p.name[lang]}</p>
              <p className="mt-1 text-sm text-ink/65">{p.meta[lang]}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{p.desc[lang]}</p>
              <div className="mt-6 space-y-2 border-t border-plum/10 pt-5 text-sm">
                {p.regular && (
                  <>
                    <div className="flex justify-between text-ink/60"><span>{kr ? "정가" : "Regular"}</span><span className="line-through">{fmtUSD(p.regular)}</span></div>
                    <div className="flex justify-between text-berry"><span>{program.pricing.discountLabel[lang]}</span><span>-{fmtUSD(p.regular - p.price)}</span></div>
                  </>
                )}
                <div className="flex justify-between pt-2 text-base font-extrabold text-plum"><span>{kr ? "수강료" : "Tuition"}</span><span>{fmtUSD(p.price)}</span></div>
                <p className="pt-1 text-xs text-ink/55">{kr ? "결제는 확인 연락 때 안내해 드려요." : "Payment details come with your confirmation."}</p>
              </div>
              <Link to="/contact" className="mt-6 block text-center text-sm font-semibold text-plum underline-offset-4 hover:text-berry hover:underline">
                {kr ? "신청 전에 궁금한 점이 있으신가요? 문의하기" : "Questions first? Contact us"}
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
