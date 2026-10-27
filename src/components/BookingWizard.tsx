"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SERVICES, serviceBySlug } from "@/data/services";
import { doctorById, doctorsForService, initials } from "@/data/doctors";
import { TIMES, dayKey, dayLabel, formatPrice, isBusy, upcomingDays, weekday } from "@/lib/booking";
import { bookAppointment, describe, useAppointments } from "@/lib/appointments";
import { resetDraft, setDraft, useDraft } from "@/lib/draft";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { toast } from "@/lib/toast";
import { Appointments } from "./Appointments";

const noopSubscribe = () => () => {};
const useMounted = () => useSyncExternalStore(noopSubscribe, () => true, () => false);

function Steps({ step }: { step: number }) {
  return (
    <div className="stp" role="img" aria-label={`Шаг ${Math.min(step, 3) + 1} из 4`}>
      {[0, 1, 2, 3].map((i) => (
        <i key={i} className={i <= Math.min(step, 3) ? "on" : ""} />
      ))}
    </div>
  );
}

export function BookingWizard() {
  const d = useDraft();
  const appts = useAppointments();
  const mounted = useMounted();
  const days = useMemo(() => (mounted ? upcomingDays() : []), [mounted]);
  const headRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headRef.current?.focus({ preventScroll: true });
  }, [d.step]);

  const service = d.service ? serviceBySlug(d.service) : undefined;
  const doctor = d.doctor ? doctorById(d.doctor) : undefined;
  const dayDate = days.find((x) => dayKey(x) === d.day);
  const go = (step: number) => setDraft({ step });

  let body: React.ReactNode;
  if (d.step === 0 || (d.step > 0 && !service)) {
    body = (
      <>
        <Steps step={0} />
        <h3 ref={headRef} tabIndex={-1}>Что вас беспокоит?</h3>
        <p className="sub">Выберите услугу. Если не уверены, начните с бесплатной консультации.</p>
        <div className="opts">
          {SERVICES.map((s) => (
            <button
              key={s.slug}
              type="button"
              className="opt"
              aria-pressed={d.service === s.slug}
              onClick={() => setDraft({ service: s.slug, doctor: null, day: null, time: null })}
            >
              <span><b>{s.name}</b><small>{s.minutes} минут</small></span>
              <span className="rt">{s.priceLabel}</span>
            </button>
          ))}
        </div>
        <div className="nav2"><span /><button type="button" className="btn" disabled={!d.service} onClick={() => go(1)}>Далее</button></div>
      </>
    );
  } else if (d.step === 1) {
    body = (
      <>
        <Steps step={1} />
        <h3 ref={headRef} tabIndex={-1}>Выберите врача</h3>
        <p className="sub">Врачи, которые ведут «{service!.name.toLowerCase()}».</p>
        <div className="opts">
          {doctorsForService(service!.slug).map((x) => (
            <button
              key={x.id}
              type="button"
              className="opt"
              aria-pressed={d.doctor === x.id}
              onClick={() => setDraft({ doctor: x.id, day: null, time: null })}
            >
              <span className="av" style={{ background: x.color }} aria-hidden="true">{initials(x.name)}</span>
              <span><b>{x.name}</b><small>{x.role}, {x.expLabel}</small></span>
            </button>
          ))}
        </div>
        <div className="nav2">
          <button type="button" className="btn line" onClick={() => go(0)}>Назад</button>
          <button type="button" className="btn" disabled={!d.doctor} onClick={() => go(2)}>Далее</button>
        </div>
      </>
    );
  } else if (d.step === 2 && doctor) {
    body = (
      <>
        <Steps step={2} />
        <h3 ref={headRef} tabIndex={-1}>Дата и время</h3>
        <p className="sub">Перечёркнутые окна уже заняты. Приём длится {service!.minutes} минут.</p>
        <div className="days" role="group" aria-label="Дата приёма">
          {days.map((x) => {
            const k = dayKey(x);
            return (
              <button key={k} type="button" className="day" aria-pressed={d.day === k} onClick={() => setDraft({ day: k, time: null })}>
                <small>{weekday(x)}</small><b>{x.getDate()}</b>
              </button>
            );
          })}
        </div>
        {!dayDate ? (
          <p className="sub">Сначала выберите день.</p>
        ) : (
          <div className="slots" role="group" aria-label="Время приёма">
            {TIMES.map((t) => {
              const busy = isBusy(doctor.id, d.day!, t, appts);
              return (
                <button
                  key={t}
                  type="button"
                  className="slot"
                  disabled={busy}
                  aria-pressed={d.time === t}
                  aria-label={busy ? `${t}, занято` : t}
                  onClick={() => setDraft({ time: t })}
                >
                  {t}
                </button>
              );
            })}
          </div>
        )}
        <div className="nav2">
          <button type="button" className="btn line" onClick={() => go(1)}>Назад</button>
          <button type="button" className="btn" disabled={!d.time || !dayDate} onClick={() => go(3)}>Далее</button>
        </div>
      </>
    );
  } else if (d.step === 3 && service && doctor && dayDate && d.time) {
    body = (
      <>
        <Steps step={3} />
        <h3 ref={headRef} tabIndex={-1}>Ваши контакты</h3>
        <p className="sub">Администратор подтвердит запись по телефону.</p>
        <ContactForm date={dayDate} />
      </>
    );
  } else if (d.step === 4) {
    const a = appts.find((x) => x.id === d.lastId);
    body = a ? (
      <div className="done">
        <motion.div className="tick" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} aria-hidden="true">✓</motion.div>
        <h3 ref={headRef} tabIndex={-1}>Вы записаны</h3>
        <p className="sub" style={{ marginTop: 8 }}>
          Напоминание придёт за сутки до приёма. Это демо: запись сохранена только в вашем браузере, клиника её не получила.
        </p>
        <div className="tk">
          <div><b>{describe(a).service}</b></div>
          <div>{describe(a).doctor}</div>
          <div>{a.dayText} в {a.time}</div>
          <div style={{ color: "var(--mute)" }}>Запись №{a.id}</div>
        </div>
        <div className="nav2" style={{ justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" className="btn line" onClick={resetDraft}>Записаться ещё</button>
          <Link className="btn line" href="/moi-zapisi/">Мои записи</Link>
        </div>
      </div>
    ) : (
      <>
        <h3 ref={headRef} tabIndex={-1}>Запись отменена</h3>
        <div className="nav2"><button type="button" className="btn" onClick={resetDraft}>Записаться заново</button></div>
      </>
    );
  } else {
    body = (
      <>
        <h3 ref={headRef} tabIndex={-1}>Выберите время заново</h3>
        <p className="sub">Данные записи устарели.</p>
        <div className="nav2"><button type="button" className="btn" onClick={resetDraft}>Начать сначала</button></div>
      </>
    );
  }

  return (
    <div className="bk">
      <div>
        <div className="panel">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={d.step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {body}
            </motion.div>
          </AnimatePresence>
        </div>
        {appts.length > 0 && <Appointments compact />}
      </div>
      <aside className="sum" aria-live="polite">
        <h4>Ваша запись</h4>
        <dl>
          <div><dt>Услуга</dt><dd>{service ? service.name : "не выбрана"}</dd></div>
          <div><dt>Врач</dt><dd>{doctor ? doctor.name : "не выбран"}</dd></div>
          <div><dt>Время</dt><dd>{dayDate && d.time ? `${dayLabel(dayDate)} в ${d.time}` : "не выбрано"}</dd></div>
        </dl>
        <div className="tot">
          <span>Стоимость</span>
          <span>{service ? (service.price ? `${service.from ? "от " : ""}${formatPrice(service.price)}` : "0 ₽") : "–"}</span>
        </div>
      </aside>
    </div>
  );
}

function ContactForm({ date }: { date: Date }) {
  const d = useDraft();
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: d.name, phone: d.phone, consent: d.consent },
  });
  const keep = () => setDraft(getValues());

  const onSubmit = async (v: ContactInput) => {
    setBusy(true);
    setServerError("");
    try {
      const a = await bookAppointment({
        service: d.service!,
        doctor: d.doctor!,
        date,
        time: d.time!,
        name: v.name.trim(),
        phone: v.phone,
      });
      setDraft({ step: 4, lastId: a.id, name: v.name, phone: v.phone, consent: true });
      toast("Демо: запись сохранена в браузере, клиника её не получит");
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Не удалось записаться");
    } finally {
      setBusy(false);
    }
  };

  const msg = errors.name?.message || errors.phone?.message || errors.consent?.message || serverError;
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label>
        Имя
        <input type="text" autoComplete="given-name" placeholder="Иван" aria-invalid={!!errors.name} {...register("name")} />
      </label>
      <label>
        Телефон
        <input type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 900 000-00-00" aria-invalid={!!errors.phone} {...register("phone")} />
      </label>
      <label className="cons">
        <input type="checkbox" {...register("consent")} />
        <span>Согласен на обработку персональных данных (в демо-версии данные остаются в браузере)</span>
      </label>
      <div className="err" role="alert">{msg}</div>
      <div className="nav2" style={{ marginTop: 6 }}>
        <button type="button" className="btn line" onClick={() => { keep(); setDraft({ step: 2 }); }}>Назад</button>
        <button type="submit" className="btn" disabled={busy}>{busy ? "Записываем…" : "Записаться"}</button>
      </div>
    </form>
  );
}
