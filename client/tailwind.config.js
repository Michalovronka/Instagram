/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '18': '4.5rem',
        'main-content':'39rem',
        'main-content-posts':'29rem'
      },
    },
  },
  plugins: [],
} 