/**
 * Machine data — structural + display fields.
 * Consumer pages (FarmBro, ProductDetail, Gallery, ProductCard) read directly
 * from here. The i18n dictionaries carry translated chrome around the machines;
 * machine-specific prose stays English in this file.
 */

export type RobotId =
  | "mulcher-hybrid"
  | "mulcher-sprayer-cargo"
  | "mini-mulcher-electric"
  | "canopy-scout";

export type AttachmentId = "A01" | "A02" | "A03" | "A04";

export interface Robot {
  id: RobotId;
  slug: string;
  number: string;
  image: string;
  gallery: string[];
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

export const agriImages = {
  hero: "/images/agri/agri-hero.jpg",
  wide: "/images/agri/agri-wide.jpg",
  division: "/images/agri/agri-division.jpg",
  farmx: "/images/agri/farmx-500.jpg",
  rancher: "/images/agri/rancher-ugv.jpg",
  canopy: "/images/agri/canopy-scout.jpg",
} as const;

export const robots: Robot[] = [
  {
    id: "mulcher-hybrid",
    slug: "remote-controlled-mulcher-hybrid",
    number: "01",
    image: agriImages.farmx,
    gallery: [agriImages.farmx, agriImages.wide, agriImages.hero, agriImages.division],
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
  {
    id: "mulcher-sprayer-cargo",
    slug: "mulcher-sprayer-cargo-carrier",
    number: "02",
    image: agriImages.rancher,
    gallery: [agriImages.rancher, agriImages.wide, agriImages.division, agriImages.hero],
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
  {
    id: "mini-mulcher-electric",
    slug: "mini-mulcher-electric",
    number: "03",
    image: agriImages.hero,
    gallery: [agriImages.hero, agriImages.rancher, agriImages.division, agriImages.wide],
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
  {
    id: "canopy-scout",
    slug: "canopy-scout-drone",
    number: "04",
    image: agriImages.canopy,
    gallery: [agriImages.canopy, agriImages.wide, agriImages.division, agriImages.hero],
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
];

export interface Attachment {
  id: AttachmentId;
  icon: string;
  priceLabel: string;
  number: string;
  name: string;
  copy: string;
  stat: string;
}

export const attachments: Attachment[] = [
  { id: "A01", icon: "✣", priceLabel: "₹42,000", number: "A01", name: "Rotary tiller", copy: "Aerate 3–4 inches deep while cutting weed roots between rows.", stat: "3–4 in depth" },
  { id: "A02", icon: "⌁", priceLabel: "₹38,000", number: "A02", name: "Boom sprayer", copy: "Adjustable nozzles deliver a fine, even spray with less chemical drift. 300 L tank on the implement rail.", stat: "10–15 ft reach" },
  { id: "A03", icon: "╱", priceLabel: "₹26,000", number: "A03", name: "Brush cutter", copy: "Clear overgrowth cleanly without disturbing the crop beside it.", stat: "Row-safe cut" },
  { id: "A04", icon: "▱", priceLabel: "₹55,000", number: "A04", name: "Field trailer", copy: "Move tools, harvest crates, or inputs without adding another vehicle.", stat: "Up to 250 kg" },
];

/** Language-independent ids for the order dialog's Machine select.
    Labels resolve from the active dictionary, so prefills survive translation. */
export const machineChoiceIds = [
  "m1",
  "m2",
  "m3",
  "m4",
  "fleet",
  "gov-civil",
  "gov-def",
  "attach",
  "unsure",
] as const;

export type MachineChoiceId = (typeof machineChoiceIds)[number];
