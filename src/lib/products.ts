import { program } from "./content";
import type { L } from "./content";

// Purchasable products. Prices come from the program content so there is one source of truth.
export type ProductId = "cohort" | "consult";
export type Product = {
  id: ProductId;
  tag: L;
  name: L;
  price: number; // USD
  regular?: number; // USD, strike-through
  meta: L;
  desc: L;
};

const usd = (s: string) => Number(s.replace(/[^0-9.]/g, ""));
const consultPrice = usd(program.consult.price.en.split("$")[1] ?? "0");

export const products: Record<ProductId, Product> = {
  cohort: {
    id: "cohort",
    tag: program.pricing.tag,
    name: { kr: "6주 AI 코호트", en: "6-Week AI Cohort" },
    price: usd(program.pricing.special),
    regular: usd(program.pricing.regular),
    meta: { kr: "주 1회 라이브 · 6주 · 정원 8명", en: "Weekly live · 6 weeks · 8 seats" },
    desc: program.pricing.note,
  },
  consult: {
    id: "consult",
    tag: program.consult.tag,
    name: program.consult.title,
    price: consultPrice,
    meta: program.consult.price,
    desc: program.consult.body,
  },
};

export const fmtUSD = (n: number) => `$${n.toLocaleString("en-US")}`;
