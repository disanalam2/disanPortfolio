# Agent Instructions — Portfolio Development & Execution Guidelines

> **Project:** Disan Alam Portfolio Website (`disanportfolio`)  
> **Brand Identity:** Full Stack Developer & Cybersecurity Student  
> **Target Audience:** Technical Recruiters, Engineering Managers, Tech Leads, Security Engineers  
> **Confirmed Master Theme:** Alabaster Mint & Cyber Emerald (`#F4F8F7`, `#0E7C66`, `#14181B`)  
> **Core Directives:** 100% Anti-AI Slop. Strict fidelity to `design.md`. Zero arbitrary styles. Real engineering rigor and OWASP security standards.

---

## 1. Operating Instructions for AI Agents & Developers

Whenever you write, refactor, inspect, or propose code for this codebase:

1. **Never invent arbitrary colors.** Always use the CSS variables or Tailwind tokens defined in `src/styles/alabaster-graphite.scss`, `tailwind.theme.js`, or `design.md`.
2. **Never generate pill-shaped elements.** All buttons, inputs, tags, and cards must strictly use engineered `border-radius: 6px` to `8px` (`radius-card: 10px`). `rounded-full` or `border-radius: 9999px` is strictly banned.
3. **Never insert emojis into HTML or JSX.** Use vector icons from `lucide-react` or authentic brand SVGs. For status badges or lists, use a 6px–7px CSS glowing dot (`.status-dot`).
4. **Never write vague or buzzword-heavy copy.** Be direct, technical, and concrete. Em dashes (`—`), exclamation marks, and generic claims like *"Building the future of web experiences"* are forbidden. Disan is a **Full Stack Developer & Cybersecurity Student** who builds secure, scalable web applications with React, Node.js, Express.js, MySQL, REST APIs, and OWASP Top 10 defenses.
5. **Always maintain the Physical Glassmorphism Architecture:**
   * **Base Canvas:** Solid `#F4F8F7` (Warm Alabaster Mint) with soft radial gradients and a 24px micro-dot grid.
   * **Main Glass Panels:** `rgba(255, 255, 255, 0.68)` with `backdrop-filter: blur(20px) saturate(150%)`, top border `rgba(255, 255, 255, 0.95)`, and outline `rgba(20, 143, 119, 0.16)`.
   * **Inner Nested Cards:** `rgba(255, 255, 255, 0.88)` with `1px solid rgba(20, 143, 119, 0.12)` border.

---

## 2. Design Tokens Reference (Exact Values)

### A. Color Palette Matrix

| Token Name | Value | Purpose & Placement |
| :--- | :--- | :--- |
| `--bg-base` | `#F4F8F7` | Body canvas solid background |
| `--bg-glow-center` | `rgba(16, 185, 129, 0.14)` | Radial glow at 42% 50% |
| `--bg-glow-corner` | `rgba(14, 124, 102, 0.08)` | Radial glow at 85% 20% |
| `--circuit-stroke` | `rgba(20, 143, 119, 0.18)` | Background SVG circuit bus traces |
| `--glass-surface` | `rgba(255, 255, 255, 0.68)` | Main translucent cards, navbar, project cards |
| `--glass-inner` | `rgba(255, 255, 255, 0.88)` | Inner tech stack boxes (React, Node, Express, MySQL) |
| `--glass-border` | `rgba(20, 143, 119, 0.16)` | 1px border around translucent cards |
| `--glass-shine` | `rgba(255, 255, 255, 0.95)` | Specular top border on glass surfaces |
| `--text-primary` | `#14181B` | Obsidian Charcoal for headings, titles, name |
| `--text-teal` | `#0E7C66` | Cyber Emerald Teal for roles, labels, accents |
| `--text-muted` | `#4A5568` | Slate Graphite for tagline, descriptions, body |
| `--accent-mint` | `#10B981` | Mint Neon Pulse for glowing dots, active states, focus |

### B. Typography Stack

* **Main Headings (`h1`, `h2`, hero name):**  
  `font-family: 'Plus Jakarta Sans', sans-serif;`  
  `font-weight: 800;`  
  `text-transform: uppercase;`  
  `letter-spacing: 0.06em;`  
  `color: #14181B;`  
  `text-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);`

* **Role Subtitle & Technical Labels:**  
  `font-family: 'JetBrains Mono', monospace;`  
  `font-weight: 600;` to `700;`  
  `text-transform: uppercase;`  
  `letter-spacing: 0.12em;`  
  `color: #0E7C66;`  
  *Always pair with the 7px glowing mint dot (`.status-dot`).*

* **Tagline & Body Copy:**  
  `font-family: 'Inter', sans-serif;`  
  `font-style: italic;` (for tagline: *BUILDING SECURE, SCALABLE WEB APPLICATIONS*)  
  `font-style: normal;` (for body copy)  
  `font-weight: 400;` to `500;`  
  `letter-spacing: 0.08em;`  
  `color: #4A5568;`

---

## 3. Standard Component Templates (React + Tailwind / SCSS)

### 1. Main Glass Panel Container
```jsx
export const GlassPanel = ({ children, className = '' }) => (
  <div className={`
    bg-white/68 backdrop-blur-[20px] backdrop-saturate-150
    border border-[rgba(20,143,119,0.16)] border-t-[rgba(255,255,255,0.95)]
    rounded-[10px] p-6
    shadow-[0_20px_40px_-15px_rgba(14,124,102,0.10),0_4px_12px_rgba(0,0,0,0.03)]
    ${className}
  `}>
    {children}
  </div>
);
```

### 2. Inner Nested Tech Card (React, Node, Express, MySQL)
```jsx
export const TechItemCard = ({ icon: Icon, title, category }) => (
  <div className="
    bg-white/88 border border-[rgba(20,143,119,0.12)] rounded-[8px]
    p-4 flex flex-col items-center justify-center gap-2
    shadow-[0_6px_16px_rgba(0,0,0,0.04)]
    transition-all duration-150 ease-out cursor-default
    hover:-translate-y-0.5 hover:border-[#10B981] hover:shadow-[0_8px_20px_rgba(16,185,129,0.15)]
  ">
    {Icon && <Icon className="w-8 h-8 text-[#0E7C66]" />}
    <span className="font-mono text-xs font-bold text-[#14181B] tracking-wide uppercase">
      {title}
    </span>
    {category && (
      <span className="text-[10px] font-mono text-[#0E7C66] tracking-wider uppercase">
        {category}
      </span>
    )}
  </div>
);
```

### 3. Glowing Status Dot (Used before role subtitles)
```jsx
export const StatusDot = () => (
  <span className="
    inline-block w-[7px] h-[7px] rounded-full 
    bg-[#10B981] shadow-[0_0_8px_#10B981] flex-shrink-0
  " />
);
```

### 4. Primary & Secondary Buttons (Strict Anti-Pill)
```jsx
// Primary Action Button
export const PrimaryButton = ({ children, onClick, ...props }) => (
  <button 
    onClick={onClick}
    className="
      bg-[#14181B] text-white font-mono font-semibold text-xs tracking-wider uppercase
      py-2.5 px-4 rounded-[6px] border border-[#14181B]
      hover:bg-[#0E7C66] hover:border-[#0E7C66] hover:-translate-y-0.5
      active:translate-y-0 transition-all duration-150 ease-out
      inline-flex items-center gap-2 cursor-pointer shadow-sm
    "
    {...props}
  >
    {children}
  </button>
);

// Secondary Glass Button
export const SecondaryButton = ({ children, onClick, ...props }) => (
  <button 
    onClick={onClick}
    className="
      bg-white/88 text-[#14181B] font-mono font-semibold text-xs tracking-wider uppercase
      py-2.5 px-4 rounded-[6px] border border-[rgba(20,143,119,0.16)]
      hover:bg-white hover:border-[#10B981] hover:text-[#0E7C66] hover:-translate-y-0.5
      transition-all duration-150 ease-out
      inline-flex items-center gap-2 cursor-pointer
    "
    {...props}
  >
    {children}
  </button>
);
```

---

## 4. Full A-to-Z Execution Roadmap (6 Steps)

When developing or refactoring any part of the website, follow this sequential execution plan:

### Step 1: Canvas Background & Circuit Lines
* Set `background-color: #F4F8F7;` on `body`.
* Apply the dual radial gradient spotlights and 24px technical dot grid via CSS.
* Embed vector SVG circuit paths (`stroke: rgba(20, 143, 119, 0.18)`, `stroke-width: 1.5`, `stroke-linecap: round`).
* Render the 3D Isometric Security Shield with glowing padlock and mint halo reflection (`#10B981`).
* Verify typography: ensure text rendering has no raster blurring or character clipping.

### Step 2: Translucent Navbar & Hero Architecture
* **Top Navbar:** Frosted translucent container (`rgba(255, 255, 255, 0.65)`, `backdrop-filter: blur(16px)`).
  * Left: `DISAN ALAM` geometric monogram.
  * Right: Section navigation links (`Projects`, `Security`, `Stack`, `Contact`) + Rectangular `Resume` CTA (`rounded-[6px]`, NO pill).
* **Hero Left Column:**
  * Primary Name: `DISAN ALAM` (`Plus Jakarta Sans`, 800, uppercase, `#14181B`).
  * Role Subtitle: `<StatusDot /> FULL STACK DEVELOPER & CYBERSECURITY STUDENT` (`JetBrains Mono`, 700, `#0E7C66`).
  * Tagline: `BUILDING SECURE, SCALABLE WEB APPLICATIONS` (`Inter`, italic, `#4A5568`).
* **Hero Right Column:**
  * Main Glass Panel with header: `• PRIMARY TECH STACK •`.
  * 4 Inner Cards: React.js, Node.js, Express.js, MySQL (authentic brand SVGs).
  * Additional Skills Strip: `REST APIs ➔ Secure Coding ➔ OWASP Top 10 ➔ Git/GitHub ➔ Cloud (AWS/Firebase)`.
* **Social Links Strip:**
  * Frosted bar linking to `disanalam.me`, `linkedin.com/in/disanalam`, and `github.com/disanalam2`.

### Step 3: Projects & Cybersecurity Bento Grid
* Fixed mint-circuit background continues as the user scrolls.
* Projects rendered in a translucent Bento Grid layout:
  * High-resolution, real project screenshots (strictly zero AI-generated illustrations).
  * Concrete technical descriptions: architecture, database design, API design, security implementations.
  * Tech stack tags with 6px rounded corners.
  * Live demo link and GitHub repository link.
* **Strict Authenticity:** Zero fake metrics, zero placeholder client counters, zero fake testimonials.

### Step 4: Snappy Transitions & Motion Discipline
* Fast, lightweight micro-interactions only: `150ms ease`.
* Hover elevation: `transform: translateY(-2px);` with subtle border glow.
* Strictly NO cursor trail effects, parallax distortion, or scroll-hijacking libraries.

### Step 5: Production Security & Cybersecurity Student Standards
Because Disan is a Cybersecurity student specializing in secure web applications, the codebase itself must demonstrate exemplary security hygiene:
1. **Secrets & Repo Hygiene:**
   * Never commit API keys, database credentials, or auth secrets.
   * All dynamic variables must be loaded via `.env` and documented in `.env.example`.
2. **Contact Form & API Security:**
   * Sanitize all form inputs against XSS attacks using `DOMPurify` / `validator`.
   * Implement rate limiting on API endpoints (e.g. `express-rate-limit`: max 5 requests per 15 minutes per IP).
   * Restrict CORS origin strictly to `disanalam.me` and trusted local ports (`http://localhost:5173`).
3. **Authentication & Data Protection (If Admin / Blog present):**
   * Password hashing using Argon2id or bcrypt (minimum 12 salt rounds).
   * Parameterized queries / prepared statements for all MySQL interactions (prevention of SQL injection).
   * Strict Role-Based Access Control (RBAC) on administrative endpoints.
4. **Server Hardening:**
   * Set security headers via `helmet`:
     * `Content-Security-Policy` (CSP)
     * `Strict-Transport-Security` (HSTS: `max-age=31536000; includeSubDomains`)
     * `X-Frame-Options: DENY`
     * `X-Content-Type-Options: nosniff`
   * Run automated vulnerability checks (`npm audit`).

### Step 6: Production Launch & Verification Checklist
* Custom domain `disanalam.me` configured with forced HTTPS/TLS 1.3.
* Security Shield favicon installed in `public/favicon.ico` and `public/favicon.svg`.
* Remove all template tags, "Made with AI" watermarks, or placeholder lore.
* Ensure functional routes for `/privacy` and `/terms`.

---

## 5. Pre-Commit Quality & Anti-Slop Audit Checklist

Run this quick audit checklist before delivering any code or file update:

- [ ] **Background:** Is canvas `#F4F8F7` with radial glows (`rgba(16,185,129,0.14)` and `rgba(14,124,102,0.08)`) and a subtle 24px micro-grid?
- [ ] **Borders:** Does every glass surface have a 1px border (`rgba(20, 143, 119, 0.16)`) and specular top highlight?
- [ ] **Zero Pills:** Are all `border-radius` values strictly 4px, 6px, 8px, or 10px? (No `rounded-full` or `9999px`).
- [ ] **Zero Emojis:** Are all icons SVG or `lucide-react`?
- [ ] **Headings:** Are headings Obsidian Charcoal (`#14181B`) in `Plus Jakarta Sans`?
- [ ] **Roles & Accents:** Is the role subtitle Cyber Emerald (`#0E7C66`) with a 7px Mint Neon (`#10B981`) dot?
- [ ] **Transitions:** Are all transitions crisp at `150ms ease`?
- [ ] **Security:** Are secrets hidden, inputs sanitized, and security headers configured?
