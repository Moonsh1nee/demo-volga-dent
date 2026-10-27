import { useSyncExternalStore } from "react";
import { readJSON, sleep, writeJSON } from "./storage";
import { dayKey, dayLabel, isBusy } from "./booking";
import { serviceBySlug } from "@/data/services";
import { doctorById } from "@/data/doctors";

const KEY = "volgadent-appts";

export type Appointment = {
  id: string;
  service: string;
  doctor: string;
  day: string;
  dayText: string;
  time: string;
  name: string;
  phone: string;
};

export type BookingInput = {
  service: string;
  doctor: string;
  date: Date;
  time: string;
  name: string;
  phone: string;
};

let cache: Appointment[] = [];
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  cache = readJSON<Appointment[]>(KEY, []);
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      cache = readJSON<Appointment[]>(KEY, []);
      listeners.forEach((l) => l());
    }
  });
}

function commit(next: Appointment[]) {
  cache = next;
  writeJSON(KEY, next);
  listeners.forEach((l) => l());
}

const EMPTY: Appointment[] = [];

export function useAppointments(): Appointment[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => {
      load();
      return cache;
    },
    () => EMPTY,
  );
}

/** Имитация сервера: задержка 600 мс и повторная проверка слота. */
export async function bookAppointment(input: BookingInput): Promise<Appointment> {
  await sleep(600);
  load();
  const key = dayKey(input.date);
  if (isBusy(input.doctor, key, input.time, cache)) {
    throw new Error("Это время только что заняли. Выберите другое окно.");
  }
  const id = String(Math.floor(1000 + Math.random() * 9000));
  const appt: Appointment = {
    id,
    service: input.service,
    doctor: input.doctor,
    day: key,
    dayText: dayLabel(input.date),
    time: input.time,
    name: input.name,
    phone: input.phone,
  };
  commit([...cache, appt]);
  return appt;
}

export async function cancelAppointment(id: string) {
  await sleep(300);
  load();
  commit(cache.filter((a) => a.id !== id));
}

export const describe = (a: Appointment) => ({
  service: serviceBySlug(a.service)?.name ?? a.service,
  doctor: doctorById(a.doctor)?.name ?? a.doctor,
});
