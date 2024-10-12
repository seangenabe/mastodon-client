/** @type {import('tailwindcss').Config} */
import catppuccin from "@catppuccin/tailwindcss";
import { addDynamicIconSelectors } from "@iconify/tailwind";
import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [
    catppuccin({
      prefix: "ctp",
      defaultFlavour: "mocha",
    }),
    addDynamicIconSelectors(),
  ],
};
