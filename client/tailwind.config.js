/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#7fc8f8",
        "secondary": "#f2f2f2",
      }
    },
  },
  plugins: [],
}

