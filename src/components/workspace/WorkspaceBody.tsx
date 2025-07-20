import { useState } from "react";
import {
  PanelData,
  TWorkspaceContext,
  WorkspaceContext,
} from "./WorkspaceContext";
import WorkspaceContainer from "./WorkspaceContainer";
import WorkspaceLeaf from "./WorkspaceLeaf";
import WorkspaceResizer from "./WorkspaceResizer";
import "./WorkspaceBody.css";

const WorkspaceBody: React.FC = () => {
  const [panelSizeList, setPanelSizeList] = useState([]);

  const [workspaceContext, _setWorkspaceContext] = useState<TWorkspaceContext>({
    collapsePanel: (index: number) => {},
    expandPanel: (index: number) => {},
    getPanelSize: (index: number) => {
      return "";
    },
    isPanelCollapsed: (index: number) => {
      return true;
    },
    resizePanel: (index: number, size: string) => {},
    registerPanel: (panelData: PanelData) => {},
    registerResizer: () => {
      return 0;
    },
  });

  return (
    <div className="workspace-body">
      <WorkspaceContext.Provider value={workspaceContext}>
        <WorkspaceLeaf>
          <div style={{ backgroundColor: "green", height: "100vh" }} />
        </WorkspaceLeaf>
        <WorkspaceResizer />
        <WorkspaceContainer></WorkspaceContainer>
        <WorkspaceResizer />
        <WorkspaceLeaf>
          <div style={{ backgroundColor: "green", height: "100vh" }} />
        </WorkspaceLeaf>
      </WorkspaceContext.Provider>
    </div>
  );
};

export default WorkspaceBody;
