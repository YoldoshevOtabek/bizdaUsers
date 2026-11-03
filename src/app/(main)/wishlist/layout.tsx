import { pageMeta } from "@/src/lib/seo";

export const metadata = pageMeta(
  "Sevimlilar",
  "Yoqtirgan mahsulotlaringiz ro‘yxati — Dealper.",
  "/wishlist",
);

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
