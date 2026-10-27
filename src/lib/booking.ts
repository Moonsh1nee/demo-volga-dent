import type { Appointment } from "./appointments";

export const TIMES = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const WEEKDAYS = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

export const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
export const weekday = (d: Date) => WEEKDAYS[d.getDay()];
export const dayLabel = (d: Date) =>
  `${weekday(d)}, ${d.getDate()}.${String(d.getMonth() + 1).padStart(2, "0")}`;

/** Девять ближайших дней без воскресенья, начиная с завтрашнего. */
export function upcomingDays(count = 9, from = new Date()): Date[] {
  const out: Date[] = [];
  for (let i = 1; out.length < count; i++) {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    if (d.getDay() !== 0) out.push(d);
  }
  return out;
}

/** Занятость детерминирована: хеш от врач+дата+время, чтобы картина не менялась при обновлении. */
function hashBusy(doctorId: string, key: string, time: string) {
  const s = doctorId + key + time;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 3 === 0;
}

export function isBusy(doctorId: string, key: string, time: string, mine: Appointment[] = []) {
  return hashBusy(doctorId, key, time) || mine.some((a) => a.doctor === doctorId && a.day === key && a.time === time);
}

export function nextFreeSlots(doctorId: string, mine: Appointment[], limit = 4) {
  const out: { day: Date; key: string; time: string }[] = [];
  for (const day of upcomingDays()) {
    const key = dayKey(day);
    for (const time of TIMES) {
      if (!isBusy(doctorId, key, time, mine)) out.push({ day, key, time });
      if (out.length === limit) return out;
    }
  }
  return out;
}

export const formatPrice = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;
