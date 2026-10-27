import Link from "next/link";

export function ContactBlock() {
  return (
    <div className="cont">
      <div className="map" role="img" aria-label="Схема проезда (демонстрационная)">
        <svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
          <rect width="400" height="320" fill="var(--ice)" />
          <path d="M-10 230C80 200 160 250 260 210S380 150 420 170V340H-10z" fill="#9fd2ee" opacity=".7" />
          <g stroke="var(--line)" strokeWidth="10" strokeLinecap="round"><path d="M0 60h400M0 140h300M90 0v200M220 0v170M320 90v110" /></g>
          <g fill="var(--surf)" opacity=".9"><rect x="110" y="76" width="90" height="52" rx="10" /><rect x="240" y="20" width="60" height="50" rx="10" /><rect x="20" y="76" width="56" height="52" rx="10" /></g>
          <g transform="translate(150 96)"><path d="M0 40C-18 14-16-14 0-14s18 28 0 54z" fill="var(--coral)" transform="translate(0 -4) scale(1.1)" /><circle cx="0" cy="-2" r="6" fill="#fff" /></g>
        </svg>
      </div>
      <div className="info">
        <h3>Центр Волгограда, рядом с набережной</h3>
        <div><b>Адрес</b>Демо-адрес: ул. Примерная, 1 (вымышленный)</div>
        <div><b>Часы работы</b>Пн–Сб 9:00 – 19:00, воскресенье выходной</div>
        <div><b>Телефон</b>8 (000) 000-00-00</div>
        <div><b>Почта</b>info@example.ru</div>
        <div><Link className="btn" href="/zapis/">Записаться онлайн</Link></div>
      </div>
    </div>
  );
}
