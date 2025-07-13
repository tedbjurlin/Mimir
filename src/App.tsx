import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <h1>Hello world!</h1>
    </ChakraProvider>
  );
}

export default App;
