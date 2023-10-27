/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBackground: "#7fc8f8",
        columnBackground: "#f2eef1",
      }
    },
  },
  plugins: [],
}

