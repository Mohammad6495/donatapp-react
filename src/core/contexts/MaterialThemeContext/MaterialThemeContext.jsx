import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import colors from "../../../assets/styles/variables/_colors.module.scss";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const MaterialTheme = ({ children }) => {
  const theme = createTheme({
    direction: "rtl",
    // typography: {
    //   color: colors["lightMode-main-color-1-contrast"],
    // },
    // components: {
    //   Typography: {
    //     color: colors["lightMode-main-color-1-contrast"],
    //   },
    // },
    palette: {
      primary: {
        main: colors["caro-primary"],
        dark: colors["caro-primary-dark"],
        light: colors["caro-primary-light"],
        contrastText: colors["caro-primary-contrast"],
      },
        // primaryTextColor: {
        //   main: colors["lightMode-main-color-1"],
        // },
      //   error: {
      //     main: "#EF3939",
      //   },
      //   success: {
      //     main: "#139608",
      //     light: "#1de30c",
      //   },
      dark: {
        main: colors["baseMode-dark"],
      },
    },
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
};


export const MaterialLtrTheme=({children}) => {
  const theme = createTheme({
    direction: "ltr",
    palette: {
      primary: {
        main: colors["caro-primary"],
        dark: colors["caro-primary-dark"],
        light: colors["caro-primary-light"],
        contrastText: colors["caro-primary-contrast"],
      },
      dark: {
        main: colors["baseMode-dark"],
      },
    },
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
};




export default MaterialTheme;
