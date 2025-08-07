export interface WorkspaceContainerProps {
  children?: React.ReactNode;
}

const WorkspaceContainer: React.FC<WorkspaceContainerProps> = ({
  children,
}) => {
  return (
    <div
      className="workspace-container"
      style={{
        flex: "1 1 auto",
      }}
    >
      {children}
    </div>
  );
};

export default WorkspaceContainer;
