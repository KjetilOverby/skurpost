import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: 'class',

  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#254e58",
          "secondary": "#379683",
          "accent": "#6e6658",
          "neutral": "#88bdbc",
          "base-100": "#112d32",
        },
        bluefresh: {
          "primary": "#2e9cca",
          "secondary": "#464866",
          "accent": "#aaabbb",
          "neutral": "#29648a",
          "base-100": "#25274d",
        },
        futurisk: {
          "primary": "#7d7d7d",
          "secondary": "#474646",
          "accent": "#374151",
          "neutral": "#c2c0c0",
          "base-100": "rgb(51, 51, 51)",
        },
        darkmode: {
          "primary": "#d3d9d4",
          "secondary": "#748d92",
          "accent": "#124e66",
          "neutral": "#2e3944",
          "base-100": "#212a31",
        },
        lightmode: {
          "primary": "#718ba6",
          "secondary": "#bababa",
          "accent": "#c5eddd",
          "neutral": "#dbdbdb",
          "base-100": "#ffffff",
        },
        lightpink: {
          "primary": "#5d001e",
          "secondary": "#ee4c7c",
          "accent": "#e3afbc",
          "neutral": "#9a1750",
          "base-100": "#e3e2df",
        },
        // futurisk: {
        //   "primary": "#7d7d7d",
        //   "secondary": "#474646",
        //   "accent": "#464d47",
        //   "neutral": "#c2c0c0",
        //   "base-100": "rgb(51, 51, 51)",
        // },
      },
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
  },

  content: ["./src/**/*.tsx", "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",],
  theme: {
    
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      '3xl': '2236px',
      // => @media (min-width: 1536px) { ... }
    }

    
  },

  plugins: [require("daisyui")],



} satisfies Config;



