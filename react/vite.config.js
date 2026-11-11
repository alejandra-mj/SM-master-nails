import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Genera un solo archivo (../js/spa-react.js) que spa.html carga con <script>.
export default defineConfig({
  plugins: [react()],
  define: { "process.env.NODE_ENV": '"production"' },
  build: {
    outDir: "../js",
    emptyOutDir: false,
    lib: { entry: "src/main.jsx", name: "SMReact", formats: ["iife"], fileName: () => "spa-react.js" },
  },
});
