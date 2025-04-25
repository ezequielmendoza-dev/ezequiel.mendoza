/** @format */

import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
const SERVER_PORT = 4321;
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
const PRODUCTION_HOST_URL = "https://ezequielmendoza-dev.github.io/";
let SITE_URL = LOCALHOST_URL;
let BASE_URL = "";

const SCRIPT = process.env.npm_lifecycle_script || "";
const isBuild = SCRIPT.includes("astro build");
if (isBuild) {
  SITE_URL = PRODUCTION_HOST_URL;
  BASE_URL = "/";
}
// https://astro.build/config
export default defineConfig({
  output: "static", // Cambia "static" a "server" o "hybrid"

  site: SITE_URL,
  base: BASE_URL,
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    tailwind(),
    mdx(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
