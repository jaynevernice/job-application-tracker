/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#212A31',
        'secondary': '#2E3944',
        'accent': '#124E66',
        'background': '#E0E5EC',
      },
      boxShadow: {
        'neumorphic': '9px 9px 16px #b8b9be, -9px -9px 16px #ffffff',
        'neumorphic-inset': 'inset 9px 9px 16px #b8b9be, inset -9px -9px 16px #ffffff',
        'neumorphic-input': 'inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff',
      },
    },
  },
  plugins: [],
}

