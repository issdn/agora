/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f5f5f5",
      },
      fontFamily: {
        karla: ["karla"],
        inconsolata: ["inconsolata"],
      },
    },
  },
  plugins: [],
};
