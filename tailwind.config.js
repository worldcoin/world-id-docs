/** @type {import('tailwindcss').Config} */

const mirrorHexColors = (colors) =>
  Object.fromEntries(
    colors.map((color, index) => {
      if (!/#[a-f0-9]{6}/.test(color)) {
        throw new Error(
          'All colors should be lowercase hexadecimal strings 7 characters long with "#" sign at the beginning'
        );
      }

      if (colors.indexOf(color) !== index) {
        throw new Error("Colors should be unique");
      }

      if (colors[index - 1] > color) {
        throw new Error("Colors should be sorted alphabetically");
      }

      return [color.substring(1), color];
    })
  );

module.exports = {
  content: ["./**/*.{ts,tsx,md,mdx}"],
  darkMode: "class",

  theme: {
    extend: {
      gridTemplateColumns: {
        "fr/auto": "1fr auto",
        "auto/fr": "auto 1fr",
        "auto/fr/auto": "auto 1fr auto",
        "auto/auto/fr": "auto auto 1fr",
      },
      gridTemplateRows: {
        "fr/auto": "1fr auto",
        "auto/fr": "auto 1fr",
        "auto/fr/auto": "auto 1fr auto",
        "auto/auto/fr": "auto auto 1fr",
      },

      colors: {
        ...mirrorHexColors([
          "#000000",
          "#003100",
          "#009400",
          "#193c47",
          "#1b1b1d",
          "#1c1e21",
          "#242526",
          "#2b2b2d",
          "#303846",
          "#444950",
          "#474748",
          "#4940e0",
          "#4cb3d4",
          "#4d3800",
          "#606770",
          "#7a8a95",
          "#8c8cf2",
          "#c6cdd2",
          "#d4d5d8",
          "#dadde1",
          "#e3e3e3",
          "#e6a700",
          "#e6f6e6",
          "#ed7253",
          "#eef9fd",
          "#f7f7f7",
          "#fdfdfe",
          "#fff8e6",
          "#ffffff",
        ]),
      },

      fontFamily: {
        sora: ["Sora", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },

      fontSize: {
        12: ["calc(12 * 1rem / 16)", { lineHeight: "1.2" }],
        14: ["calc(14 * 1rem / 16)", { lineHeight: "1.2" }],
        16: ["calc(16 * 1rem / 16)", { lineHeight: "1.2" }],
        18: ["calc(18 * 1rem / 16)", { lineHeight: "1.2" }],
        20: ["calc(20 * 1rem / 16)", { lineHeight: "1.2" }],
        24: ["calc(24 * 1rem / 16)", { lineHeight: "1.3" }],
        32: ["calc(24 * 1rem / 16)", { lineHeight: "1.3" }],
        48: ["calc(48 * 1rem / 16)", { lineHeight: "1.3" }],
      },

      transitionProperty: {
        "visibility/opacity": "visibility, opacity",
      },
    },
  },

  plugins: [],
};
