import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["vite.svg"],
      injectRegister: "auto",
      manifest: {
        name: "朝活アプリ - Make Tomorrow Morning",
        short_name: "朝活アプリ",
        description: "毎朝の習慣を作るための朝活管理アプリ",
        theme_color: "#4F46E5",
        background_color: "#FFFFFF",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "nesugosu_man.png",
            sizes: "192x192",
            type: "image/svg+xml",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
