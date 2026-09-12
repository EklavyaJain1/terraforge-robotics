import { useState } from "react";
import { Check, MoveUpRight } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionKicker from "@/components/SectionKicker";
import usePageTitle from "@/hooks/usePageTitle";

const contactRows = [
  { label: "Call the field team", value: "+91 91541 53925", href: "tel:+919154153925" },
  { label: "WhatsApp support", value: "Chat with an engineer", href: "https://wa.me/919154153925" },
  { label: "Email", value: "hello@farmbro.example", href: "mailto:hello@farmbro.example" },
];

export default function Contact() {
  usePageTitle("Contact — FarmBro Robotics");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", topic: "Field trial", message: "" });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    toast.success("Message sent", { description: "A FarmBro specialist will follow up shortly." });
  }

  return (
    <div className="tf-page">
      <Navbar />
      <main className="pt-[72px]">
        <section className="relative overflow-hidden bg-[#1B8F6A] py-16 text-white sm:py-24">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[40px] border-white/10" />
          <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full border-[1px] border-white/15" />
          <div className="tf-container relative">
            <SectionKicker number="TALK" label="Contact" light />
            <h1 className="mt-7 max-w-[640px] text-5xl font-medium leading-[.95] tracking-[-.055em] sm:text-7xl">
              Bring us the row you actually run.
            </h1>
            <p className="mt-6 max-w-[420px] text-base leading-7 text-white/80">
              Tell us what is slowing the season down. We will come back with a platform, a tool, and a realistic next step.
            </p>
          </div>
        </section>

        <section className="tf-surface py-14 sm:py-20">
          <div className="tf-container grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
            <div>
              <SectionKicker number="REACH" label="Direct lines" />
              <div className="mt-8 divide-y divide-[#111311]/15 border-y border-[#111311]/15">
                {contactRows.map((row) => (
                  <a key={row.label} href={row.href} target={row.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block py-5">
                    <div className="tf-mono text-[9px] text-[#64736C]">{row.label}</div>
                    <div className="mt-1 text-base font-medium text-[#111311] hover:text-[#1B8F6A]">{row.value}</div>
                  </a>
                ))}
              </div>
              <p className="mt-6 max-w-[280px] text-sm leading-6 text-[#59655F]">
                Lines are open Monday–Saturday, 9:00–19:00 IST. During sowing windows we answer faster than usual.
              </p>
            </div>
            <div className="border border-[#111311]/15 bg-white p-6 sm:p-8">
              {submitted ? (
                <div className="flex min-h-[360px] flex-col justify-center">
                  <div className="flex h-12 w-12 items-center justify-center bg-[#111311] text-[#8BE2B2]">
                    <Check size={22} />
                  </div>
                  <h2 className="mt-6 text-3xl font-medium tracking-[-.05em]">We have your note.</h2>
                  <p className="mt-3 max-w-[340px] text-sm leading-6 text-[#59655F]">
                    A FarmBro field specialist will follow up shortly to understand your crop, rows, and timing.
                  </p>
                  <button type="button" onClick={() => setSubmitted(false)} className="tf-btn tf-btn-outline mt-7 w-fit">
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="tf-mono text-[9px] text-[#64736C]">Your name</span>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Name"
                        className="tf-focus mt-2 w-full border-b border-[#111311]/25 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#7E8983] focus:border-[#1B8F6A]"
                      />
                    </label>
                    <label className="block">
                      <span className="tf-mono text-[9px] text-[#64736C]">Phone or email</span>
                      <input
                        required
                        type="text"
                        value={form.contact}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        placeholder="How should we reach you?"
                        className="tf-focus mt-2 w-full border-b border-[#111311]/25 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#7E8983] focus:border-[#1B8F6A]"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="tf-mono text-[9px] text-[#64736C]">What is this about?</span>
                    <select
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="tf-focus mt-2 w-full border-b border-[#111311]/25 bg-white px-0 py-3 text-sm outline-none focus:border-[#1B8F6A]"
                    >
                      {["Field trial", "Pricing and ordering", "Service visit", "Dealer / partnership", "Something else"].map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="tf-mono text-[9px] text-[#64736C]">A few words on the season</span>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Where is the pressure showing up?"
                      className="tf-focus mt-2 w-full resize-none border-b border-[#111311]/25 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#7E8983] focus:border-[#1B8F6A]"
                    />
                  </label>
                  <button type="submit" className="tf-btn tf-btn-primary mt-2">
                    Send the note <MoveUpRight size={15} />
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
