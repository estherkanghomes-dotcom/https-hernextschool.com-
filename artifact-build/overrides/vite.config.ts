import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "node:path";
export default defineConfig({
  base: "./",
  plugins: [tanstackRouter({ target: "react", autoCodeSplitting: false }), react(), tailwindcss()],
  resolve: { alias: { "@tanstack/react-start": path.resolve("src/stub-start.ts"), "@": path.resolve("src") } },
  build: { assetsInlineLimit: 0, chunkSizeWarningLimit: 5000 },
});
