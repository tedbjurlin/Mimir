import { useState } from "react";
import { TWorkspaceContext, WorkspaceContext } from "./WorkspaceContext";
import WorkspaceContainer from "./WorkspaceContainer";
import WorkspaceLeaf from "./WorkspaceLeaf";
import WorkspaceResizer from "./WorkspaceResizer";

const WorkspaceBody: React.FC = () => {
  const [workspaceContext, setWorkspaceContext] =
    useState<TWorkspaceContext | null>(null);

  return (
    <div className="workspace-body">
      <WorkspaceContext.Provider value={workspaceContext}>
        <WorkspaceLeaf></WorkspaceLeaf>
        <WorkspaceResizer />
        <WorkspaceContainer></WorkspaceContainer>
        <WorkspaceResizer />
        <WorkspaceLeaf></WorkspaceLeaf>
      </WorkspaceContext.Provider>
    </div>
  );
};
