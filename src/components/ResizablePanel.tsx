import { PropsWithChildren, useEffect, useState } from "react";

export interface ResizablePanelProps {
    initialSize?: number;
    grow?: boolean;
}

const ResizablePanel: React.FC<PropsWithChildren<ResizablePanelProps>> = ({ initialSize, grow, children }) => {
    const [size, setSize] = useState(initialSize);
    const [isResizing, setIsResizing] = useState(false);

    const handleMouseDown = () => setIsResizing(true);

    useEffect(() => {
        const handleMouseMove = (e: { movementX: any; }) => {
            if (!isResizing) return;

            const movement = e.movementX;
            setSize(size + movement);
        }
        const handleMouseUp = () => setIsResizing(false);

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }
    }, [size, isResizing])

    return (
        <div
            className={`${grow ? "grow" : ""} shrink-0`}
            onMouseDown={handleMouseDown}
            style={{
                width: `${size}px`
            }}
        >
            {children}
        </div>
    );
}

export default ResizablePanel;