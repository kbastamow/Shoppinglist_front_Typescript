import { createTheme, ThemeOptions } from "@mui/material";
import myFont from "https://fonts.googleapis.com/css2?family=Love+Ya+Like+A+Sister&family=Nerko+One&family=Quattrocento+Sans:wght@400;700&display=swap";
import { black, cyan, green, grey, lime, yellow } from "@mui/material/colors";

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
    fontFamily: "Raleway, Arial",
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

            // fontFamily: "'Love Ya Like A Sister', cursive",
            fontWeight: "bold",
          }),
        }),
      },
    },
  },
});
