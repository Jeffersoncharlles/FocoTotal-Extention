import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { promises as fs } from "fs";

const movePopupPlugin = {
  name: "move-popup",
  async writeBundle() {
    // Move popup.html from dist/src to dist after build
    const srcPath = resolve(__dirname, "dist/src/popup.html");
    const destPath = resolve(__dirname, "dist/popup.html");
    try {
      await fs.copyFile(srcPath, destPath);
      // Remove the src folder if it's empty
      await fs.rm(resolve(__dirname, "dist/src"), {
        recursive: true,
        force: true,
      });
    } catch (error) {
      console.log(
        "Note: popup.html already in place or src folder already removed",
      );
    }
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), movePopupPlugin],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        content: resolve(__dirname, "src/content.tsx"),
      },
      output: {
        entryFileNames: "[name].js",
        format: "iife",
        inlineDynamicImports: true,
      },
    },
  },
});
