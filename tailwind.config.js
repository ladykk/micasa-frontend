module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        120: "30rem",
        "screen-80": "80vh",
        "screen-85": "85vh",
        "screen-70": "70vh",
        "screen-75": "75vh",
        "fit-content": "fit-content",
        "max-content": "max_content",
      },
      minHeight: {
        40: "10rem",
      },
      colors: {
        primary: "#267CE9",
      },
      fontFamily: {
        sans: ["Kanit"],
        serif: ["Kanit"],
        mono: ["Kanit"],
        display: ["Kanit"],
        body: ["Kanit"],
      },
      zIndex: {
        "-1": "-1",
      },
      grayscale: {
        0.8: "0.8",
      },
      screens: {
        desktop: "1690px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
