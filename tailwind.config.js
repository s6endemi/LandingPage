/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import themes from "daisyui/src/theming/themes";
import typography from "@tailwindcss/typography";
import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
      gold: {
        100: "#FFF7D6", // Lightest - very pale gold
        200: "#FFEFAD", // Light pale gold
        300: "#FFE785", // Pale gold
        400: "#FFDF5C", // Light gold
        500: "#FFD700", // Base gold color
        600: "#DBB700", // Slightly darker gold
        700: "#B79800", // Darker gold
        800: "#937A00", // Very dark gold
        900: "#705D00", // Darkest gold
      },
    },
    extend: {
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(16rem, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(16rem, 1fr))",
      },
    },
  },
  extend: {},
  daisyui: {
    themes: [
      {
        emerald: {
          ...themes["emerald"],
          "--rounded-box": "0.7rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.6rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "0.6rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.01s", // duration of animation when you click on button
          "--animation-input": "0.1s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "0.98", // scale transform of button when you focus on it
          "--border-btn": "2px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.1rem", // border radius of tabs
          neutral: "#f9fafb",
          "neutral-content": "#1c212b",
        },
      },
      "light",
      "sunset",
      "dim",
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dim", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
  plugins: [
    daisyui,
    typography,
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hidden": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
