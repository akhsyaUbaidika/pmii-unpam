"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function TopLoader() {
    const pathname = usePathname();

    useEffect(() => {
        NProgress.start();

        const timer = setTimeout(() => {
            NProgress.done();
        }, 300); // biar ga flicker

        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
}