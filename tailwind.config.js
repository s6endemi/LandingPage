/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import themes from "daisyui/src/theming/themes";
import typography from "@tailwindcss/typography";
import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

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
      fontFamily: {
        // Modern sans-serif for UI elements and body text
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        // Display font for headlines and hero sections
        display: ["Cal Sans", ...defaultTheme.fontFamily.sans],
        // Monospace for technical content or metrics
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
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
        /**
        dim: {
          ...themes["dim"],

          // Primary (Red) Scale
          primary: "#B70401", // Base
          "primary-focus": "#8F0301", // Darker for hover/focus
          "primary-content": "#ffffff", // Always white for contrast

          // Lighter primary shades (for backgrounds, etc)
          "primary-50": "#FEE7E7",
          "primary-100": "#FDCFCF",
          "primary-200": "#FB9F9E",
          "primary-300": "#F96F6D",
          "primary-400": "#F63F3D",
          "primary-500": "#B70401", // Your base
          "primary-600": "#8F0301",
          "primary-700": "#670200",
          "primary-800": "#3F0100",
          "primary-900": "#170000",

          // Secondary (Blue) Scale
          secondary: "#195E9F", // Base
          "secondary-focus": "#134B7F", // Darker for hover/focus
          "secondary-content": "#ffffff", // White for contrast

          // Lighter secondary shades
          "secondary-50": "#E9F2FA",
          "secondary-100": "#D3E5F5",
          "secondary-200": "#A7CBEB",
          "secondary-300": "#7BB1E1",
          "secondary-400": "#4F97D7",
          "secondary-500": "#195E9F", // Your base
          "secondary-600": "#134B7F",
          "secondary-700": "#0E385F",
          "secondary-800": "#08253F",
          "secondary-900": "#03121F",

          // Accent (Bright Green) Scale
          accent: "#B5F514", // Base
          "accent-focus": "#91C410", // Darker for hover/focus
          "accent-content": "#000000", // Black for contrast with bright green

          // Lighter accent shades
          "accent-50": "#F7FEE7",
          "accent-100": "#EFFDD0",
          "accent-200": "#DFFBA1",
          "accent-300": "#CFF972",
          "accent-400": "#BFF743",
          "accent-500": "#B5F514", // Your base
          "accent-600": "#91C410",
          "accent-700": "#6D930C",
          "accent-800": "#496208",
          "accent-900": "#243104",

          // Neutral Scale
          neutral: "#3C362A", // Base
          "neutral-focus": "#302B22", // Darker for hover/focus
          "neutral-content": "#ffffff", // White for contrast

          // Full neutral scale
          "neutral-50": "#ECEAE7",
          "neutral-100": "#D9D5CF",
          "neutral-200": "#B3ABA0",
          "neutral-300": "#8D8270",
          "neutral-400": "#675841",
          "neutral-500": "#3C362A", // Your base
          "neutral-600": "#302B22",
          "neutral-700": "#242019",
          "neutral-800": "#181511",
          "neutral-900": "#0C0A08",

          // Base colors for backgrounds etc
          "base-100": "#1d1d1d", // Main background
          "base-200": "#2a2a2a", // Slightly lighter
          "base-300": "#373737", // Even lighter
          "base-content": "#ffffff", // Main content color
        },
        */
      },
      "light",
      "sunset",
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
