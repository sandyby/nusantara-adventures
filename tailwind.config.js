/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //
        'primary': '#4b5563',
        'secondary': '#71717a',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif']
      },
    },
  },
  plugins: [tailwindScrollbar],
}

