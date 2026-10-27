"use client";

import { useSyncExternalStore } from "react";
import { dayLabel, nextFreeSlots } from "@/lib/booking";
import { useAppointments } from "@/lib/appointments";
import { StartBooking } from "./StartBooking";

const noop = () => () => {};

export function NextSlots({ doctorId }: { doctorId: string }) {
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const appts = useAppointments();
  if (!mounted) return <p style={{ color: "var(--mute)" }}>Подбираем окна…</p>;
  const slots = nextFreeSlots(doctorId, appts, 6);
  return (
    <div className="slot-row">
      {slots.map((s) => (
        <StartBooking
          key={s.key + s.time}
          service="konsultatsiya"
          doctor={doctorId}
          day={s.key}
          time={s.time}
          className=""
          label={`${dayLabel(s.day)} · ${s.time}`}
        />
      ))}
    </div>
  );
}
