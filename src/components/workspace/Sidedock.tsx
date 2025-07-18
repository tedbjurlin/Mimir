import { useContext } from "react";
import {
  LuAtom,
  LuBook,
  LuBookMarked,
  LuLightbulb,
  LuNotebookPen,
  LuSearch,
} from "react-icons/lu";
import { WorkspaceContext } from "./WorkspaceContext";

interface SidedockProps {
  className: string;
}

const Sidedock: React.FC<SidedockProps> = ({ className = "" }) => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("Sidedock must be used within the WorkspaceContainer");
  }

  return (
    <div className={`side-dock ${className}`}>
      <LuAtom />
      <LuBook />
      <LuBookMarked />
      <LuLightbulb />
      <LuSearch />
      <LuNotebookPen />
    </div>
  );
};

export default Sidedock;
