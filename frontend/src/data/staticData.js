export const OWNER = {
    name: "Eyob Desalegn",
    role: "Web Developer · MERN Stack & Browser Engineering",
    academicStatus: "Grade 11 Complete · Expected Graduation: June 2027",
    location: "Addis Ababa, Ethiopia",
    email: "eyobdesalegn.dev@gmail.com",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    heroStatement: [
        "Production-grade systems built on constrained hardware — not tutorial clones.",
        "The work ranges from offline-first educational platforms that survive full network loss, to triage engines that run clinical algorithms without touching a server.",
        "Every project starts with a real constraint and ends with shipped software.",
    ],
};

export const CERTIFICATIONS = [{
        id: "cert-1",
        issuer: "Udacity",
        title: "Introduction to Web Development",
        verified: true,
    },
    {
        id: "cert-2",
        issuer: "Udacity",
        title: "Artificial Intelligence Fundamentals",
        verified: true,
    },
    {
        id: "cert-3",
        issuer: "Anthropic (Skilljar)",
        title: "AI Fluency: Framework & Foundations",
        verified: true,
    },
];

export const SKILLS = [{
        category: "Frontend",
        items: [
            "React 18",
            "Tailwind CSS",
            "Vite",
            "Vanilla JS (ES6+)",
            "HTML5/CSS3",
            "Service Workers",
            "IndexedDB",
        ],
    },
    {
        category: "Backend",
        items: [
            "Node.js",
            "Express.js",
            "MongoDB",
            "Mongoose ODM",
            "JWT Auth",
            "REST API Design",
        ],
    },
    {
        category: "Tools & Workflow",
        items: ["VS Code", "Git", "Postman", "Chrome DevTools", "Vite", "npm"],
    },
    {
        category: "Concepts",
        items: [
            "Offline-First Architecture",
            "Client-Side Algorithm Design",
            "Multi-User Auth Systems",
            "Browser Storage APIs",
        ],
    },
];

export const STATIC_PROJECTS = [{
        _id: "static-1",
        name: "EthioStudy",
        systemTag: "Offline-First Educational Web Application",
        status: "Active",
        shortDescription: "Solves digital learning disruption for students in low-connectivity environments. Tasks, notes, and Pomodoro sessions persist through full internet outages and auto-sync on reconnect.",
        fullDescription: "Solves severe digital learning disruption for students in low-connectivity environments. Students can create tasks, study notes, and Pomodoro sessions that continue working during full internet outages, syncing to the cloud the moment connectivity returns.",
        techStackTags: [
            "Node.js",
            "Express.js",
            "MongoDB",
            "Vanilla JS",
            "Service Workers",
            "IndexedDB",
            "LocalStorage",
            "JWT",
        ],
        architectureHighlights: [
            "Backend: Node.js, Express.js, MongoDB + Mongoose, JWT authentication",
            "Frontend: Pure Vanilla JS — modules exposed globally via window.AuthUtils, window.API, window.TaskManager, loaded via sequential <script> tags",
            "Service Worker for asset caching and offline serving",
            "IndexedDB as a local mutation buffer — queues all offline writes and auto-syncs on reconnect",
            "LocalStorage for Pomodoro session state — persists across hard refreshes using Unix timestamps",
        ],
        isFeatured: true,
        order: 1,
    },
    {
        _id: "static-2",
        name: "Ethical Emergency Resource Allocation Platform",
        systemTag: "Pure Client-Side Triage Engine (Hackathon Entry)",
        status: "Completed",
        shortDescription: "Crisis response triage tool that runs entirely in the browser. A custom sorting algorithm evaluates patient metrics and outputs a ranked priority list — zero server round-trips.",
        fullDescription: "Built for crisis response workflows where servers are overloaded or unreachable. Operators input available medical resource pools and patient data — a custom sorting algorithm runs entirely in the browser, producing a ranked priority triage list in real time with zero server round-trips.",
        techStackTags: ["Vanilla JS", "Client-Side Algorithms", "HTML5", "CSS3"],
        architectureHighlights: [
            "Zero backend dependency — entirely client-side",
            "Custom in-browser sorting algorithm evaluates patient metrics and outputs clinical priority ranking",
            "High-contrast, distraction-free UI designed to reduce operator cognitive fatigue under pressure",
        ],
        isFeatured: true,
        order: 2,
    },
    {
        _id: "static-3",
        name: "Full-Stack Expense & Profit Tracker",
        systemTag: "Financial Analytics Dashboard",
        status: "Completed",
        shortDescription: "Multi-user financial tracking with JWT-isolated ledgers, real-time P&L analysis, and dynamic conditional table styling based on profit/loss state.",
        fullDescription: "Multi-user financial tracking platform with secure JWT-based authentication, ledger monitoring, and real-time profit/loss analysis. Each user's financial records are fully isolated via Express middleware auth layers.",
        techStackTags: [
            "Node.js",
            "Express.js",
            "MongoDB",
            "JWT Auth",
            "React",
            "Recharts",
        ],
        architectureHighlights: [
            "Stateless JWT auth across Express middleware and client storage headers",
            "Frontend data aggregation pipelines process raw JSON transaction arrays into profit, loss, and margin summaries",
            "Fully responsive, fluid table layouts with dynamic conditional styling based on profit/loss state",
        ],
        isFeatured: true,
        order: 3,
    },
];

export const PLAYGROUND_PROJECTS = [{
        id: "play-1",
        name: "Movie Metadata Search",
        tested: "Async REST API fetching, loading-state transitions",
        status: "Complete",
        githubLink: "https://github.com/eyobdesalegn/movie-metadata-search", // Replace with your real URL if different
    },
    {
        id: "play-2",
        name: "Hierarchical Note Engine",
        tested: "Client-side markdown parsing, LocalStorage",
        status: "Complete",
        githubLink: "https://github.com/eyobdesalegn/hierarchical-note-engine", // Replace with your real URL if different
    },
    {
        id: "play-3",
        name: "Tic-Tac-Toe Game Tracker",
        tested: "2-player state machine, user name inputs, CSS transitions",
        status: "Complete",
        githubLink: "https://github.com/eyobdesalegn/tic-tac-toe-tracker", // Replace with your real URL if different
    },
];