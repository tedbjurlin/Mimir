import { useContext, useEffect, useState } from "react";
import { WorkspaceContext, PanelData } from "./WorkspaceContext";

interface WorkspaceLeafProps {
  initialSize?: number;
  children?: React.ReactNode;
  minSize?: number;
  maxSize?: number;
}

const WorkspaceLeaf: React.FC<WorkspaceLeafProps> = ({
  initialSize,
  children,
  minSize = 10,
  maxSize = 10,
}) => {
  const context = useContext(WorkspaceContext);
  if (context === null) {
    throw Error(`Leaves mut be rendered in a WorkspaceBody container`);
  }

  const { registerPanel, ..._ } = context;

  const [size, setSize] = useState(initialSize);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const isCollapsed = () => {
      return collapsed;
    };

    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };

    const resizeLeaf = (newSize: number) => {
      if (newSize > maxSize) {
        setSize(maxSize);
        return maxSize;
      } else if (newSize < minSize) {
        setSize(minSize);
        return minSize;
      } else {
        setSize(newSize);
        return newSize;
      }
    };

    const panelData: PanelData = {
      isCollapsible: true,
      isCollapsed: isCollapsed,
      toggleCollapsed: toggleCollapsed,
      minSize: minSize,
      maxSize: maxSize,
      resizePanel: resizeLeaf,
    };

    registerPanel(panelData);
  });

  return (
    <div
      className="workspace-leaf"
      style={{
        width: collapsed ? "0rem" : `${size}rem`,
      }}
    >
      {children}
    </div>
  );
};

export default WorkspaceLeaf;
