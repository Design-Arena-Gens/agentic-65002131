import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#7C3AED",
          dark: "#5B21B6",
          light: "#C4B5FD"
        }
      },
      boxShadow: {
        focus: "0 0 0 4px rgba(124, 58, 237, 0.2)"
      }
    }
  },
  plugins: []
};

export default config;
