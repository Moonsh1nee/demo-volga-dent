import type { Metadata } from "next";
import { Appointments } from "@/components/Appointments";

export const metadata: Metadata = { title: "Мои записи" };

export default function Page() {
  return (
    <div className="page">
      <div className="w" style={{ maxWidth: 760 }}>
        <div className="sec-h"><div className="kick">Демо</div><h1 className="h2">Мои записи</h1>
          <p>Записи хранятся только в этом браузере. Их можно отменить.</p></div>
        <Appointments />
      </div>
    </div>
  );
}
