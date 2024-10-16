import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets" | "plugins" | "theme"> = {
  content: ["./src/**/*.tsx"],
  presets: [sharedConfig],
  plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      screens: {
        xs: "320px",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        "background-dark": "#191919",
        "font-dark": "#f2f2f2",
        black: "#111111",
        "grey-100": "#d2d2d2",
        "grey-200": "#bbbbbb",
        "grey-300": "#a4a4a4",
        "grey-400": "#8e8e8e",
        "grey-500": "#777777",
        "grey-600": "#636363",
        "grey-700": "#4f4f4f",
        "grey-800": "#3c3c3c",
        "grey-900": "#282828",
        "green-100": "#b5ecc9",
        "green-200": "#91e2af",
        "green-300": "#6cd894",
        "green-400": "#47cf79",
        "green-500": "#22c55e",
        "green-600": "#1ca44e",
        "green-700": "#17833f",
        "green-800": "#11632f",
        "green-900": "#0b421f",
        "system-red": "#ff3b30",
        "system-blue": "#007aff",
        "system-yellow": "#ffcc00",
      },
      fontSize: {
        title1: "1.25rem",
        title2: "1.125rem",
        headline: "1rem",
        body: "0.875rem",
        caption: "0.75rem",
      },
      lineHeight: {
        "140": "1.4",
      },
    },
  },
};

export default config;
