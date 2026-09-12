export type RobotId = "mulcher-hybrid" | "mulcher-sprayer-cargo" | "mini-mulcher-electric";

export interface Robot {
  id: RobotId;
  slug: string;
  number: string;
  name: string;
  tier: string;
  configuration: string;
  tagline: string;
  body: string;
  image: string;
  gallery: string[];
  priceLabel: string;
  institutionalNote: string;
  badge?: string;
  /** Optional highlight chip shown on the store card, as in the reference design. */
  valueNote?: string;
  specs: [string, string][];
  highlights: string[];
  availability: string;
}

export const agriImages = {
  hero: "/images/agri/agri-hero.jpg",
  wide: "/images/agri/agri-wide.jpg",
  division: "/images/agri/agri-division.jpg",
  farmx: "/images/agri/farmx-500.jpg",
  rancher: "/images/agri/rancher-ugv.jpg",
  canopy: "/images/agri/canopy-scout.jpg",
};

export const robots: Robot[] = [
  {
    id: "mulcher-hybrid",
    slug: "remote-controlled-mulcher-hybrid",
    number: "01",
    name: "Farm Bro Remote Controlled Mulcher (Hybrid)",
    tier: "Agriculture platform",
    configuration: "4X4 UGV",
    tagline: "Heavy mulching, no driver on the machine.",
    body: "A full-size remote-controlled mulcher for open fields and orchard blocks. The hybrid power pack keeps long mulching days going, while the operator works the machine from a safe distance with a rugged remote unit.",
    image: agriImages.farmx,
    gallery: [agriImages.farmx, agriImages.wide, agriImages.hero, agriImages.division],
    priceLabel: "Price on request",
    institutionalNote: "Fleet, lease & institutional pricing on request",
    badge: "Flagship",
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
    availability: "Field demonstrations open on request",
  },
  {
    id: "mulcher-sprayer-cargo",
    slug: "mulcher-sprayer-cargo-carrier",
    number: "02",
    name: "Farm Bro Remote Controlled Mulcher, Sprayer & Cargo Carrier",
    tier: "Agriculture platform",
    configuration: "6X6 UGV",
    tagline: "Mulch, spray, and carry — one unmanned carrier.",
    body: "One unmanned carrier that covers three season jobs: mulching between rows, spraying on schedule, and moving harvest or inputs across the estate. The six-wheel configuration is made for plantation rows and uneven estate tracks.",
    image: agriImages.rancher,
    gallery: [agriImages.rancher, agriImages.wide, agriImages.division, agriImages.hero],
    priceLabel: "Price on request",
    institutionalNote: "Fleet, lease & institutional pricing on request",
    badge: "Best seller",
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
    availability: "Estate pilots open on request",
  },
  {
    id: "mini-mulcher-electric",
    slug: "mini-mulcher-electric",
    number: "03",
    name: "Farm Bro Remote Controlled Mini Mulcher (Electric)",
    tier: "Agriculture platform",
    configuration: "4X4 UGV",
    tagline: "For the blocks a tractor can't reach.",
    body: "The compact electric mulcher for hard-to-reach ground — terraces, orchard basins, and narrow blocks where bigger machines stall. Quiet, fume-free passes with full remote control.",
    image: agriImages.canopy,
    gallery: [agriImages.canopy, agriImages.division, agriImages.hero, agriImages.wide],
    priceLabel: "Price on request",
    institutionalNote: "Fleet, lease & institutional pricing on request",
    valueNote: "For hard to reach areas, capable of moving at 45° slope.",
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
    availability: "Demonstrations open on request",
  },
];

export interface Attachment {
  number: string;
  name: string;
  copy: string;
  stat: string;
  priceLabel: string;
  icon: string;
}

export const attachments: Attachment[] = [
  { number: "A01", name: "Rotary tiller", copy: "Aerate 3–4 inches deep while cutting weed roots between rows.", stat: "3–4 in depth", priceLabel: "₹42,000", icon: "✣" },
  { number: "A02", name: "Boom sprayer", copy: "Adjustable nozzles deliver a fine, even spray with less chemical drift. 300 L tank on the implement rail.", stat: "10–15 ft reach", priceLabel: "₹38,000", icon: "⌁" },
  { number: "A03", name: "Brush cutter", copy: "Clear overgrowth cleanly without disturbing the crop beside it.", stat: "Row-safe cut", priceLabel: "₹26,000", icon: "╱" },
  { number: "A04", name: "Field trailer", copy: "Move tools, harvest crates, or inputs without adding another vehicle.", stat: "Up to 250 kg", priceLabel: "₹55,000", icon: "▱" },
];

export const machineChoices = [
  "Farm Bro Remote Controlled Mulcher (Hybrid)",
  "Farm Bro Remote Controlled Mulcher, Sprayer & Cargo Carrier",
  "Farm Bro Remote Controlled Mini Mulcher (Electric)",
  "Fleet / B2B order",
  "Government / Civil enquiry",
  "Government / Defence enquiry",
  "Attachment only",
  "Not sure yet",
];
