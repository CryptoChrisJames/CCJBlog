/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./views/**/*.{handlebars,js}", // Ensure this matches your project structure
    "./public/**/*.js"               // If you use Tailwind classes in JS files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

