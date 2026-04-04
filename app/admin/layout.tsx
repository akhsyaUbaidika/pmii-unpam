"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (pathname === "/admin/login") return;

    if (!token) {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/admin/login");
  }

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <div className="bg-white shadow px-6 py-4 flex justify-between">
        <h1 className="font-bold">Admin PMII</h1>

        <button
          onClick={handleLogout}
          className="text-red-500 text-sm"
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-6">{children}</div>
    </div>
  );
}