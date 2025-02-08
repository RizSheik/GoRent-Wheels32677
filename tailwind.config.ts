import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { 
        lightViolet:'#362ea5c',
        darkViolet: '#4d43e8',
        lightText: "#888888",
        accent: "#000000",
        accentWhite: "#FFFFFF",
        lightRed: "#EF3636",
        lightGreen: "#41CE09",
        bgLight: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
export default config;
