import { useState } from "react";
import "./WorkspaceResizer.css";

const WorkspaceResizer: React.FC = () => {
  const [resizing, setResizing] = useState(false);

  return (
    <div className="workspace-resizer">
      <div
        className="workspace-resizer__handle"
        style={{
          backgroundColor: resizing ? "gray" : "transparent",
        }}
      ></div>
    </div>
  );
};

export default WorkspaceResizer;
