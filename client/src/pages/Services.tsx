import { MoveUpRight } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionKicker from "@/components/SectionKicker";
import { useOrderForm } from "@/contexts/OrderContext";
import { useLanguage } from "@/contexts/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";

export default function Services() {
  const { t } = useLanguage();
  usePageTitle(t.servicesTitle);
  const { openOrderForm } = useOrderForm();

  return (
    <div className="tf-page">
      <Navbar />
      <main className="pt-[72px]">
        <section className="tf-surface py-16 sm:py-24">
          <div className="tf-container">
            <SectionKicker number="WORK" label={t.servicesKicker} />
            <h1 className="mt-7 max-w-[720px] text-5xl font-medium leading-[.95] tracking-[-.055em] sm:text-7xl">
              {t.servicesHeading}
            </h1>
            <p className="mt-6 max-w-[460px] text-base leading-7 text-[#3F4B45]">
              {t.servicesSub}
            </p>
          </div>
        </section>

        <section className="tf-dark py-16 sm:py-20">
          <div className="tf-container">
            <div className="grid gap-px bg-white/15 sm:grid-cols-2">
              {t.serviceEntries.map((service, i) => (
                <div key={service.name} className="bg-[#111311] p-6 sm:p-8">
                  <div className="tf-mono text-[10px] text-[#B9F4D4]">S{String(i + 1).padStart(2, "0")}</div>
                  <h2 className="mt-6 text-2xl font-medium text-white">{service.name}</h2>
                  <p className="mt-3 max-w-[420px] text-sm leading-6 text-white/60">{service.copy}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-4">
                    <span className="text-sm text-[#8BE2B2]">{service.stat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tf-surface py-16 sm:py-20">
          <div className="tf-container flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="max-w-[520px] text-3xl font-medium tracking-[-.04em] sm:text-4xl">{t.servicesCtaHeading}</h2>
              <p className="mt-3 max-w-[440px] text-sm leading-6 text-[#59655F]">
                {t.servicesCtaSub}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => openOrderForm("unsure")} className="tf-btn tf-btn-primary">
                {t.servicesBookTrial} <MoveUpRight size={14} />
              </button>
              <Link href="/farmbro" className="tf-btn tf-btn-outline">
                {t.servicesBrowse}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
