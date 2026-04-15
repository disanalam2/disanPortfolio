# Disan Alam Portfolio

A modern personal portfolio website built with React, Vite, and Sass. This project showcases projects, skills, contact information, and smooth page navigation using React Router.

## Features

- React + Vite frontend application
- Client-side routing with `react-router-dom`
- Styled with Sass
- Responsive layout for desktop and mobile
- Sections for About, Projects, Skills, and Contact

## Tech stack

- `react`
- `react-dom`
- `vite`
- `react-router-dom`
- `sass`
- `eslint`

## Project structure

- `src/App.jsx` – main app layout and route configuration
- `src/components/navbar.jsx` – navigation bar
- `src/components/about.jsx` – about section
- `src/components/Project.jsx` – project showcase page
- `src/components/skills.jsx` – skills page
- `src/components/contact.jsx` – contact page
- `src/styles/` – Sass styling files

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deploy to Firebase Hosting

1. Install Firebase CLI globally:

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3. Initialize Hosting in the project root:

```bash
firebase init hosting
```

- Select your Firebase project
- Set the public directory to `dist`
- Configure as a single-page app: `Yes`
- Do not overwrite `index.html` if prompted

4. Build and deploy:

```bash
npm run build
firebase deploy
```

## NPM scripts

- `npm run dev` — start development server
- `npm run build` — create production build in `dist`
- `npm run preview` — locally preview production build
- `npm run lint` — run ESLint on the project

## Notes

- Customize the portfolio content in `src/components/` and `src/styles/`.
- Update your projects, skills, and contact details directly in the React components.
