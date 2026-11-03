import HomePage from "@/src/features/home/components/HomePage";

// ISR — sahifa 60 soniyada qayta generatsiya qilinadi.
// Shuning uchun foydalanuvchiga doim tayyor (keshlangan) HTML
// darhol qaytadi — loading spinner ko'rinmaydi.
export const revalidate = 60;

export default function Home() {
  return <HomePage />
}
