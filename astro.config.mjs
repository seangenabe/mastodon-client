import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs()],
  output: "static",
  experimental: {
    env: {
      schema: {
        MASTO_URL: envField.string({
          context: "client",
          access: "public",
          default: "https://mastodon.social",
        }),
        MASTO_ACCESS_TOKEN: envField.string({
          context: "client",
          access: "public",
          default: "",
        }),
      },
    },
  },
});
