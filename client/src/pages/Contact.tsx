import { useState } from "react";
import { Check, MoveUpRight } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionKicker from "@/components/SectionKicker";
import { useLanguage } from "@/contexts/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";

export default function Contact() {
  const { t } = useLanguage();
  usePageTitle(t.contactTitle);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", topic: t.contactTopics[0], message: "" });

  const contactRows = [
    { label: t.contactRowCall, value: "+91 91541 53925", href: "tel:+919154153925" },
    { label: t.contactRowWhatsapp, value: t.contactWhatsappValue, href: "https://wa.me/919154153925" },
    { label: t.contactRowEmail, value: "hello@farmbro.example", href: "mailto:hello@farmbro.example" },
  ];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    toast.success(t.contactToastTitle, { description: t.contactToastDesc });
  }

  return (
    <div className="tf-page">
      <Navbar />
      <main className="pt-[72px]">
        <section className="relative overflow-hidden bg-[#1B8F6A] py-16 text-white sm:py-24">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[40px] border-white/10" />
          <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full border-[1px] border-white/15" />
          <div className="tf-container relative">
            <SectionKicker number="TALK" label={t.contactKicker} light />
            <h1 className="mt-7 max-w-[640px] text-5xl font-medium leading-[.95] tracking-[-.055em] sm:text-7xl">
              {t.contactHeading}
            </h1>
            <p className="mt-6 max-w-[420px] text-base leading-7 text-white/80">
              {t.contactSub}
            </p>
          </div>
        </section>

        <section className="tf-surface py-14 sm:py-20">
          <div className="tf-container grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
            <div>
              <SectionKicker number="REACH" label={t.directKicker} />
              <div className="mt-8 divide-y divide-[#111311]/15 border-y border-[#111311]/15">
                {contactRows.map((row) => (
                  <a key={row.label} href={row.href} target={row.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block py-5">
                    <div className="tf-mono text-[9px] text-[#64736C]">{row.label}</div>
                    <div className="mt-1 text-base font-medium text-[#111311] hover:text-[#1B8F6A]">{row.value}</div>
                  </a>
                ))}
              </div>
              <p className="mt-6 max-w-[280px] text-sm leading-6 text-[#59655F]">
                {t.contactHours}
              </p>
            </div>
            <div className="border border-[#111311]/15 bg-white p-6 sm:p-8">
              {submitted ? (
                <div className="flex min-h-[360px] flex-col justify-center">
                  <div className="flex h-12 w-12 items-center justify-center bg-[#111311] text-[#8BE2B2]">
                    <Check size={22} />
                  </div>
                  <h2 className="mt-6 text-3xl font-medium tracking-[-.05em]">{t.contactFormHeading}</h2>
                  <p className="mt-3 max-w-[340px] text-sm leading-6 text-[#59655F]">
                    {t.contactFormSub}
                  </p>
                  <button type="button" onClick={() => setSubmitted(false)} className="tf-btn tf-btn-outline mt-7 w-fit">
                    {t.contactSendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="tf-mono text-[9px] text-[#64736C]">{t.contactNameLabel}</span>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={t.contactNamePlaceholder}
                        className="tf-focus mt-2 w-full border-b border-[#111311]/25 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#7E8983] focus:border-[#1B8F6A]"
                      />
                    </label>
                    <label className="block">
                      <span className="tf-mono text-[9px] text-[#64736C]">{t.contactPhoneLabel}</span>
                      <input
                        required
                        type="text"
                        value={form.contact}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        placeholder={t.orderContactPlaceholder}
                        className="tf-focus mt-2 w-full border-b border-[#111311]/25 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#7E8983] focus:border-[#1B8F6A]"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="tf-mono text-[9px] text-[#64736C]">{t.contactTopicLabel}</span>
                    <select
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="tf-focus mt-2 w-full border-b border-[#111311]/25 bg-white px-0 py-3 text-sm outline-none focus:border-[#1B8F6A]"
                    >
                      {t.contactTopics.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="tf-mono text-[9px] text-[#64736C]">{t.contactMessageLabel}</span>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t.contactMessagePlaceholder}
                      className="tf-focus mt-2 w-full resize-none border-b border-[#111311]/25 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#7E8983] focus:border-[#1B8F6A]"
                    />
                  </label>
                  <button type="submit" className="tf-btn tf-btn-primary mt-2">
                    {t.contactSend} <MoveUpRight size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
