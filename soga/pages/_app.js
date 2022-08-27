import "../styles/globals.css";
import * as React from "react";
import Head from "next/head";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/router";

import darkTheme from "../themes/dark";
import lightTheme from "../themes/light";

import {useCheckLogedinUser} from "../hooks/hooks"

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  useCheckLogedinUser()
  const theme = React.useMemo(
    () =>
      createTheme(
        prefersDarkMode
          ? darkTheme
          : lightTheme
          
      ),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Covalent</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CssBaseline />
      <Component key={router.asPath} {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
