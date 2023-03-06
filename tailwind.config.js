/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "pokemon-type": {
          grass: "#38BF4B",
          fire: "#FF9741",
          water: "#3692DC",
          bug: "#83C300",
          normal: "#7e7777",
          poison: "#a040a0",
          electric: "#FBD100",
          ground: "#484747",
          rock: "#b6b6b6",
          psychic: "#ee99ac",
          fighting: "#b09fa1",
          ghost: "#6f698c",
          flying: "#89AAE3",
          fairy: "#e2a9df",
          ice: "#0ed1f3",
          dragon: "#ee5439",
          dark: "#5B5466",
          steel: "#596570",
        },
      },
    },
  },
  plugins: [],
};
