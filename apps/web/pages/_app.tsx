import React from "react";
import App from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    );
  }
}

export default MyApp;
