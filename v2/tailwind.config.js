/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./views/**/*.{handlebars,js}", // Ensure this matches your project structure
    "./public/**/*.js"               // If you use Tailwind classes in JS files
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'], // Ensure 'Montserrat' is the name used in your @font-face
        'roboto': ['Roboto Flex', 'sans-serif'], // Ensure 'Montserrat' is the name used in your @font-face
      },
      colors: {
        'main': '#080C0E',
        'secondary': '#242424',
        'tertiary': "#002B36",
        'text-color-main': "#e8e9ed",
        'text-color-secondary': "#b58900"
      }
    },
  },
  plugins: [],
}

