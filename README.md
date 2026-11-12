# BIKEFIX – Premium Motorcycle & Bicycle Workshop Website

A high-performance, mobile-first static website built with **HTML5, CSS3, JavaScript, and Tailwind CSS**. Engineered to present BikeFix as an elite automotive & cycle service workshop with mechanical precision, interactive tools, dual-mood depth, and no repeated photography.

---

## 🎨 Adaptive Dual-Theme Architecture (Light Mode & Dark Mode)

The website features an adaptive theme engine that delivers an airy, radiant **Light Mode** and an illuminated, deep-navy **Dark Mode**:

- **Full-Bleed Panoramic Hero Backdrops**: Every hero section features an edge-to-edge panoramic workshop or engineering backdrop spanning behind the copy and telemetry:
  - **Home 1 (`index.html`)**: Panoramic central motorcycle service bay (`assets/images/home-1/workshop-hero.jpg`).
  - **Home 2 (`home-2.html`)**: Cinematic off-center sports motorcycle on test stand (`assets/images/home-2/hero-cinematic.jpg`).
  - **Services (`services.html`)**: High-capacity multi-bay automotive service floor (`assets/images/services/services-hero-bg.jpg`).
  - **Spare Parts (`spare-parts.html`)**: Genuine components warehouse & engineering racks (`assets/images/spare-parts/parts-hero-bg.jpg`).
  - **Pricing (`pricing.html`)**: Automotive diagnostic pit & vehicle inspection bay (`assets/images/pricing/pricing-hero-bg.jpg`).
  - **Contact (`contact.html`)**: Central workshop facility exterior & bay driveway (`assets/images/contact/workshop-location.jpg`).
- **`.hero-automotive-stage`**: 
  - **In Light Mode**: A bright, clean, premium stage featuring warm white and ice-blue radial illumination (`linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 50%, #EFF6FF 100%)`), crisp dark navy typography (`#0F172A`), electric blue gradient accents, and multi-angle white-to-transparent scrims that let the workshop imagery shine through in bright daylight clarity.
  - **In Dark Mode**: Deep navy automotive backdrop (`linear-gradient(145deg, #070F1E 0%, #0F233D 45%, #142D4E 100%)`) with luminescent blue highlights and white text.
- **`.glass-cockpit-card`**: 
  - **Light Mode**: Pure frosted white card (`rgba(255, 255, 255, 0.94)`), subtle drop shadow, and crisp dark typography.
  - **Dark Mode**: Dark navy frosted glass card (`rgba(11, 23, 40, 0.88)`) with glowing cyan/blue borders.
- **`.bg-mechanical-grid`**: Micro-engineered blueprint grid with subtle blue dots in light mode and glowing dots in dark mode.
- **`.beacon-dot`**: Pulsing animated emerald and cyan status beacons indicating live workshop telemetry (`18 / 24 Active Bays Open`, `Real-time Queue Status`).

---

## 🎨 Brand Identity & Design Tokens

- **Brand Name**: BIKEFIX
- **Tagline**: *Ride Smooth. Travel Happy.*
- **Brand Mark**: Custom SVG combining a precision mechanical gear, bicycle wheel spokes & rim, and a diagonal wrench.
- **Color Palette**:
  - **Primary**: `#142D4E` (Deep Navy)
  - **Secondary**: `#2563EB` (Electric Blue)
  - **Accents & Backgrounds**: Slate-50, Slate-900, dark navy (`#070F1E`). Green (`#10B981`) and red (`#EF4444`) are used exclusively for status indicators.
- **Typography**:
  - Headings: `Poppins` (ExtraBold 800–900)
  - Body: `Inter` (Regular 400)
  - Prices & Statistics: `Inter` (SemiBold / Bold 600–700)
- **Header Navigation Order**:
  `Logo → Home → Home 2 → Services → Spare Parts → Pricing → Contact → Login → Book a Service`
  - Only two header CTAs: *Login* (secondary) and *Book a Service* (primary).
  - No dashboard link, no unnecessary menu items.

---

## 📁 Website Structure & Pages (8 Complete Pages)

1. **Home 1 – Classic Workshop (`index.html`)**
   - Section 01: **Interactive 4-Slide Hero Showcase**:
     - Layered card stack matching modern editorial UI (active card in front + blurred offset preview card behind).
     - Circular Up/Down chevron navigation buttons to slide between the 4 disciplines:
       1. *Engine & Computer Diagnostics* (OBD-II port read & valve lash tolerances)
       2. *Drivetrain & Wireless Gearing* (Ultrasonic chain cleaning & Di2 micro-indexing)
       3. *Hydraulic Brake Overhaul* (DOT 4/5.1 vacuum bleed & disc rotor runout truing)
       4. *Wheel Truing & Suspension* (Dial indicator spoke balancing & fork sag tuning)
     - Floating pill pagination bar with active elongated emerald indicator.
     - **Synchronized Full-Bleed Backgrounds**: The hero background image dynamically cross-fades with each slide, with clean, luminous daylight scrims in Light Mode and deep navy in Dark Mode.
     - Dynamic left-column headline, eyebrow, and description synchronization with autoplay (5s timer, pause on hover) and touch swipe support.
   - Section 02: Emergency Breakdown Strip with fast phone and WhatsApp contact.
   - Section 03: Vehicle Category Selector (*Motorcycle Care* vs *Bicycle Care*).
   - Section 04: Most Requested Repairs (asymmetrical cards: puncture, brakes, chain, gears).
   - Section 05: 6-Step Workshop Process Timeline (responsive vertical on mobile, horizontal on desktop).
   - Section 06: Workshop Quality Standards (5 numbered criteria with tool wall photography).
   - Section 07: Verified Customer Testimonials (featured review + 2 cards).
   - Section 08: Drop-off Service Reservation Booking Form with outline gear illustration.
   - Section 09: Global Footer with business hours and quick links.

2. **Home 2 – Premium Automotive Experience (`home-2.html`)**
   - Section 01: Full-screen cinematic hero with off-center subject and animated blue light streak.
   - Section 02: Repair Expertise Showcase (3 horizontal editorial discipline panels: Engine, Drivetrain, Suspension).
   - Section 03: Inside the Workshop (overlapping gallery with BMW bay, cycle station, and tool benches).
   - Section 04: Mechanical Care Explained (interactive diagram with clickable component tabs).
   - Section 05: Service Level Comparison Table (Basic vs Regular vs Advanced feature matrix).
   - Section 06: Repair Transformations (touch-friendly interactive Before/After drag slider).
   - Section 07: Master Technical Team (ASE/Shimano certified technicians).
   - Section 08: Scenic Mountain Ride CTA banner.
   - Section 09: Global Footer in dark theme.

3. **Services Page (`services.html`)**
   - Automotive stage hero with quick category jump controls.
   - Dedicated Motorcycle Repair Services (Engine, Brakes, Tyres, Chain).
   - Dedicated Bicycle Repair Services (Punctures, Gears, Brakes, Wheel Alignment).
   - **Interactive Symptom Diagnosis Matrix**: Clickable diagnostic cards diagnose root causes and auto-scroll/preselect the booking form.
   - Accordion breakdown: inclusions, turnaround times, warranties.
   - 6 detailed FAQs.
   - Pre-filled booking reservation form with instant demo feedback.

4. **Spare Parts Catalogue (`spare-parts.html`)**
   - Automotive stage hero with stock overview.
   - Searchable catalogue interface with real-time text search.
   - Segmented vehicle filter (`All`, `Motorcycle`, `Bicycle`) and category filters.
   - Price sort (Low to High, High to Low) and in-stock only toggle.
   - **Quick View Product Modal** with high-res photography, fitment specs, and 1-click enquiry button.
   - 4-step parts compatibility guide.
   - Parts availability enquiry form with photo upload option.

5. **Pricing Guide (`pricing.html`)**
   - Automotive stage hero with price-lock guarantee badge.
   - Segmented vehicle price switcher (`Motorcycle | Bicycle`) dynamically updating all package cards and service tables.
   - 3 package tiers: *Quick Tune*, *Standard Maintenance* (Popular), *Master Overhaul*.
   - Itemized repair charges table with turnaround times.
   - Additional parts and labor transparency breakdown.
   - **Interactive Repair Cost Estimator** with dynamic multi-select checkbox calculations.
   - Workshop payment and warranty policies.

6. **Contact & Drop-Off (`contact.html`)**
   - Automotive stage hero with live bay availability telemetry (`18 / 24 Open Now`).
   - 3 distinct high-contrast contact cards (Phone, Email, WhatsApp).
   - Responsive Google Maps embed with address, landmarks, and parking instructions.
   - 5-step vehicle drop-off guide with step badges.
   - Direct service enquiry form with vehicle selector.
   - Weekly operating hours timetable with open/closed beacons.
   - Visitor checklist & courtesy loaner bike information.

7. **Authentication (`login.html` & `signup.html`)**
   - Clean, minimalist card interface (strictly NO navigation or footer as specified).
   - Rich deep-navy mechanical backdrop (`#070F1E`) with radial blue spotlights.
   - Google sign-in integration button.
   - Password reveal eye toggle.
   - Remember Me and Forgot Password on a single row (Login).
   - Full name, phone, email, vehicle type, and password (Sign Up).

---

## ⚡ Technical Highlights

- **100% Unique Photography**: Every section features a unique, high-resolution workshop photograph or component image stored locally in `assets/images/` (zero external CDN dependencies; 0 broken links).
- **Theme & Direction Engine**: Instant Light/Dark mode and LTR/RTL text direction switching with `localStorage` persistence.
- **Mobile-First Responsive Layout**:
  - Compact header with slide-out navigation drawer.
  - Fixed sticky bottom booking bar on mobile viewports (< 768px).
  - Touch-optimized targets (≥ 44×44px).
  - Horizontally scrollable comparison tables and swipeable layouts.
- **Interactive Drag Slider**: Custom pointer and touch-enabled Before/After split comparison on Home 2.
- **Structured Data & SEO**: OpenGraph tags, canonical links, Schema.org `AutoRepair` JSON-LD microdata, `sitemap.xml`, and `robots.txt`.
- **Modular Data Files**: `data/services.js`, `data/products.js`, and `data/pricing.js`.

---

## 🚀 How to Run the Website

Open any `.html` file directly in any modern browser, or launch a local web server:

```bash
# Python 3
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.
