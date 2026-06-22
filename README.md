# Afiq — Data Engineering Portfolio

E-portfolio for **SECP3843 (Special Topic in Data Engineering)** showcasing
coursework, projects, certifications, and industry engagement across the
Data Engineering programme at Universiti Teknologi Malaysia.

**Live site:** https://YOUR_USERNAME.github.io/

## Stack

- **Vite + React 18** — fast dev server, modern build pipeline
- **Tailwind CSS** — utility-first styling, design tokens in `tailwind.config.js`
- **Framer Motion** — scroll reveals, expanding cards, animated counters
- **Lucide React** — icon set

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# → http://localhost:5173

# 3. Production build
npm run build

# 4. Preview the production build locally
npm run preview
```

## Project structure

```
src/
├── App.jsx                    # Composition root
├── main.jsx                   # React entry
├── index.css                  # Tailwind + base styles
├── components/
│   ├── Nav.jsx                # Sticky nav with active-section highlight
│   ├── Hero.jsx               # Headline + animated stat counters
│   ├── About.jsx              # Intro + facts + skills matrix
│   ├── Projects.jsx           # Filterable grid + expandable reflection cards
│   ├── Certifications.jsx     # Cert cards + achievements
│   ├── IndustryEngagement.jsx # Talks + visits, each with reflection
│   ├── Contact.jsx            # Email / GitHub / LinkedIn
│   ├── Footer.jsx
│   └── PipelineThread.jsx     # Signature visual: scroll-bound medallion thread
└── data/
    ├── projects.js            # ← edit this to update projects
    ├── certifications.js      # ← edit this to update certifications
    └── industry.js            # ← edit this to update industry talks/visits
```

All content lives in the three files under `src/data/`. The components read
from them, so you never edit components directly to update content.

## Filling in your content

### 1. Personal placeholders

Search and replace across the project:

| Placeholder | Where it lives | Replace with |
|---|---|---|
| `YOUR_USERNAME` | many files | Your GitHub username |
| `YOUR_EMAIL@example.com` | `Hero.jsx`, `Contact.jsx`, `data/*` | Your real email |
| `YOUR_CREDENTIAL_ID` | `data/certifications.js` | Your real credential IDs |

Quick way to find them all:

```bash
grep -r "YOUR_" src/ | grep -v node_modules
```

### 2. Project reflections

Open `src/data/projects.js`. Each project has a `reflection` object with four
keys — fill them in your own words (the rubric is strict about plagiarism):

```js
reflection: {
  context:  'Why this project mattered and what problem it solved.',
  approach: 'What you built, key technical decisions, why this stack.',
  outcomes: 'What worked. What didn\'t. Real obstacles + how you got past them.',
  learning: 'What you would do differently + the course outcome this maps to.',
},
```

The card UI will automatically switch from placeholder italics to your real
reflection as soon as any of the four fields has content.

### 3. Industry engagement reflections

Same pattern in `src/data/industry.js` — `reflection` object with four keys:
`takeaway`, `surprise`, `application`, `questions`.

## Deploying to GitHub Pages

Two options. The workflow file at `.github/workflows/deploy.yml` is already
set up — you just need to enable Pages and push.

### Option A — User site (`username.github.io`)

The cleanest URL. Use this if the portfolio is your main online presence.

1. **Set `base: '/'`** in `vite.config.js` (this is already the default).
2. **Create the repo** on GitHub named exactly `YOUR_USERNAME.github.io`.
3. **Push:**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
   git push -u origin main
   ```
4. **Enable Pages:** Settings → Pages → Build and deployment → Source: **GitHub Actions**.
5. The workflow will build and deploy automatically. Site live at `https://YOUR_USERNAME.github.io/` in ~2 minutes.

### Option B — Project site (`username.github.io/portfolio`)

Use this if you want to keep your username repo for something else.

1. **Set `base: '/portfolio/'`** (or whatever you name the repo) in `vite.config.js`.
2. Push to a new repo, e.g. `portfolio`.
3. Settings → Pages → Source: **GitHub Actions**.
4. Site live at `https://YOUR_USERNAME.github.io/portfolio/`.

## Submission checklist

- [ ] All `YOUR_USERNAME` / `YOUR_EMAIL` placeholders replaced
- [ ] About section opening paragraphs written in your voice
- [ ] All 4 featured project reflections written
- [ ] Short reflections written for remaining coursework projects
- [ ] Certification verification URLs and credential IDs filled in
- [ ] iZeno talk reflection written
- [ ] Industry visit added (or placeholder removed)
- [ ] Repository public
- [ ] LinkedIn About / Featured sections aligned with portfolio
- [ ] Mobile responsive check (resize browser narrow)
- [ ] Verified site loads on the live GitHub Pages URL

## License

Content © Afiq. Code structure available for educational reference.
