import { Splitter } from "@ark-ui/react";
import WorkspaceBody from "./WorkspaceBody";

const WorkspaceContainer: React.FC = () => {
  return (
    <div className="workspace-container">
      <Splitter.Root
        panels={[
          { id: "left-leaf", collapsible: true, minSize: 10 },
          { id: "workspace-body" },
          { id: "right-leaf", collapsible: true, minSize: 10 },
        ]}
      >
        <Splitter.Panel id="left-leaf">Left</Splitter.Panel>
        <Splitter.ResizeTrigger
          id="left-leaf:workspace-body"
          aria-label="Resize"
        />
        <Splitter.Panel id="workspace-body">
          <WorkspaceBody />
        </Splitter.Panel>
        <Splitter.ResizeTrigger
          id="workspace-body:right-leaf"
          aria-label="Resize"
        />
        <Splitter.Panel id="right-leaf">Right</Splitter.Panel>
      </Splitter.Root>
    </div>
  );
};

export default WorkspaceContainer;
