import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import HomeScreen from "./components/HomeScreen";

function App() {
  return (
    <ChakraProvider>
      <div className="flex justify-center w-full">
        <HomeScreen />
      </div>
    </ChakraProvider>
  );
}

export default App;
