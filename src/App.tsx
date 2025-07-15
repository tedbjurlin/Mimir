import { HStack } from "@chakra-ui/react";
import "./App.css";
//import Sidedock from "./components/Sidedock";
//import BodyContainer from "./components/BodyContainer";
import TabEditor from "./components/TabEditor";

const App: React.FC = () => {
  return (
    // <HStack>
    //   <Sidedock />
    //   <h1>Hello world!</h1>
    // </HStack>
    <TabEditor />
  );
}

export default App;
