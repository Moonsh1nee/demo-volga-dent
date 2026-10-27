import type { Metadata, Viewport } from "next";
import { Geologica, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCta } from "@/components/MobileCta";
import { Toaster } from "@/components/Toaster";

const geologica = Geologica({ subsets: ["latin", "cyrillic"], weight: ["300", "500", "700"], variable: "--font-geologica" });
const manrope = Manrope({ subsets: ["latin", "cyrillic"], weight: ["500", "600", "700", "800"], variable: "--font-manrope" });

const DESC = "Демо-сайт стоматологии с пошаговой онлайн-записью. Клиника и все данные вымышлены, проект студии Akimov Web.";

export const metadata: Metadata = {
  title: { default: "Волга-Дент — демо сайта стоматологии с онлайн-записью", template: "%s · Волга-Дент (демо)" },
  description: DESC,
  robots: { index: false, follow: false },
  openGraph: { title: "Волга-Дент — демо сайта стоматологии", description: DESC, type: "website", locale: "ru_RU" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

const themeInit = `try{var t=localStorage.getItem('volgadent-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${geologica.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <div className="demo-note">Демонстрационный сайт: клиника, врачи, цены и лицензия вымышлены</div>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCta />
        <Toaster />
      </body>
    </html>
  );
}
