/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-light': '#f0f4f8',
        'custom-teal': '#0d9488',
        'custom-teal-light': '#d1fae5',
        'custom-teal-dark': '#0f766e',
        'custom-gray': '#e2e8f0',
      },
    },
  },
  plugins: [],
}
