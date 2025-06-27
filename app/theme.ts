import { createTheme } from "@mui/material/styles";

// Extend the Material-UI theme to include custom colors
declare module "@mui/material/styles" {
  interface Palette {
    garden: {
      main: string;
      light: string;
      dark: string;
      bed: string;
      bedBorder: string;
    };
  }
  interface PaletteOptions {
    garden?: {
      main: string;
      light: string;
      dark: string;
      bed: string;
      bedBorder: string;
    };
  }
}

// Custom theme with beautiful colors
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2E7D32", // Forest green - perfect for a garden planning app called GROW
      light: "#4CAF50",
      dark: "#1B5E20",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#81C784", // Light green
      light: "#A5D6A7",
      dark: "#4CAF50",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F1F8E9", // Very light green background
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1B5E20", // Dark green for primary text
      secondary: "#2E7D32", // Medium green for secondary text
    },
    garden: {
      main: "#D2B48C", // Light brown for garden background
      light: "#DEB887", // Lighter brown
      dark: "#F5DEB3", // Darker brown
      bed: "#8D4004", // Dark brown for bed background
      bedBorder: "#654321", // Darker brown for bed border
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: "2.5rem",
      color: "#1B5E20",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      color: "#1B5E20",
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.5rem",
      color: "#2E7D32",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F1F8E9",
          minHeight: "100vh",
        },
      },
    },
  },
});
