import Link from "next/link";

export function ToothMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 5c-3-2.4-9-2-10 4-.8 5 2 7 2.6 12 .4 3 1.6 6 3.4 6 2.2 0 1.6-5 4-5s1.8 5 4 5c1.8 0 3-3 3.4-6C24 16 26.8 14 26 9c-1-6-7-6.4-10-4z" fill="currentColor" />
      <path d="M10 12c2 2 4.5 2.6 6 2.6S20 14 22 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link className="logo" href="/">
      <ToothMark />
      Волга-Дент
    </Link>
  );
}
