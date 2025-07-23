import { useState } from "react";
import "./WorkspaceResizer.css";
import { LeafState, PanelConstraints } from "./WorkspaceReducer";

interface WorkspaceResizerProps {
  state: LeafState;
  constraints: PanelConstraints;
  aria_controls: string;
  onToggle: () => void;
  onResize: () => void;
}

const WorkspaceResizer: React.FC<WorkspaceResizerProps> = ({
  state,
  constraints,
  aria_controls,
  onToggle,
  onResize,
}) => {
  const [resizing, setResizing] = useState(false);

  return (
    <div
      className="workspace-resizer"
      role="separator"
      aria-controls={aria_controls}
      aria-valuenow={state.size}
      aria-valuemin={0}
      aria-valuemax={constraints.maxSize}
      style={{
        backgroundColor: resizing ? "gray" : "transparent",
        left: "{state.resizerLoc}rem",
      }}
    ></div>
  );
};

export default WorkspaceResizer;
