# Kien Nguyen — Portfolio Design Brief

Owner: Le Trung Kien Nguyen ("Kien"), B.S. Mechanical Engineering @ University of South Florida.
Goal: land a **Summer 2027 robotics internship** (mechanical design / actuators / humanoids).
Audience: recruiters (30-second skim) and engineers (who click into case studies).

## Concept: "The Drawing Sheet"
The site reads like a beautifully typeset **engineering drawing / spec sheet**. That sets it apart from the
usual dark-and-cyan "techy" portfolio. It should feel precise, calm, and confident. Taste over effects.

- Warm drafting-paper background with a faint 8px/40px millimetre grid. Ink-black type.
- **One** accent: signal orange (used sparingly for live/interactive things, key metrics, and the sun gear).
- Thin 1px ink rules, corner registration marks, mono annotations ("DWG 01", "REV A", "SCALE 1:1").
- Sections are numbered like sheets: `01 — Selected Work`, `02 — Experience`, …
- Numbers do the talking: big metric figures ("25×", "~200%", "19", "10 N·m") in display type.
- NO particle backgrounds, neon glows, gradients, glassmorphism, or emoji.
- Motion: subtle reveal (fade + 8px rise, ~0.5s, ease-out), lines that "draw in". Respect `prefers-reduced-motion`.

## Tokens (already defined in `src/app/globals.css`; use them, don't hardcode hex)
| token | value | use |
|---|---|---|
| `--paper` | #F3F1EB | page background |
| `--paper-2` | #EAE7DF | cards / insets |
| `--ink` | #15161A | primary text, rules |
| `--ink-2` | #4A4C52 | secondary text |
| `--ink-3` | #8A8B8F | muted / annotations |
| `--rule` | rgba(21,22,26,.14) | hairlines |
| `--grid` | rgba(21,22,26,.05) | background grid |
| `--signal` | #FF4F1F | accent (sparingly!) |
| `--signal-ink` | #D93A0E | accent text on paper (contrast) |

Tailwind color names map to these: `bg-paper`, `bg-paper-2`, `text-ink`, `text-ink-2`, `text-ink-3`,
`border-rule`, `text-signal`, `bg-signal`, `text-signal-ink`.

Fonts (next/font, already wired): `font-display` = Archivo (headings, big numbers, tight tracking -0.03em),
`font-sans` = IBM Plex Sans (body), `font-mono` = IBM Plex Mono (labels, annotations, uppercase, tracking 0.08em, 11–12px).

Layout: max-width 1200px, 24px side gutter (16px on mobile), generous vertical rhythm (section padding ~128px desktop / 80px mobile).
Must work at 375px wide with no horizontal scroll.

Utility classes provided in globals.css: `.label` (mono uppercase annotation), `.hairline` (1px rule),
`.reg-marks` (corner registration marks on a box), `.paper-grid` (background grid).

## Page structure (`src/app/page.tsx`)
1. **Navbar** — left: monogram "KN" in a small square box + "Kien Nguyen"; right: Work, Experience, Skills, About, Contact, and a "Résumé ↓" button (→ `/cv.pdf`). Sticky, paper background with blur, hairline bottom border once scrolled. Mobile: menu button → full-screen sheet.
2. **Hero** — left column: label `PORTFOLIO · REV 2026.10`, name "Kien Nguyen" huge, small mono "LE TRUNG KIEN NGUYEN — HE/HIM", one-liner, status chip with pulsing orange dot "Seeking Summer 2027 robotics internships", CTAs (View work → #work, Download résumé, Email). Right: **interactive 3D planetary gearset** (react-three-fiber) drawn as ink line-art on paper; orange sun gear; correct gear ratios; slowly rotating, drag to orbit, speeds up briefly on scroll; small mono callouts "SUN Z=12", "RING Z=36", "i = 1 + Zr/Zs = 4.0". Bottom of hero: **title block strip** (like a drawing's title block) with cells: NAME / SCHOOL: Univ. of South Florida / DEGREE: B.S. Mech. Eng. '27 / GPA: 3.84 / CERT: CSWA / LOCATION: Tampa, FL.
3. **01 — Selected Work** (`#work`) — case studies (see content). Big cards with real photos/renders (DWG label overlay), headline metric, tags; featured card first. Click → detail overlay with video, Problem / Approach / Results / Key specs / Role / Tools / captioned gallery (lightbox) / "View in CAD Lab" button.
4. **02 — Experience** (`#experience`) — timeline as a ruled table: dates (mono) | org + role | 2–3 bullets.
5. **03 — Skills** (`#skills`) — styled as a **Bill of Materials** table: ITEM NO. | CATEGORY | COMPONENTS. Plus a small "Certified SolidWorks Associate (CSWA)" badge.
6. **04 — About** (`#about`) — portrait in a drawing-sheet frame, short personal bio, **Awards & Leadership** list and an ISEF photo strip.
7. **05 — Gallery** (`#gallery`) — media library with filters; hidden while `src/data/gallery.ts` is empty (currently empty: case-study galleries cover the media).
8. **Contact / Footer** (`#contact`) — huge "Let's build robots together." + email, phone, LinkedIn, résumé, location. Footer line: "© 2026 Kien Nguyen · Built on an MIT template by Murathan Abdullaev".

Removed from template: ParticleBackground, PolySection (3D art), Sketchfab CAD section (keep the code but not in page unless a model is added).

## Content (source of truth: résumé)
Contact: nguyenletrungkien2006@gmail.com · +1 (813) 679-8339 · Tampa, FL · linkedin.com/in/kien-le-trung-nguyen/
Education: University of South Florida — B.S. Mechanical Engineering, expected May 2027, GPA 3.84 (08/2024–present).

One-liner: "Mechanical engineering student at USF designing actuators, mechanisms and legged robots — from first-principles torque math to the assembled prototype."

Bio: "I'm Kien, a mechanical engineering student at the University of South Florida. I've spent a summer assembling and debugging humanoid robots at VinMotion in Hanoi, I design airbrakes for USF's NASA Student Launch rocket, and back in high school I built a quadruped that could walk on landslide mud. I like the part of robotics where the math meets the metal: sizing a motor, packaging a gearbox, and making the thing actually fit together on the bench."

### Case studies
Order on the page (first card is featured). Full copy lives in `src/data/projects.ts`; media is real (see Media).
1. **Bio-Inspired Webbed Foot for a Quadruped** — HCMC Science Fair & ISEF 2023 · 2022–2023 · tags: Legged Robots, Bio-inspired, Sensors, Research
   Metric: `25×` lower foot pressure · `20°` incline with a 1 kg kit · `ISEF` 2023 Finalist, USAID 3rd place.
   Problem: Rescue robots on landslide terrain sink into mud with ~50% water content.
   Approach: Webbed foot with a much larger contact area (PP fish-scale sole, spring suspension); servos sized from first-principles torque calcs; FSR force sensing for terrain-aware foot placement; 8 gaits via inverse kinematics.
   Results: ~25× lower foot pressure (0.005 m² vs 0.0002 m²); submersion 35/21/20/10 mm to 10/6/5/3 mm; climbed a 20° incline with a 1 kg payload; walked on a soft mattress; ISEF 2023 Finalist, USAID Science for Development Award (3rd), 1st Prize at the HCMC fair.
   Specs: 12 × JX DC5821LV servos (21.8 kg·cm), 3 DOF per leg, leg segments 8.8 / 14.4 cm, Raspberry Pi 4B + PCA9685, 4 × FSR-402, fisheye camera, GPS, 2S 5400 mAh LiPo.
   Role: Researcher. Media: mud photos, 4 video clips, later-iteration arm / pan-tilt photos.
2. **Duo-Planetary Actuator Prototypes** — VinMotion, Hanoi · Summer 2025 · tags: Actuators, Humanoids, CAD, 3D Printing
   Metric: `2` full-scale actuator prototypes · `19` humanoid assemblies inspected (16 A1.6 + 3 A2.1).
   Tools: SolidWorks, Bambu Lab H2D & X1C printers, CNC exposure. Links to CAD Lab M-03. The VinMotion humanoid leg drawing is employer IP and is NOT published; the humanoid photo is a company photo (small, captioned).
3. **Rocket Airbrake Mechanism** — NASA Student Launch, USF · 2025–present (team since 09/2024) · tags: Mechanism Design, Aerostructures, SolidWorks
   Metric: `~200%` drag improvement · `42 N` per flap · `≤4 lb` system. Hero media: SolidWorks motion clip (lead-screw nut driving the lever-arm linkage). Links to CAD Lab M-04.
4. **Cycloidal Gearbox for NEMA 23** — Personal project · 2026–present · In progress
   Metric: `10 N·m` target hold torque · `±0.4 mm` printer tolerance · 20:1 / 30:1 variants. Backdrivable; v2 planned in aluminium 6061. Links to CAD Lab M-01 / M-02.
5. **Bolted Fin Frame** — NASA Student Launch, USF · 2025 · `~50%` faster fin replacement. Media: fin engineering drawings (carbon fiber, fiberglass G12).
6. **Mars Rover (Rocker-Bogie)** — SolidWorks course → personal project · 2024–present · In progress
   Course final (Spring 2024) scored 100/100 (≥10 custom parts, mates, drawings, McMaster-Carr parts; assembly crash solved with sub-assemblies / lightweight mode); evolving into a 3D-printed modular 600 × 400 mm rover (terrain-based tire pattern, rocker-bogie shear/bending simulation, wheel torque calcs).
7. **5-DOF Robot Arm + URDF** — Personal project · 2026
   SolidWorks model exported to URDF (7 joints: 5 revolute + 2 prismatic gripper fingers); earlier Arduino prototypes from 2022 (2-link inverse kinematics, joystick servo control). Links to CAD Lab M-05 (joints animate within URDF limits).

### Experience
Ordered by date, latest first:
- 09/2024 – present · **NASA Student Launch (USF)**, Tampa — Aerostructures & Airbrake Mechanical Design Junior Engineer
- 06/2025 – 08/2025 · **VinMotion**, Hanoi, Vietnam — Mechanical Engineering Intern (Mechanical Design, CAD, Prototyping & Assembly)
- Summer 2025 · **C&D Semiconductor**, San Jose, CA — CAD Design Intern (SolidWorks test parts for photoresist & spin-on-dielectric process equipment; process cabinet and spin-coat bowl modules; two small renders shown in the row)
- 09/2022 – 05/2023 · **HCMC Science Fair & ISEF** — Researcher (quadruped robotics)
- Le Hong Phong Science Club — Head of Technical Faculty (led robotics competition teams: automation & vehicle design)


### Skills (BOM)
- CAD / Design: SolidWorks (CSWA), part design, surface modeling, mechanical assemblies, engineering drawings, actuator components, DFM for 3D printing, McMaster-Carr sourcing, GD&T basics
- Analysis / Simulation: Ansys, SolidWorks Simulation, topology optimization, first-principles stress/strain, torque sizing, tolerance analysis, stiffness estimation
- Robotics / Actuators: planetary gearboxes, cycloidal gearboxes, motors, bearings, sensors, inverse kinematics, basic motion control
- Programming / Test: MATLAB, Python, C/C++, Arduino, VS Code, data analysis, test scripting
- Manufacturing: 3D printing (Bambu Lab), soldering, hand & shop tools, prototype assembly, fit-checking

### Awards & Leadership (certificate wording; shown in About with an ISEF photo strip)
- ISEF 2023 Finalist — Regeneron International Science & Engineering Fair, Dallas (May 2023), project ROBO065T
- USAID Science for Development Award, 3rd Place — Working in Crisis & Conflict category, ISEF 2023 (NOT "Special Award")
- 1st Prize, Robotics & Intelligent Machines — Ho Chi Minh City Science & Engineering Fair 2022–23 (do not call this "ViSEF")
- 1st Place, 4-Wheel LEGO Category — 13th Nadav Shoham Robotraffic Competition (Technion), 2023
- Master Robot Builders, Finland — participant 2022 & 2023 (participation only, no placing)
- Certified SolidWorks Associate (CSWA) and SolidWorks Additive Manufacturing Associate — April 2025
- Head of Technical Faculty — Le Hong Phong Science Club

## Media
Real media lives in `public/images/<project>/` and `public/videos/` (web-ready WebP / H.264 MP4 with `-poster.webp`).
Project data (`src/data/projects.ts`) supports `thumbnail`, optional `video` (muted hover clip on the card, controls in the case study),
`moreVideos`, `gallery` (images with captions, click to enlarge; SVG schematics are kept as secondary "technical drawing" items) and
`cadModel` ("View in CAD Lab" button, deep link `#cad/m-03`). The standalone Gallery section stays hidden (`src/data/gallery.ts` is empty)
because case-study galleries already carry the media. Keep `alt` text meaningful.
Do not publish: the VinMotion humanoid leg assembly drawing (employer IP), third-party images.

## CAD Lab (`#cad`)
Five models (M-01 … M-05) in `src/data/models.ts`. Plain wheel scrolls the page; Ctrl/⌘ + wheel or pinch zooms. Each model has
`defaultExplode` / `explodeScale`. M-05 (`robot-arm.glb`, URDF-based, z-up, mm) keeps its node hierarchy and animates joints within their limits
(paused for reduced motion).
