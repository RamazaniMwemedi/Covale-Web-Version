import "../styles/globals.css";
import * as React from "react";
import Head from "next/head";
// import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { Analytics } from "@vercel/analytics/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import store from "../Redux/store";

function MyApp({ Component, pageProps }) {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [systemTheme] = React.useState();
  const [preferedTheme, setPreferedTheme] = React.useState("light-mode");

  const themeChengeHandler = (theme) => {
    setPreferedTheme(theme);
  };
  // Theming
  const darkTheme = {
    // dark theme
    typography: {
      fontFamily: "sans-serif",
    },
    palette: {
      mode: "dark",
    },
    colors: {
      primary: "#00bcd4",
      secondary: "#ff4081",
      error: "#f44336",
      background: "rgb(28, 30, 40)",
      background1: "rgb(255, 255, 255, 0.08)",
      textBackground: "rgba(0,0,0,0.6)",
      textBackground2: "rgba(0,0,0,0.1)",
      itemBackground: "rgb(255, 255, 255, 0.08)",
      drawerBackground: "rgb(255, 255, 255, 0.08)",
      border: "rgb(255, 255, 255, 0.08)",
      hoverDate: "rgb(129, 96, 129)",
      background2: "rgb(255, 255, 255)",
      meetBackground: "rgb(255, 255, 255, 0.08)",
    },
    themeChengeHandler: themeChengeHandler,
  };

  const lightTheme = {
    // light theme
    typography: {
      fontFamily: "sans-serif",
    },
    palette: {
      mode: "light",
    },
    colors: {
      primary: "#00bcd4",
      secondary: "#ff4081",
      error: "#f44336",
      background: "rgb(237, 232, 247)",
      background1: "whitesmoke",
      textBackground: "rgba(255,255,255,0.7)",
      textBackground2: "rgba(255,255,255,0.3)",
      itemBackground: "whitesmoke",
      drawerBackground: "whitesmoke",
      border: "rgb(226, 216, 226)",
      hoverDate: "rgb(226, 216, 226)",
      background2: "lightgrey",
      meetBackground: "rgb(46, 41, 41)",
    },
    themeChengeHandler: themeChengeHandler,
  };
  // End of Theme

  React.useEffect(() => {
    // Get theme from localStorage
    const theme = localStorage.getItem("theme");
    return () => {
      setPreferedTheme(theme);
    };
  }, []);

  const theme = React.useMemo(() => {
    if (preferedTheme === "light-mode") {
      setPreferedTheme("light-mode");
      return createTheme(lightTheme);
    } else if (preferedTheme === "dark-mode") {
      setPreferedTheme("dark-mode");
      return createTheme(darkTheme);
    } else if (preferedTheme === systemTheme) {
      setPreferedTheme(systemTheme);
      return createTheme(systemTheme ? darkTheme : lightTheme);
    } else {
      setPreferedTheme("light-mode");
      return createTheme(lightTheme);
    }
  }, [preferedTheme]);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Head>
            <title>Covale</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <link rel="icon" href="/logo.svg" />
          </Head>
          <CssBaseline />
          <Component {...pageProps} />
          <Analytics />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
