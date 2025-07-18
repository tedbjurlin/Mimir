import { createContext } from "react";

export type TWorkspaceContext = {
  collapsePanel: (index: number) => void;
  expandPanel: (index: number) => void;
  getPanelSize: (index: number) => string;
  isPanelCollapsed: (index: number) => boolean;
  resizePanel: (index: number, size: string) => void;
  registerPanel: (panelData: PanelData) => void;
  registerResizer: () => number;
};

export type PanelData = {
  isCollapsible: boolean;
  isCollapsed: () => boolean;
  toggleCollapsed: () => void;
  minSize: number;
  maxSize: number;
  resizePanel: (newSize: number) => number;
};

export const WorkspaceContext = createContext<TWorkspaceContext | null>(null);
