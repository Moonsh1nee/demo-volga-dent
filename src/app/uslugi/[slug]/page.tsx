import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, serviceBySlug } from "@/data/services";
import { doctorsForService, initials } from "@/data/doctors";
import { StartBooking } from "@/components/StartBooking";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => SERVICES.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = serviceBySlug((await params).slug);
  return { title: s?.name, description: s?.lead };
}

export default async function Page({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  return (
    <div className="page">
      <div className="w">
        <div className="crumbs"><Link href="/">Главная</Link> / <Link href="/#uslugi">Услуги и цены</Link> / {s.name}</div>
        <h1 className="big" style={{ fontSize: "clamp(34px,5vw,60px)" }}>{s.name}</h1>
        <p className="lead" style={{ marginTop: 18, fontSize: 19, color: "var(--mute)", maxWidth: "34em" }}>{s.lead}</p>
        <div><span className="pill">{s.priceLabel}</span><span className="pill">{s.minutes} минут</span></div>
        <div className="two">
          <div>
            <h2 className="h2" style={{ fontSize: 28, marginBottom: 20 }}>Как проходит</h2>
            <ol className="stages">{s.stages.map((x) => <li key={x}>{x}</li>)}</ol>
            <h2 className="h2" style={{ fontSize: 28, margin: "44px 0 12px" }}>Вопросы</h2>
            <div className="faq">
              {s.faq.map((f) => (
                <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
              ))}
            </div>
          </div>
          <aside className="side-card">
            <StartBooking service={s.slug} label="Записаться на эту услугу" />
            <b>Кто ведёт</b>
            {doctorsForService(s.slug).map((d) => (
              <Link key={d.id} className="mini" href={`/vrachi/${d.id}/`}>
                <span className="av" style={{ background: d.color }} aria-hidden="true">{initials(d.name)}</span>
                <span><b style={{ display: "block" }}>{d.name}</b><small style={{ color: "var(--mute)" }}>{d.role}</small></span>
              </Link>
            ))}
            <small style={{ color: "var(--mute)" }}>Цена демонстрационная. Имеются противопоказания, необходима консультация специалиста.</small>
          </aside>
        </div>
      </div>
    </div>
  );
}
