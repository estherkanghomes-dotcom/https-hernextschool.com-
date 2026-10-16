import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Lock, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useLang } from "@/lib/i18n";
import { products, fmtUSD, type ProductId } from "@/lib/products";
import { cohort1, type ClassId } from "@/lib/cohort";

// DEMO checkout: nothing is charged, stored or sent. Replace `pay()` with a Stripe Checkout redirect to go live.
export const DEMO_MODE = true;

export const Route = createFileRoute("/checkout")({
  validateSearch: (q: Record<string, unknown>) => ({
    item: (q.item === "consult" ? "consult" : "cohort") as ProductId,
  }),
  head: () => ({ meta: [{ title: "수강 신청 · 결제 | HER NEXT" }] }),
  component: Checkout,
});

const inputCls =
  "mt-1.5 w-full rounded-md border border-plum/15 bg-white px-3.5 py-2.5 text-[15px] text-plum placeholder:text-ink/35 focus:border-plum focus:outline-none";

function Checkout() {
  const { lang, font } = useLang();
  const kr = lang === "kr";
  const { item } = Route.useSearch();
  const p = products[item];
  const [form, setForm] = useState({ name: "", email: "", phone: "", card: "", exp: "", cvc: "", agree: false });
  const [cls, setCls] = useState<ClassId | "">("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<string | null>(null);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const pay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) return setErr(kr ? "이름과 올바른 이메일을 입력해주세요." : "Enter your name and a valid email.");
    if (item === "cohort" && !cls) return setErr(kr ? "수강할 반을 선택해주세요." : "Please choose a class.");
    if (form.card.replace(/\D/g, "").length < 12 || !form.exp || form.cvc.length < 3) return setErr(kr ? "카드 정보를 입력해주세요. (데모: 4242 4242 4242 4242)" : "Enter card details (demo: 4242 4242 4242 4242).");
    if (!form.agree) return setErr(kr ? "결제 및 환불 규정에 동의해주세요." : "Please accept the terms.");
    setBusy(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulated processing — no network call in demo mode
    setBusy(false);
    setOrder("HN-" + Date.now().toString(36).toUpperCase().slice(-6));
    window.scrollTo({ top: 0 });
  };

  if (order) {
    return (
      <div className={font}>
        <section className="bg-white">
          <div className="mx-auto max-w-xl px-6 py-24 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-berry" />
            <h1 className="mt-5 text-3xl font-extrabold text-plum">{kr ? "신청이 완료되었습니다" : "You're enrolled"}</h1>
            <p className="mt-3 text-ink/70">
              {kr ? `${form.name}님, ${p.name.kr} 신청을 접수했습니다.` : `Thanks ${form.name}, your ${p.name.en} enrollment is in.`}
            </p>
            <div className="mx-auto mt-8 max-w-sm rounded-xl border border-plum/10 bg-blush/60 p-5 text-left text-sm">
              <div className="flex justify-between"><span className="text-ink/60">{kr ? "주문번호" : "Order"}</span><span className="font-bold text-plum">{order}</span></div>
              <div className="mt-2 flex justify-between"><span className="text-ink/60">{kr ? "상품" : "Item"}</span><span className="font-semibold text-plum">{p.name[lang]}</span></div>
              {cls && (
                <div className="mt-2 flex justify-between"><span className="text-ink/60">{kr ? "반" : "Class"}</span><span className="font-semibold text-plum">{cohort1.classes.find((c) => c.id === cls)?.[lang]}</span></div>
              )}
              <div className="mt-2 flex justify-between"><span className="text-ink/60">{kr ? "결제 금액" : "Total"}</span><span className="font-bold text-berry">{fmtUSD(p.price)}</span></div>
              <div className="mt-2 flex justify-between"><span className="text-ink/60">{kr ? "안내 메일" : "Email"}</span><span className="text-plum">{form.email}</span></div>
            </div>
            {DEMO_MODE && (
              <p className="mt-5 text-xs font-semibold text-berry">{kr ? "데모 모드 — 실제 결제·메일 발송은 이루어지지 않았습니다." : "Demo mode — no real charge or email was made."}</p>
            )}
            <div className="mt-8 flex justify-center gap-3">
              <Link to="/" className="rounded-md border border-plum/20 px-5 py-3 text-sm font-bold text-plum hover:border-berry hover:text-berry">{kr ? "홈으로" : "Home"}</Link>
              <Link to="/programs" className="rounded-md bg-plum px-5 py-3 text-sm font-bold text-white">{kr ? "프로그램 보기" : "View program"}</Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={font}>
      <PageHero
        eyebrow={kr ? "수강 신청" : "Enroll"}
        title={kr ? "수강 신청 · 결제" : "Checkout"}
        sub={kr ? "정보를 입력하고 결제를 완료하면 신청이 확정됩니다." : "Complete your details and payment to confirm your seat."}
      />
      <section className="bg-blush">
        <div className="mx-auto max-w-5xl px-6 pb-20">
          {DEMO_MODE && (
            <div className="mb-6 rounded-lg border border-berry/30 bg-white px-5 py-3 text-sm font-semibold text-berry">
              {kr
                ? "데모 모드입니다. 실제로 결제되지 않으며, 입력한 정보는 저장되거나 전송되지 않습니다."
                : "Demo mode: nothing is charged, and your details are not stored or sent."}
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <form onSubmit={pay} className="rounded-2xl border border-plum/10 bg-white p-7 shadow-sm" noValidate>
              <h2 className="text-lg font-extrabold text-plum">{kr ? "1. 신청자 정보" : "1. Your details"}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-plum">{kr ? "이름" : "Name"} *<input className={inputCls} value={form.name} onChange={set("name")} placeholder={kr ? "홍길동" : "Jane Kim"} /></label>
                <label className="text-sm font-semibold text-plum">{kr ? "이메일" : "Email"} *<input className={inputCls} type="email" value={form.email} onChange={set("email")} placeholder="name@email.com" /></label>
                <label className="text-sm font-semibold text-plum sm:col-span-2">{kr ? "연락처 (선택)" : "Phone (optional)"}<input className={inputCls} type="tel" value={form.phone} onChange={set("phone")} placeholder="+1 (201) 000-0000" /></label>
              </div>

              {item === "cohort" && (
                <>
                  <h2 className="mt-8 text-lg font-extrabold text-plum">{kr ? "2. 반 선택" : "2. Choose a class"}</h2>
                  <p className="mt-1 text-sm text-ink/60">{cohort1.start[lang]} · {kr ? `반별 정원 ${cohort1.capacity}명` : `${cohort1.capacity} seats`}</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {cohort1.classes.map((c) => (
                      <label key={c.id} className={"flex cursor-pointer items-center gap-3 rounded-lg border p-4 text-sm font-bold transition-colors " + (cls === c.id ? "border-berry bg-berry/5 text-plum" : "border-plum/15 text-plum hover:border-plum/40")}>
                        <input type="radio" name="cls" className="h-4 w-4 accent-[#e15b64]" checked={cls === c.id} onChange={() => setCls(c.id)} />
                        {c[lang]}
                      </label>
                    ))}
                  </div>
                </>
              )}

              <h2 className="mt-8 flex items-center gap-2 text-lg font-extrabold text-plum">
                {item === "cohort" ? (kr ? "3. 결제 정보" : "3. Payment") : kr ? "2. 결제 정보" : "2. Payment"} <Lock className="h-4 w-4 text-ink/40" />
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <label className="text-sm font-semibold text-plum sm:col-span-3">{kr ? "카드 번호" : "Card number"}<input className={inputCls} inputMode="numeric" autoComplete="off" value={form.card} onChange={set("card")} placeholder="4242 4242 4242 4242" /></label>
                <label className="text-sm font-semibold text-plum sm:col-span-2">{kr ? "유효기간" : "Expiry"}<input className={inputCls} autoComplete="off" value={form.exp} onChange={set("exp")} placeholder="MM / YY" /></label>
                <label className="text-sm font-semibold text-plum">CVC<input className={inputCls} inputMode="numeric" autoComplete="off" value={form.cvc} onChange={set("cvc")} placeholder="123" /></label>
              </div>

              <label className="mt-6 flex items-start gap-2.5 text-sm text-ink/75">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-[#e15b64]" checked={form.agree} onChange={set("agree")} />
                {kr ? "결제 및 환불 규정에 동의합니다." : "I agree to the payment & refund terms."}
              </label>
              {err && <p className="mt-4 text-sm font-semibold text-berry">{err}</p>}
              <button type="submit" disabled={busy} className="mt-6 w-full rounded-md bg-berry py-3.5 text-base font-bold text-white transition-opacity disabled:opacity-60">
                {busy ? (kr ? "결제 처리 중…" : "Processing…") : `${fmtUSD(p.price)} ${kr ? "결제하기" : "Pay now"}`}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink/50"><ShieldCheck className="h-3.5 w-3.5" />{kr ? "실서비스에서는 Stripe 보안 결제로 처리됩니다." : "Processed securely by Stripe when live."}</p>
            </form>

            <aside className="h-fit rounded-2xl border border-plum/10 bg-white p-7 shadow-sm">
              <h2 className="text-lg font-extrabold text-plum">{kr ? "주문 요약" : "Order summary"}</h2>
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
                    <div className="flex justify-between text-berry"><span>{kr ? "1기 특별 할인" : "Founding discount"}</span><span>-{fmtUSD(p.regular - p.price)}</span></div>
                  </>
                )}
                <div className="flex justify-between pt-2 text-base font-extrabold text-plum"><span>{kr ? "총 결제 금액" : "Total"}</span><span>{fmtUSD(p.price)}</span></div>
              </div>
              <Link to="/contact" className="mt-6 block text-center text-sm font-semibold text-plum underline-offset-4 hover:text-berry hover:underline">
                {kr ? "결제 전 상담이 필요하신가요? 무료 상담 신청" : "Questions first? Book a free consult"}
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
