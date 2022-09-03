import "../styles/globals.css";
import * as React from "react";
import Head from "next/head";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function MyApp({ Component, pageProps }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [lightMode, setLightMode] = React.useState("light-mode");
  const [darkMode, setDarkMode] = React.useState("dark-mode");
  const [systemTheme, setSystemTheme] = React.useState("system-mode");
  const [preferedTheme, setPreferedTheme] = React.useState(lightMode);

  const themeChengeHandler = (theme) => {
    setPreferedTheme(theme);
  };
  // Theming
  const darkTheme = {
    // dark theme
    palette: {
      mode: "dark",
    },
    colors: {
      primary: "#00bcd4",
      secondary: "#ff4081",
      error: "#f44336",
      background: "rgb(58, 20, 58)",
      background1: "rgb(46, 41, 41)",
      textBackground: "rgb(46, 41, 41)",
      itemBackground: "rgb(46, 41, 41)",
      drawerBackground: "rgb(46, 41, 41)",
      border: "rgb(46, 41, 41)",
      hoverDate: "rgb(129, 96, 129)",
      background2: "rgb(255, 255, 255)",
    },
    themeChengeHandler: themeChengeHandler,
  };

  const lightTheme = {
    // light theme
    palette: {
      mode: "light",
    },
    colors: {
      primary: "#00bcd4",
      secondary: "#ff4081",
      error: "#f44336",
      background: "rgb(226, 216, 226)",
      background1: "rgb(255, 255, 255)",
      textBackground: "rgb(255, 255, 255)",
      itemBackground: "whitesmoke",
      drawerBackground: "whitesmoke",
      border: "rgb(226, 216, 226)",
      hoverDate: "rgb(226, 216, 226)",
      background2: "lightgrey",
    },
    themeChengeHandler: themeChengeHandler,
  };
  // End of Theme

  const theme = React.useMemo(() => {
    if (preferedTheme == lightMode) {
      setPreferedTheme(lightMode);
      return createTheme(lightTheme);
    } else if (preferedTheme == darkMode) {
      setPreferedTheme(darkMode);
      return createTheme(darkTheme);
    } else if (preferedTheme == systemTheme) {
      setPreferedTheme(systemTheme);
      return createTheme(systemTheme ? darkTheme : lightTheme);
    } else {
      setPreferedTheme(lightMode);
      return createTheme(lightTheme);
    }
  }, [preferedTheme]);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Covale</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="icon"
          href="https://ramazanimwemedi.github.io/sounds/covalogo.png"
        />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
