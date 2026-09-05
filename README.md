# Elena Rostova — Textile Design Atelier Portfolio

A boutique, editorial single-page portfolio website for a textile designer atelier. Built on **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

This site is styled like a high-end digital design lookbook, showcasing hand-loomed fibers, natural plant dye studies, repeating pattern repeat sandboxes, and interior products in situ. It contains **no code mentions or tech stack visuals in the user-facing UI**, ensuring the experience is tactile and focused entirely on craft.

---

## Getting Started

### 1. Installation
Install the project dependencies (includes `framer-motion`, `yet-another-react-lightbox`, `react-hook-form`, `zod`, and Tailwind CSS components):
```bash
npm install
```

### 2. Development Server
Run the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
Verify typescript validation and optimization compiles with code 0:
```bash
npm run build
```

---

## File & Component Structure

- `src/app/page.tsx` — Single-page composition importing and rendering all scrolling lookbook sections.
- `src/app/layout.tsx` — Setting up typography loading (Fraunces serif display + Inter sans body font) and SEO metadata.
- `src/app/globals.css` — Custom color tokens, CSS-only linen weave grids, and editorial scrollbar styling.
- `src/components/`
  - `Navbar.tsx` — Scroll-triggered floating header that hides on scroll-down and appears on scroll-up.
  - `Hero.tsx` — Full-page cover with bold display typography and draped linen.
  - `About.tsx` — Story on raw fibers, natural dye pools, and hand-weaving with a print-triggering "Atelier booklet" button.
  - `WorksGallery.tsx` — Asymmetric gallery grid filterable by weaves, prints, and products, integrating a custom lightbox.
  - `InspirationSection.tsx` — Grid logs detailing natural indigo fermentation, eucalyptus eco-prints, and organic plant dye pools.
  - `PatternShowcase.tsx` — Interactive sandbox allowing the user to toggle between a single motif view and a tiled repeat view.
  - `ProductsShowcase.tsx` — Flatlay editorial showing applied textile goods like cushion covers and fabric yardage.
  - `ContactForm.tsx` — Secure studio correspondence form validating input client-side using `react-hook-form` + `zod`.
- `public/images/` — High-fidelity generated imagery representing actual textile crafts.

---

## Content Customization Guide

To swap out the placeholder content with real atelier assets, replace the following:

### 1. Visual Photography (`/public/images/`)
- `cover_fabric.jpg` — The background draped linen graphic seen in the Hero.
- `designer_portrait.jpg` — Close-up portrait of the designer in the studio.
- `weave_detail.jpg` — Macro shot of a hand-loomed warp & weft weave.
- `print_detail.jpg` — Leaf/eco-printed cotton fabrics.
- `applied_cushion.jpg` — Cushion styled inside an interior room.
- `tiled_pattern_indigo.jpg` — Tileable square JPEG of a resist-dye pattern repeat.

### 2. Copy & Biographies
- **Atelier Philosophy**: Edit `src/components/About.tsx` to alter the biography text, fiber lists, or natural dye pools.
- **Project Descriptions**: Edit the `WORKS` database array at the top of `src/components/WorksGallery.tsx` to reflect your projects, including names, descriptions, and categories.
- **Repeat Pattern Specifications**: Change the `PATTERNS` array inside `src/components/PatternShowcase.tsx` to update materials and repeat sizing.
- **Coordinates & Addresses**: Edit the address blocks, email handlers, and social media links inside `src/components/ContactForm.tsx` to link to your studio's platforms.
- **Metadata and Page Titles**: Update metadata inside `src/app/layout.tsx` to replace the designer name or descriptions for SEO optimization.

