/* TerraForge Robotics / Field Notes direction: asymmetrical editorial layout, documentary visuals, graphite surfaces, bone space, and Terra Orange controls. */
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Menu,
  MoveUpRight,
  Play,
  Radio,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

const ASSETS = {
  hero: "/manus-storage/terraforge-hero_7f64f5b1.jpg",
  field: "/manus-storage/terraforge-field-ops_00be0994.jpg",
  attachment: "/manus-storage/terraforge-attachment_5dcf0267.jpg",
  mark: "/manus-storage/terraforge-mark_9d8559cb.png",
};

const navItems = [
  { label: "The machine", href: "#machine" },
  { label: "Attachments", href: "#attachments" },
  { label: "Field notes", href: "#field-notes" },
  { label: "Savings", href: "#calculator" },
];

const models = {
  r1: {
    eyebrow: "01 / Multipurpose platform",
    name: "R1",
    subtitle: "The field-ready base layer.",
    body: "A compact electric platform built for the jobs that keep a season moving: weeding, spraying, tilling, and carrying.",
    image: ASSETS.attachment,
    specs: [
      ["Runtime", "8–10 hrs"],
      ["Payload", "800 kg"],
      ["Ground clearance", "220 mm"],
    ],
    tag: "Available for field trials",
  },
  r5: {
    eyebrow: "02 / Precision autonomy",
    name: "R5",
    subtitle: "Navigation that learns your rows.",
    body: "A larger autonomous platform for repeatable coverage, built around camera guidance, RTK support, and a live operator console.",
    image: ASSETS.field,
    specs: [
      ["Coverage", "12 acres/day"],
      ["Accuracy", "± 2 cm RTK"],
      ["Operator", "1 person"],
    ],
    tag: "Pilot programme open",
  },
} as const;

type ModelKey = keyof typeof models;

const attachments = [
  { number: "A01", name: "Rotary tiller", copy: "Aerate 3–4 inches deep while cutting weed roots between rows.", stat: "3–4 in depth", icon: "✣" },
  { number: "A02", name: "Boom sprayer", copy: "Adjustable nozzles deliver a fine, even spray with less chemical drift.", stat: "10–15 ft reach", icon: "⌁" },
  { number: "A03", name: "Brush cutter", copy: "Clear overgrowth cleanly without disturbing the crop beside it.", stat: "Row-safe cut", icon: "╱" },
  { number: "A04", name: "Field trailer", copy: "Move tools, harvest crates, or inputs without adding another vehicle.", stat: "Up to 800 kg", icon: "▱" },
];

const faqs = [
  ["Do I need a robotics background to operate it?", "No. TerraForge robots are designed around a remote control workflow that feels familiar from the first session. We train operators on the machine, the attachment, and the safety checks before a field trial."],
  ["What happens when a row spacing changes?", "The platform is designed for practical Indian farm conditions. We configure track width, tool geometry, and navigation settings around the crop and spacing you actually run."],
  ["Can the robot work without a cellular connection?", "Core driving and attachment controls remain available locally. Connected features such as live status, remote diagnostics, and fleet reporting use the available network connection."],
  ["How do field trials work?", "We start with a short discovery call, then bring the right platform and tool to a representative patch of your farm. The output is a practical operating plan—not a showroom demonstration."],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionKicker({ number, label, light = false }: { number: string; label: string; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${light ? "text-white/60" : "text-[#64736C]"}`}>
      <span className="tf-mono text-[10px]">{number}</span>
      <span className={`h-px w-8 ${light ? "bg-white/30" : "bg-[#111311]/25"}`} />
      <span className="tf-mono text-[10px]">{label}</span>
    </div>
  );
}

function AppMark({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className="tf-focus flex items-center gap-2" aria-label="TerraForge Robotics home">
      <img src={ASSETS.mark} alt="" className={`h-8 w-8 object-contain ${dark ? "brightness-0 invert" : ""}`} />
      <span className={`text-[11px] font-semibold tracking-[.14em] ${dark ? "text-white" : "text-[#111311]"}`}>TERRAFORGE</span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [model, setModel] = useState<ModelKey>("r1");
  const [activeAttachment, setActiveAttachment] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [calculator, setCalculator] = useState({ acres: "120", workers: "8", days: "12", wage: "650" });

  const currentModel = models[model];
  const savings = useMemo(() => {
    const acres = Number(calculator.acres) || 0;
    const workers = Number(calculator.workers) || 0;
    const days = Number(calculator.days) || 0;
    const wage = Number(calculator.wage) || 0;
    const traditional = acres * workers * days * wage;
    const operatorCost = acres * Math.max(1, days * .16) * wage;
    const annual = Math.max(0, traditional - operatorCost);
    return { annual, percent: traditional ? Math.round((annual / traditional) * 100) : 0 };
  }, [calculator]);

  const formatRupees = (value: number) => `₹${Math.round(value).toLocaleString("en-IN")}`;

  function handleDemoSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    toast.success("Request received", { description: "Our field team will follow up with a practical next step." });
  }

  return (
    <div id="top" className="tf-page">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#0B0F0D]/30 text-white backdrop-blur-[10px]">
        <div className="tf-container flex h-[72px] items-center justify-between">
          <AppMark dark />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {navItems.map((item, index) => (
              <a key={item.href} href={item.href} className={`tf-focus relative text-[11px] font-medium text-white/75 transition-colors hover:text-white ${index === 0 ? "text-white after:absolute after:-bottom-[27px] after:left-0 after:h-[2px] after:w-full after:bg-[#1B8F6A]" : ""}`}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => scrollToId("calculator")} className="tf-btn tf-btn-primary hidden min-h-[38px] px-4 text-[11px] sm:inline-flex">
              Calculate savings <ArrowRight size={14} />
            </button>
            <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="tf-focus inline-flex h-10 w-10 items-center justify-center md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-white/15 bg-[#111311] px-6 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="tf-mono text-[11px] text-white/80 hover:text-[#1B8F6A]">{item.label}</a>
              ))}
              <button type="button" onClick={() => { setMenuOpen(false); scrollToId("calculator"); }} className="tf-btn tf-btn-primary mt-2 w-full text-[11px]">Calculate savings <ArrowRight size={14} /></button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="tf-scanline relative min-h-[720px] overflow-hidden bg-[#111311] text-white sm:min-h-[860px] lg:min-h-[100svh]" aria-label="TerraForge Robotics introduction">
          <img src={ASSETS.hero} alt="TerraForge agricultural robot working a field at sunset" className="absolute inset-0 h-full w-full object-cover object-[55%_center] motion-safe:animate-[slow-pan_18s_ease-out_forwards]" />
          <div className="hero-fade absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
          <div className="tf-container relative flex min-h-[720px] items-end pb-12 pt-32 sm:min-h-[860px] sm:pb-20 lg:min-h-[100svh] lg:pb-16">
            <div className="max-w-[560px]">
              <div className="reveal flex items-center gap-3 text-white/70">
                <span className="h-2 w-2 rounded-full bg-[#53C98B] shadow-[0_0_0_5px_rgba(83,201,139,.22)]" />
                <span className="tf-mono text-[10px]">Field system / online</span>
              </div>
              <h1 className="hero-copy reveal reveal-delay-1 mt-5 max-w-[620px] text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[.9] tracking-[-.075em] text-white">More acres.<br /><span className="text-[#B9F4D4]">Fewer</span> compromises.</h1>
              <p className="reveal reveal-delay-2 mt-7 max-w-[390px] text-sm leading-6 text-white/75 sm:text-base">Field-ready autonomous machines for growers who need more capacity without adding more complexity.</p>
              <div className="reveal reveal-delay-3 mt-8 flex flex-wrap items-center gap-3">
                <button type="button" onClick={() => scrollToId("machine")} className="tf-btn tf-btn-primary">Explore the machine <ArrowDownRight size={15} /></button>
                <button type="button" onClick={() => scrollToId("field-notes")} className="tf-btn tf-btn-quiet"><Play size={14} fill="currentColor" /> Watch field notes</button>
              </div>
            </div>
            <div className="absolute bottom-8 right-0 hidden text-right lg:block">
              <div className="tf-mono text-[10px] text-white/55">R1 / 2026 field series</div>
              <div className="mt-2 text-xs text-white/80">Built for the row you run.</div>
            </div>
          </div>
          <button type="button" onClick={() => scrollToId("machine")} className="tf-focus absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-white/70 md:flex" aria-label="Scroll to the machine section">
            <span className="tf-mono text-[9px]">Scroll to explore</span><ChevronDown size={14} />
          </button>
        </section>

        <section className="tf-surface border-b border-[#111311]/15 py-16 sm:py-20" id="machine">
          <div className="tf-container">
            <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
              <div>
                <SectionKicker number="01" label="The machine" />
                <h2 className="mt-7 max-w-[420px] text-4xl font-medium leading-[.98] tracking-[-.055em] sm:text-6xl">A small machine for a very big season.</h2>
                <p className="mt-6 max-w-[390px] text-base leading-7 text-[#3F4B45]">TerraForge makes farm work more repeatable. One platform, a set of tools, and a calmer way to keep every pass on schedule.</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {(Object.keys(models) as ModelKey[]).map((key) => (
                    <button key={key} type="button" onClick={() => setModel(key)} className={`tf-focus tf-mono border px-4 py-3 text-[10px] transition-colors ${model === key ? "border-[#1B8F6A] bg-[#1B8F6A] text-white" : "border-[#111311]/25 text-[#3F4B45] hover:border-[#1B8F6A]"}`} aria-pressed={model === key}>{key.toUpperCase()} platform</button>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[510px] overflow-hidden bg-[#17201B] sm:min-h-[580px]">
                <img src={currentModel.image} alt={`${currentModel.name} agricultural robot platform`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D]/90 via-[#0B0F0D]/10 to-transparent" />
                <div className="absolute left-6 top-6 flex items-center gap-2 text-white/75 sm:left-8 sm:top-8"><Radio size={13} className="text-[#53C98B]" /><span className="tf-mono text-[10px]">Live platform study</span></div>
                <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <div className="tf-mono text-[10px] text-[#B9F4D4]">{currentModel.eyebrow}</div>
                      <h3 className="mt-2 text-6xl font-medium tracking-[-.08em] text-white sm:text-8xl">{currentModel.name}</h3>
                      <p className="mt-1 text-lg text-white/85">{currentModel.subtitle}</p>
                    </div>
                    <span className="hidden border border-white/25 px-3 py-2 text-right text-[10px] leading-4 text-white/70 sm:block">{currentModel.tag}</span>
                  </div>
                  <p className="mt-5 max-w-[410px] text-sm leading-6 text-white/70">{currentModel.body}</p>
                  <div className="mt-6 grid max-w-[520px] grid-cols-3 gap-3 border-t border-white/20 pt-4">
                    {currentModel.specs.map(([label, value]) => <div key={label}><div className="tf-mono text-[9px] text-white/45">{label}</div><div className="mt-1 text-sm text-white">{value}</div></div>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 grid gap-px border-y border-[#111311]/15 bg-[#111311]/15 sm:grid-cols-3">
              {[{ icon: Zap, title: "Battery powered", copy: "Zero fuel. Quiet passes. Lower running costs." }, { icon: ShieldCheck, title: "Row-safe by design", copy: "Control where the tool goes, not just where the wheels go." }, { icon: Sparkles, title: "One operator", copy: "A practical control workflow with less physical strain." }].map((feature) => <div key={feature.title} className="bg-[#FFFFFF] p-6 sm:p-7"><feature.icon size={19} className="text-[#1B8F6A]" /><h3 className="mt-5 text-lg font-medium">{feature.title}</h3><p className="mt-2 max-w-[230px] text-sm leading-6 text-[#59655F]">{feature.copy}</p></div>)}
            </div>
          </div>
        </section>

        <section id="attachments" className="tf-dark py-20 sm:py-28">
          <div className="tf-container">
            <div className="grid gap-12 lg:grid-cols-[.64fr_1.36fr] lg:gap-24">
              <div>
                <SectionKicker number="02" label="Attachments" light />
                <h2 className="mt-7 max-w-[430px] text-4xl font-medium leading-[.98] tracking-[-.055em] sm:text-6xl">Change the tool.<br /><span className="text-[#B9F4D4]">Keep the rhythm.</span></h2>
                <p className="mt-6 max-w-[370px] text-base leading-7 text-white/60">The platform stays put. Your attachment changes with the work in front of you.</p>
                <div className="mt-10 hidden items-center gap-2 sm:flex"><button type="button" onClick={() => setActiveAttachment(Math.max(0, activeAttachment - 1))} className="tf-focus flex h-11 w-11 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-[#B9F4D4] hover:text-white" aria-label="Previous attachment"><ChevronLeft size={17} /></button><button type="button" onClick={() => setActiveAttachment(Math.min(attachments.length - 1, activeAttachment + 1))} className="tf-focus flex h-11 w-11 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-[#B9F4D4] hover:text-white" aria-label="Next attachment"><ChevronRight size={17} /></button><span className="tf-mono ml-2 text-[10px] text-white/40">{String(activeAttachment + 1).padStart(2, "0")} / {String(attachments.length).padStart(2, "0")}</span></div>
              </div>
              <div className="grid gap-px bg-white/15 sm:grid-cols-2">
                {attachments.map((item, index) => <button type="button" key={item.name} onClick={() => setActiveAttachment(index)} className={`group relative min-h-[220px] border text-left transition-colors ${activeAttachment === index ? "border-[#1B8F6A] bg-[#17201B]" : "border-transparent bg-[#111311] hover:bg-[#17201B]"}`}><div className="absolute right-5 top-5 text-3xl font-light text-white/25 transition-colors group-hover:text-[#B9F4D4]">{item.icon}</div><div className="p-6 sm:p-7"><div className="tf-mono text-[10px] text-[#B9F4D4]">{item.number}</div><h3 className="mt-12 text-xl font-medium text-white">{item.name}</h3><p className="mt-3 max-w-[240px] text-sm leading-6 text-white/55">{item.copy}</p><div className="mt-6 flex items-center justify-between border-t border-white/15 pt-3"><span className="tf-mono text-[9px] text-white/35">Field note</span><span className="text-xs text-white/75">{item.stat}</span></div></div></button>)}
              </div>
            </div>
          </div>
        </section>

        <section id="field-notes" className="tf-surface py-20 sm:py-28">
          <div className="tf-container">
            <div className="grid items-end gap-10 lg:grid-cols-[.8fr_1.2fr]">
              <div><SectionKicker number="03" label="Field notes" /><h2 className="mt-7 max-w-[430px] text-4xl font-medium leading-[.98] tracking-[-.055em] sm:text-6xl">Built for the conditions that don’t make the brochure.</h2></div>
              <p className="max-w-[430px] text-base leading-7 text-[#3F4B45]">Uneven ground. Tight rows. A weather window that starts now. Good automation doesn’t ask the farm to become something else.</p>
            </div>
            <div className="relative overflow-hidden bg-[#111311] p-3 sm:p-4">
              <video className="h-[250px] w-full object-cover sm:h-[360px]" controls muted loop playsInline poster={ASSETS.hero} aria-label="TerraForge field operations film">
                <source src="https://assets.mixkit.co/videos/preview/mixkit-countryside-landscape-5062-large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="pointer-events-none absolute left-8 top-8 flex items-center gap-3 text-white/75"><span className="h-2 w-2 rounded-full bg-[#1B8F6A]" /><span className="tf-mono text-[10px]">Short film / work in motion</span></div>
            </div>
            <div className="relative mt-12 overflow-hidden bg-[#17201B]">
              <img src={ASSETS.field} alt="Agricultural robot moving through cultivated rows" className="h-[420px] w-full object-cover sm:h-[570px]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111311]/75 via-transparent to-transparent" />
              <div className="absolute left-6 top-6 flex items-center gap-3 text-white/70 sm:left-8 sm:top-8"><span className="h-2 w-2 rounded-full bg-[#53C98B]" /><span className="tf-mono text-[10px]">Observed / open field trial</span></div>
              <div className="absolute bottom-6 left-6 max-w-[320px] sm:bottom-8 sm:left-8"><div className="tf-mono text-[10px] text-[#B9F4D4]">Field note 014</div><p className="mt-3 text-2xl leading-tight tracking-[-.04em] text-white sm:text-3xl">“The best system is the one the season can trust.”</p></div>
            </div>
            <div className="mt-10 grid border-y border-[#111311]/15 sm:grid-cols-3">
              {[{ metric: "01", label: "Operator-first", copy: "Controls that make sense before the second cup of tea." }, { metric: "02", label: "Serviceable", copy: "Built to be understood, maintained, and improved in the field." }, { metric: "03", label: "Measured", copy: "We report the work done—not just the technology used." }].map((item) => <div key={item.metric} className="border-b border-[#111311]/15 py-6 last:border-0 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-0"><div className="tf-mono text-[10px] text-[#1B8F6A]">{item.metric}</div><h3 className="mt-3 text-lg font-medium">{item.label}</h3><p className="mt-2 max-w-[240px] text-sm leading-6 text-[#59655F]">{item.copy}</p></div>)}
            </div>
          </div>
        </section>

        <section id="calculator" className="tf-dark py-20 sm:py-28">
          <div className="tf-container">
            <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
              <div><SectionKicker number="04" label="Savings calculator" light /><h2 className="mt-7 max-w-[450px] text-4xl font-medium leading-[.98] tracking-[-.055em] sm:text-6xl">See what one operator can move in a season.</h2><p className="mt-6 max-w-[380px] text-base leading-7 text-white/60">Use your current labour profile for a quick directional estimate. We’ll turn it into a farm-specific plan together.</p><div className="mt-8 flex items-center gap-3 text-white/50"><CircleHelp size={16} className="text-[#B9F4D4]" /><span className="text-xs">Estimates are directional, not a quote.</span></div></div>
              <div className="border border-white/15 bg-[#1B241F] p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  {[{ key: "acres", label: "Acres under cultivation", suffix: "acres" }, { key: "workers", label: "Workers on a typical pass", suffix: "people" }, { key: "days", label: "Working days per cycle", suffix: "days" }, { key: "wage", label: "Average daily wage", suffix: "₹ / day" }].map((field) => <label key={field.key} className="block"><span className="tf-mono text-[9px] text-white/45">{field.label}</span><div className="relative mt-2"><input type="number" value={calculator[field.key as keyof typeof calculator]} onChange={(event) => setCalculator({ ...calculator, [field.key]: event.target.value })} className="tf-focus w-full border border-white/15 bg-[#111311] px-4 py-3 pr-20 text-lg text-white outline-none transition-colors focus:border-[#1B8F6A]" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-white/35">{field.suffix}</span></div></label>)}
                </div>
                <div className="mt-8 border-t border-white/15 pt-7"><div className="tf-mono text-[10px] text-[#B9F4D4]">Potential annual labour savings</div><div className="mt-2 flex flex-wrap items-end justify-between gap-4"><div className="text-5xl font-medium tracking-[-.07em] text-white sm:text-7xl">{formatRupees(savings.annual)}</div><div className="flex items-center gap-2 pb-2 text-sm text-[#8BE2B2]"><Check size={15} /> up to {savings.percent}% less labour cost</div></div><div className="mt-6 h-2 bg-white/10"><div className="h-full bg-[#1B8F6A] transition-all duration-300" style={{ width: `${Math.min(100, savings.percent)}%` }} /></div></div>
                <button type="button" onClick={() => scrollToId("demo")} className="tf-btn tf-btn-primary mt-8">Talk through my numbers <ArrowRight size={15} /></button>
              </div>
            </div>
          </div>
        </section>

        <section className="tf-surface py-20 sm:py-28" id="faq">
          <div className="tf-container">
            <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24"><div><SectionKicker number="05" label="Questions" /><h2 className="mt-7 max-w-[370px] text-4xl font-medium leading-[.98] tracking-[-.055em] sm:text-6xl">The practical answers.</h2></div><div className="border-t border-[#111311]/20">{faqs.map(([question, answer], index) => <div key={question} className="border-b border-[#111311]/20"><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="tf-focus flex w-full items-center justify-between gap-5 py-6 text-left"><span className="text-base font-medium sm:text-lg">{question}</span><ChevronDown size={17} className={`shrink-0 text-[#1B8F6A] transition-transform duration-200 ${openFaq === index ? "rotate-180" : ""}`} /></button>{openFaq === index && <div className="max-w-[650px] pb-7 pr-10 text-sm leading-6 text-[#59655F]">{answer}</div>}</div>)}</div></div>
          </div>
        </section>

        <section id="demo" className="relative overflow-hidden bg-[#1B8F6A] py-20 text-white sm:py-28">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[40px] border-white/10" /><div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full border-[1px] border-white/15" />
          <div className="tf-container relative"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24"><div><SectionKicker number="06" label="Make it practical" light /><h2 className="mt-7 max-w-[480px] text-4xl font-medium leading-[.96] tracking-[-.055em] sm:text-6xl">Bring us the row you actually run.</h2><p className="mt-6 max-w-[390px] text-base leading-7 text-white/80">Tell us what is slowing the season down. We’ll come back with a platform, a tool, and a realistic next step.</p></div><div className="bg-[#FFFFFF] p-6 text-[#111311] sm:p-8">{submitted ? <div className="flex min-h-[320px] flex-col justify-center"><div className="flex h-12 w-12 items-center justify-center bg-[#111311] text-[#8BE2B2]"><Check size={22} /></div><h3 className="mt-6 text-3xl font-medium tracking-[-.05em]">We have your note.</h3><p className="mt-3 max-w-[340px] text-sm leading-6 text-[#59655F]">A TerraForge field specialist will follow up shortly to understand your crop, rows, and timing.</p><button type="button" onClick={() => setSubmitted(false)} className="tf-btn tf-btn-outline mt-7 w-fit">Send another note</button></div> : <form onSubmit={handleDemoSubmit} className="space-y-5"><div className="grid gap-5 sm:grid-cols-2"><label><span className="tf-mono text-[9px] text-[#64736C]">Your name</span><input required type="text" placeholder="Name" className="tf-focus mt-2 w-full border-b border-[#111311]/25 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#7E8983] focus:border-[#1B8F6A]" /></label><label><span className="tf-mono text-[9px] text-[#64736C]">Phone or email</span><input required type="text" placeholder="How should we reach you?" className="tf-focus mt-2 w-full border-b border-[#111311]/25 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#7E8983] focus:border-[#1B8F6A]" /></label></div><label className="block"><span className="tf-mono text-[9px] text-[#64736C]">What are you growing?</span><input required type="text" placeholder="Crop, acreage, or the job to solve" className="tf-focus mt-2 w-full border-b border-[#111311]/25 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#7E8983] focus:border-[#1B8F6A]" /></label><label className="block"><span className="tf-mono text-[9px] text-[#64736C]">A few words on the season</span><textarea rows={3} placeholder="Where is the pressure showing up?" className="tf-focus mt-2 w-full resize-none border-b border-[#111311]/25 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#7E8983] focus:border-[#1B8F6A]" /></label><button type="submit" className="tf-btn tf-btn-primary mt-2">Request a field conversation <MoveUpRight size={15} /></button></form>}</div></div></div>
        </section>
      </main>

      <footer className="tf-dark border-t border-white/10 py-10 sm:py-14">
        <div className="tf-container"><div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start"><div><AppMark dark /><p className="mt-5 max-w-[260px] text-sm leading-6 text-white/45">Field-ready autonomy for the next pass, and the one after that.</p></div><div className="grid grid-cols-2 gap-x-12 gap-y-3 sm:gap-x-16"><div className="tf-mono text-[10px] text-white/35">Explore</div><div className="tf-mono text-[10px] text-white/35">Connect</div><a href="#machine" className="text-sm text-white/70 hover:text-[#B9F4D4]">The machine</a><a href="mailto:hello@terraforge.example" className="text-sm text-white/70 hover:text-[#B9F4D4]">Email the team</a><a href="#attachments" className="text-sm text-white/70 hover:text-[#B9F4D4]">Attachments</a><a href="#demo" className="text-sm text-white/70 hover:text-[#B9F4D4]">Book a field note</a><a href="#faq" className="text-sm text-white/70 hover:text-[#B9F4D4]">Questions</a><span className="text-sm text-white/35">© 2026 TerraForge</span></div></div><div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-[10px] text-white/35 sm:flex-row"><span className="tf-mono">Made for real rows</span><span>Autonomy, with both feet on the ground.</span></div></div>
      </footer>

      <a href="https://wa.me/919154153925" target="_blank" rel="noreferrer" className="tf-focus fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#53C98B] text-[#0B0F0D] shadow-[0_10px_30px_rgba(31,34,31,.22)] transition-transform hover:scale-105" aria-label="Chat with TerraForge on WhatsApp"><span className="text-lg font-semibold">W</span></a>
    </div>
  );
}
