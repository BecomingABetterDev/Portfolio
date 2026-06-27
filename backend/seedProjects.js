// backend/seedProjects.js
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const Project = require("./models/Project");

// Real project dataset mapped exactly from frontend/src/data/staticData.js
const portfolioProjects = [{
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
        imageUrl: "", // Forward-compatibility hook
        githubLink: "", // Forward-compatibility hook
    },
    {
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
        imageUrl: "", // Forward-compatibility hook
        githubLink: "", // Forward-compatibility hook
    },
    {
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
        imageUrl: "", // Forward-compatibility hook
        githubLink: "", // Forward-compatibility hook
    },
];

const seedProjects = async() => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error(
                "MONGO_URI is missing from your backend/.env configuration file."
            );
        }

        // Connect to your cluster
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(
            "⚡ MongoDB connection established for production data migration."
        );

        // Drop the old collection data to avoid duplications
        await Project.deleteMany({});
        console.log("🗑️  Existing project registry records cleared.");

        // Inject your real projects
        const createdProjects = await Project.insertMany(portfolioProjects);
        console.log(
            `✅ Success! ${createdProjects.length} real portfolio projects committed to MongoDB cluster.`
        );

        // Disconnect safely
        await mongoose.connection.close();
        console.log("🔌 Database connection closed cleanly.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding execution failed:", error);
        process.exit(1);
    }
};

seedProjects();