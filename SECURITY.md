# Security Policy & Implementation Architecture

> **Project:** Disan Alam — Portfolio & Cybersecurity Showcase  
> **Standard:** OWASP Top 10 Compliance & Defense-in-Depth  
> **Student Profile:** Full Stack Developer & Cybersecurity Student

This document outlines the security controls, policies, and hardening measures implemented across Disan Alam's portfolio platform.

---

## 1. Threat Model & Security Posture

As a portfolio representing a Full Stack Developer & Cybersecurity student, this website serves as a living demonstration of secure development practices.

```
       [ Client Request ]
               │
               ▼
   [ HTTPS / TLS 1.3 Strict ]
               │
               ▼
     [ HTTP Security Headers ]
  (HSTS, CSP, X-Frame, Nosniff)
               │
               ▼
    [ Rate Limiting Layer ]
  (Max 5 hits/15m on forms)
               │
               ▼
   [ Input Sanitization Layer ]
    (XSS / DOMPurify / Type-check)
               │
               ▼
 [ Parameterized Query Engine ]
      (Zero SQL Injection)
```

---

## 2. Implemented Security Controls

### A. HTTP Security Headers (Server & Reverse Proxy)
All responses from `server.js` or production reverse proxies (Nginx / Cloudflare) must enforce:
* `Content-Security-Policy`: Restricts scripts, styles, and font origins to prevent inline script execution and cross-site injections.
* `Strict-Transport-Security`: `max-age=31536000; includeSubDomains; preload` (enforces HTTPS-only communication).
* `X-Frame-Options`: `DENY` (prevents clickjacking attacks).
* `X-Content-Type-Options`: `nosniff` (prevents MIME-type sniffing exploits).
* `Referrer-Policy`: `strict-origin-when-cross-origin`.
* `Permissions-Policy`: `camera=(), microphone=(), geolocation=()` (disables unauthorized browser sensor access).

### B. Contact Form & API Endpoint Protection
1. **Input Sanitization:**
   * All user-supplied fields (`name`, `email`, `subject`, `message`) are sanitized against Cross-Site Scripting (XSS).
   * Email strings validated using standard RFC 5322 regex.
2. **Rate Limiting:**
   * Global API limit: 100 requests per 15-minute window per IP.
   * Contact form submission: 5 requests per 15-minute window per IP to eliminate spam and DoS attempts.
3. **CORS (Cross-Origin Resource Sharing):**
   * Whitelist only: `https://disanalam.me` and authorized development origins (`http://localhost:5173`).
   * Disallow wildcard `*` with credentials.

### C. Database & Data Access Security (MySQL)
* **Prepared Statements:** 100% of SQL queries executed through parameterized queries to guarantee zero SQL Injection (SQLi) vulnerabilities.
* **Principle of Least Privilege:** Database application user (`disan_app`) has only `SELECT`, `INSERT`, and limited `UPDATE` permissions—`DROP`, `ALTER`, and `GRANT` privileges are revoked.
* **SSL/TLS Encryption in Transit:** Database connections require valid TLS certificates.

### D. Authentication & Administrative Access
* Passwords hashed using Argon2id or bcrypt (minimum 12 salt rounds).
* Session tokens generated with cryptographically secure pseudo-random number generators (CSPRNG, 256 bits).
* Cookies flagged with `HttpOnly; Secure; SameSite=Strict; Path=/`.

---

## 3. Vulnerability Reporting (Security.txt)

If you discover a security vulnerability or bug within this domain:
* **Contact:** `security@disanalam.me` or `disanalam@gmail.com`
* **PGP Key:** Available upon request
* **Policy:** Responsible disclosure appreciated; responses provided within 48 hours.
