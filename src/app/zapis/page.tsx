import type { Metadata } from "next";
import { BookingWizard } from "@/components/BookingWizard";

export const metadata: Metadata = { title: "Запись онлайн" };

export default function Page() {
  return (
    <div className="page book" style={{ background: "var(--ice)", minHeight: "70vh" }}>
      <div className="w">
        <div className="sec-h" style={{ marginBottom: 28 }}>
          <div className="kick">Запись онлайн</div>
          <h1 className="h2">Выберите услугу, врача и время</h1>
          <p>Четыре шага, телефон нужен только в конце. Демо: запись сохраняется в вашем браузере.</p>
        </div>
        <BookingWizard />
      </div>
    </div>
  );
}
