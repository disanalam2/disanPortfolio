<div align="center">
  <h1>👨‍💻 Disan Alam | Full-Stack Portfolio</h1>
  <p>A comprehensive, full-stack personal portfolio platform and CMS featuring an Enterprise-grade AI Email Automation Engine.</p>

  [![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://disan-alam-portfolio.web.app)
  [![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](#)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](#)
  [![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazon-aws&logoColor=white)](#)
  [![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](#)
</div>

## 📖 Overview

This repository holds the frontend source code for my comprehensive personal portfolio platform. It is architected to not only showcase my professional experience and projects but also to serve as a robust CMS (Content Management System). The application allows dynamic updates to skills, projects, and bio without touching the codebase via a secured JWT Admin panel.

*Note: This is the Frontend repository. The Backend repository (which includes the AI Email Automation system, Docker configs, and Express server) is hosted separately.*

## ✨ Key Features

- **Dynamic CMS:** Complete control over portfolio content via a secure, authenticated admin dashboard.
- **AI Email Automation Engine (Backend):** Uses Gemini AI to draft personalized cold emails, scrapes leads autonomously, tracks opens/clicks via 1x1 pixels, and reads replies via IMAP for sentiment analysis.
- **AWS & Docker Infrastructure (Backend):** Containerized orchestration of Node.js, Background Workers, and MySQL using Docker Compose, deployed securely on AWS EC2.
- **Blazing Fast Frontend:** Optimized React build hosted on Firebase for rapid global content delivery.

## 🛠 Tech Stack

### Frontend
- **Framework:** React 18
- **Styling:** CSS3 / Styled Components
- **Hosting:** Firebase Hosting

### Backend (System Architecture)
- **Runtime:** Node.js, Express.js
- **Database:** MySQL
- **AI & Automation:** Google Gemini AI, Nodemailer, IMAP, Background Worker Queues (SQLite)
- **Infrastructure:** Docker, Docker Compose, AWS EC2
- **Security:** JWT Authentication, Strict CORS, HTTPOnly Cookies

## 🚀 Getting Started (Frontend)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/disanalam2/disanPortfolio.git
   ```
2. Navigate to the project directory:
   ```bash
   cd disanPortfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## 🔗 Live Demo
Check out the live production build here: **[Live Demo](https://disan-alam-portfolio.web.app)**
