import { useContext } from "react";
import {
  LuAtom,
  LuBook,
  LuBookMarked,
  LuLightbulb,
  LuNotebookPen,
  LuSearch,
} from "react-icons/lu";

interface SidedockProps {
  className: string;
}

const Sidedock: React.FC<SidedockProps> = ({ className = "" }) => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("Sidedock must be used within the WorkspaceContainer");
  }

  return <div className={`side-dock ${className}`}></div>;
};

export default Sidedock;
