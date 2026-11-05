export const siteConfig = {
  name: "Bizda",
  tagline: "Texnologiya — bitta joyda",
  description:
    "Bizda — elektronika, gadget va texnika uchun onlayn do‘kon. Qulay narxlar, tez yetkazib berish va yetkazib berganda naqd to‘lov.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dealport-web-4z5b.vercel.app",
  ogImage: "/img/Dealport_TexnologiyaBittaJoyda.png",
  favicon: "/favicon.ico",
  locale: "uz_UZ",
  keywords: [
    "Bizda",
    "onlayn do‘kon",
    "elektronika",
    "smartfon",
    "noutbuk",
    "gadget",
    "O‘zbekiston",
    "yetkazib berish",
  ],
};

export const absoluteUrl = (path = "/") =>
  new URL(path, siteConfig.url).toString();
