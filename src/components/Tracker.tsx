"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PMS_API = "https://dimetechnology-pms.info-thedimetechnology.workers.dev/";

function track(type: string, page: string, element = "") {
  try {
    fetch(PMS_API, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "track",
        type,
        page,
        element,
        expertise: "",
        location: "",
        site: location.host,
      }),
    }).catch(() => {});
  } catch {
    // tracking must never break the page
  }
}

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    track("pageview", pathname || "/");

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest("[data-track]");
      if (!el) return;
      track("click", pathname || "/", el.getAttribute("data-track") || "");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}
