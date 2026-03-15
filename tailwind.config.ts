import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary steel blue (from brand screenshot)
        primary: {
          DEFAULT: "#4D7A96",
          light: "#6BBDD8",
          dark: "#3A5F75",
        },
        // Background scale
        bg: {
          DEFAULT: "#080D12",
          card: "#111820",
          elevated: "#1A2533",
          border: "#1E2D3D",
        },
        // Text scale
        text: {
          DEFAULT: "#E8EDF2",
          muted: "#8A9BAD",
          subtle: "#4A5D6E",
        },
        // Accent
        accent: "#6BBDD8",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 5vw, 5rem)", { lineHeight: "1.1" }],
        "display-lg": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.15" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2" }],
        "display-sm": ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.3" }],
      },
      spacing: {
        section: "6rem",
        "section-sm": "4rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary":
          "linear-gradient(135deg, #4D7A96 0%, #6BBDD8 100%)",
        "hero-glow":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(77,122,150,0.25) 0%, transparent 70%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "count-up": "countUp 2s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      borderRadius: {
        card: "0.75rem",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.4)",
        glow: "0 0 40px rgba(77,122,150,0.2)",
        "glow-strong": "0 0 60px rgba(107,189,216,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
