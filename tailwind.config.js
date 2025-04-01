// tailwind.config.js
import animatePlugin from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // Inter als Hauptschriftart
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      // Angepasste Schriftbreiten-Skala mit feineren Abstufungen
      fontWeight: {
        light: "350", // Leichter als normal
        normal: "400",
        medium: "450", // Etwas stärker als normal
        semibold: "550", // Stärker als medium, schwächer als bold
        bold: "650", // Nicht zu fett, moderner Look
        extrabold: "750", // Noch stärker
      },
      // Angepasste Zeilenabstände
      lineHeight: {
        "tight-plus": "1.15", // Zwischen tight und snug
        "medium-plus": "1.375", // Zwischen normal und relaxed
      },
      // Angepasste Buchstabenabstände (tracking)
      letterSpacing: {
        tightest: "-0.04em",
        "tighter-plus": "-0.03em",
        "tight-plus": "-0.015em",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        shine: {
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        // Aurora-Animation
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shine: "shine 2s ease infinite",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        aurora: "aurora 60s linear infinite",
      },
      // Textschatten für subtilen 3D-Effekt
      textShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.025)",
      },
    },
  },
  plugins: [
    animatePlugin,
    addVariablesForColors,
    // Text-Shadow Plugin hinzufügen
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-sm": {
          textShadow: "0 1px 2px rgba(0,0,0,0.025)",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));
  addBase({
    ":root": newVars,
  });
}

function flattenColorPalette(colors) {
  return Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
      typeof values == "object"
        ? Object.entries(values).map(([key, value]) => ({
            [color + (key === "DEFAULT" ? "" : `-${key}`)]: value,
          }))
        : [{ [`${color}`]: values }]
    )
  );
}

export default config;
