import Link from "next/link";

export function Footer() {
  return (
    <footer className="ft">
      <div className="w">
        Демо-проект студии Akimov Web. Организация вымышлена: стоматология, врачи, цены, адрес и лицензия придуманы,
        реквизиты на этом месте появятся на рабочем сайте. Имеются противопоказания, необходима консультация специалиста.{" "}
        <Link href="/privacy/">Политика конфиденциальности (демо)</Link>
      </div>
    </footer>
  );
}
