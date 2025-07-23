import { useReducer, useState } from "react";
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
    initialWorkspaceState(20, 20, 0, {
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

  function handleLeftResize(): void {}

  function handleRightResize(): void {}

  function handleToggleLeft(): void {
    dispatch({
      type: "toggle-collapse",
      panel: "left",
    });
  }

  function handleToggleRight(): void {
    dispatch({
      type: "toggle-collapse",
      panel: "right",
    });
  }

  return (
    <div className="workspace-body">
      <WorkspaceLeaf state={workspaceState.left} id={leftWorkspaceLeaf}>
        <div style={{ backgroundColor: "green", height: "100vh" }} />
      </WorkspaceLeaf>
      <WorkspaceResizer
        state={workspaceState.left}
        constraints={workspaceState.constraints.left}
        aria_controls={leftWorkspaceLeaf}
        onToggle={handleToggleLeft}
        onResize={handleLeftResize}
      />
      <WorkspaceContainer></WorkspaceContainer>
      <WorkspaceResizer
        state={workspaceState.right}
        constraints={workspaceState.constraints.right}
        aria_controls={rightWorkspaceLeaf}
        onToggle={handleToggleRight}
        onResize={handleLeftResize}
      />
      <WorkspaceLeaf state={workspaceState.right} id={rightWorkspaceLeaf}>
        <div style={{ backgroundColor: "green", height: "100vh" }} />
      </WorkspaceLeaf>
    </div>
  );
};

export default WorkspaceBody;
