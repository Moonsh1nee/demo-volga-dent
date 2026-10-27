"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const dark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : window.matchMedia("(prefers-color-scheme:dark)").matches;
    const next = dark ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("volgadent-theme", next);
    } catch {}
  };
  return (
    <button type="button" className="icon-btn thm" onClick={toggle} aria-label="Сменить тему оформления">
      <Sun size={18} className="hidden [:root[data-theme=dark]_&]:block" aria-hidden="true" />
      <Moon size={18} className="[:root[data-theme=dark]_&]:hidden" aria-hidden="true" />
    </button>
  );
}
