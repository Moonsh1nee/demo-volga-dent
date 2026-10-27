"use client";

import { useToast } from "@/lib/toast";

export function Toaster() {
  const msg = useToast();
  return (
    <div className={`toast${msg ? " on" : ""}`} role="status" aria-live="polite">
      {msg}
    </div>
  );
}
