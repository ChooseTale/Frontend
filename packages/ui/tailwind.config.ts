import sharedConfig from "@repo/tailwind-config";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  presets: [sharedConfig],
};
