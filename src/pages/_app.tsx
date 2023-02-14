import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import Layout from "../components/layout/Layout";
import {SSRProvider} from '@react-aria/ssr'; 
import { NextUIProvider } from "@nextui-org/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider> <NextUIProvider><ChakraProvider>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
    </NextUIProvider>
    </SSRProvider> 
  );
}
export default App;