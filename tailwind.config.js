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
          normal: "#919AA2",
          poison: "#B567CE",
          electric: "#FBD100",
          ground: "#E87236",
          rock: "#C8B686",
          psychic: "#FF6675",
          fighting: "#E0306A",
          ghost: "#4C6AB2",
          flying: "#89AAE3",
          fairy: "#FB89EB",
          ice: "#4CD1C0",
          dragon: "#006FC9",
          dark: "#5B5466",
          steel: "#5A8EA2",
        },
      },
    },
  },
  plugins: [],
};
