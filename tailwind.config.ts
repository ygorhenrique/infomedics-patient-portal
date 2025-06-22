import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
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
          DEFAULT: "#4DB6AC",
          50: "#E0F2F1",
          100: "#B2DFDB",
          200: "#80CBC4",
          300: "#4DB6AC",
          400: "#26A69A",
          500: "#009688",
          600: "#00897B",
          700: "#00796B",
          800: "#00695C",
          900: "#004D40",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#EDEFF5",
          foreground: "#364154",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#F8F9FB",
          foreground: "#666666",
        },
        accent: {
          DEFAULT: "#EDEFF5",
          foreground: "#364154",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Dental practice specific colors
        dental: {
          // Main brand colors (soft blue-gray)
          primary: "#A0ABC9",
          secondary: "#EDEFF5",
          accent: "#7A87B3",
          light: "#F8F9FB",
          dark: "#364154",
          // Improved secondary text color
          "text-secondary": "#666666",
          // Warm accent colors (warmer teal for better attention)
          warm: "#4DB6AC",
          "warm-50": "#E0F2F1",
          "warm-100": "#B2DFDB",
          "warm-200": "#80CBC4",
          "warm-300": "#4DB6AC",
          "warm-400": "#26A69A",
          "warm-500": "#009688",
          "warm-600": "#00897B",
          "warm-700": "#00796B",
          "warm-800": "#00695C",
          "warm-900": "#004D40",
          "warm-light": "#B2DFDB",
          "warm-dark": "#26A69A",
          // Enhanced warm variant for primary CTA
          "warm-bright": "#5FBDB2",
          "warm-bright-hover": "#4DB6AC",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "scale-up": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.02)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-warm": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(95, 189, 178, 0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(95, 189, 178, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scale-up": "scale-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "pulse-warm": "pulse-warm 2s infinite",
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "Open Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        header: ["24px", { lineHeight: "32px", fontWeight: "700" }],
        "header-mobile": ["20px", { lineHeight: "28px", fontWeight: "700" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-mobile": ["18px", { lineHeight: "26px", fontWeight: "400" }],
        small: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "small-mobile": ["12px", { lineHeight: "18px", fontWeight: "400" }],
        tiny: ["12px", { lineHeight: "16px", fontWeight: "400" }],
        "tiny-mobile": ["10px", { lineHeight: "14px", fontWeight: "400" }],
      },
      spacing: {
        "mobile-card-gap": "12px",
        "mobile-text-gap": "8px",
        "mobile-header": "50px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
