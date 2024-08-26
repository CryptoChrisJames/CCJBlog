/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./views/**/*.{handlebars,js}", // Ensure this matches your project structure
    "./public/**/*.js"               // If you use Tailwind classes in JS files
  ],
  safelist: [
    'bg-cat-color-tech',
    'bg-cat-color-ent',
    'bg-cat-color-life'
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'], // Ensure 'Montserrat' is the name used in your @font-face
        'roboto': ['Roboto Flex', 'sans-serif'], // Ensure 'Montserrat' is the name used in your @font-face
      },
      colors: {
        'main': '#0D171C',
        'secondary': '#242424',
        'tertiary': "#002B36",
        'main-separate': "#0E222C",
        'text-color-main': "#e8e9ed",
        'text-color-secondary': "#b58900",
        'cat-color-ent': "#b58900",
        'cat-color-tech': "#2aa198",
        'cat-color-life': "#859900"
      }
    },
  },
  plugins: [],
}

