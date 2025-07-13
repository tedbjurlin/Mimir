import { HStack } from "@chakra-ui/react";
import "./App.css";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  return (
    <HStack>
      <Sidebar />
      <h1>Hello world!</h1>
    </HStack>
  );
}

export default App;
