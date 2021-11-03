import "../styles/globals.css";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import "tailwindcss/tailwind.css";

const chackraConfig = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const customTheme = extendTheme({
  chackraConfig,
  fonts: {
    body: "Rubik, Avenir, system-ui, sans-serif",
    heading: "Georgia, serif",
    mono: ["code saver", "Comic Mono", "ui-monospace", "SFMono-Regular"],
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
