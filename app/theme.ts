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

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    welcome: true;
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
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
      variants: [
        {
          props: { variant: "welcome" },
          style: {
            backgroundColor: "#2E7D32",
            color: "white",
            padding: "12px 32px",
            fontSize: "1.1rem",
            fontWeight: 600,
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(46, 125, 50, 0.3)",
            "&:hover": {
              backgroundColor: "#1B5E20",
              boxShadow: "0 6px 16px rgba(46, 125, 50, 0.4)",
            },
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "&.welcome-paper": {
            padding: "48px",
            background: "linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)",
            borderRadius: "24px",
            boxShadow: "0 8px 32px rgba(46, 125, 50, 0.1)",
            border: "1px solid #4CAF50",
            backdropFilter: "blur(8px)",
            maxWidth: 600,
            textAlign: "center",
          },
        },
      },
    },
  },
});
