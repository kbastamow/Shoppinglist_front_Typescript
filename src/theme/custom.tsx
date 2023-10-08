import { createTheme } from "@mui/material";
import { cyan, green, grey, lime } from "@mui/material/colors";

export const custom = createTheme({
  palette: {
    primary: {
      light: cyan[100],
      main: cyan[900],
      dark: cyan[900],
    },
    secondary: {
      light: lime[100],
      main: lime[500],
      dark: lime[900],
    },
    background: {
      default: grey[50],
    },
  },
  typography: {
    fontFamily: "'Fira Sans', sans-serif",
    h3: {
      fontFamily: "'Love Ya Like A Sister', cursive",
      color: green[600],
      paddingTop: "30px",
    },
    h4: {
      fontFamily: "'Love Ya Like A Sister', cursive",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
    h5: {
      color: cyan[900],
      fontWeight: "bold",
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
            backgroundColor: lime[500],
            color: cyan[900],
            "&:hover": {
              backgroundColor: lime[900],
            },
            "&:active": {
              backgroundColor: lime[500],
              color: cyan[900],
            },
            "&:focus": {
              backgroundColor: lime[500],
              color: cyan[900],
            },
            fontWeight: "bold",
          }),
        }),
      },
    },
  },
});
