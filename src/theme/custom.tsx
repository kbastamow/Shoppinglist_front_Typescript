import { createTheme, ThemeOptions } from "@mui/material";

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
      //   paper: "#151515",
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
          }),
        }),
      },
    },
  },
});
