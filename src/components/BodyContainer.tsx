import { Box } from "@chakra-ui/react/box";
import Sidedock from "./Sidedock";
import Resizable from "./Resizable";
import ResizablePanel from "./ResizablePanel";

const BodyContainer: React.FC = () => {

  return (
    <Resizable>
      <ResizablePanel initialSize={200}>
        <Box className="w-sceen h-screen" backgroundColor="blue"></Box>
      </ResizablePanel>
      <ResizablePanel initialSize={100} grow>
        <Box className="w-screen h-screen" backgroundColor="green"></Box>
      </ResizablePanel>
      <ResizablePanel initialSize={200}>
        <Box className="w-screen h-screen" backgroundColor="red"></Box>
      </ResizablePanel>
    </Resizable>
  );
}

export default BodyContainer;