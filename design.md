# Design System & Technical Specification — Alabaster Mint & Cyber Emerald

> **Project:** Disan Alam — Portfolio & Cybersecurity Showcase Website  
> **Brand Identity:** Full Stack Developer & Cybersecurity Student  
> **Aesthetic Philosophy:** Frosty Mint-White & Cyber Emerald-Teal (High-Trust, Architectural, Daylight Studio)  
> **Core Directive:** 100% Anti-AI Slop. Precision engineering, clean typography, physical glassmorphism, and rigorous cybersecurity standards.

---

## 1. Exact Color Configuration

Aapki image se match kiya hua combination: **Frosty Mint-White** aur **Cyber Emerald-Teal**. Yeh combination bina kisi purple gradient ke ultra-modern, authentic aur trustworthy lagta hai.

| Element | Color Name | Hex / RGBA Value | Kahan Use Karein |
| :--- | :--- | :--- | :--- |
| **Main Base Background** | Warm Alabaster Mint | `#F4F8F7` | Website body ka main solid canvas color |
| **Secondary BG Gradient** | Pure Frosted White | `#FFFFFF` se `#E8F3F1` | Background ke radial glow aur optical depth ke liye |
| **Circuit Lines & Nodes** | Cyber Teal Muted | `rgba(20, 143, 119, 0.18)` | Background ke tech circuit traces aur micro-bus lines |
| **Main Translucent Card** | Frosted White Glass | `rgba(255, 255, 255, 0.68)` | Tech stack, project cards, navigation bar aur contact container |
| **Inner Nested Card** | Crisp Ice Glass | `rgba(255, 255, 255, 0.88)` | React.js, Node.js, Express.js, MySQL wale inner boxes |
| **Glass Card Border** | Specular Mint Edge | `rgba(20, 143, 119, 0.16)` | Har translucent box ke charo taraf 1px solid border |
| **Glass Inner Highlight** | Pure White Shine | `rgba(255, 255, 255, 0.95)` | Card ke top border par kanch jaisi specular chamak |
| **Primary Heading Color** | Obsidian Charcoal | `#14181B` | "DISAN ALAM", section titles aur hero headings ke liye |
| **Subtitle / Accent Text** | Cyber Emerald Teal | `#0E7C66` | "FULL STACK DEVELOPER & CYBERSECURITY STUDENT" ke liye |
| **Muted / Tagline Text** | Slate Graphite | `#4A5568` | "BUILDING SECURE, SCALABLE WEB APPLICATIONS" aur body text |
| **Glowing Dot / Node** | Mint Neon Pulse | `#10B981` | Role headings aur status cards ke aage lage green dots (`•`) |

---

## 2. Font Family, Colors & Typography Hierarchy

Aapke banner me 3 distinct typography levels hain. Isko crisp dikhane ke liye Google Fonts se exact hierarchy:

### A. Main Name & Section Headings (Plus Jakarta Sans / Space Grotesk)
* **Target:** `DISAN ALAM` / Hero Headings / Section Titles
* **Font Family:** `'Plus Jakarta Sans', sans-serif` (Fallback: `'Space Grotesk'`)
* **Font Color:** `#14181B` (Obsidian Charcoal)
* **Font Decoration & Style:**
  * `font-weight: 800;` (Extra Bold)
  * `text-transform: uppercase;`
  * `letter-spacing: 0.06em;` (Geometric open tracking)
  * `text-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);` (Subtle optical depth)

### B. Role Subtitle & Card Headers (JetBrains Mono / Inter Semi-Bold)
* **Target:** `• FULL STACK DEVELOPER & CYBERSECURITY STUDENT` aur `• PRIMARY TECH STACK •`
* **Font Family:** `'JetBrains Mono', monospace` (Fallback: `'Inter'`)
* **Font Color:** `#0E7C66` (Cyber Emerald Teal) for Role, `#1E293B` for Card Headers
* **Font Decoration & Style:**
  * `font-weight: 700;`
  * `text-transform: uppercase;`
  * `letter-spacing: 0.12em;` (Wide technical tracking)
  * **Decoration Trick:** Text ke aage/peeche emoji bilkul na lagayein; uski jagah CSS se `6px` ka glowing mint circle (`#10B981` with `box-shadow: 0 0 8px #10B981`) lagayein.

### C. Tagline & Body Copy (Inter / DM Sans)
* **Target:** `BUILDING SECURE, SCALABLE WEB APPLICATIONS` / Body Descriptions
* **Font Family:** `'Inter', -apple-system, sans-serif`
* **Font Color:** `#4A5568` (Slate Graphite)
* **Font Decoration & Style:**
  * `font-style: italic;` (Tagline ke liye), `font-style: normal;` (Body copy ke liye)
  * `font-weight: 500;` to `600;`
  * `letter-spacing: 0.08em;`
  * **Strict Rule:** Copywriting me kahin bhi em dashes (`—`), emoji icons, ya vague hero text (*"Building the future of synergy"*) mat likhein.

---

## 3. Ready-to-Use CSS Tokens & Utility Architecture

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Plus+Jakarta+Sans:wght@700;800&family=JetBrains+Mono:wght@500;600;700&display=swap');

:root {
  /* Canvas & Ambience */
  --bg-base: #F4F8F7;
  --bg-glow: rgba(16, 185, 129, 0.10);
  
  /* Translucent Glass Layers */
  --glass-surface: rgba(255, 255, 255, 0.68);
  --glass-inner: rgba(255, 255, 255, 0.88);
  --glass-border: rgba(20, 143, 119, 0.16);
  --glass-shine: rgba(255, 255, 255, 0.95);
  
  /* Typography */
  --text-primary: #14181B;
  --text-teal: #0E7C66;
  --text-muted: #4A5568;
  --accent-mint: #10B981;

  /* Engineered Radius (Strictly Anti-Pill) */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-card: 10px;

  /* Fast Snappy Motion */
  --transition-fast: all 150ms ease;
}

body {
  background-color: var(--bg-base);
  /* Soft mint-teal ambient glow + subtle technical micro-grid */
  background-image: 
    radial-gradient(circle at 42% 50%, rgba(16, 185, 129, 0.14) 0%, transparent 45%),
    radial-gradient(circle at 85% 20%, rgba(14, 124, 102, 0.08) 0%, transparent 40%),
    radial-gradient(rgba(14, 124, 102, 0.07) 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 24px 24px;
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

/* Main Translucent Container (Tech Stack & Project Cards) */
.glass-panel {
  background: var(--glass-surface);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid var(--glass-border);
  border-top: 1px solid var(--glass-shine);
  border-radius: var(--radius-card); /* 10px sharp modern corners, NO pill */
  box-shadow: 
    0 20px 40px -15px rgba(14, 124, 102, 0.10),
    0 4px 12px rgba(0, 0, 0, 0.03);
  padding: 24px;
}

/* Inner Sub-Cards (React, Node, Express, MySQL) */
.tech-item-card {
  background: var(--glass-inner);
  border: 1px solid rgba(20, 143, 119, 0.12);
  border-radius: var(--radius-lg);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.04);
  transition: transform 150ms ease, border-color 150ms ease;
}

.tech-item-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent-mint);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
}

/* Typography Classes */
.hero-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: var(--text-primary);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
}

.role-subtitle {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-teal);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

/* Glowing Mint Dot (•) */
.status-dot {
  width: 7px;
  height: 7px;
  background-color: var(--accent-mint);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--accent-mint);
  display: inline-block;
  flex-shrink: 0;
}
```

---

## 4. Pura A-to-Z Roadmap: 6 Comprehensive Steps

### Step 1: Background & SVG Circuit Setup
1. `#F4F8F7` solid base canvas + 2 ambient radial gradients (center-left mint at 42%, top-right emerald at 85%).
2. SVG circuit bus traces with `stroke: rgba(20, 143, 119, 0.18)` and 45-degree angle routing.
3. Center 3D Isometric Security Shield with glowing padlock and mint halo reflection (`#10B981`).
4. Ensure typographic rendering for `SCALABLE` has zero glitch and crisp character kerning.

### Step 2: Translucent Navbar & Hero Section
1. **Top Translucent Navbar:**
   * `background: rgba(255, 255, 255, 0.65)` + `backdrop-filter: blur(16px)`
   * Left: "DISAN ALAM" Monogram/Logo
   * Right: Links (`Projects`, `Security`, `Stack`, `Contact`) + Rectangular Resume CTA (`border-radius: 6px`, NO pill).
2. **Hero Left Column:**
   * Heading: `DISAN ALAM`
   * Subtitle: `• FULL STACK DEVELOPER & CYBERSECURITY STUDENT` (glowing teal dot).
   * Tagline: `BUILDING SECURE, SCALABLE WEB APPLICATIONS` (italic, slate graphite).
3. **Hero Right Column (Translucent Stack Card):**
   * Header: `• PRIMARY TECH STACK •`
   * 4 Inner Cards: React.js, Node.js, Express.js, MySQL (official brand SVG vectors).
   * Sub-labels with vertical dividers: `React.js | Node.js | Express.js | MySQL`.
   * Additional Skills Flow: `REST APIs ➔ Secure Coding ➔ OWASP Top 10 ➔ Git/GitHub ➔ Cloud (AWS/Firebase)`.
4. **Social Strip:**
   * Slim frosted notch with SVG icons: `disanalam.me | linkedin.com/in/disanalam | github.com/disanalam2`.

### Step 3: Projects & Cybersecurity Bento Grid
1. Hero ke neeche user scroll karega toh mint-circuit canvas seamlessly continue hoga.
2. Translucent Bento Grid cards for projects:
   * Real project screenshots (Zero AI-slop photos).
   * Concrete technical architecture descriptions (e.g., JWT Auth, MySQL connection pooling, Rate limiting).
   * Tech stack chips (`6px` radius).
   * Verified GitHub / Live Demo links.
3. Absolutely NO fake metrics, fake customer counters, or fake testimonials.

### Step 4: Animations & Interaction Rules
1. Zero cursor trail animations or scroll-hijack momentum manipulation.
2. Fast, snappy hover states: `150ms ease` for border highlight, micro-elevation (`translateY(-2px)`), and glass shine.

### Step 5: Backend & Security Implementation (Cybersecurity Student Standard)
As a Full Stack Developer & Cybersecurity student, the portfolio itself must exemplify production security:
1. **Secrets & Repo Hygiene:**
   * Strict `.env` usage for all API endpoints and third-party keys.
   * Automated git pre-commit checks to prevent committed credentials.
2. **Contact Form & API Security:**
   * Strict input sanitization against XSS (DOMPurify / validator).
   * Endpoint rate limiting (e.g. `express-rate-limit`, 5 submissions per 15 mins).
   * CORS locked strictly to `disanalam.me` and trusted local development ports.
3. **Auth & Database (If CMS / Admin is present):**
   * Argon2 / bcrypt password hashing.
   * Role-based access control (RBAC).
   * SQL injection prevention via parameterized queries / ORM prepared statements.
4. **Server & Infrastructure Hardening:**
   * Production mode with debug flags turned off.
   * Strict HTTP Security Headers: Content Security Policy (`CSP`), `HSTS`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.
   * Automated dependency audit (`npm audit`).

### Step 6: Final Launch Checklist
1. Custom domain `disanalam.me` connected with forced HTTPS / SSL.
2. Custom Shield / Monogram Favicon installed.
3. Complete removal of any "Made with AI" or template watermark tags.
4. Working routes for `/privacy` (Privacy Policy) and `/terms` (Terms and Conditions).

---

## 5. Strict Anti-AI Slop Rules (Review Before Every Commit)

* ❌ **NO Pill Buttons (`border-radius: 9999px`):** Use only `4px` to `8px`.
* ❌ **NO Emojis in code or UI:** Use vector icons (`lucide-react` or SVG).
* ❌ **NO Buzzword fluff:** State concretely what you build.
* ❌ **NO Borderless translucent cards:** Every glass layer must have a 1px specular border.
