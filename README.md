# e-Portfolio

My personal portfolio site, a Data Engineering undergraduate at Universiti Teknologi Malaysia (UTM). It presents projects, certifications, and industry engagements behind a dark, glassmorphism-inspired interface.

**🔗 Live demo: [afiq-portfolio.vercel.app](https://afiq-portfolio.vercel.app/)**

> Built with React + Vite + Tailwind CSS, with a frosted-glass nav and cards over a clean dark theme.

## ✨ Features

- **Frosted-glass UI** — sticky nav and content cards use a `backdrop-filter` glass effect (`.glass` / `.glass-strong`).
- **Scroll-spy navigation** — the active section highlights automatically via `IntersectionObserver`.
- **Animated stats** — CGPA / project / certification counters animate into view.
- **Filterable projects** — quick filters (All / Featured / Delivered / In-progress / Draft) with smooth layout transitions.
- **Expandable reflections** — each project and industry engagement includes a collapsible reflection panel.
- **Signature "pipeline thread"** — a scroll-bound accent on the left edge that nods to medallion data architecture.
- **Accessible & responsive** — skip link, visible focus rings, `prefers-reduced-motion` support, and a mobile-first layout.

## 🛠 Tech Stack

| Area        | Tools                                              |
| ----------- | -------------------------------------------------- |
| Framework   | [React 18](https://react.dev)                      |
| Build tool  | [Vite 5](https://vitejs.dev)                       |
| Styling     | [Tailwind CSS 3](https://tailwindcss.com)          |
| Animation   | [Framer Motion](https://www.framer.com/motion/)    |
| Icons       | [Lucide React](https://lucide.dev)                 |
| Fonts       | Fraunces · Inter · JetBrains Mono (Google Fonts)   |

## 📁 Project Structure

```
.
├── index.html               # Entry HTML + Google Fonts
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx             # Page composition
│   ├── index.css           # Tailwind layers + base/component styles (incl. .glass)
│   ├── components/         # UI sections
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Certifications.jsx
│   │   ├── IndustryEngagement.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── PipelineThread.jsx
│   └── data/               # Content (edit these to update the site)
│       ├── projects.js
│       ├── certifications.js
│       └── industry.js
├── tailwind.config.js       # Custom theme (colors, fonts, animations)
├── postcss.config.js
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) 18+ and npm

### Install & run

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5173)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview the production build locally
npm run preview
```

## ✏️ Customizing Content

Most content lives in plain data files, so updating the site rarely requires touching components:

- **`src/data/projects.js`** — project cards (title, status, stack, metadata, links, reflection)
- **`src/data/certifications.js`** — certifications and achievements
- **`src/data/industry.js`** — industry talks & visits

Theme colors, fonts, and animations are defined in **`tailwind.config.js`**, and the glass utilities live in **`src/index.css`**.

## 📄 License

This project is open source. Feel free to use it as a reference — attribution appreciated.
