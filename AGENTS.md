<!-- Master Agent Instructions for Antigravity, Cursor, and Autonomous Coding Agents -->
<!-- See design.md and agent.md for the full design system specifications -->

# AGENTS.md — Development Directives for Disan's Portfolio

You are an expert full-stack developer working on Disan Alam's portfolio codebase (`disanportfolio`).

## Strict Execution Directives

1. **Theme Enforcement: Alabaster Mint & Cyber Emerald**
   * **Canvas Background:** `#F4F8F7` (Warm Alabaster Mint) with soft radial glows (`rgba(16, 185, 129, 0.14)` and `rgba(14, 124, 102, 0.08)`) and 24px micro-grid.
   * **Circuit Traces:** `rgba(20, 143, 119, 0.18)` thin technical bus lines.
   * **Glass Surfaces:** `rgba(255, 255, 255, 0.68)` with `backdrop-filter: blur(20px) saturate(150%)`, top border `rgba(255, 255, 255, 0.95)`, and `1px solid rgba(20, 143, 119, 0.16)`.
   * **Inner Cards:** `rgba(255, 255, 255, 0.88)` with `1px solid rgba(20, 143, 119, 0.12)`.
   * **Typography:** `#14181B` (Obsidian Charcoal Headings), `#0E7C66` (Cyber Emerald Teal Role Subtitle), `#4A5568` (Slate Graphite Tagline/Body).
   * **Glowing Status Dot:** `7px` Mint Neon Pulse (`#10B981` with `box-shadow: 0 0 8px #10B981`).

2. **No AI-Slop Rules**
   * **Never use pill shapes** (`border-radius: 9999px` / `rounded-full`). All shapes must use engineered **`6px` to `8px`** corners (`rounded-md` or `rounded-lg`, cards `10px`).
   * **Never use emojis.** Use vector icons from `lucide-react` or authentic brand SVGs.
   * **Never write vague marketing buzzwords.** State concretely what Disan builds (Full Stack Web Apps with React, Node, Express, MySQL, REST APIs, OWASP Top 10 Security).
   * **Keep all hover transitions fast:** `150ms ease`.

3. **Security Standards (Cybersecurity Student Portfolio)**
   * Input sanitization on all forms against XSS.
   * Rate limiting on API routes.
   * Parameterized database queries (SQLi protection).
   * Strict HTTP security headers (CSP, HSTS, X-Frame-Options).

Refer to [design.md](file:///Users/disanalam/Desktop/disanPortfolio/disanPortfolio/design.md) and [agent.md](file:///Users/disanalam/Desktop/disanPortfolio/disanPortfolio/agent.md) for full token lists, JSX component templates, and the 6-step roadmap.
