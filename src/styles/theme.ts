export const darkTheme = {
  colors: {
    background: "#0a0b0d",

    white: "#ffffff",
    textSecondary: "#8a8f98",

    accent: "#00e676",
    danger: "#ff5252",
    border: "#2d3139",
    borderHover: "#4b5563",

    darkGray: "#1f2937",
    textGray: "#8a8d8e",
    orange: "#ffab00",
  },
  shadows: {
    glow: "0 0 15px rgba(0, 230, 118, 0.2)",
  },
  fontSizes: {
    xs: "0.75rem",
    small: "0.875rem",
    medium: "1rem",
    large: "1.25rem",
    xl: "1.5rem",
    xxl: "2rem",
  },
};

export type ThemeType = typeof darkTheme;
