"use client";

import { useRouter } from "next/navigation";
import { setDraft } from "@/lib/draft";

type Props = {
  service: string;
  doctor?: string;
  day?: string;
  time?: string;
  label: string;
  className?: string;
};

/** Кладёт выбор в черновик записи и открывает мастер на нужном шаге. */
export function StartBooking({ service, doctor, day, time, label, className = "btn" }: Props) {
  const router = useRouter();
  const click = () => {
    setDraft({
      service,
      doctor: doctor ?? null,
      day: day ?? null,
      time: time ?? null,
      step: time ? 3 : day ? 2 : doctor ? 2 : 1,
    });
    router.push("/zapis/");
  };
  return (
    <button type="button" className={className} onClick={click}>
      {label}
    </button>
  );
}
