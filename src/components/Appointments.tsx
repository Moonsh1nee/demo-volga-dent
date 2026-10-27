"use client";

import Link from "next/link";
import { useState } from "react";
import { cancelAppointment, describe, useAppointments } from "@/lib/appointments";
import { toast } from "@/lib/toast";
import { setDraft } from "@/lib/draft";

export function Appointments({ compact = false }: { compact?: boolean }) {
  const appts = useAppointments();
  const [busyId, setBusyId] = useState<string | null>(null);

  const cancel = async (id: string) => {
    setBusyId(id);
    await cancelAppointment(id);
    setDraft({ lastId: null });
    setBusyId(null);
    toast("Запись отменена");
  };

  if (!appts.length) {
    if (compact) return null;
    return (
      <div className="side-card">
        <p>Пока нет ни одной записи. Записи из демо хранятся только в вашем браузере.</p>
        <Link className="btn" href="/zapis/">Записаться</Link>
      </div>
    );
  }
  return (
    <div className="my">
      <h3>Мои записи</h3>
      {appts.map((a) => {
        const t = describe(a);
        return (
          <div className="rec" key={a.id}>
            <span>
              <b>{t.service}</b>
              <br />
              <small>{t.doctor} · {a.dayText} в {a.time} · №{a.id}</small>
            </span>
            <button type="button" disabled={busyId === a.id} onClick={() => cancel(a.id)}>
              {busyId === a.id ? "Отменяем…" : "Отменить"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
