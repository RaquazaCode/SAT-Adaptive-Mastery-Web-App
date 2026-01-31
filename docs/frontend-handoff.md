# SAT Mastery — Frontend Handoff (Zero-Context Summary)

Use this doc when continuing work on the homepage, components, and visual layout so new changes match the existing codebase and design system.

---

## Tech stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (utility-first styling)
- **react-router-dom** (client-side routing)
- **Lucide React** (icons)

---

## Design system

### Colors (CSS variables in `src/index.css`)

Use these variables in Tailwind via `var(--name)` or in `style` objects. Do not hardcode hex values for brand colors.

| Variable | Value | Use |
|----------|--------|-----|
| `--color-primary` | `#3D5A45` | Brand green, buttons, links, headings |
| `--color-primary-light` | `#4A7C59` | Lighter green accents |
| `--color-accent-green` | `#B8E0A0` | Soft green (CTAs, highlights) |
| `--color-accent-yellow` | `#F5C842` | Yellow (badges, “BEST VALUE”, studying-now) |
| `--color-accent-orange` | `#F5A962` | Orange (tags, accents) |
| `--color-accent-blue` | `#C5D8F0` | Blue (tags, secondary) |
| `--color-bg-light` | `#F5F5F0` | Off-white section backgrounds |
| `--color-text-dark` | `#1A1A1A` | Body/headline text |
| `--color-text-gray` | `#666666` | Muted text |

Examples: `bg-[var(--color-primary)]`, `text-[var(--color-accent-yellow)]`, `border-[var(--color-primary)]/10`.

### Typography

- **Headings (h1–h6):** `font-serif` → **DM Serif Display** (Google Fonts).
- **Body:** **Inter** (sans-serif). Default on `body`.
- **Serif utility:** `.font-serif` for any serif text.
- Headings: bold, primary or text-dark; subtext: `text-gray-600` or `text-[var(--color-text-gray)]`.

### Layout and spacing

- **Max content width:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Section padding:** `py-12` to `py-20` (e.g. `py-20` for main sections).
- **Gaps:** `gap-4` to `gap-16`; use `gap-8` / `gap-12` for section internals.
- **Responsive:** Prefer `sm:`, `md:`, `lg:` for padding, font size, and spacing so mobile stays readable and uncluttered.

---

## Responsive and mobile

- **Breakpoints:** Tailwind default (`sm` 640px, `md` 768px, `lg` 1024px).
- **Approach:** Scale down padding, font size, and icon/logo sizes on small viewports; avoid horizontal overflow; use `min-w-0` on flex children that can shrink.
- **Hero right column:** Uses `HeroTutorInterface`; on mobile it uses smaller padding (`p-3 sm:p-4 md:p-6 lg:p-8`), smaller text, and tighter card spacing so the whole card fits.
- **LogoBar:** Tighter logo strip gap on mobile (`gap-3 sm:gap-4 md:gap-6 lg:gap-8`), smaller logo heights (`h-12 sm:h-14 md:h-16 lg:h-20`), and smaller fade mask widths so the slider and thought bubbles work on small screens.

---

## Global animations (`src/index.css`)

- **Float:** `.animate-float` — gentle vertical float (Hero tags). Uses `--rotation` for transform.
- **Bounce:** `.animate-bounce-gentle` — subtle bounce (e.g. owl mascot).
- **Pulse glow:** `.animate-pulse-glow` — soft box-shadow pulse.
- **Logo slider:** `.animate-logo-slide` (40s linear infinite), `.animate-logo-slide-paused` (pause on hover). Keyframes: `logo-slide-left`.
- **Thought bubble:** `.animate-thought-bubble` — fade + translateY(6px → 0), 0.22s ease-out (LogoBar hover tooltips).
- **Zap pulse:** `.animate-zap-pulse` — opacity + scale pulse for the “studying now” lightning icon in HeroTutorInterface.

Use these class names rather than inventing new animations for the same behaviors.

---

## Brand and logo

- **Logo:** Owl mascot (🦉) is the product logo. Implemented in `src/components/Logo.tsx`: owl emoji inside a primary-green rounded box. Accepts `className` and `iconClassName` (e.g. `text-xl` for size).
- **Usage:** Header and Footer use `<Logo className="w-8 h-8" iconClassName="text-xl" />` next to the wordmark “SAT Mastery”.
- **Wordmark:** “SAT Mastery” is `font-serif text-2xl font-bold text-[var(--color-primary)]`.

---

## Homepage structure (`src/pages/LandingPage.tsx`)

Order of sections in `<main>`:

1. **Hero** — Headline, subline, CTAs, floating tags; right column = **HeroTutorInterface** (tutor card with “studying now”, progress, affordability).
2. **LogoBar** — “Trusted by students & educators worldwide” + infinite right-to-left logo slider (Khan Academy, Coursera, etc.) with fade masks and hover thought bubbles (company name).
3. **Features** — Three feature blocks (icons + copy).
4. **PersonalTutor** — “Meet Your Personal SAT Tutor” + owl mascot + feature grid + Bloom two-sigma CTA.
5. **HowItWorks** — Three steps + illustration.
6. **TutorComparison** — Table “Why Your Personal Tutor Beats the Alternatives” with “BEST VALUE” badge on “Your Personal Tutor” column.
7. **EmotionalSupport** — Emotional support / tone section.
8. **Testimonials** — Three testimonial cards (profile image, name, role, quote). Images from Unsplash CDN (96×96 face crop).
9. **FAQ** — Accordion FAQs.
10. **CTASection** — Final CTA block.
11. **Footer** — Logo, tagline, Company/Contact/Newsletter columns. Newsletter line: “Get Daily SAT Prep Questions for FREE ! (answers + explanations included) 📲”.

Every page uses **Header** and **Footer**; standalone pages (Features, How It Works, Pricing, FAQ) use the same layout pattern: optional intro block + section component + **CTASection** + **Footer**.

---

## Key components (paths and roles)

- **`src/components/Logo.tsx`** — Owl logo; use anywhere the brand mark is needed.
- **`src/components/Header.tsx`** — Sticky header: Logo, “SAT Mastery”, nav links (Features, How It Works, Practice Tests, Pricing, FAQ, Analytics), “Start Free Diagnostic” CTA.
- **`src/components/Footer.tsx`** — Logo, tagline, Company/Contact/Newsletter; newsletter copy as above.
- **`src/components/Hero.tsx`** — Left: headline, subline (“1-on-1 world class tutoring – affordable for ALL students 💸”), CTAs, floating tags (Reading & Writing, Math Mastery, Practice Tests). Right: **HeroTutorInterface** inside a primary-green rounded container with decorative curves.
- **`src/components/hero/HeroTutorInterface.tsx`** — Card: title bar (“Your Personal Tutor”), bright yellow “X studying now” badge with Zap icon (pulse), rotating value message, “Your progress” skill cards (Reading & Writing, Math), “Same attention as a $200/hr tutor — Included”. Fully responsive (smaller padding/text on mobile).
- **`src/components/LogoBar.tsx`** — Trust line + horizontal slider of partner logos (local SVGs in `src/assets/logos/`). Slider pauses on hover; thought-bubble tooltip shows company name. Responsive logo sizes and gaps.
- **`src/components/TutorComparison.tsx`** — Comparison table; “Your Personal Tutor” column has a “BEST VALUE” pill (yellow, Star icon) above the header. Table wrapper has `pt-10` so the badge is not clipped.
- **`src/components/Testimonials.tsx`** — Three testimonials; each has `name`, `role`, `image` (URL), `quote`. Images are Unsplash URLs (96×96, face crop).
- **`src/components/PageMeta.tsx`** — Sets `document.title` and meta description per route; use on every page for SEO.

---

## Assets

- **Logos (partner strip):** `src/assets/logos/` — SVG files (khan-academy.svg, coursera.svg, duolingo.svg, edx.svg, quizlet.svg, udemy.svg). Import and pass to `<img src={...} alt={...} />`.
- **Other images:** `src/assets/` — e.g. how-tutor-works.svg, tutor-interaction.svg, testimonial-placeholder.svg. Hero no longer uses hero-tutor-interface.svg in the main area (replaced by HeroTutorInterface UI).
- **Testimonial photos:** Currently Unsplash CDN URLs in `Testimonials.tsx`. To switch to local files, add images under `src/assets/` (e.g. `testimonials/`) and replace `image` with the imported path or public URL.

---

## Routing (`src/App.tsx`)

- `/` — LandingPage  
- `/features` — FeaturesPage  
- `/how-it-works` — HowItWorksPage  
- `/pricing` — PricingPage  
- `/faq` — FAQPage  
- `/diagnostic` — DiagnosticFlow  
- `/practice` — DrillFlow  
- `/simulation` — SimulationFlow  
- `/analytics` — AnalyticsPage  

Links in Header/Footer use `<Link to="...">` from react-router-dom. Use these paths for any new nav or CTAs.

---

## Styling conventions

- Prefer **Tailwind** for layout, spacing, typography, and colors. Use **CSS variables** for brand colors (see Design system).
- **Borders:** e.g. `border-[var(--color-primary)]/10` for subtle primary tint.
- **Buttons:** Primary = `bg-[var(--color-primary)] text-white`; secondary = border + primary text; hover: `hover:bg-[#2d4434]` for primary, `hover:scale-105` for CTAs where appropriate.
- **Cards:** White or light bg, `rounded-2xl`, `shadow-sm` / `hover:shadow-md`, padding `p-6` to `p-8`.
- **Sections:** Alternating `bg-white` and `bg-[var(--color-bg-light)]` for visual rhythm.
- **Accessibility:** Use semantic HTML; `alt` on images; `aria-label` or visible text for icon-only buttons; `role="tooltip"` for hover tooltips (e.g. LogoBar thought bubbles).

---

## Copy and tone

- Value proposition: 1-on-1 tutoring, affordable, 24/7, adaptive, no judgment.
- Hero subline: “1-on-1 world class tutoring – affordable for ALL students 💸”.
- Footer newsletter: “Get Daily SAT Prep Questions for FREE ! (answers + explanations included) 📲”.
- CTAs: “Meet Your Tutor”, “Start Free Diagnostic”, “Try Your Tutor Free”. Keep tone encouraging and student-focused.

---

## Quick checklist for new work

- [ ] Use `var(--color-*)` for brand colors.
- [ ] Use DM Serif Display for headings, Inter for body.
- [ ] Use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` for content width.
- [ ] Add responsive classes (`sm:`, `md:`, `lg:`) for padding, font size, and spacing on new sections.
- [ ] Use `<Logo />` for the owl logo in header/footer or any new brand placement.
- [ ] Reuse existing animation classes from `index.css` where behavior matches (float, pulse, thought bubble, zap, logo slide).
- [ ] Set `PageMeta` (title + description) on any new page.
- [ ] Keep section order and structure on the homepage consistent with this doc unless intentionally changing the layout.
