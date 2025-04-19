/** @type {import('tailwindcss').Config} */
const baseConfig = require("tailwindcss/defaultConfig");
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        pulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 var(--pulse-color)" },
          "50%": { boxShadow: "0 0 0 8px var(--pulse-color)" },
        },
        "line-shadow": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "100% -100%" },
        },
        rainbow: {
          "0%": { backgroundPosition: "0%" },
          "100%": { backgroundPosition: "200%" },
        },
        slideInRight: {
          from: { transform: "translateX(100%)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        slideOutLeft: {
          from: { transform: "translateX(0)", opacity: 1 },
          to: { transform: "translateX(-100%)", opacity: 0 },
        },
        slideInLeft: {
          from: { transform: "translateX(-100%)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        slideOutRight: {
          from: { transform: "translateX(0)", opacity: 1 },
          to: { transform: "translateX(100%)", opacity: 0 },
        },
        progress: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
      },
      animation: {
        pulse: "pulse 2s ease-out infinite",
        "line-shadow": "line-shadow 15s linear infinite",
        rainbow: "rainbow 2s infinite linear",
        "slide-in-right": "slideInRight 0.5s forwards",
        "slide-out-left": "slideOutLeft 0.5s forwards",
        "slide-in-left": "slideInLeft 0.5s forwards",
        "slide-out-right": "slideOutRight 0.5s forwards",
        progress: "progress 5s linear",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
