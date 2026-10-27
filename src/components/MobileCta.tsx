"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileCta() {
  const path = usePathname() ?? "";
  if (path.startsWith("/zapis")) return null;
  return (
    <div className="mcta">
      <Link className="btn" href="/zapis/">Записаться онлайн</Link>
    </div>
  );
}
