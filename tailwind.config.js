const darkTheme = {
  primary: "#0e0e0e",
  secondary: "#1f1f1f",
  background: "#0e0e0e",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          ...darkTheme,
        },
      },
    },
  },
  plugins: [],
};
