/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blueviolet: "#540d6eff",
        paradisepink: "#ee4266ff",
        sunglow: "#ffd23fff",
        cultured: "#F5F5F5",
        pinetree: "#1f271bff",
      },
      fontFamily: {
        karla: ["karla"],
        Inconsolata: ["Inconsolata"],
      },
    },
  },
  plugins: [],
};
