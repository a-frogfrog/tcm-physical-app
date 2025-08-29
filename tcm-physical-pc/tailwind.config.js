/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 必须包含你的组件路径
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#EC4899',
        accent: '#06B6D4',
        dark: '#0F172A',
      },
    },
  },
  plugins: [],
}