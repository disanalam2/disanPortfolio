# Disan Alam Portfolio - Frontend

A highly dynamic, extremely fast, and completely CMS-driven portfolio website built with React, Vite, Sass, and Framer Motion. This project highlights personal projects, technical skills, professional experience, certificates, and features an integrated Admin Dashboard for real-time content management.

## 🚀 Key Features

- **Integrated Admin CMS**: Login as Admin to add, edit, or delete Skills, Projects, Blogs, Certificates, Education, and Experience directly from the UI.
- **Real-Time Data (WebSockets)**: Integrated with Socket.IO. The moment you save changes in the admin panel or receive a new contact message, the website updates instantly for all users without requiring a page refresh.
- **Advanced SEO & AIO (AI Optimization)**: 
  - Dynamic, page-specific `<meta>` tags and Open Graph descriptions using `react-helmet-async`.
  - Blog post SEO perfectly syncs with the exact blog summary for maximum search visibility.
- **Blogging Engine with Scheduling**: Full markdown support (`react-markdown`) for writing tech blogs, including an automated scheduling system (drafting blogs to be published in the future).
- **Smooth Animations & Interactions**: Page transitions using `framer-motion` and 3D hover tilt effects using `react-parallax-tilt`.
- **Drag-and-Drop Sorting**: Visually reorder projects and skills using native HTML5 drag-and-drop right from the browser.
- **Progressive Web App (PWA)**: Fully installable with service workers for offline caching and high performance.

## 🛠 Tech Stack

- **Framework**: `React 18` + `Vite`
- **Routing**: `react-router-dom`
- **Styling**: `Sass` (SCSS) + CSS Modules
- **Animations**: `framer-motion`, `react-parallax-tilt`
- **SEO**: `react-helmet-async`
- **Real-Time**: `socket.io-client`
- **Markdown Processing**: `react-markdown`, `remark-gfm`
- **Analytics**: `react-ga4` (Google Analytics 4)

## 📂 Project Structure

- `src/App.jsx` — Main app layout, routing, and lazy loading configurations.
- `src/pages/` — Core pages of the application (`About`, `Projects`, `Skills`, `Blogs`, `Contact`, etc.).
- `src/components/common/SEO.jsx` — Dynamic SEO meta tag injection component.
- `src/components/admin/` — Admin specific components (Bottom Action Bar, Drag handles).
- `src/services/socket.js` — WebSocket connection singleton.
- `src/hooks/` — Custom hooks (`useFetch`, `useWrite`, `useDragAndDrop`) for handling APIs.
- `src/context/` — State management contexts (Auth, RefreshTriggers).

## 🏃‍♂️ Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 🔒 Environment Variables
Ensure you have an `.env` file at the root with the following variables:
- `VITE_API_URL` - Points to the backend server (e.g., `http://localhost:5001/api`)

*Designed and Developed by Disan Alam.*
