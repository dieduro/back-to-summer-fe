const theme = require("./theme.json");

module.exports = {
  mode: "jit",
  purge: [
    "./pages/*.*",
    "./pages/*.js",
    "./pages/**/*.js",
    "./pages/**/*.ts",
    "./pages/**/*.jsx",
    "./pages/**/*.tsx",
    "./components/*.js",
    "./components/**/*.js",
    "./components/**/*.ts",
    "./components/**/*.jsx",
    "./components/**/*.tsx",
    "./ui/*.js",
    "./ui/**/*.js",
    "./ui/**/*.ts",
    "./ui/**/*.jsx",
    "./ui/**/*.tsx",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        alternate: theme.colors.alternate,
        orange: theme.colors.orange,
        yellow: theme.colors.yellow,
        red: theme.colors.red,
        ocher: theme.colors.ocher,
        white: theme.colors.white,
        dark: theme.colors.dark,
        gray: theme.colors.gray,
        error: theme.colors.error,
      },
      backgroundImage: {
        'gradient-radial-tr': 'radial-gradient(circle at top right, var(--tw-gradient-stops))',
        'gradient-radial-br': 'radial-gradient(circle at bottom right, var(--tw-gradient-stops))',
        'multiple-gradients': 'radial-gradient(circle at top right, var(--tw-gradient-stops)) radial-gradient(circle at bottom right, var(--tw-gradient-stops))',
        'sea': 'url(/sea-bg.jpeg)'
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
        blenny: [
          'Blenny'
        ]
      },
      keyframes: {
        timebar: {
          '0%': { transform: `translateX(-100%)` },
          '100%': { transform: `translateX(0%)` },
        }
      },
      animation: {
        timebar: 'timebar 30s linear',
      }
    },
    textColor: {
      primary: theme.colors.primary,
      white: theme.colors.white,
      secondary: theme.colors.dark,
      error: theme.colors.error,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
};
