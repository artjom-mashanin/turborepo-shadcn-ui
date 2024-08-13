import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
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
      // TODO: doesn't seem to work, weird
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        // sans: [
        //   '-apple-system',
        //   'BlinkMacSystemFont',
        //   'Segoe UI',
        //   'Roboto',
        //   'Helvetica',
        //   'Arial',
        //   'sans-serif',
        //   'Apple Color Emoji',
        //   'Segoe UI Emoji',
        // ],
      },
      colors: {
        // DEFAULT COLORS
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // primary: {
        //   DEFAULT: 'hsl(var(--primary))',
        //   foreground: 'hsl(var(--primary-foreground))',
        // },
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

        // CUSTOM DS COLORS
        base: {
          white: "#FFFFFF",
          black: "#000000",
        },
        gray: {
          25: "#FCFCFD",
          50: "#F9FAFB",
          100: "#F2F4F7",
          200: "#EAECF0",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1D2939",
          900: "#101828",
          950: "#0C111D",
        },
        primary: {
          // these come from default shadcn template
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          25: "#F5F8FF",
          50: "#EFF4FF",
          100: "#D1E0FF",
          200: "#B2CCFF",
          300: "#84ADFF",
          400: "#528BFF",
          500: "#2970FF",
          600: "#155EEF",
          700: "#004EEB",
          800: "#0040C1",
          900: "#00359E",
          950: "#002266",
        },
        error: {
          25: "#FFFBFA",
          50: "#FEF3F2",
          100: "#FEE4E2",
          200: "#FECDCA",
          300: "#FDA29B",
          400: "#F97066",
          500: "#F04438",
          600: "#D92D20",
          700: "#B42318",
          800: "#912018",
          900: "#7A271A",
          950: "#55160C",
        },
        warning: {
          25: "#FFFCF5",
          50: "#FFFAEB",
          100: "#FEF0C7",
          200: "#FEDF89",
          300: "#FEC84B",
          400: "#FDB022",
          500: "#F79009",
          600: "#DC6803",
          700: "#B54708",
          800: "#93370D",
          900: "#7A2E0E",
          950: "#4E1D09",
        },
        success: {
          25: "#F6FEF9",
          50: "#ECFDF3",
          100: "#DCFAE6",
          200: "#ABEFC6",
          300: "#75E0A7",
          400: "#47CD89",
          500: "#17B26A",
          600: "#079455",
          700: "#067647",
          800: "#085D3A",
          900: "#074D31",
          950: "#053321",
        },
        ["blue-dark"]: {
          25: "#F5F8FF",
          50: "#EFF4FF",
          100: "#D1E0FF",
          200: "#B2CCFF",
          300: "#84ADFF",
          400: "#528BFF",
          500: "#2970FF",
          600: "#155EEF",
          700: "#004EEB",
          800: "#0040C1",
          900: "#00359E",
          950: "#002266",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
