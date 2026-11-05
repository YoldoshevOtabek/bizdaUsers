"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useTransition } from "react";
import { DEFAULT_LIMIT, DEFAULT_PAGE, LOAD_MORE_STEP } from "@/src/lib/productsQuery";

export default function LoadMore({ loaded, total }: { loaded: number; total: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  if (loaded >= total || total <= 0) return null;

  const handleMore = () => {
    const params = new URLSearchParams(searchParams.toString());
    const currentLimit = Number(params.get("limit") || DEFAULT_LIMIT);
    params.set("page", String(DEFAULT_PAGE));
    params.set("limit", String(currentLimit + LOAD_MORE_STEP));
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="mt-8 flex justify-center">
      <button
        type="button"
        onClick={handleMore}
        disabled={pending}
        className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#4caf7d] px-7 text-sm font-bold text-white transition hover:bg-[#399765] disabled:opacity-60"
      >
        {pending ? <LoaderCircle size={16} className="animate-spin" /> : null}
        Yana 10
      </button>
    </div>
  );
}
