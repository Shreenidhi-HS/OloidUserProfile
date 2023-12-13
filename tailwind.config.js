/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/health-risk-assessment-v1/**/*.{html,js}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "87.5rem",
      },
      fontSize: {
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.625rem",
      },
      spacing: {
        "0.938rem": "0.938rem",
      },
    },
    extend: {
      colors: {
        ObsidianDarkBlue: "#101828",
        ChawkWhite: "#F9FAFB",
        LightGrey: "#ECEAEA",
        DarkGrey: "#7D7D7D",
        CharcolDarkBlue: "#475467",
        BluishGrey: "#667085",
        GlassBluishGrey: "#F5F6FA",
        LightBluishGrey: "#EBECF1",
        MediumBluishGrey: "#D0D5DD",
        WaterBlue: "#0B6FD0",
        BrightRed: "#D0390B",
        PrimaryDarkBlue: "#203650",
      },
      fontFamily: {
        avenirLight: ["Avenir-Light", "sans-serif"],
        avenirRegular: ["Avenir-Regular", "sans-serif"],
        avenirMedium: ["Avenir-Medium", "sans-serif"],
        avenirHeavy: ["Avenir-Heavy", "sans-serif"],
        avenirBlack: ["Avenir-Black", "sans-serif"],
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
