/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1E1B1A",
        sand: "#F6F2EA",
        clay: "#E7DED1",
        coral: "#F25C3B",
        teal: "#1F7A7A",
        sky: "#DDF3F4"
      },
      fontFamily: {
        display: ["\"Space Grotesk\"", "sans-serif"],
        body: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 60px -40px rgba(31, 122, 122, 0.6)"
      }
    }
  },
  plugins: []
};
