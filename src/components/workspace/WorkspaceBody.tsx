import { useLayoutEffect, useReducer, useRef, useState } from "react";
import {
  PanelData,
  TWorkspaceContext,
  WorkspaceContext,
} from "./WorkspaceContext";
import WorkspaceContainer from "./WorkspaceContainer";
import WorkspaceLeaf from "./WorkspaceLeaf";
import WorkspaceResizer from "./WorkspaceResizer";
import "./WorkspaceBody.css";
import { initialWorkspaceState, workspaceReducer } from "./WorkspaceReducer";

const leftWorkspaceLeaf: string = "left-workspace-leaf";
const rightWorkspaceLeaf: string = "right-workspace-leaf";

const WorkspaceBody: React.FC = () => {
  const [workspaceState, dispatch] = useReducer(
    workspaceReducer,
    initialWorkspaceState(20, 20, {
      left: {
        minSize: 10,
        maxSize: 30,
      },
      right: {
        minSize: 10,
        maxSize: 30,
      },
    })
  );
  const ref = useRef<HTMLDivElement | null>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);

  useLayoutEffect(() => {
    if (ref == null) return;
    setOffsetLeft(ref.current!.offsetLeft);
  }),
    [offsetLeft];

  function handleResize(panel: "left" | "right", delta: number): void {
    dispatch({
      type: "resize",
      panel,
      delta,
    });
  }

  function handleToggle(panel: "left" | "right"): void {
    dispatch({
      type: "toggle-collapse",
      panel,
    });
  }

  return (
    <div className="workspace-body" ref={ref}>
      <WorkspaceLeaf state={workspaceState.left} id={leftWorkspaceLeaf}>
        <div style={{ backgroundColor: "green", height: "100vh" }} />
      </WorkspaceLeaf>
      <WorkspaceResizer
        state={workspaceState.left}
        workspaceOffset={offsetLeft}
        constraints={workspaceState.constraints.left}
        aria_controls={leftWorkspaceLeaf}
        onToggle={handleToggle}
        onResize={handleResize}
        panel="left"
      />
      <WorkspaceContainer></WorkspaceContainer>
      <WorkspaceResizer
        state={workspaceState.right}
        workspaceOffset={offsetLeft}
        constraints={workspaceState.constraints.right}
        aria_controls={rightWorkspaceLeaf}
        onToggle={handleToggle}
        onResize={handleResize}
        panel="right"
      />
      <WorkspaceLeaf state={workspaceState.right} id={rightWorkspaceLeaf}>
        <div style={{ backgroundColor: "green", height: "100vh" }} />
      </WorkspaceLeaf>
    </div>
  );
};

export default WorkspaceBody;
