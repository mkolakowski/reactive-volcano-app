import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { VitePWA } from "vite-plugin-pwa";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    legacy({
      targets: ["iOS >= 10", "Safari >= 10"],
    }),
    solid(),
    VitePWA({
      // The new service worker activates in the background; the page is not
      // force-reloaded, so an active Bluetooth connection is never dropped.
      // The update is picked up the next time the app is opened.
      registerType: "autoUpdate",
      injectRegister: "script-defer",
      // Icons are already precached by the glob patterns below.
      includeManifestIcons: false,
      manifest: {
        id: "./",
        name: "Reactive Volcano App",
        short_name: "Volcano App",
        description:
          "Control your Storz & Bickel Volcano Hybrid, Venty, Veazy and Crafty via Web Bluetooth.",
        start_url: "./",
        scope: "./",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#ab0901",
        lang: "en",
        categories: ["utilities"],
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // Precache everything needed to launch fully offline, including fonts.
        // The .woff fallbacks are skipped: every supported browser uses .woff2.
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,ttf}"],
        navigateFallback: "index.html",
        cleanupOutdatedCaches: true,
      },
    }),
  ],
});
