/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        govbr: {
          pure: {
            0: "#FFFFFF",
            100: "#000000"
          },
          gray: {
            2: "#F8F8F8",
            10: "#E6E6E6",
            20: "#CCCCCC",
            80: "#333333",
          },
          blue: {
            warm: {
              20: "#C5D4EB",
              vivid: {
                10: "#D4E5FF",
                20: "#ADCDFF",
                50: "#0076D6",
                60: "#155BCB",
                70: "#1351B4",
                80: "#0C326F",
                90: "#071D41",
              },
            },
          },
          green: {
            cool: {
              vivid: {
                5: "#E3F5E1",
                10: "#DFEACD",
                50: "#168821",
              },
            },
          },
          yellow: {
            vivid: {
              5: "#FFF5C2",
              10: "#FEE685",
              20: "#FFCD07",
            },
          },
          red:{
            vivid:{
              10: "#FDE0DB",
              20: "#F8B9C5",
              50: "#E52207"
            }
          }
        },
      },
    },
    plugins: [],
  },
};
