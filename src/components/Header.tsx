"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  ["/#uslugi", "Услуги и цены"],
  ["/zapis/", "Запись"],
  ["/#vrachi", "Врачи"],
  ["/#tech", "Технологии"],
  ["/#otz", "Отзывы"],
  ["/contacts/", "Контакты"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="hd">
      <div className="w">
        <Logo />
        <nav className="nav" aria-label="Основное меню">
          {LINKS.map(([href, label]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
        <a className="ph" href="tel:+70000000000">8 (000) 000-00-00</a>
        <Link className="btn cta" href="/zapis/">Записаться</Link>
        <ThemeToggle />
        <button
          type="button"
          className="icon-btn burger"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <nav id="mobile-menu" className={`menu${open ? " open" : ""}`} aria-label="Мобильное меню">
        {LINKS.map(([href, label]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
        ))}
      </nav>
    </header>
  );
}
