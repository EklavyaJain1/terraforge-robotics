import type { AttachmentId, RobotId } from "@/data/catalog";

/**
 * The typed source of truth for every user-facing string on the site.
 * Machine and attachment prose lives here too — catalog.ts keeps only
 * structural data (ids, slugs, images, prices, icons).
 */
export const en = {
  // ── Header / navigation ────────────────────────────────────────────────
  orderNow: "Order Now",
  home: "Home",
  farmbro: "FarmBro",
  services: "Services",
  gallery: "Gallery",
  about: "About",
  contact: "Contact",
  navAria: "Primary navigation",
  appMarkAria: "FarmBro home",
  changeLanguage: "Change language",
  chooseLanguage: "Choose language",

  // ── Boot screen ────────────────────────────────────────────────────────
  bootAria: "FarmBro is loading",
  bootMissionA: "Autonomous machines for the people who feed us.",
  bootMissionB: "Made in India. Proven in the field.",
  bootPreparing: "PREPARING THE FIELD",

  // ── Footer ─────────────────────────────────────────────────────────────
  footerTagline: "Field-ready autonomy for the next pass, and the one after that.",
  footerExplore: "Explore",
  footerConnect: "Connect",
  footerHome: "Home",
  footerFarmbro: "FarmBro",
  footerServices: "Services",
  footerAbout: "About",
  footerEmailTeam: "Email the team",
  footerBookVisit: "Book a field visit",
  footerWhatsapp: "WhatsApp support",
  footerMade: "Made for real rows",
  footerAutonomy: "Autonomy, with both feet on the ground.",

  // ── 404 ────────────────────────────────────────────────────────────────
  notFoundTitle: "Page Not Found",
  notFoundBody: "Sorry, the page you are looking for doesn't exist. It may have been moved or deleted.",
  notFoundCta: "Go Home",

  // ── Order dialog ───────────────────────────────────────────────────────
  orderTitle: "Order FarmBro",
  orderSub: "Tell us the machine and quantity. A field specialist confirms pricing, attachments, and delivery.",
  orderNameLabel: "Your name",
  orderNamePlaceholder: "Full name",
  orderContactLabel: "Phone or email",
  orderContactPlaceholder: "How should we reach you?",
  orderMachineLabel: "Machine",
  orderQuantityLabel: "Quantity",
  orderNotesLabel: "Anything we should know?",
  orderNotesPlaceholder: "Crop, acreage, preferred delivery window",
  orderSubmit: "Submit order request",
  orderSuccessTitle: "Order request received.",
  orderSuccessBody: "We will call you on the number you shared to confirm the configuration, attachments, and delivery window.",
  orderDone: "Done",
  orderToastTitle: "Order request received",
  orderToastDesc: "A FarmBro specialist will call you to confirm configuration and delivery timing.",
  /** Labels for machineChoices, aligned by index. Values stay language-independent ids. */
  orderMachineOptions: [
    "Farm Bro Remote Controlled Mulcher (Hybrid)",
    "Farm Bro Remote Controlled Mulcher, Sprayer & Cargo Carrier",
    "Farm Bro Remote Controlled Mini Mulcher (Electric)",
    "Farm Bro Canopy Scout",
    "Fleet / B2B order",
    "Government / Civil enquiry",
    "Government / Defence enquiry",
    "Attachment only",
    "Not sure yet",
  ],

  // ── Shared product vocabulary ──────────────────────────────────────────
  configLabel: "Configuration",
  cardViewAria: "View {name}",
  cardVisit: "Visit machine",
  cardPriceLabel: "Indicative price",
  cardOrderNow: "Order now",

  // ── Savings calculator ─────────────────────────────────────────────────
  calcKickerLabel: "Savings calculator",
  calcHeading: "See what one operator can move in a season.",
  calcSub: "Use your current labour profile for a quick directional estimate. We'll turn it into a farm-specific plan together.",
  calcNote: "Estimates are directional, not a quote.",
  calcAcres: "Acres under cultivation",
  calcAcresSuffix: "acres",
  calcWorkers: "Workers on a typical pass",
  calcWorkersSuffix: "people",
  calcDays: "Working days per cycle",
  calcDaysSuffix: "days",
  calcCycles: "Growing cycles per year",
  calcCyclesSuffix: "cycles",
  calcWage: "Average daily wage",
  calcWageSuffix: "₹ / day",
  calcResultLabel: "Potential annual labour savings",
  calcUpTo: "up to {percent} less labour cost",
  calcCta: "Talk through my numbers",

  // ── Home ───────────────────────────────────────────────────────────────
  homeTitle: "FarmBro Robotics — More acres. Fewer compromises.",
  heroAria: "FarmBro Robotics introduction",
  heroTitleA: "More acres.",
  heroTitleB: "Fewer compromises.",
  heroSub: "Remote-controlled farm machines for growers who need more capacity without adding more complexity.",
  heroCta: "See the machines",
  scrollHint: "Scroll to explore",
  scrollAria: "Scroll to the machines section",
  machinesKicker: "The machines",
  machinesTitleA: "Engineered for the field.",
  machinesTitleB: "Built for the mission.",
  machinesSub: "Four purpose-built machines, one command interface. Select a unit to explore its configuration, gallery, and full specification.",
  pillarsKicker: "Four engineering pillars",
  pillarsHeading: "Built on proven foundations.",
  pillars: [
    { title: "Remote Controlled / Semi Autonomous", copy: "Remote control with intelligent assistance for semi-autonomous operation." },
    { title: "Tethered Follow Me Mode", copy: "Automatically follows the operator while maintaining a safe distance." },
    { title: "Modular Architecture", copy: "Interchangeable modules enable rapid adaptation across different applications." },
    { title: "Drivetrain Options: Hybrid & Electric", copy: "Hybrid and electric drivetrains optimized for different operational requirements." },
  ],
  whyKicker: "Why FarmBro",
  whyHeading: "Why FarmBro.",
  whyItems: [
    { title: "Remove \"Autonomous\"", copy: "Simplifying field operations through reliable, purpose-built vehicle platforms." },
    { title: "Compact to heavy duty — Mini UGV to heavy haulers", copy: "A scalable platform range spanning utility vehicles to heavy haulers." },
    { title: "Designed for India, scalable globally", copy: "Engineered for Indian conditions with capabilities suited for global markets." },
    { title: "Deep domain expertise", copy: "Expertise spanning automotive, agriculture, embedded systems, and robotics." },
    { title: "Drivetrain options — hybrid & electric", copy: "Flexible powertrains designed for efficient, sustainable field mobility." },
    { title: "Make in India", copy: "Fully designed, engineered, and manufactured in India." },
  ],
  orderKicker: "Make it practical",
  orderHeading: "Ready to add FarmBro to your crew!",
  orderCta: "Request a machine",
  orderCallLabel: "CALL",
  orderWhatsappLabel: "WHATSAPP",
  orderEmailLabel: "EMAIL",
  whatsappCta: "Message the field team",
  engineerNote: "Every enquiry gets a reply from an engineer, not a bot.",
  whatsappAria: "Chat with FarmBro on WhatsApp",

  // ── FarmBro store ──────────────────────────────────────────────────────
  storeTitle: "FarmBro — robot store",
  farmbroTitleA: "FarmBro UGVs",
  farmbroTitleB: "Your brother on the field.",
  farmbroEyebrow: "FarmBro UGVs · For farming",
  farmbroSub: "Remote-controlled farm machines for growers who need more capacity without adding more complexity. Open any machine for its configuration, gallery, and specifications.",
  compareShow: "Compare machines",
  compareHide: "Hide comparison",
  compareAria: "Specification comparison",
  compareModel: "Model",
  comparePrice: "Price",
  compareConfiguration: "Configuration",
  comparePower: "Power",
  compareSlope: "Slope",
  attachmentsKicker: "Attachments",
  attachmentsHeading: "Tools that ship with your machine.",
  attachmentsCta: "Order attachments",
  attachmentsFitNote: "Every attachment fits the FarmBro implement rail — no adapters needed.",
  whoKicker: "Who we build for",
  whoHeading: "One store. Three kinds of buyers.",
  audiences: [
    { label: "Progressive farmers", copy: "Field demonstrations on your land, seasonal booking, and operator training included with every machine.", cta: "Order as a farmer" },
    { label: "Agri enterprises & estates", copy: "Multi-machine fleets with dashboards, operator certification for your crews, and pilot programmes before capital commitment.", cta: "Request fleet pricing" },
    { label: "Government & defence", copy: "Make-in-India compliance documentation, institutional procurement support, and deployment engineering for large public programmes.", cta: "Start institutional enquiry" },
  ],
  notSureHeading: "Not sure which machine fits?",
  notSureBody: "Tell us your crop, acreage, and the job that hurts most. We will recommend the machine — even if it is the smaller one.",
  notSureCta: "Get a recommendation",

  // ── About ──────────────────────────────────────────────────────────────
  aboutTitle: "About — FarmBro Robotics",
  aboutKicker: "About FarmBro",
  aboutHeading: "Built for the row you run.",
  aboutSub: "FarmBro started with a simple observation: the machines that could help growers were either too expensive to own or too fragile to trust. We build field-ready autonomous platforms that earn their place one season at a time.",
  believeKicker: "What we believe",
  believeHeading: "Good automation doesn't ask the farm to change.",
  believeP1: "We design around the conditions that don't make the brochure: uneven ground, tight rows, and a weather window that starts now. Track width, tool geometry, and navigation are configured for the crop you actually run.",
  believeP2: "Every platform is electric, quiet, and cheap to run. One operator supervises the pass instead of spending the day behind a tool. And because we service what we sell, the machine gets better every season it stays in the field.",
  believeP3: "We measure ourselves the way you would: acres covered, cost per pass, and days the season kept moving.",
  principles: [
    { label: "Operator-first", copy: "Controls that make sense before the second cup of tea." },
    { label: "Serviceable", copy: "Built to be understood, maintained, and improved in the field." },
    { label: "Measured", copy: "We report the work done — not just the technology used." },
  ],
  aboutCtaHeading: "Come see the machine on real soil.",
  aboutCtaSub: "Meet the lineup on FarmBro, or talk to the field team about a trial on your farm.",
  aboutOrder: "Order now",
  aboutBrowse: "Browse FarmBro",

  // ── Services ───────────────────────────────────────────────────────────
  servicesTitle: "Services — FarmBro Robotics",
  servicesKicker: "Services",
  servicesHeading: "We stand behind the machine.",
  servicesSub: "A robot is only worth its field days. Every FarmBro service exists to keep the season moving — before purchase, through the season, and across years.",
  serviceEntries: [
    { name: "Field trials on your soil", copy: "We bring the right platform and attachment to a representative patch of your farm and run the actual job — not a showroom demo. You get a written operating plan and honest coverage numbers.", stat: "Free for qualifying farms" },
    { name: "Operator training", copy: "Two sessions on your field: machine handling, attachment changes, daily safety checks, and the remote-control workflow. Your operator signs off only when they are confident without us standing there.", stat: "Included with every machine" },
    { name: "Season service contract", copy: "Scheduled maintenance, battery health checks, firmware updates, and priority response during the season window. One flat price per platform, per season.", stat: "₹18,000 / platform / season" },
    { name: "Attachment fitting and calibration", copy: "Track width, tool geometry, and depth settings configured for your row spacing and soil. Includes a calibration pass recorded for future reference.", stat: "₹4,500 per visit" },
    { name: "Fleet advisory for contractors", copy: "For service providers running multiple machines across villages: deployment planning, charging schedules, and per-acre cost modelling before you commit capital.", stat: "By engagement" },
  ],
  servicesCtaHeading: "Start with a field trial, not a purchase order.",
  servicesCtaSub: "Most customers meet the machine on their own soil first. Book a trial, or go straight to the lineup.",
  servicesBookTrial: "Book a field trial",
  servicesBrowse: "Browse FarmBro",

  // ── Home: in-field performance ───────────────────────────────────────
  perfKicker: "Performance",
  perfHeadingA: "In-Field",
  perfHeadingB: "Performance",
  perfSub: "See our robots tackle real-world agricultural challenges. From steep slopes to narrow vineyard rows.",
  perfWatch: "Watch in action",
  /** Titles aligned with the page's video order (mulcher, sprayer & cargo, canopy scout). */
  perfVideos: ["Mulcher Hybrid", "Sprayer & Cargo", "Canopy Scout"],

  // ── Home: mission ────────────────────────────────────────────────────
  missionKicker: "Our Mission",
  missionHeadingA: "To arm every farmer and enterprise with",
  missionHighlight: "precision automation",
  missionHeadingB: ", preserving the soil for the next generation while driving unparalleled efficiency today.",

  // ── Home: FAQ ────────────────────────────────────────────────────────
  faqKicker: "FAQ",
  faqHeadingA: "Frequently Asked",
  faqHeadingB: "Questions",
  faqs: [
    { q: "What makes FarmBro different from a regular tractor?", a: "FarmBro machines are purpose-built, remote-controlled robots. They eliminate the need for a driver on the machine, work on slopes up to 45°, and are far lighter than tractors — meaning zero soil compaction." },
    { q: "Do I need any special training to operate the robots?", a: "No. Our remote units are designed for simplicity. Most operators are comfortable within 30 minutes of hands-on training. We provide on-site training with every delivery." },
    { q: "Can FarmBro robots work on steep terrain?", a: "Absolutely. Our 4×4 platform with independent electric drive handles slopes up to 45°. This makes them ideal for vineyards, tea estates, and hillside orchards where tractors cannot safely operate." },
    { q: "What is the range and battery life?", a: "Our hybrid models offer extended runtime for all-day operations. The electric models provide 4–6 hours of continuous operation depending on terrain and workload, with fast swap battery options available." },
    { q: "Is the Canopy Scout drone autonomous?", a: "The Canopy Scout flies pre-programmed survey missions autonomously, capturing multispectral imagery. It returns to base, uploads data, and generates actionable crop health maps — all without manual piloting." },
    { q: "Do you support enterprise and defense contracts?", a: "Yes. FarmBro works with enterprises, agricultural cooperatives, and defense organizations. We offer fleet management, custom integrations, and dedicated support for large-scale deployments." },
  ],

  // ── Services: Beyond the Platform ────────────────────────────────────
  svcHeroKicker: "What we do",
  svcHeroHeadingA: "Beyond the",
  svcHeroHeadingB: "Platform",
  svcHeroSub: "Farm Bro delivers end‑to‑end services around every platform — from the first site assessment to lifetime support in the field.",
  /** Names/copy aligned with the page's six service cards (icons and numbers stay in the page). */
  svcEntries: [
    { name: "Site Assessment & Pilots", copy: "Terrain surveys, workflow mapping, and paid pilots on your farm, site, or forward base." },
    { name: "Custom Implements", copy: "Bespoke payloads and implements engineered against your specific field or mission requirements." },
    { name: "Integration & Deployment", copy: "Turnkey deployment — commissioning, calibration, mission planning, and go‑live support." },
    { name: "Operator Training", copy: "Certified operator programs in English, Hindi, and regional languages, on‑site or at our Dehradun facility." },
    { name: "Fleet Operations", copy: "Managed fleet operations for organisations that want the outcome without owning the platforms." },
    { name: "Lifecycle Support", copy: "24×7 remote diagnostics, spare parts SLAs, and annual maintenance contracts across India." },
  ],

  // ── Services: warranty & support ─────────────────────────────────────
  warrantyPromiseKicker: "Our Promise",
  warrantyPromiseHeading: "Built to last, backed for life.",
  warrantyKicker: "Coverage",
  warrantyHeadingA: "Warranty &",
  warrantyHeadingB: "Support",
  warrantySub: "Every FarmBro platform ships with comprehensive warranty coverage and pan-India service reach.",
  warrantyItems: [
    { name: "Mechanical Components", duration: "6 Months", copy: "6 months warranty on all mechanical parts — chassis, drivetrain, linkages, and structural assemblies." },
    { name: "Electronic Components", duration: "3 Months", copy: "3 months warranty on electronic components — control boards, sensors, wiring harnesses, and power systems." },
    { name: "Support & Claims", duration: "Pan-India", copy: "Raise a claim through our service team or your dealer. Spare parts and service reach pan-India with clear SLA-backed timelines." },
  ],
  warrantyFaqKicker: "FAQ",
  warrantyFaqHeadingA: "Warranty",
  warrantyFaqHeadingB: "Questions",
  warrantyFaqSub: "Everything you need to know about FarmBro warranty coverage and support.",
  warrantyFaqs: [
    { q: "What does the warranty cover?", a: "Our warranty covers manufacturing defects in mechanical and electronic components. Mechanical parts (chassis, drivetrain, linkages, structural assemblies) are covered for 6 months, and electronic parts (control boards, sensors, wiring harnesses, power systems) for 3 months from delivery." },
    { q: "How do I raise a warranty claim?", a: "Contact our service team directly via phone, WhatsApp, or email. You can also raise a claim through your authorized FarmBro dealer. We'll guide you through diagnosis and resolution — most issues are triaged remotely within 24 hours." },
    { q: "Does the warranty cover accidental damage?", a: "The warranty covers manufacturing defects only. Damage from accidents, misuse, unauthorized modifications, or operating outside recommended parameters is not covered. We do offer paid repair services for such cases." },
    { q: "What are the spare parts SLA timelines?", a: "Critical spare parts are dispatched within 48 hours for metros and 72 hours for remote locations. We maintain regional service hubs across India to minimize downtime for our customers." },
    { q: "Can I extend my warranty?", a: "Yes. We offer Annual Maintenance Contracts (AMCs) that extend coverage beyond the standard warranty period. AMCs include preventive maintenance visits, priority support, and discounted spare parts." },
    { q: "Is on-site repair included in the warranty?", a: "For issues that cannot be resolved remotely, our field engineers will visit your site at no additional cost during the warranty period. Travel time depends on your location but typically within 3–5 business days." },
  ],

  // ── Gallery ────────────────────────────────────────────────────────────
  galleryTitle: "Gallery — FarmBro Robotics",
  galleryKicker: "Gallery",
  galleryHeading: "The machine, working.",
  gallerySub: "Photographs from field trials and operator days — unretouched conditions, real rows.",
  filterAll: "All",
  filterPlatform: "Platform",
  filterAttachments: "Attachments",
  filterFieldOps: "Field ops",
  /** Captions aligned with the page's gallery item order. */
  galleryCaptions: [
    "The hybrid mulcher on an estate trial row",
    "Open field trial, black soil",
    "Remote Controlled Mulcher (Hybrid) at work",
    "Mulcher, Sprayer & Cargo Carrier between plantation rows",
    "Canopy Scout on hard ground",
    "Implement rail study, pre-season",
  ],
  toolsKicker: "Attachment studies",

  // ── Contact ────────────────────────────────────────────────────────────
  contactTitle: "Contact — FarmBro Robotics",
  contactKicker: "Contact",
  contactHeading: "Bring us the row you actually run.",
  contactSub: "Tell us what is slowing the season down. We will come back with a platform, a tool, and a realistic next step.",
  contactRowCall: "Call the field team",
  contactRowWhatsapp: "WhatsApp support",
  contactRowEmail: "Email",
  contactWhatsappValue: "Chat with an engineer",
  directKicker: "Direct lines",
  contactHours: "Lines are open Monday–Saturday, 9:00–19:00 IST. During sowing windows we answer faster than usual.",
  contactFormHeading: "We have your note.",
  contactFormSub: "A FarmBro field specialist will follow up shortly to understand your crop, rows, and timing.",
  contactSendAnother: "Send another note",
  contactNameLabel: "Your name",
  contactNamePlaceholder: "Name",
  contactPhoneLabel: "Phone or email",
  contactTopicLabel: "What is this about?",
  contactTopics: ["Field trial", "Pricing and ordering", "Service visit", "Dealer / partnership", "Something else"],
  contactMessageLabel: "A few words on the season",
  contactMessagePlaceholder: "Where is the pressure showing up?",
  contactSend: "Send the note",
  contactToastTitle: "Message sent",
  contactToastDesc: "A FarmBro specialist will follow up shortly.",

  // ── Product detail ─────────────────────────────────────────────────────
  pdNotFoundTitle: "Machine not found — FarmBro",
  pdMissingKicker: "This machine isn't in the store",
  pdMissingHeading: "We couldn't find that machine.",
  pdMissingCta: "Back to the lineup",
  pdStore: "Store",
  pdBreadAria: "Breadcrumb",
  pdHighlightLabel: "Operator insight {n}",
  pdViewSpecs: "View specifications",
  pdPrevImage: "Previous image",
  pdNextImage: "Next image",
  pdShowImage: "Show image {n}",
  pdImageAlt: "{name} — view {n}",
  pdWhyKicker: "Why operators pick it",
  pdSpecsKicker: "Specifications",
  pdSpecsHeading: "The spec sheet.",
  pdSpecsSub: "Published figures only. The full engineering sheet ships with every enquiry.",
  pdGalleryKicker: "Gallery",
  pdOrderHeading: "Put the {config} to work on your rows.",
  pdOrderSub: "We'll bring this machine to a representative patch of your farm. {availability}.",
  pdCompareHeading: "Compare with the rest of the lineup.",
  pdViewAll: "View all",

  // ── Machines (from the catalog) ────────────────────────────────────────
  machines: {
    "mulcher-hybrid": {
      name: "Farm Bro Remote Controlled Mulcher (Hybrid)",
      tier: "Agriculture platform",
      configuration: "4X4 UGV",
      tagline: "Heavy mulching, no driver on the machine.",
      body: "A full-size remote-controlled mulcher for open fields and orchard blocks. The hybrid power pack keeps long mulching days going, while the operator works the machine from a safe distance with a rugged remote unit.",
      priceLabel: "Price on request",
      badge: "Flagship",
      availability: "Field demonstrations open on request",
      power: "Hybrid",
      specs: [
        ["Configuration", "4X4 UGV"],
        ["Power", "Hybrid"],
        ["Operation", "Remote controlled"],
        ["Primary function", "Heavy-duty mulching"],
      ],
      highlights: [
        "4X4 unmanned ground vehicle platform",
        "Hybrid power for long mulching sessions",
        "Operator stays off the machine, at a safe distance",
        "Built for open fields and orchard blocks",
      ],
    },
    "mulcher-sprayer-cargo": {
      name: "Farm Bro Remote Controlled Mulcher, Sprayer & Cargo Carrier",
      tier: "Agriculture platform",
      configuration: "6X6 UGV",
      tagline: "Mulch, spray, and carry — one unmanned carrier.",
      body: "One unmanned carrier that covers three season jobs: mulching between rows, spraying on schedule, and moving harvest or inputs across the estate. The six-wheel configuration is made for plantation rows and uneven estate tracks.",
      priceLabel: "Price on request",
      badge: "Best seller",
      availability: "Estate pilots open on request",
      specs: [
        ["Configuration", "6X6 UGV"],
        ["Operation", "Remote controlled"],
        ["Functions", "Mulching · Spraying · Cargo"],
        ["Payload & tank", "Full specification on request"],
      ],
      highlights: [
        "6X6 unmanned ground vehicle platform",
        "Three jobs on one chassis — mulch, spray, carry",
        "Made for plantation rows and estate tracks",
        "One crew member runs the whole pass",
      ],
    },
    "mini-mulcher-electric": {
      name: "Farm Bro Remote Controlled Mini Mulcher (Electric)",
      tier: "Agriculture platform",
      configuration: "4X4 UGV",
      tagline: "For the blocks a tractor can't reach.",
      body: "The compact electric mulcher for hard-to-reach ground — terraces, orchard basins, and narrow blocks where bigger machines stall. Quiet, fume-free passes with full remote control.",
      priceLabel: "Price on request",
      valueNote: "For hard to reach areas, capable of moving at 45° slope.",
      availability: "Demonstrations open on request",
      power: "Electric",
      slope: "Up to 45°",
      specs: [
        ["Configuration", "4X4 UGV"],
        ["Power", "Electric"],
        ["Operation", "Remote controlled"],
        ["Slope capability", "Up to 45°"],
      ],
      highlights: [
        "Compact 4X4 platform for tight ground",
        "Electric drive — quiet and fume-free",
        "Moves on slopes up to 45°",
        "Reaches where tractors and carriers can't",
      ],
    },
    "canopy-scout": {
      name: "Farm Bro Canopy Scout",
      tier: "Crop intelligence drone",
      configuration: "Scouting drone",
      tagline: "The estate from above, before you commit the crew.",
      body: "A crop-scouting drone that flies the block before the machines roll — canopy health, water stress, and pest pressure mapped in one pass, so mulching and spraying go exactly where the field needs them.",
      priceLabel: "Price on request",
      badge: "Scout",
      availability: "Scouting demonstrations open on request",
      specs: [
        ["Type", "Crop scouting drone"],
        ["Operation", "Remote controlled / autopilot survey"],
        ["Scouting", "Canopy health · water stress · pest pressure"],
        ["Full specification", "On request"],
      ],
      highlights: [
        "Scouts a block before the machines commit",
        "Maps canopy health, water stress, and pest pressure in one pass",
        "Pairs with the mulcher and carrier lineup",
        "Flies from the same operator crew — no pilot on the field",
      ],
    },
  } as Record<RobotId, MachineStrings>,

  // ── Attachments (from the catalog) ─────────────────────────────────────
  attachments: {
    A01: { name: "Rotary tiller", copy: "Aerate 3–4 inches deep while cutting weed roots between rows.", stat: "3–4 in depth" },
    A02: { name: "Boom sprayer", copy: "Adjustable nozzles deliver a fine, even spray with less chemical drift. 300 L tank on the implement rail.", stat: "10–15 ft reach" },
    A03: { name: "Brush cutter", copy: "Clear overgrowth cleanly without disturbing the crop beside it.", stat: "Row-safe cut" },
    A04: { name: "Field trailer", copy: "Move tools, harvest crates, or inputs without adding another vehicle.", stat: "Up to 250 kg" },
  } as Record<AttachmentId, AttachmentStrings>,
};

/** One machine's translatable surface. `power`/`slope` back the compare table. */
export interface MachineStrings {
  name: string;
  tier: string;
  configuration: string;
  tagline: string;
  body: string;
  priceLabel: string;
  badge?: string;
  valueNote?: string;
  availability: string;
  power?: string;
  slope?: string;
  specs: [string, string][];
  highlights: string[];
}

export interface AttachmentStrings {
  name: string;
  copy: string;
  stat: string;
}

export type UiStrings = typeof en;
