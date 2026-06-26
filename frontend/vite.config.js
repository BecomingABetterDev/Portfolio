import react from "@vitejs/plugin-react";

// We removed the defineConfig import and wrapper to bypass the Node 13 ESM bug
export default {
    plugins: [react()],
    server: {
        port: 3000,
        proxy: {
            "/api": "http://localhost:5000",
        },
    },
};