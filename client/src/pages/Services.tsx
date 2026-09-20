import { ChevronDown, Compass, Cpu, HeadphonesIcon, Layers, MoveUpRight, Settings, Shield, Truck, Wrench } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionKicker from "@/components/SectionKicker";
import { useOrderForm } from "@/contexts/OrderContext";
import { useLanguage } from "@/contexts/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";
import { agriImages } from "@/data/catalog";

const services = [
  { icon: Compass, number: "01" },
  { icon: Settings, number: "02" },
  { icon: Layers, number: "03" },
  { icon: HeadphonesIcon, number: "04" },
  { icon: Truck, number: "05" },
  { icon: Wrench, number: "06" },
];

const warrantyItems = [
  { icon: Shield },
  { icon: Cpu },
  { icon: HeadphonesIcon },
];

export default function Services() {
  const { t } = useLanguage();
  usePageTitle(t.servicesTitle);
  const { openOrderForm } = useOrderForm();

  return (
    <div className="tf-page">
      <Navbar />
      <main className="pt-[72px]">

        {/* Hero */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden bg-[#111311] pt-24 pb-12 sm:pt-32 sm:pb-16">
          <div className="absolute inset-0">
            <img src={agriImages.farmx} alt="Farm background" className="h-full w-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111311] via-[#111311]/50 to-[#111311]" />
          </div>
          <div className="tf-container relative z-10">
            <motion.div
              className="flex flex-col items-center text-center mx-auto"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 },
                },
              }}
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
                <SectionKicker number="SERVICES" label={t.svcHeroKicker} light className="mx-auto" />
              </motion.div>
              
              <motion.h1 
                className="mt-7 max-w-[720px] text-5xl font-medium leading-[.95] tracking-[-.055em] text-white sm:text-7xl"
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              >
                {t.svcHeroHeadingA} <span className="bg-gradient-to-r from-[#B9F4D4] to-[#1B8F6A] bg-clip-text text-transparent">{t.svcHeroHeadingB}</span>
              </motion.h1>
              
              <motion.p 
                className="mt-6 max-w-[540px] text-lg leading-8 text-white/60"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              >
                {t.svcHeroSub}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="bg-[#111311] pb-20 pt-4 sm:pb-28 sm:pt-8">
          <div className="tf-container">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <motion.div
                  key={service.number}
                  className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#17201B] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-1 hover:border-[#1B8F6A]/40 hover:shadow-[0_0_30px_rgba(27,143,106,0.15)]"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Sweep gradient effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Number watermark */}
                  <span className="absolute -right-2 -top-4 text-[80px] font-bold leading-none text-white/5 transition-all duration-500 group-hover:-translate-y-2 group-hover:text-white/10">
                    {service.number}
                  </span>

                  <div className="relative z-10">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-[#1B8F6A]/20">
                      <service.icon size={22} className="text-[#B9F4D4] transition-colors duration-300 group-hover:text-white" />
                    </span>
                    <h3 className="mt-6 text-xl font-medium leading-snug tracking-tight text-white group-hover:text-[#B9F4D4] transition-colors duration-300">
                      {t.svcEntries[i].name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/55 group-hover:text-white/75 transition-colors duration-300">
                      {t.svcEntries[i].copy}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Warranty Section */}
        <section className="relative overflow-hidden bg-[#111311] py-20 sm:py-28">
          <div className="tf-container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              {/* Left: Image */}
              <motion.div
                className="relative overflow-hidden rounded-2xl"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src="/images/warranty-hero.jpg"
                  alt="FarmBro team providing support"
                  className="h-full w-full rounded-2xl object-cover"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#111311]/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="tf-mono text-[10px] uppercase tracking-[.16em] text-[#B9F4D4]">{t.warrantyPromiseKicker}</span>
                  <h3 className="mt-2 text-2xl font-medium text-white">{t.warrantyPromiseHeading}</h3>
                </div>
              </motion.div>

              {/* Right: Warranty Cards */}
              <div className="flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionKicker number="WARRANTY" label={t.warrantyKicker} light />
                  <h2 className="mt-5 text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl">
                    {t.warrantyHeadingA} <span className="text-[#B9F4D4]">{t.warrantyHeadingB}</span>
                  </h2>
                  <p className="mt-4 max-w-[460px] text-base leading-7 text-white/60">
                    {t.warrantySub}
                  </p>
                </motion.div>

                {warrantyItems.map((item, i) => (
                  <motion.div
                    key={i}
                    className="group rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-500 hover:border-[#1B8F6A]/40 hover:bg-white/[0.08]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1B8F6A]/15">
                        <item.icon size={20} className="text-[#B9F4D4]" />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium text-white">{t.warrantyItems[i].name}</h4>
                          <span className="tf-mono shrink-0 rounded-full border border-[#1B8F6A]/30 bg-[#1B8F6A]/10 px-3 py-1 text-[10px] uppercase tracking-wider text-[#B9F4D4]">
                            {t.warrantyItems[i].duration}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/55">{t.warrantyItems[i].copy}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Warranty FAQ */}
        <section className="bg-[#F5F7F5] py-20 sm:py-28">
          <div className="tf-container max-w-[800px]">
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionKicker number={t.warrantyFaqKicker} label={t.warrantyFaqHeadingA} className="mx-auto" />
              <h2 className="mt-7 text-[clamp(1.7rem,5.2vw,3.75rem)] font-medium leading-[1.05] tracking-[-.05em]">
                {t.warrantyFaqHeadingA} <span className="text-[#1B8F6A]">{t.warrantyFaqHeadingB}</span>
              </h2>
              <p className="mt-4 max-w-[520px] text-base leading-7 text-[#59655F]">
                {t.warrantyFaqSub}
              </p>
            </motion.div>

            <div className="mt-14 flex flex-col gap-3">
              {t.warrantyFaqs.map((item, i) => (
                <motion.details
                  key={i}
                  className="group rounded-xl border border-[#111311]/10 bg-white px-6 py-5 transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] [&[open]]:shadow-[0_4px_20px_rgba(27,143,106,0.08)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <summary className="flex cursor-pointer items-center justify-between text-base font-medium leading-snug text-[#111311] sm:text-lg [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <ChevronDown size={18} className="shrink-0 text-[#1B8F6A] transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[#59655F] sm:text-base">{item.a}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-[#1B8F6A] py-20 text-white sm:py-24">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[40px] border-white/10" />
          <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full border-[1px] border-white/15" />
          <div className="tf-container relative z-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="max-w-[520px] text-3xl font-medium tracking-[-.04em] sm:text-4xl">
                {t.servicesCtaHeading}
              </h2>
              <p className="mt-3 max-w-[440px] text-sm leading-6 text-white/80">
                {t.servicesCtaSub}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => openOrderForm("unsure")} className="tf-btn tf-btn-quiet text-sm">
                {t.servicesBookTrial} <MoveUpRight size={14} />
              </button>
              <Link href="/farmbro" className="rounded-lg border border-white/30 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
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
