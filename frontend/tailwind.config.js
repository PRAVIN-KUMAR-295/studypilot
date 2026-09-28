/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060A12",
          900: "#0B1120",
          850: "#0F172A",
          800: "#1E293B",
          700: "#334155"
        },
        cyan: {
          400: "#38BDF8",
          500: "#0EA5E9"
        }
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(56, 189, 248, 0.25)",
        purpleGlow: "0 0 25px -5px rgba(168, 85, 247, 0.25)"
      }
    }
  },
  plugins: []
};
