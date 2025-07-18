import { createContext } from "react";

export type TWorkspaceContext = {
  collapsePanel: (index: number) => void;
  expandPanel: (index: number) => void;
  getPanelSize: (index: number) => number;
  isPanelCollapsed: (index: number) => boolean;
  resizePanel: (index: number, size: number) => void;
}

export const WorkspaceContext = createContext<TWorkspaceContext | null>(null);

