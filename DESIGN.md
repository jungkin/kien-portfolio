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
3. **01 — Selected Work** (`#work`) — case studies (see content). Big cards with drawing-style placeholder art, headline metric, tags. Click → detail overlay with Problem / Approach / Results / Role / Tools / gallery.
4. **02 — Experience** (`#experience`) — timeline as a ruled table: dates (mono) | org + role | 2–3 bullets.
5. **03 — Skills** (`#skills`) — styled as a **Bill of Materials** table: ITEM NO. | CATEGORY | COMPONENTS. Plus a small "Certified SolidWorks Associate (CSWA)" badge.
6. **04 — About** (`#about`) — short personal bio + **Awards & Leadership** list.
7. **05 — Gallery** (`#gallery`) — media library with filters; hidden if empty.
8. **Contact / Footer** (`#contact`) — huge "Let's build robots together." + email, phone, LinkedIn, résumé, location. Footer line: "© 2026 Kien Nguyen · Built on an MIT template by Murathan Abdullaev".

Removed from template: ParticleBackground, PolySection (3D art), Sketchfab CAD section (keep the code but not in page unless a model is added).

## Content (source of truth: résumé)
Contact: nguyenletrungkien2006@gmail.com · +1 (813) 679-8339 · Tampa, FL · linkedin.com/in/kien-le-trung-nguyen/
Education: University of South Florida — B.S. Mechanical Engineering, expected May 2027, GPA 3.84 (08/2024–present).

One-liner: "Mechanical engineering student at USF designing actuators, mechanisms and legged robots — from first-principles torque math to the assembled prototype."

Bio: "I'm Kien, a mechanical engineering student at the University of South Florida. I've spent a summer assembling and debugging humanoid robots at VinMotion in Hanoi, I design airbrakes for USF's NASA Student Launch rocket, and back in high school I built a quadruped that could walk on landslide mud. I like the part of robotics where the math meets the metal: sizing a motor, packaging a gearbox, and making the thing actually fit together on the bench."

### Case studies
1. **Duo-Planetary Actuator Prototypes** — VinMotion, Hanoi · Summer 2025 · tags: Actuators, Humanoids, CAD, 3D Printing
   Metric: `2` full-scale actuator prototypes · `19` humanoid assemblies inspected.
   Problem: VinMotion wanted to explore self-manufactured actuators for its humanoid robots and catch design errors before a public exhibition.
   Approach: Worked with the mechanical and actuator teams on CAD review, part fit-checks and assembly of 3D-printed duo-planetary actuators; ran quality checks and assembly reviews on 16 A1.6 and 3 A2.1 humanoids; filed failure reports and fixed CAD issues.
   Results: 2 full-scale prototypes built for future actuator experiments; design errors flagged before the exhibition; wrote A1.6 / A2.1 assembly instructions that cut onboarding time for new interns.
   Role: Mechanical Engineering Intern. Tools: SolidWorks, Bambu Lab 3D printers, hand tools, assembly fixtures.
2. **Rocket Airbrake Mechanism** — NASA Student Launch, USF · 2024–present · tags: Mechanism Design, Aerostructures, SolidWorks
   Metric: `~200%` drag improvement · `42 N` per flap · `≤4 lb` system.
   Problem: The rocket needs active airbrakes to hit its target apogee: a compact, light mechanism that deploys flaps against subsonic airflow.
   Approach: Designed and iterated 3 SolidWorks prototypes, optimizing lever-arm travel, packaging and flap geometry; supported PID calibration and flight-readiness testing by measuring dimensions, mass properties and component angles.
   Results: ~200% drag improvement across iterations; mechanism targets 42 N drag per flap within a ≤4 lb budget.
   Role: Aerostructures & Airbrake Mechanical Design Junior Engineer. Tools: SolidWorks, shop tools, hand tools.
3. **Bolted Fin Frame** — NASA Student Launch, USF · 2025 · tags: Design for Maintenance, SolidWorks
   Metric: `~50%` faster fin replacement.
   Designed a bolted fin-can frame so damaged fins can be swapped on the full-scale rocket without re-bonding.
4. **Bio-Inspired Webbed Foot for a Quadruped** — ViSEF & ISEF 2023 · 2022–2023 · tags: Legged Robots, Bio-inspired, Sensors, Research
   Metric: `25×` lower foot pressure · `1st Prize` ViSEF · `USAID Special Award` ISEF.
   Problem: Rescue robots on landslide terrain sink into mud with ~50% water content.
   Approach: Designed a webbed foot with a much larger end-effector contact area; sized servos from first-principles torque calcs (leg geometry, stance, mass, joint angles); integrated FSR force sensors for terrain-aware foot placement; programmed 8 gaits (walk, turn, pitch, roll, yaw).
   Results: ~25× lower foot pressure; submersion cut from 35/21/20/10 mm to 10/6/5/3 mm across four legs; climbed a 20° incline carrying a 1 kg rescue payload.
   Role: Researcher. Tools: CAD, Arduino, C/C++, FSR sensors, servos.
   (Great for a small bar chart comparing rounded vs webbed submersion per leg.)
5. **Cycloidal Gearbox for NEMA 23** — Personal project · 2026 · tags: Actuators, Gearbox Design, In Progress
   Metric: `10 N·m` target output torque.
   Designing a 3D-printable cycloidal reducer for a NEMA 23 servo, targeting 10 N·m output — plus planetary gearbox prototypes. Show "In progress" badge.

### Experience
- 06/2025 – 08/2025 · **VinMotion**, Hanoi, Vietnam — Mechanical Engineering Intern (Mechanical Design, CAD, Prototyping & Assembly)
- 09/2024 – present · **NASA Student Launch (USF)**, Tampa — Aerostructures & Airbrake Mechanical Design Junior Engineer
- 09/2022 – 05/2023 · **ViSEF & ISEF**, Texas, USA — Researcher (quadruped robotics)
- Le Hong Phong Science Club — Head of Technical Faculty (led robotics competition teams: automation & vehicle design)

### Skills (BOM)
- CAD / Design: SolidWorks (CSWA), part design, surface modeling, mechanical assemblies, engineering drawings, actuator components, DFM for 3D printing, McMaster-Carr sourcing, GD&T basics
- Analysis / Simulation: Ansys, SolidWorks Simulation, topology optimization, first-principles stress/strain, torque sizing, tolerance analysis, stiffness estimation
- Robotics / Actuators: planetary gearboxes, cycloidal gearboxes, motors, bearings, sensors, inverse kinematics, basic motion control
- Programming / Test: MATLAB, Python, C/C++, Arduino, VS Code, data analysis, test scripting
- Manufacturing: 3D printing (Bambu Lab), soldering, hand & shop tools, prototype assembly, fit-checking

### Awards & Leadership
- USAID Special Award — ISEF 2023
- 1st Prize — ViSEF 2023
- 1st Prize — Technion Robotraffic 2023
- Head of Technical Faculty — Le Hong Phong Science Club

## Media
Real photos will arrive later. Until then each project uses an SVG **technical-drawing placeholder** in
`public/images/projects/<slug>.svg` (ink line art of the subject on transparent bg, with dimension lines and a tiny title block).
To swap in a photo later, change the path in `src/data/projects.ts`. Keep `alt` text meaningful.
