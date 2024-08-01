/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: process.env.DARK_MODE ? process.env.DARK_MODE : 'media',
  content: [
    // './screens/**/**/*.{html,js,jsx,ts,tsx}',
    // './components/**/*.{html,js,jsx,ts,tsx,mdx}',
    // './hooks/**/*.{html,js,jsx,ts,tsx,mdx}',
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require('nativewind/preset')],
};
