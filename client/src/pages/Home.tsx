import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Blocks, Check, ChevronDown, Crosshair, Radar, Zap } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionKicker from "@/components/SectionKicker";
import { useOrderForm } from "@/contexts/OrderContext";
import usePageTitle from "@/hooks/usePageTitle";
import { robots, type RobotId } from "@/data/catalog";

type AudienceId = "farm" | "fleet" | "def";

const audiences: { id: AudienceId; code: string; label: string; line1: string; mint: string; rest: string; sub: string; cta: string }[] = [
  {
    id: "farm",
    code: "FARM",
    label: "For Farmers",
    line1: "More acres.",
    mint: "Fewer",
    rest: "compromises.",
    sub: "Field-ready autonomous machines for growers who need more capacity without adding more complexity.",
    cta: "See the machines",
  },
  {
    id: "fleet",
    code: "FLEET",
    label: "For Enterprises",
    line1: "Fleets that keep",
    mint: "every pass",
    rest: "on schedule.",
    sub: "Multi-machine programmes for estates and agri-enterprises — dashboards, operator certification, and pilot-first deployment.",
    cta: "Request fleet pricing",
  },
  {
    id: "def",
    code: "DEF",
    label: "For Defence",
    line1: "Indigenous unmanned",
    mint: "platforms,",
    rest: "built for the field.",
    sub: "Make-in-India autonomy for government and defence programmes — engineered at home, proven in the field.",
    cta: "Talk to engineering",
  },
];

const proofBar = [
  { value: "1,200+", label: "Acres piloted" },
  { value: "9", label: "Platforms engineered" },
  { value: "100%", label: "Electric drive" },
  { value: "IND", label: "Make in India" },
];

const pillars = [
  { icon: Crosshair, title: "GPS autopilot", copy: "Sub-10 cm accuracy keeps every pass true to the row, season after season." },
  { icon: Radar, title: "Follow-Me", copy: "The platform shadows its operator and the harvest crew between rows." },
  { icon: Blocks, title: "Modular implements", copy: "One implement rail: tiller, sprayer, seeder, trailer — swapped in minutes." },
  { icon: Zap, title: "100% electric", copy: "Zero fuel, quiet passes, and a lower running cost per acre." },
];

const divisions = [
  {
    name: "Agriculture",
    status: "Live",
    copy: "Field X platforms on sale now — FarmX-500, Rancher UGV, and Canopy Scout, with attachments, training, and field trials.",
  },
  {
    name: "Civil",
    status: "In service",
    copy: "Utility autonomy for public works and industry. Engineering today, deployments next.",
    enquiry: "Government / Civil enquiry",
  },
  {
    name: "Defence",
    status: "In service",
    copy: "Indigenous unmanned platforms for institutional programmes, built to procurement standards.",
    enquiry: "Government / Defence enquiry",
  },
];

const faqs = [
  ["Do I need a robotics background to operate it?", "No. FarmBro robots are designed around a remote control workflow that feels familiar from the first session. We train operators on the machine, the attachment, and the safety checks before a field trial."],
  ["Can the robot work without a cellular connection?", "Core driving and attachment controls remain available locally. Connected features such as live status, remote diagnostics, and fleet reporting use the available network connection."],
  ["How do field trials work?", "We start with a short discovery call, then bring the right platform and tool to a representative patch of your farm. The output is a practical operating plan—not a showroom demonstration."],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  usePageTitle("FarmBro Robotics — More acres. Fewer compromises.");
  const { openOrderForm } = useOrderForm();
  const [audience, setAudience] = useState<AudienceId>("farm");
  const [model, setModel] = useState<RobotId>("farmx-500");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeAudience = audiences.find((a) => a.id === audience) ?? audiences[0];
  const currentModel = robots.find((robot) => robot.id === model) ?? robots[0];

  return (
    <div id="top" className="tf-page">
      <Navbar />

      <main>
        {/* Hero — audience thesis over the field film */}
        <section
          className="tf-scanline relative min-h-[720px] overflow-hidden bg-[#111311] text-white sm:min-h-[860px] lg:min-h-[100svh]"
          aria-label="FarmBro Robotics introduction"
        >
          <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover object-center">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-fade absolute inset-0" />

          <div className="tf-container relative flex min-h-[720px] flex-col justify-end pb-[210px] pt-32 sm:min-h-[860px] sm:pb-[136px] lg:min-h-[100svh]">
            <div className="max-w-[620px]">
              {/* Audience switcher — the buyer picks the thesis */}
              <div className="reveal flex flex-wrap items-center gap-2" role="group" aria-label="Choose your audience">
                {audiences.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAudience(item.id)}
                    aria-pressed={audience === item.id}
                    className={`tf-focus tf-mono border px-4 py-2.5 text-[10px] transition-colors ${
                      audience === item.id
                        ? "border-[#53C98B] bg-[#1B8F6A]/20 text-[#B9F4D4]"
                        : "border-white/25 text-white/65 hover:border-[#B9F4D4] hover:text-white"
                    }`}
                  >
                    {item.code} <span className="hidden sm:inline text-white/40">/ {item.label}</span>
                  </button>
                ))}
              </div>

              <h1
                key={audience}
                className="reveal reveal-delay-1 mt-6 max-w-[620px] text-[clamp(2.6rem,7.5vw,6.5rem)] font-medium leading-[.92] tracking-[-.07em] text-white"
              >
                {activeAudience.line1}
                <br />
                <span className="text-[#B9F4D4]">{activeAudience.mint}</span> {activeAudience.rest}
              </h1>
              <p className="reveal reveal-delay-2 mt-6 max-w-[430px] text-sm leading-6 text-white/75 sm:text-base">{activeAudience.sub}</p>

              <div className="reveal reveal-delay-3 mt-8">
                {audience === "farm" ? (
                  <button type="button" onClick={() => scrollToId("machine")} className="tf-btn tf-btn-primary">
                    {activeAudience.cta} <ArrowDownRight size={15} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => openOrderForm(audience === "fleet" ? "Fleet / B2B order" : "Government / Defence enquiry")}
                    className="tf-btn tf-btn-primary"
                  >
                    {activeAudience.cta} <ArrowUpRight size={15} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Proof slate — the season log, docked to the video's bottom edge */}
          <div className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-[#0B0F0D]/45 backdrop-blur-[6px]">
            <div className="tf-container grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
              {proofBar.map((item) => (
                <div key={item.label} className="px-4 py-4 first:pl-0 sm:px-6 sm:py-5">
                  <div className="text-xl font-medium tracking-[-.03em] text-white sm:text-2xl">{item.value}</div>
                  <div className="tf-mono mt-1 text-[9px] uppercase tracking-[.08em] text-white/50">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollToId("machine")}
            className="tf-focus absolute bottom-[128px] left-1/2 hidden -translate-x-1/2 items-center gap-2 text-white/70 lg:flex"
            aria-label="Scroll to the machine section"
          >
            <span className="tf-mono text-[9px]">Scroll to explore</span>
            <ChevronDown size={14} />
          </button>
        </section>

        {/* 01 — The machine + technology pillars */}
        <section className="tf-surface border-b border-[#111311]/15 py-16 sm:py-20" id="machine">
          <div className="tf-container">
            <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
              <div>
                <SectionKicker number="01" label="The machine" />
                <h2 className="mt-7 max-w-[420px] text-4xl font-medium leading-[.98] tracking-[-.055em] sm:text-6xl">A small machine for a very big season.</h2>
                <p className="mt-6 max-w-[390px] text-base leading-7 text-[#3F4B45]">FarmBro makes farm work more repeatable. One platform, a set of tools, and a calmer way to keep every pass on schedule.</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {robots.map((robot) => (
                    <button
                      key={robot.id}
                      type="button"
                      onClick={() => setModel(robot.id)}
                      aria-pressed={model === robot.id}
                      className={`tf-focus tf-mono border px-4 py-3 text-[10px] transition-colors ${
                        model === robot.id
                          ? "border-[#1B8F6A] bg-[#1B8F6A] text-white"
                          : "border-[#111311]/25 text-[#3F4B45] hover:border-[#1B8F6A]"
                      }`}
                    >
                      {robot.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[510px] overflow-hidden bg-[#17201B] sm:min-h-[580px]">
                <img src={currentModel.image} alt={`${currentModel.name} agricultural robot platform`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D]/90 via-[#0B0F0D]/10 to-transparent" />
                <div className="absolute left-6 top-6 flex items-center gap-2 text-white/75 sm:left-8 sm:top-8">
                  <span className="h-2 w-2 rounded-full bg-[#53C98B]" />
                  <span className="tf-mono text-[10px]">Live platform study</span>
                </div>
                <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <div className="tf-mono text-[10px] text-[#B9F4D4]">{currentModel.number} / {currentModel.tier}</div>
                      <h3 className="mt-2 text-6xl font-medium tracking-[-.08em] text-white sm:text-8xl">{currentModel.name}</h3>
                      <p className="mt-1 text-lg text-white/85">{currentModel.tagline}</p>
                    </div>
                    <span className="hidden border border-white/25 px-3 py-2 text-right text-[10px] leading-4 text-white/70 sm:block">{currentModel.availability}</span>
                  </div>
                  <p className="mt-5 max-w-[410px] text-sm leading-6 text-white/70">{currentModel.body}</p>
                  <div className="mt-6 grid max-w-[520px] grid-cols-3 gap-3 border-t border-white/20 pt-4">
                    {currentModel.specs.map(([label, value]) => (
                      <div key={label}>
                        <div className="tf-mono text-[9px] text-white/45">{label}</div>
                        <div className="mt-1 text-sm text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Technology pillars — what evaluators scan for */}
            <div className="mt-16 grid gap-px border-y border-[#111311]/15 bg-[#111311]/15 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="bg-[#FFFFFF] p-6 sm:p-7">
                  <pillar.icon size={19} className="text-[#1B8F6A]" />
                  <h3 className="mt-5 text-lg font-medium">{pillar.title}</h3>
                  <p className="mt-2 max-w-[240px] text-sm leading-6 text-[#59655F]">{pillar.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02 — Divisions */}
        <section id="divisions" className="tf-dark py-20 sm:py-24">
          <div className="tf-container">
            <div className="grid items-end gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
              <div>
                <SectionKicker number="02" label="Divisions" light />
                <h2 className="mt-7 max-w-[430px] text-4xl font-medium leading-[.98] tracking-[-.055em] text-white sm:text-6xl">One company. Three fronts.</h2>
              </div>
              <p className="max-w-[460px] text-base leading-7 text-white/60">The same autonomy stack, fielded in three worlds. Agriculture is on sale today; civil and defence programmes are in active engineering.</p>
            </div>

            <div className="mt-12 grid gap-px border border-white/15 bg-white/15 lg:grid-cols-3">
              {divisions.map((division) => (
                <div key={division.name} className="flex flex-col bg-[#111311] p-7 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className={`tf-mono text-[9px] ${division.status === "Live" ? "text-[#53C98B]" : "text-white/40"}`}>
                      <span className={`mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle ${division.status === "Live" ? "bg-[#53C98B]" : "bg-white/35"}`} />
                      {division.status.toUpperCase()}
                    </span>
                    <span className="h-px w-8 bg-white/20" />
                  </div>
                  <h3 className="mt-8 text-3xl font-medium tracking-[-.05em] text-white">{division.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-white/55">{division.copy}</p>
                  <div className="mt-7">
                    {division.status === "Live" ? (
                      <Link href="/farmbro" className="tf-btn tf-btn-primary w-fit">
                        Browse FarmBro <ArrowUpRight size={14} />
                      </Link>
                    ) : (
                      <button type="button" onClick={() => openOrderForm(division.enquiry)} className="tf-btn tf-btn-quiet w-fit">
                        Talk to engineering <ArrowUpRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 — Questions */}
        <section className="tf-surface py-20 sm:py-24" id="faq">
          <div className="tf-container">
            <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
              <div>
                <SectionKicker number="03" label="Questions" />
                <h2 className="mt-7 max-w-[370px] text-4xl font-medium leading-[.98] tracking-[-.055em] sm:text-6xl">The practical answers.</h2>
              </div>
              <div className="border-t border-[#111311]/20">
                {faqs.map(([question, answer], index) => (
                  <div key={question} className="border-b border-[#111311]/20">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      aria-expanded={openFaq === index}
                      className="tf-focus flex w-full items-center justify-between gap-5 py-6 text-left"
                    >
                      <span className="text-base font-medium sm:text-lg">{question}</span>
                      <ChevronDown size={17} className={`shrink-0 text-[#1B8F6A] transition-transform duration-200 ${openFaq === index ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === index && <div className="max-w-[650px] pb-7 pr-10 text-sm leading-6 text-[#59655F]">{answer}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 04 — Make it practical */}
        <section id="order" className="relative overflow-hidden bg-[#1B8F6A] py-20 text-white sm:py-24">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[40px] border-white/10" />
          <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full border-[1px] border-white/15" />
          <div className="tf-container relative">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
              <div>
                <SectionKicker number="04" label="Make it practical" light />
                <h2 className="mt-7 max-w-[480px] text-4xl font-medium leading-[.96] tracking-[-.055em] sm:text-6xl">Bring us the row you actually run.</h2>
                <p className="mt-6 max-w-[390px] text-base leading-7 text-white/80">Tell us what is slowing the season down. We'll come back with a platform, a tool, and a realistic next step.</p>
              </div>
              <div className="flex flex-col items-start justify-center gap-6">
                <button type="button" onClick={() => openOrderForm()} className="tf-btn tf-btn-quiet text-sm">
                  Request a machine <ArrowUpRight size={15} />
                </button>
                <div className="grid w-full gap-px border border-white/20 bg-white/20 sm:grid-cols-3">
                  <a href="tel:+919154153925" className="tf-focus bg-[#1B8F6A] px-4 py-4 transition-colors hover:bg-[#0F6F51]">
                    <span className="tf-mono block text-[9px] text-white/60">CALL</span>
                    <span className="mt-1 block text-sm font-medium">+91 91541 53925</span>
                  </a>
                  <a href="https://wa.me/919154153925" target="_blank" rel="noreferrer" className="tf-focus bg-[#1B8F6A] px-4 py-4 transition-colors hover:bg-[#0F6F51]">
                    <span className="tf-mono block text-[9px] text-white/60">WHATSAPP</span>
                    <span className="mt-1 block text-sm font-medium">Message the field team</span>
                  </a>
                  <a href="mailto:hello@farmbro.example" className="tf-focus bg-[#1B8F6A] px-4 py-4 transition-colors hover:bg-[#0F6F51]">
                    <span className="tf-mono block text-[9px] text-white/60">EMAIL</span>
                    <span className="mt-1 block text-sm font-medium">hello@farmbro.example</span>
                  </a>
                </div>
                <p className="flex items-center gap-2 text-xs text-white/70">
                  <Check size={14} /> Every enquiry gets a reply from an engineer, not a bot.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <a
        href="https://wa.me/919154153925"
        target="_blank"
        rel="noreferrer"
        className="tf-focus fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#53C98B] text-[#0B0F0D] shadow-[0_10px_30px_rgba(31,34,31,.22)] transition-transform hover:scale-105"
        aria-label="Chat with FarmBro on WhatsApp"
      >
        <span className="text-lg font-semibold">W</span>
      </a>
    </div>
  );
}
