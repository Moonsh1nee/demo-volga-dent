import Link from "next/link";
import { QuickBar } from "@/components/QuickBar";
import { BookingWizard } from "@/components/BookingWizard";
import { ContactBlock } from "@/components/ContactBlock";
import { Reveal } from "@/components/Reveal";
import { SERVICES } from "@/data/services";
import { DOCTORS, initials } from "@/data/doctors";

const FEATURES = [
  ["Один план", "Врач составляет план и называет итоговую цену до начала лечения."],
  ["Без очередей", "Приём по записи, ожидание не дольше 10 минут."],
  ["Рассрочка", "Разделите оплату лечения на 6 месяцев без переплаты."],
  ["Гарантия", "На пломбы три года, на импланты по паспорту производителя."],
];

const TECH = [
  ["3D-томография", "Видим корни и кость в объёме, поэтому планируем имплантацию заранее и без сюрпризов.", <><rect x="3" y="4" width="18" height="12" rx="3" /><path d="M8 20h8M12 16v4" /></>],
  ["Микроскоп", "Лечим каналы под увеличением в 20 раз. Это снижает риск повторного лечения.", <><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></>],
  ["Стерильность", "Инструменты проходят предстерилизационную очистку и упаковываются в крафт-пакеты при вас.", <><path d="M12 3l8 4v5c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V7z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>],
] as const;

const REVIEWS = [
  ["Боялась идти к стоматологу лет десять. Врач объяснила каждый шаг, ничего не болело, и я записалась на следующий визит сама.", "Ирина В.", "лечение кариеса"],
  ["Поставили имплант за один визит после 3D-снимка. Заранее показали план и сумму, в итоге не доплачивал ни рубля.", "Сергей П.", "имплантация"],
  ["Записала дочку через сайт в пятницу вечером, а в субботу утром уже были у врача. Ребёнок вышел с наклейкой и без слёз.", "Ольга Т.", "детский приём"],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="w">
          <div className="box">
            <div>
              <div className="kick" style={{ marginBottom: 22 }}>Стоматология в центре Волгограда</div>
              <h1 className="big">Лечим зубы так, что вы <span>не заметите</span> приёма</h1>
              <p className="lead">Запись за минуту без звонков, фиксированный план лечения и гарантия на работы.</p>
              <QuickBar />
              <div className="meta">
                <div><b>0 ₽</b><span>первичный осмотр</span></div>
                <div><b>3 года</b><span>гарантия на пломбы</span></div>
                <div><b>15 мин</b><span>до ближайшего окна</span></div>
              </div>
            </div>
            <div className="art" aria-hidden="true">
              <div className="disc" />
              <svg viewBox="0 0 400 420" fill="none">
                <path d="M200 78c-34-26-98-20-108 42-8 52 20 70 28 124 4 30 14 70 36 70 24 0 18-56 44-56s20 56 44 56c22 0 32-40 36-70 8-54 36-72 28-124-10-62-74-68-108-42z" fill="#fff" stroke="#0f6b6a" strokeWidth="2.5" />
                <path d="M130 150c22 22 48 28 70 28s48-6 70-28" stroke="#b8d9d4" strokeWidth="5" strokeLinecap="round" />
                <g className="tw1" fill="#0f6b6a"><path d="M300 100l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" /></g>
                <g className="tw2" fill="#0f6b6a"><path d="M120 120l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" /></g>
              </svg>
              <div className="chip" style={{ left: "-2%", top: "14%" }}><i>✓</i><div>Без боли<small>современная анестезия</small></div></div>
              <div className="chip" style={{ right: "-2%", top: "48%" }}><i>3D</i><div>Снимок за 8 секунд<small>минимум излучения</small></div></div>
            </div>
          </div>
        </div>
      </section>

      <Reveal as="section" className="sec">
        <div className="w" style={{ paddingBlock: 0 }}>
          <div className="feat">
            {FEATURES.map(([t, d]) => (
              <div key={t}><b>{t}</b><span>{d}</span></div>
            ))}
          </div>
        </div>
      </Reveal>

      <section className="sec" id="uslugi">
        <div className="w">
          <Reveal className="sec-h">
            <div className="kick">Услуги и цены</div>
            <h2 className="h2">Основные услуги и стоимость</h2>
            <p>Точную цену врач назовёт после осмотра. Здесь указаны цены, от которых мы отталкиваемся.</p>
          </Reveal>
          <div className="svc">
            {SERVICES.map((s) => (
              <Link key={s.slug} className="it" href={`/uslugi/${s.slug}/`}>
                <div className="ic">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={s.icon} /></svg>
                </div>
                <div><h3>{s.name}</h3><div className="d">{s.minutes} минут</div></div>
                <div className="pr">{s.priceLabel}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec book" id="book">
        <div className="w">
          <Reveal className="sec-h">
            <div className="kick">Запись онлайн</div>
            <h2 className="h2">Выберите услугу, врача и время</h2>
            <p>Четыре шага, телефон нужен только в конце. В демо-версии запись сохраняется в вашем браузере.</p>
          </Reveal>
          <div className="only-desk"><BookingWizard /></div>
          <div className="only-phone side-card">
            <p>Запись удобнее проходить на отдельном экране: выбор услуги, врача, времени и контактов займёт минуту.</p>
            <Link className="btn" href="/zapis/">Открыть запись</Link>
          </div>
        </div>
      </section>

      <section className="sec" id="vrachi">
        <div className="w">
          <Reveal className="sec-h"><div className="kick">Врачи</div><h2 className="h2">Команда, которой можно доверять</h2></Reveal>
          <div className="docs">
            {DOCTORS.map((d, i) => (
              <Reveal key={d.id} delay={(i % 4) * 0.07}>
                <Link className="doc" href={`/vrachi/${d.id}/`}>
                  <div className="pic" style={{ background: `linear-gradient(140deg,${d.color},color-mix(in srgb,${d.color} 55%,#000))` }} aria-hidden="true">{initials(d.name)}</div>
                  <div className="tx"><h3>{d.name}</h3><p>{d.role}</p><em>{d.expLabel}</em></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="tech" style={{ background: "var(--ice)" }}>
        <div className="w">
          <Reveal className="sec-h"><div className="kick">Технологии</div><h2 className="h2">Оборудование, которое экономит ваше время</h2></Reveal>
          <div className="tech">
            {TECH.map(([t, p, icon], i) => (
              <Reveal key={t} delay={i * 0.07}>
                <div>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">{icon}</svg>
                  <h3>{t}</h3><p>{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="otz">
        <div className="w">
          <Reveal className="sec-h">
            <div className="kick">Отзывы</div><h2 className="h2">Пациенты о приёме</h2>
            <p>Отзывы демонстрационные. На рабочем сайте здесь будут настоящие, со ссылками на карты.</p>
          </Reveal>
          <div className="rv">
            {REVIEWS.map(([text, who, what], i) => (
              <Reveal key={who} as="figure" delay={i * 0.07}>
                <div aria-label="Оценка 5 из 5">★★★★★</div>
                <blockquote style={{ margin: 0 }}>{text}</blockquote>
                <figcaption>{who} <span>{what} · демонстрационный отзыв</span></figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="kont" style={{ paddingTop: 0 }}>
        <div className="w"><ContactBlock /></div>
      </section>
    </>
  );
}
