/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/modules/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {},
  plugins: [],
  important: '#__next',
  corePlugins: {
    preflight: false,
  },
}
