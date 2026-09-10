/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#E07A32",
          orangeDark: "#B8622A",
          orangeLight: "#F0A868",
        },
        bg: {
          DEFAULT: "#0D0D0D",
          card: "#1A1A1A",
          border: "#2A2A2A",
        },
        success: "#22C55E",
        warning: "#D9A441",
        danger: "#E5484D",
        muted: "#A0A0A0",
      },
    },
  },
  plugins: [],
};
