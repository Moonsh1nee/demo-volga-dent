"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SERVICES } from "@/data/services";
import { doctorsForService } from "@/data/doctors";
import { setDraft } from "@/lib/draft";

export function QuickBar() {
  const router = useRouter();
  const [svc, setSvc] = useState(SERVICES[0].slug);
  const [doc, setDoc] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDraft({ service: svc, doctor: doc || null, day: null, time: null, step: doc ? 2 : 1 });
    if (window.matchMedia("(max-width:720px)").matches) {
      router.push("/zapis/");
    } else {
      document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <form className="qb" onSubmit={submit}>
      <label>
        Услуга
        <select value={svc} onChange={(e) => { setSvc(e.target.value); setDoc(""); }}>
          {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
        </select>
      </label>
      <label>
        Врач
        <select value={doc} onChange={(e) => setDoc(e.target.value)}>
          <option value="">Любой свободный</option>
          {doctorsForService(svc).map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </label>
      <button className="btn" type="submit">Найти время</button>
    </form>
  );
}
