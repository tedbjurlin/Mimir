import { PropsWithChildren } from "react";

export interface ResizableHandleProps {
  isResizing: boolean;
  handleMouseDown: any;
}

const ResizableHandle: React.FC<ResizableHandleProps> = ({isResizing, handleMouseDown}) => {
    
  return (
    <div
      className={`absolute w-1 top-0 bottom-0 right-0 cursor-col-resize hover:bg-blue-600 ${
        isResizing ? "bg-blue-600" : ""
      }`}
      onMouseDown={handleMouseDown}
    />
  );
}