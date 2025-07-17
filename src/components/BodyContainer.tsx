import Sidedock from "./Sidedock";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

const BodyContainer: React.FC = () => {

  return (
    <Allotment defaultSizes={[100, 200]} minSize={70}>
      <div className="bg-green-600 h-dvh" />
      <div className="bg-red-600 h-dvh" />
      <Allotment.Pane snap>
        <div className="bg-blue-600 h-dvh" />
      </Allotment.Pane>
    </Allotment>
  );
}

export default BodyContainer;