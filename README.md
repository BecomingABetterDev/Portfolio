````markdown
# Eyob Desalegn — Full-Stack Portfolio Ecosystem

A professional, fully decoupled full-stack portfolio ecosystem featuring a high-performance, client-side Single Page Application (SPA) paired with a robust Node.js REST API backend. Engineered with a secure administrative dashboard interface triggered by global hardware keyboard macros for managing live project records and incoming message queues seamlessly without external routers.

---

## 🚀 Tech Stack Architecture

| Layer            | Technology              | Operational Intent                                                                                   |
| :--------------- | :---------------------- | :--------------------------------------------------------------------------------------------------- |
| **Frontend**     | React 18 & Vite         | Component-driven user interfaces with sub-millisecond Hot Module Replacement (HMR).                  |
| **Styling**      | Tailwind CSS v2         | Utility-first design engine centered around strict typographic hierarchy tokens and custom palettes. |
| **Backend**      | Node.js & Express v4    | Event-driven, asynchronous monolithic REST API services layer.                                       |
| **Database**     | MongoDB & Mongoose v5   | NoSQL document storage utilizing strict model schema structures and type validation rules.           |
| **State & Auth** | React Context API + JWT | Stateless, secure admin sessions synchronized via persistent Axios HTTP authorization headers.       |

---

## 🧠 System Architecture & Application Flow

The system coordinates application view states and asynchronous background pipeline requests through a completely centralized, event-monitored data model loop:

```plaintext
[ Client Browser ] ────( Global Keyboard Macro )────> Updates View State (App.jsx)
        │
   (Axios HTTP)
        │
        ▼
[ Express API Server ] ───( Middleware Guard )───> [ Controllers ] ───> [ MongoDB Database ]
```
````

### ⚙️ Core Engineering Design Decisions

- **State-Driven Navigation:** To eliminate the overhead of traditional file-based client routers, page layout state switches (Home, Projects, Contact, Admin Console) are executed instantly by native React state hooks within `App.jsx`.
- **Invisible Administrative Gateway:** The administrative console link is completely omitted from the public navigation tree. The master terminal management window can only be invoked from anywhere within the application viewport by inputting these specific combinations:
- **Windows / Linux:** `Ctrl + Shift + A`
- **macOS:** `Cmd + Shift + A`

---

## 🗂️ System Blueprint & Project Directory

```plaintext
eyob-portfolio/
├── backend/                           # ── REST API ENGINE (EXPRESS) ──
│   ├── config/
│   │   └── db.js                      # MongoDB infrastructure adapter and client connection rules
│   ├── controllers/
│   │   ├── authController.js          # Handles credential verification & stateless JWT creation
│   │   ├── messageController.js       # Manages incoming correspondence logs & query operations
│   │   └── projectController.js       # Outlines full CRUD endpoint orchestration for portfolio entries
│   ├── middleware/
│   │   └── authMiddleware.js          # Intercepts requests to enforce and validate JWT tokens
│   ├── models/
│   │   ├── Admin.js                   # Mongoose schema blueprint for identity entities
│   │   ├── Message.js                 # Database schema definition for inbound communication tracking
│   │   └── Project.js                 # Structural design validation rules for portfolio project records
│   ├── routes/
│   │   ├── authRoutes.js              # Routing definitions for authentication paths
│   │   ├── messageRoutes.js           # Secure message handling routes mapping
│   │   └── projectRoutes.js           # Public and protected portfolio item routes mapping
│   ├── .env                           # Local system execution parameters and secret variables
│   ├── package.json                   # Backend service lifecycles & dependency configurations
│   ├── seedAdmin.js                   # Provisioning terminal script to setup master admin access
│   └── server.js                      # Express application composition & server instance initialization root
│
└── frontend/                          # ── CLIENT APPLICATION SYSTEM (VITE) ──
    ├── index.html                     # Main application entry point deployment index shell
    ├── package.json                   # Client runtime modules and dependency mapping
    ├── postcss.config.cjs             # CSS compiler pipeline preprocessor instructions
    ├── tailwind.config.cjs            # Project-specific theme palettes & typeface tokens
    ├── vite.config.js                 # Asset bundler compilation settings and proxy boundaries
    └── src/
        ├── App.jsx                    # Root view orchestrator & global hotkey event manager
        ├── index.css                  # Core global stylesheet and Tailwind frame directives
        ├── main.jsx                   # Standard concurrent React DOM application mounting mount
        ├── api/
        │   └── axiosInstance.js       # Configured HTTP engine with automated JWT interceptor injection
        ├── components/
        │   ├── admin/                 # MessageList records display layouts & ProjectForm controls
        │   ├── layout/                # Global persistent components (Sticky Navbars & Footers)
        │   └── ui/                    # Reusable atomic badges and structural headers
        ├── context/
        │   └── AuthContext.jsx        # Keeps track of active access tokens within browser memory
        ├── data/
        │   └── staticData.js          # Hardcoded fallback metrics & local development system profiles
        ├── hooks/
        │   └── useProjects.js         # Custom fetch hooks for real-time project cache mutations
        ├── utils/
        │   └── helpers.js             # Shared data formatting and visual helper utilities
        └── views/                     # Component Layouts (Conditional SPA View Containers)
            ├── AdminView.jsx          # Protected layout management console and dashboard
            ├── ContactView.jsx        # Communications module with integrated API drop failover rules
            ├── HomeView.jsx           # Canvas spotlight, productivity metrics, and skill matrices
            └── ProjectsView.jsx       # Grid layout displaying complete, high-density project work

```

---

## 🔌 API Route Architecture

All communication interfaces map through the designated server Uniform Resource Path root (`http://localhost:5000`).

### 🔐 Authentication Context

| Method   | Endpoint          | Authorization | Operational Intent                                                |
| -------- | ----------------- | ------------- | ----------------------------------------------------------------- |
| **POST** | `/api/auth/login` | Public        | Validates user parameters and returns a signed cryptographic JWT. |

### 📁 Project Storage Repositories

| Method     | Endpoint            | Authorization      | Operational Intent                                                    |
| ---------- | ------------------- | ------------------ | --------------------------------------------------------------------- |
| **GET**    | `/api/projects`     | Public             | Pulls all persistent project items from the data stream.              |
| **POST**   | `/api/projects`     | Required (**JWT**) | Writes a new engineering record entry to the master cluster database. |
| **PUT**    | `/api/projects/:id` | Required (**JWT**) | Updates dynamic property entries on designated target records.        |
| **DELETE** | `/api/projects/:id` | Required (**JWT**) | Wipes the target entry record out of the server storage instance.     |

### 📨 Client Communications Queue

| Method     | Endpoint                 | Authorization      | Operational Intent                                                               |
| ---------- | ------------------------ | ------------------ | -------------------------------------------------------------------------------- |
| **POST**   | `/api/messages`          | Public             | Submits a validated contact form submission payload container.                   |
| **GET**    | `/api/messages`          | Required (**JWT**) | Retrieves stored feedback entries for administrator tracking and metrics review. |
| **PATCH**  | `/api/messages/:id/read` | Required (**JWT**) | Toggles read states on target records.                                           |
| **DELETE** | `/api/messages/:id`      | Required (**JWT**) | Drops an item record from the active messaging queue.                            |

---

## ⚙️ Local Installation & Configuration Setup

### 1. Initialize Backend Engine

Step into the core server container folder, generate your local environment configuration file, install project dependencies, and provision the administrator access model:

```bash
cd backend
npm install

```

Create a `.env` infrastructure parameter file within the `backend/` root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_hexadecimal_jwt_secret

```

Provision the structural administrator entry record into MongoDB and start up your active development process environment, and adds the projects to the database for the admin to edit them:

```bash
cd backend
npm run seed
npm run dev

```

The application initializes listener threads on `http://localhost:5000`.

### 2. Initialize Client Interface

Open an isolated concurrent command terminal, switch paths to the frontend project wrapper folder, pull modules, and execute the dev engine pipeline:

```bash
cd frontend
pnpm install
pnpm dev

```

The development environment initializes and serves the interface at `http://localhost:5173`.

---

## 🎨 Design Tokens & UI Architecture

### 🎛️ Framework Palette Tokens

The platform renders a clean, digital terminal dark mode layout aesthetic powered by standard framework color primitives:

- **Deep Base Canvas Background:** `#111827` (`bg-gray-900`)
- **Surface Wrapper Components:** `#1f2937` (`bg-gray-800`)
- **Primary System Accent Highlight:** `#06b6d4` (`text-cyan-500` / `border-cyan-500`) — Applied to interactive nodes, anchor focus lines, and active parameters.

### 🔤 Typography Hierarchy

- **Display Elements & Section Headings:** `Space Grotesk` — Selected for landing view presentation elements, section banners, and metrics tracking.
- **Reading Body Typography:** `Inter` — High-legibility configuration for detailed text layouts, case summaries, and paragraphs.
- **System Parametric Elements:** `JetBrains Mono` — Applied to inline code snippets, data model fields, directories, and structural tags.

---

## 🚀 Cloud Platform Deployment

### Deploying via Vercel Architecture

To host the ecosystem smoothly across an asynchronous edge container workflow, trigger compilation via the terminal CLI interface or establish active repository hook rules:

```bash
# Executing deployment using standard Vercel command line hooks
vercel deploy

# Alternatively, hook the branch to continuous integration (CI) for automated live building

```

> ⚠️ **Critical Infrastructure Note:** Ensure that `ADMIN_EMAIL` and `ADMIN_PASSWORD` variable keys are completely configured within the remote Vercel Project Environment dashboard before shifting production statuses to active.

---

## 🧠 System Fail-Safe & Resilience Framework

### 📉 Static Hydration Fallback

The initial render cycle pulls hardcoded structural layout variables directly from `frontend/src/data/staticData.js`. If remote connection requests drop or server maintenance runs stall, the user interface gracefully populates valid, comprehensive technical dataset values automatically without breaking layout view blocks.

### 🌐 Outage Mail Coordinate Redirection

The contact page elements contain native connectivity checking interceptors. If a recruiter drops packets or queries fail to communicate with the Express API runtime endpoints, the layout container swaps elements to display the direct system routing address (`eyobdesalegn.dev@gmail.com`) instantly to ensure no communication touchpoints are lost during global server exceptions.

```

```
