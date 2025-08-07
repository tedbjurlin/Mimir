import { useEffect, useRef, useState } from "react";
import "./WorkspaceResizer.css";
import { LeafState, PanelConstraints } from "./WorkspaceReducer";

interface WorkspaceResizerProps {
  state: LeafState;
  constraints: PanelConstraints;
  aria_controls: string;
  onToggle: (panel: "left" | "right") => void;
  onResize: (panel: "left" | "right", delta: number) => void;
  panel: "left" | "right";
  workspaceOffset: number;
}

const WorkspaceResizer: React.FC<WorkspaceResizerProps> = ({
  state,
  constraints,
  aria_controls,
  onToggle,
  onResize,
  panel,
  workspaceOffset,
}) => {
  const [resizing, setResizing] = useState(false);
  const [hovering, setHovering] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  const handleMouseDown = () => setResizing(true);

  const size: number = 0.4;
  const position =
    panel == "left"
      ? {
          left: state.collapsed ? "0rem" : `${state.size - size / 2}rem`,
        }
      : {
          right: state.collapsed ? "0rem" : `${state.size - size / 2}rem`,
        };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizing) return;
      if (ref.current == null) return;
      if (e.button != 0) return;

      var loc = ref.current!.offsetLeft + size / 2;

      onResize(panel, (e.clientX - workspaceOffset - loc) / 16);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement != ref.current) return;
      switch (e.key) {
        case "Enter": {
          onToggle(panel);
          break;
        }
        case "ArrowLeft": {
          onResize(panel, -1);
          break;
        }
        case "ArrowRight": {
          onResize(panel, 1);
          break;
        }
        case "Home": {
          if (panel == "left") {
            onResize(panel, -constraints.maxSize);
          } else {
            onResize(panel, constraints.maxSize);
          }
          if (!state.collapsed) {
            onToggle(panel);
          }
        }
        case "End": {
          if (state.collapsed) {
            onToggle(panel);
          }
          if (panel == "left") {
            onResize(panel, constraints.maxSize - state.size);
          } else {
            onResize(panel, state.size - constraints.maxSize);
          }
        }
      }
    };

    const handleMouseUp = () => setResizing(false);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.addEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing]);

  return (
    <div
      className="workspace-resizer"
      ref={ref}
      role="separator"
      tabIndex={0}
      aria-controls={aria_controls}
      aria-valuenow={state.size}
      aria-valuemin={0}
      aria-valuemax={constraints.maxSize}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: `${size}rem`,
        backgroundColor: hovering || resizing ? "gray" : "transparent",
        ...position,
      }}
    ></div>
  );
};

export default WorkspaceResizer;
