"use client";

import { FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import { useUser } from "../context/UserContext";
import { useMounted } from "../hooks/useMounted";
import { useAuthModal } from "../providers/AuthModalProvider";

export default function Register() {
  const { user } = useUser();
  const mounted = useMounted();
  const { openAuth } = useAuthModal();

  const displayUser = mounted ? user : null;

  return displayUser ? (
    <Link
      href="/account"
      aria-label="Profil"
      className="flex h-10 w-10 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#4caf7d] text-white transition hover:bg-[#3d9c6c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf7d]/40 sm:h-auto sm:w-auto sm:rounded-xl sm:px-4 sm:py-2.5"
    >
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt="Profil rasmi"
          className="h-5 w-5 rounded-full object-cover"
        />
      ) : (
        <FaUserAlt size={15} />
      )}
      <span className="hidden text-sm font-semibold sm:inline">
        {user?.firstName || "Profil"}
      </span>
    </Link>
  ) : (
    <button
      type="button"
      aria-label="Hisobga kirish"
      onClick={() => openAuth("login")}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#4caf7d] text-white transition hover:bg-[#3d9c6c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf7d]/40"
    >
      <FaUserAlt size={16} />
    </button>
  );
}
