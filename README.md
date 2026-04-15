# Disan Alam Portfolio

A polished portfolio website built with React, Vite, Sass, and Framer Motion. This project highlights personal projects, technical skills, contact options, and responsive animated page transitions.

## What’s included

- Modern React app with route-based navigation
- Animated page transitions using `framer-motion`
- Responsive layout for mobile and desktop
- Glassmorphism-inspired visual styling
- About, Projects, Skills, and Contact sections
- Contact form with WhatsApp and email quick-send buttons

## Tech stack

- `react`
- `react-dom`
- `vite`
- `react-router-dom`
- `framer-motion`
- `sass`
- `eslint`

## Project structure

- `src/App.jsx` — main app layout and routing configuration
- `src/components/navbar.jsx` — navigation and mobile menu
- `src/components/about.jsx` — hero/about section
- `src/components/Project.jsx` — project showcase cards
- `src/components/skills.jsx` — skill grid with hover animation
- `src/components/contact.jsx` — contact form and CTA
- `src/styles/` — custom Sass styles for each section
- `index.html` — app shell and page metadata

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the address shown in the terminal (usually `http://localhost:5173`).

## Build

Create a production build:

```bash
npm run build
```

Preview the built app locally:

```bash
npm run preview
```

## Deploy to Firebase Hosting

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Login:

```bash
firebase login
```

3. Initialize Firebase Hosting:

```bash
firebase init hosting
```

- Choose your Firebase project
- Set the public directory to `dist`
- Configure as a single-page app: `Yes`
- Do not overwrite `index.html` if prompted

4. Deploy:

```bash
npm run build
firebase deploy
```

## Available scripts

- `npm run dev` — start the Vite development server
- `npm run build` — build production files into `dist`
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint across the project

## Customization

- Edit content in `src/components/` to update text, projects, and contact details.
- Update styling in `src/styles/` to change the theme, spacing, and animation behavior.
- Replace `./DISAN ALAM.JPG` with your own profile image in `src/components/navbar.jsx` and `src/components/about.jsx`.

## Notes

- The app is built for fast loading and smooth interactions.
- If you add new routes, register them in `src/App.jsx` and update the navbar links.
