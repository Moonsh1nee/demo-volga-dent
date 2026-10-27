import type { Metadata } from "next";
import { ContactBlock } from "@/components/ContactBlock";

export const metadata: Metadata = { title: "Контакты" };

export default function Page() {
  return (
    <div className="page">
      <div className="w">
        <div className="sec-h"><div className="kick">Контакты</div><h1 className="h2">Как нас найти</h1>
          <p>Все контактные данные вымышлены: это демонстрационный сайт.</p></div>
        <ContactBlock />
      </div>
    </div>
  );
}
