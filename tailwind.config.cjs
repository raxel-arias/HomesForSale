const path = require('path');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(__dirname, './app/views/**/*.pug')
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}