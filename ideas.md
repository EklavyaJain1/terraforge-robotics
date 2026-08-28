# TerraForge Robotics — Design Direction

## Ground truth reference
The supplied screenshot is the primary visual reference: a full-bleed, edge-to-edge farming robot hero shot in warm sunset light; a very small white symbol/logo anchored at the top-left; a sparse top navigation with small uppercase links and a rounded orange CTA at the top-right; a lower-left hero caption and subtle rounded pre-book CTA; and a WhatsApp-style floating support button at the lower-right. The reference link informs the downstream content structure only where the screenshot is ambiguous: product, attachments, proof points, comparison, FAQs, and contact.

## Chosen direction: Field Notes / Industrial Editorial

### Design Movement
Contemporary industrial editorial with Swiss-influenced information design, documentary farm photography, and restrained utility UI.

### Core Principles
- Let the machine and the field carry the emotional weight; interface chrome stays quiet.
- Use asymmetry and anchored metadata rather than centered marketing blocks.
- Pair warm, sun-baked neutrals with deep graphite and one ownable safety-orange accent.
- Make every interaction feel like a control surface: immediate, legible, and purposeful.

### Color Philosophy
The palette begins with the sunset-earth atmosphere of the reference and translates it into a calm working interface: sand and bone for daylight, graphite for machinery and text, oxidized orange for action, and a muted sage signal for operational states. Orange means movement and commitment, never decoration; graphite gives the product credibility; bone preserves the spacious, editorial feel.

### Layout Paradigm
A vertical story spine with full-bleed visual moments, offset editorial copy blocks, thin measurement rules, and a split calculator panel. Desktop uses a 12-column grid with content intentionally biased left; mobile collapses into a single reading rail while preserving edge-to-edge imagery.

### Signature Elements
- Hairline rules with compact uppercase labels and numeric section markers.
- Product cards with clipped corners and a small orange “field note” tag.
- An amber action pill paired with a small green live-status dot.

### Interaction Philosophy
Hover and focus states behave like a tactile instrument: labels shift by a few pixels, buttons compress on press, and selected product states reveal a brighter orange edge. Accordions and the calculator are progressive disclosure, keeping the initial page quiet.

### Animation
Use only transform and opacity transitions, mostly 180–260ms with a strong ease-out. Hero content fades upward in staggered layers; cards lift by 4px on hover; tab changes crossfade; respect prefers-reduced-motion and never animate layout dimensions.

### Typography System
Use Space Grotesk for display text and IBM Plex Mono for metadata, labels, and operational figures. Headlines are tight, sentence case, and high contrast; eyebrow labels use mono at 10–11px with generous tracking; body copy stays 16–18px with a 1.55 line-height.

### Brand Essence
TerraForge builds field-ready autonomous machines for growers who need more capacity without more complexity. Personality: exacting, grounded, optimistic.

### Brand Voice
Headlines are direct and practical. CTAs sound like a next action, not a promise. Microcopy explains what happens next.

Example lines:
- “More acres. Fewer compromises.”
- “See what one operator can move in a season.”

### Wordmark & Logo
Use a compact symbol-only mark: two ascending chevrons nested inside a squared seed/field frame, drawn as a bold orange glyph. Pair it with a custom wordmark treatment in the interface rather than relying on a default logo font.

### Signature Brand Color
Terra Orange — `#E85B2A` — a warm, ownable signal color that feels like a safety stripe, a setting sun, and a decisive button all at once.

## Implementation notes
Use original generated visual assets for the hero and major editorial image moments. Keep the page as a single high-conversion home experience with anchor navigation, a working savings calculator, product/attachment state switching, FAQ accordions, mobile menu, and a lightweight request-demo form. No fabricated reviews or testimonials are included.
