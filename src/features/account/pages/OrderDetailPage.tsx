"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Banknote, ChevronLeft, MapPin, Package, Truck } from "lucide-react";
import { useCancelOrder, useOrder, useReturnOrder } from "@/src/hooks/useOrders";
import { formatDate, formatPrice, mediaUrl } from "@/src/lib/format";
import StatusBadge from "../components/StatusBadge";
import ConfirmDialog from "../components/ConfirmDialog";
import { canCancel, canReturn, STATUS_LABEL } from "../lib/orderStatus";

export default function OrderDetailPage() {
  const params = useParams();
  const id = String(params?.id || "");
  const { order, isLoading } = useOrder(id);
  const { cancelOrder, isPending: canceling } = useCancelOrder();
  const { returnOrder, isPending: returning } = useReturnOrder();
  const [confirm, setConfirm] = useState<"cancel" | "return" | null>(null);

  if (isLoading || !order) {
    return <div className="h-80 animate-pulse rounded-3xl bg-white ring-1 ring-gray-100" />;
  }

  const address = order.addressSnapshot || {};

  return (
    <div className="space-y-5">
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-[#399765]"
      >
        <ChevronLeft size={16} /> Buyurtmalar
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">№ {order.orderNumber}</h1>
          <p className="mt-1 text-sm text-gray-500">{formatDate(order.createdAt)}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <section className="space-y-3 rounded-3xl bg-white p-5 ring-1 ring-gray-100">
          {order.items?.map((item: any) => (
            <div key={item.id} className="flex items-center gap-3 border-b border-gray-50 py-3 last:border-0">
              <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-[#f4f7f5]">
                {item.productImage ? (
                  <img src={mediaUrl(item.productImage)} alt="" className="h-14 w-14 object-contain" />
                ) : (
                  <Package size={16} className="text-gray-300" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 font-semibold text-gray-900">{item.productName}</p>
                <p className="text-xs text-gray-400">{item.quantity} dona</p>
              </div>
              <p className="font-bold">{formatPrice(item.total ?? item.price * item.quantity)}</p>
            </div>
          ))}
        </section>

        <aside className="space-y-4">
          <div className="rounded-3xl bg-white p-5 ring-1 ring-gray-100">
            <p className="mb-3 font-bold">Xulosa</p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Mahsulotlar</span>
                <span className="font-semibold text-gray-900">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1"><Truck size={14} /> Yetkazish</span>
                <span className="font-semibold text-[#399765]">Biz yetkazamiz</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1"><Banknote size={14} /> To'lov</span>
                <span className="font-semibold text-[#399765]">Yetkazilganda</span>
              </div>
              <div className="flex justify-between border-t border-dashed pt-3">
                <span>Jami</span>
                <span className="text-lg font-extrabold text-[#2f8a58]">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 ring-1 ring-gray-100">
            <p className="mb-2 flex items-center gap-2 font-bold">
              <MapPin size={16} className="text-[#399765]" /> Manzil
            </p>
            <p className="text-sm text-gray-700">
              {address.firstName} {address.lastName} · {address.phone}
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              {[address.region, address.district, address.mahalla, address.street, address.house]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>

          {order.statusHistory?.length > 0 && (
            <div className="rounded-3xl bg-white p-5 ring-1 ring-gray-100">
              <p className="mb-3 font-bold">Holatlar</p>
              <ul className="space-y-2 text-sm">
                {order.statusHistory.map((item: any) => (
                  <li key={item.id} className="flex justify-between gap-3 text-gray-500">
                    <span>{STATUS_LABEL[item.status] || item.status}</span>
                    <span>{formatDate(item.createdAt)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {canCancel(order.status) && (
              <button
                type="button"
                onClick={() => setConfirm("cancel")}
                className="cursor-pointer rounded-2xl border border-red-100 bg-red-50 py-3 text-sm font-bold text-red-500"
              >
                Buyurtmani bekor qilish
              </button>
            )}
            {canReturn(order.status) && (
              <button
                type="button"
                onClick={() => setConfirm("return")}
                className="cursor-pointer rounded-2xl border border-orange-100 bg-orange-50 py-3 text-sm font-bold text-orange-600"
              >
                Qaytarish so'rash
              </button>
            )}
          </div>
        </aside>
      </div>

      <ConfirmDialog
        open={confirm === "cancel"}
        title="Bekor qilasizmi?"
        text="Bu buyurtma bekor qilinadi."
        confirmLabel="Bekor qilish"
        danger
        loading={canceling}
        onClose={() => setConfirm(null)}
        onConfirm={async () => {
          await cancelOrder(id);
          setConfirm(null);
        }}
      />
      <ConfirmDialog
        open={confirm === "return"}
        title="Qaytarish so'raysizmi?"
        text="Yetkazilgan buyurtma uchun qaytarish so'rovi yuboriladi."
        confirmLabel="Yuborish"
        loading={returning}
        onClose={() => setConfirm(null)}
        onConfirm={async () => {
          await returnOrder(id);
          setConfirm(null);
        }}
      />
    </div>
  );
}
