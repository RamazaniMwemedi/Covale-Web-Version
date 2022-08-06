import "../styles/globals.css";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function MyApp({ Component, pageProps }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
        colors: {
          primary: "#00bcd4",
          secondary: "#ff4081",
          error: "#f44336",
          background: prefersDarkMode
            ? "rgb(58, 20, 58)"
            : "rgb(226, 216, 226)",
          background1: prefersDarkMode ? "rgb(46, 41, 41)" : "#ffff",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
