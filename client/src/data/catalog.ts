export type RobotId = "farmx-500" | "rancher-ugv" | "canopy-scout";

export interface Robot {
  id: RobotId;
  number: string;
  name: string;
  tier: string;
  tagline: string;
  body: string;
  image: string;
  priceLabel: string;
  institutionalNote: string;
  badge?: string;
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
    id: "farmx-500",
    number: "01",
    name: "FarmX-500",
    tier: "Autonomous farm platform",
    tagline: "Precision agriculture, redefined.",
    body: "A full-scale autonomous farm platform designed for row-crop operations across Indian estates. FarmX-500 combines a rugged 4WD electric drivetrain with modular implements for sowing, spraying, and inter-row cultivation — all controlled from a single tablet interface.",
    image: agriImages.farmx,
    priceLabel: "from ₹18,50,000",
    institutionalNote: "Fleet, lease & institutional pricing on request",
    badge: "Flagship",
    specs: [["Payload", "500 kg"], ["Endurance", "18 hr"], ["Navigation", "GPS + LiDAR"]],
    highlights: [
      "Fully electric drivetrain — zero emissions",
      "GPS autopilot with sub-10 cm precision",
      "Modular implement rail: sprayer, tiller, seeder",
      "18 hours continuous operation on a single charge",
      "Follow-Me mode for supervised operations",
    ],
    availability: "Field trials open for the coming season",
  },
  {
    id: "rancher-ugv",
    number: "02",
    name: "Rancher UGV",
    tier: "Plantation utility platform",
    tagline: "Your smart plantation companion.",
    body: "A compact utility platform purpose-built for plantation crops — coffee, areca, rubber, and horticulture. Rancher navigates narrow rows and steep gradients where full-scale tractors cannot, and hauls up to 250 kg of harvested produce or inputs.",
    image: agriImages.rancher,
    priceLabel: "from ₹7,95,000",
    institutionalNote: "Fleet, lease & institutional pricing on request",
    badge: "Best seller",
    specs: [["Payload", "250 kg"], ["Width", "980 mm"], ["Ingress", "IP66"]],
    highlights: [
      "Compact chassis for narrow plantation rows",
      "250 kg payload with dumping bed",
      "Follow-Me mode for harvest crews",
      "All-terrain 4WD with 30° gradient",
      "IP66 rated for monsoon operations",
    ],
    availability: "Ready for estate pilots",
  },
  {
    id: "canopy-scout",
    number: "03",
    name: "Canopy Scout",
    tier: "Crop intelligence drone",
    tagline: "Multispectral crop intelligence.",
    body: "A tethered multispectral scouting drone that maps canopy health, water stress, and pest pressure across large estates. Data flows into a farm dashboard that plans variable-rate spraying for the FarmX fleet.",
    image: agriImages.canopy,
    priceLabel: "from ₹4,25,000",
    institutionalNote: "Fleet, lease & institutional pricing on request",
    specs: [["Flight time", "45 min"], ["Coverage", "180 acres/hr"], ["Camera", "5-band multispectral"]],
    highlights: [
      "5-band multispectral imaging",
      "45 minutes flight time per battery",
      "Automatic pest and stress detection",
      "Direct integration with the FarmX fleet dashboard",
    ],
    availability: "Available with every estate package",
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
  { number: "A02", name: "Boom sprayer", copy: "Adjustable nozzles deliver a fine, even spray with less chemical drift. 300 L tank on the FarmX rail.", stat: "10–15 ft reach", priceLabel: "₹38,000", icon: "⌁" },
  { number: "A03", name: "Brush cutter", copy: "Clear overgrowth cleanly without disturbing the crop beside it.", stat: "Row-safe cut", priceLabel: "₹26,000", icon: "╱" },
  { number: "A04", name: "Field trailer", copy: "Move tools, harvest crates, or inputs without adding another vehicle.", stat: "Up to 250 kg", priceLabel: "₹55,000", icon: "▱" },
];

export const machineChoices = [
  "FarmX-500",
  "Rancher UGV",
  "Canopy Scout",
  "Fleet / B2B order",
  "Government / Defence enquiry",
  "Attachment only",
  "Not sure yet",
];