import { useContext, useEffect, useState } from "react";
import { WorkspaceContext, PanelData } from "./WorkspaceContext";
import "./WorkspaceLeaf.css";
import { LeafState } from "./WorkspaceReducer";

interface WorkspaceLeafProps {
  state: LeafState;
  id: string;
  children?: React.ReactNode;
}

const WorkspaceLeaf: React.FC<WorkspaceLeafProps> = ({
  state,
  id,
  children,
}) => {
  return (
    <div
      id={id}
      className="workspace-leaf"
      style={{
        width: state.collapsed ? "0rem" : `${state.size}rem`,
      }}
    >
      {children}
    </div>
  );
};

export default WorkspaceLeaf;
