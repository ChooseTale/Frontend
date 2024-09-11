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
    },
  },
};

export default config;
