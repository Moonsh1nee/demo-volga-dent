import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DOCTORS, doctorById, initials } from "@/data/doctors";
import { serviceBySlug } from "@/data/services";
import { NextSlots } from "@/components/NextSlots";
import { StartBooking } from "@/components/StartBooking";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => DOCTORS.map((d) => ({ id: d.id }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = doctorById((await params).id);
  return { title: d ? `${d.name}, ${d.role.toLowerCase()}` : undefined, description: d?.bio };
}

export default async function Page({ params }: Props) {
  const d = doctorById((await params).id);
  if (!d) notFound();
  return (
    <div className="page">
      <div className="w">
        <div className="crumbs"><Link href="/">Главная</Link> / <Link href="/#vrachi">Врачи</Link> / {d.name}</div>
        <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
          <span className="av" style={{ background: d.color, width: 96, height: 96, fontSize: 32 }} aria-hidden="true">{initials(d.name)}</span>
          <div>
            <h1 className="big" style={{ fontSize: "clamp(32px,4.6vw,56px)" }}>{d.name}</h1>
            <p style={{ color: "var(--mute)", marginTop: 8 }}>{d.role} · {d.expLabel} · вымышленный персонаж</p>
          </div>
        </div>
        <div className="two">
          <div>
            <p style={{ fontSize: 18, color: "var(--mute)", maxWidth: "34em" }}>{d.bio}</p>
            <h2 className="h2" style={{ fontSize: 28, margin: "40px 0 16px" }}>Ближайшие свободные окна</h2>
            <NextSlots doctorId={d.id} />
            <p style={{ color: "var(--mute)", fontSize: 13, marginTop: 12 }}>Нажмите на время, чтобы записаться на бесплатную консультацию. Окна условные.</p>
          </div>
          <aside className="side-card">
            <b>Записаться на услугу</b>
            {d.services.map((slug) => {
              const s = serviceBySlug(slug)!;
              return <StartBooking key={slug} service={slug} doctor={d.id} className="btn line" label={`${s.name} · ${s.priceLabel}`} />;
            })}
          </aside>
        </div>
      </div>
    </div>
  );
}
