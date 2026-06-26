# Eyob Desalegn — Portfolio

Full-stack professional portfolio. Built with Next.js 16, React 19, and Tailwind CSS 4. Features a public-facing SPA (Home, Projects, Contact) and a hidden admin panel for managing projects and messages.

---

## Stack

| Layer     | Tech                                              |
|-----------|---------------------------------------------------|
| Framework | Next.js 16 (App Router, React 19)                 |
| Styling   | Tailwind CSS 4, Space Grotesk + Inter + JetBrains Mono |
| API       | Next.js Route Handlers (`app/api/`)               |
| Auth      | Bearer token (demo) — swap for Better Auth + Neon in production |
| Feedback  | react-hot-toast                                   |
| Analytics | Vercel Analytics (production only)                |

---

## Project Structure

```
eyob-portfolio/
├── app/
│   ├── api/
│   │   ├── auth/login/route.ts       POST — returns demo bearer token
│   │   ├── projects/route.ts         GET (public) / POST (admin)
│   │   ├── projects/[id]/route.ts    PUT / DELETE (admin)
│   │   ├── messages/route.ts         POST (public) / GET (admin)
│   │   ├── messages/[id]/route.ts    DELETE (admin)
│   │   └── messages/[id]/read/route.ts  PATCH (admin)
│   ├── globals.css                   Design tokens + base styles
│   ├── layout.tsx                    Fonts, metadata, Vercel Analytics
│   └── page.tsx                      Root — view state, keyboard shortcut
│
├── components/portfolio/
│   ├── Navbar.tsx                    Sticky nav with mobile hamburger
│   ├── Footer.tsx                    Identity, nav links, social icons
│   ├── HomeView.tsx                  Hero, certifications, skills, featured projects
│   ├── ProjectsView.tsx              Full project list + Playground section
│   ├── ContactView.tsx               Contact form + info panel
│   ├── AdminView.tsx                 Login screen + project/message management
│   ├── ProjectCard.tsx               Reusable card (compact / expanded)
│   └── SectionHeading.tsx            Consistent section label + title
│
├── lib/
│   └── portfolioData.ts              Static content: owner, certs, skills, projects
│
├── backend/                          Legacy Express API (reference only)
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   └── server.js
│
└── frontend/                         Legacy Vite/React SPA (reference only)
```

> **Note:** The `backend/` and `frontend/` directories are the original MERN prototype and are not used by the running application. The live app is entirely within `app/`, `components/`, and `lib/`.

---

## Running Locally

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

The app runs on `http://localhost:3000`.

---

## Environment Variables

Create a `.env.local` file in the project root:

```
# Admin credentials for the hidden panel
# Defaults shown — change these before deploying
ADMIN_EMAIL=admin@eyobdev.com
ADMIN_PASSWORD=portfolio2024
```

---

## Admin Access

The admin view is hidden from public navigation. Access it from anywhere in the app with:

```
Ctrl + Shift + A   (Windows / Linux)
Cmd  + Shift + A   (macOS)
```

This toggles the admin panel. A login screen is shown on first access — enter the credentials from your `.env.local`. The session token is stored in memory for the duration of the browser session.

Default credentials (development only):
- Email: `admin@eyobdev.com`
- Password: `portfolio2024`

---

## API Routes

### Auth
| Method | Endpoint        | Auth | Description              |
|--------|----------------|------|--------------------------|
| POST   | /api/auth/login | No   | Returns demo bearer token |

### Projects
| Method | Endpoint            | Auth | Description        |
|--------|---------------------|------|--------------------|
| GET    | /api/projects       | No   | All projects       |
| POST   | /api/projects       | Yes  | Create project     |
| PUT    | /api/projects/[id]  | Yes  | Update project     |
| DELETE | /api/projects/[id]  | Yes  | Delete project     |

### Messages
| Method | Endpoint                    | Auth | Description         |
|--------|-----------------------------|------|---------------------|
| POST   | /api/messages               | No   | Submit contact form |
| GET    | /api/messages               | Yes  | All messages        |
| PATCH  | /api/messages/[id]/read     | Yes  | Mark as read        |
| DELETE | /api/messages/[id]          | Yes  | Delete message      |

> **Storage note:** The current API uses in-memory state. Data resets on server restart. For persistence, connect a database (Neon + Drizzle recommended) and replace the in-memory arrays in the route handlers.

---

## Design System

- **Background:** `#111827` (gray-900)
- **Surface:** `#1f2937` (gray-800)
- **Accent:** `#06b6d4` (cyan-500) — CTAs, active states, highlights
- **Text hierarchy:** `#f9fafb` → `#d1d5db` → `#9ca3af` → `#6b7280`
- **Heading font:** Space Grotesk
- **Body font:** Inter
- **Code / labels:** JetBrains Mono

---

## Deployment

Deploy to Vercel:

```bash
# Via CLI
vercel deploy

# Or push to GitHub — Vercel auto-deploys on push
```

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in Vercel project environment variables before going live.

---

## Notes

- Portfolio content (owner info, certifications, skills, projects) lives in `lib/portfolioData.ts` — edit this file to update all displayed data.
- No React Router — navigation is handled by `useState` in `app/page.tsx`.
- The contact form shows a direct email fallback if the `/api/messages` POST fails.
- `@vercel/analytics` is only rendered in `NODE_ENV=production`.
