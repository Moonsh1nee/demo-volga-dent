"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

let armed = false;
function arm() {
  if (armed || typeof window === "undefined") return;
  armed = true;
  window.addEventListener("scroll", () => document.documentElement.classList.add("armed"), { once: true, passive: true });
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "figure";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    arm();
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const T = Tag as "div";
  return (
    <T ref={ref as React.RefObject<HTMLDivElement>} className={`r ${className}`} style={{ "--d": `${delay}s` } as CSSProperties}>
      {children}
    </T>
  );
}
