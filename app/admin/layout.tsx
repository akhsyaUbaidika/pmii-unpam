"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ❗ skip kalau di halaman login
    if (pathname === "/admin/login") return;

    if (!token) {
      window.location.href = "/admin/login";
    }
  }, [pathname]);

  return <>{children}</>;
}