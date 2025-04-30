/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
        center: true,
    },
    extend: {
        colors: {
            "bodyColor": "#807a7a",
            "primaryColor": "#000000",
            "hoverColor": "#141414",
            "secondaryColor":"#666464"
        },
      
      
    },
},
  plugins: [],
}

