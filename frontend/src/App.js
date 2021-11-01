import "./App.css";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import HomeScreen from "./components/HomeScreen";
import Header from "./components/Header";
import Stats from "./components/Stats";

const chackraConfig = {
  useSystemColorMode: false,
  // initialColorMode: "dark",
};

const customTheme = extendTheme({
  chackraConfig,
  fonts: {
    body: "Rubik, Avenir, system-ui, sans-serif",
    heading: "Georgia, serif",
    mono: ["code saver", "Comic Mono", "ui-monospace", "SFMono-Regular"],
  },
});

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Header />
      <div className="flex flex-col items-center justify-center w-full">
        <HomeScreen />
        <Stats />
      </div>
    </ChakraProvider>
  );
}

export default App;
