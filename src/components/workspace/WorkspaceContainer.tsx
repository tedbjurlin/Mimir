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
        flexGrow: 1,
      }}
    >
      {children}
    </div>
  );
};

export default WorkspaceContainer;
