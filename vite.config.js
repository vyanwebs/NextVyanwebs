import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import Prerender from "vite-plugin-prerender";
import { PuppeteerRenderer } from "@prerenderer/renderer-puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesToPrerender = [
  "/",
  "/about",
  "/work",
  "/careers",
  "/contact",
  "/services",
  "/services/web-development",
  "/services/mobile-app-development",
  "/services/ui-ux-design",
  "/services/ecommerce-development",
  "/services/software-development",
  "/services/cloud-devops",
  "/services/ai-ml-data-engineering",
];

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5174,
  },
  plugins: [
    react(),
    tailwindcss(),
    Prerender({
      staticDir: path.join(__dirname, "dist"),
      routes: routesToPrerender,
      renderer: new PuppeteerRenderer({
        renderAfterTime: 3000,
        headless: true,
      }),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});