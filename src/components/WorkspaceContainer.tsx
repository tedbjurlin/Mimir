import { Splitter } from "@ark-ui/react";
import WorkspaceBody from "./WorkspaceBody";
import NotesView from "./NotesView";
import SideDock from "./SideDock";
import LeftLeaf from "./LeftLeaf";
import { useState } from "react";
import "@/style/WorkspaceContainer.scss";

const WorkspaceContainer: React.FC = () => {
  const [leftSelectedPanel, setLeftSelectedPanel] = useState("thought");

  return (
    <div className="workspace-container">
      <SideDock
        left_panel={leftSelectedPanel}
        set_left_panel={setLeftSelectedPanel}
      />
      <Splitter.Root
        panels={[
          { id: "left-leaf", collapsible: true, minSize: 10 },
          { id: "workspace-body" },
          { id: "right-leaf", collapsible: true, minSize: 10 },
        ]}
      >
        <Splitter.Panel id="left-leaf">
          <LeftLeaf selected_panel={leftSelectedPanel} />
        </Splitter.Panel>
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
