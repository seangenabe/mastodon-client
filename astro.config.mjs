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
        MASTODON_CLIENT_NAME: envField.string({
          context: "client",
          access: "public",
          default: "Mastodon Client",
        }),
        MASTODON_CLIENT_WEBSITE: envField.string({
          context: "client",
          access: "public",
          default: "https://example.com/",
        }),
        NODE_ENV: envField.string({
          context: "client",
          access: "public",
          default: "development",
        }),
        MASTODON_CLIENT_REDIRECT_URI: envField.string({
          context: "client",
          access: "public",
          default: "", // defaults to MASTODON_CLIENT_WEBSITE if blank
        }),
      },
    },
  },
});
