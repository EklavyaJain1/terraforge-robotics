import { MoveUpRight } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionKicker from "@/components/SectionKicker";
import { useOrderForm } from "@/contexts/OrderContext";
import { useLanguage } from "@/contexts/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";

export default function About() {
  const { t } = useLanguage();
  usePageTitle(t.aboutTitle);
  const { openOrderForm } = useOrderForm();

  return (
    <div className="tf-page">
      <Navbar />
      <main className="pt-[72px]">
        <section className="tf-surface py-16 sm:py-24">
          <div className="tf-container">
            <SectionKicker number="WHO" label={t.aboutKicker} />
            <h1 className="mt-7 max-w-[720px] text-5xl font-medium leading-[.95] tracking-[-.055em] sm:text-7xl">
              {t.aboutHeading}
            </h1>
            <p className="mt-6 max-w-[480px] text-base leading-7 text-[#3F4B45]">
              {t.aboutSub}
            </p>
          </div>
        </section>

        <section className="tf-dark py-16 sm:py-20">
          <div className="tf-container grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
            <div>
              <SectionKicker number="HOW" label={t.believeKicker} light />
              <h2 className="mt-7 max-w-[380px] text-4xl font-medium leading-[.98] tracking-[-.055em] text-white sm:text-5xl">
                {t.believeHeading}
              </h2>
            </div>
            <div className="space-y-6 text-base leading-7 text-white/70">
              <p>{t.believeP1}</p>
              <p>{t.believeP2}</p>
              <p>{t.believeP3}</p>
            </div>
          </div>
          <div className="tf-container mt-14 grid border-y border-white/15 sm:grid-cols-3">
            {t.principles.map((item, i) => (
              <div key={item.label} className="border-b border-white/15 py-6 last:border-0 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-0">
                <div className="tf-mono text-[10px] text-[#53C98B]">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-3 text-lg font-medium text-white">{item.label}</h3>
                <p className="mt-2 max-w-[240px] text-sm leading-6 text-white/60">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="tf-surface py-16 sm:py-20">
          <div className="tf-container flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="max-w-[520px] text-3xl font-medium tracking-[-.04em] sm:text-4xl">{t.aboutCtaHeading}</h2>
              <p className="mt-3 max-w-[440px] text-sm leading-6 text-[#59655F]">
                {t.aboutCtaSub}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => openOrderForm()} className="tf-btn tf-btn-primary">
                {t.aboutOrder} <MoveUpRight size={14} />
              </button>
              <Link href="/farmbro" className="tf-btn tf-btn-outline">
                {t.aboutBrowse}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
