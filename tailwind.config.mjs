/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors"
import catppuccin from "@catppuccin/tailwindcss"

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [catppuccin({
    prefix: 'ctp',
    defaultFlavour: 'mocha',
  })],
};
