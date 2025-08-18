import { Splitter } from "@ark-ui/react";
import MainPanel from "@/components/MainPanel";
import SideDock from "@/components/SideDock";
import LeftLeaf from "@/components/LeftLeaf";
import { useState } from "react";

const Workspace: React.FC = () => {
  const [leftSelectedPanel, setLeftSelectedPanel] = useState("thought");

  return (
    <div className="workspace">
      <SideDock
        left_panel={leftSelectedPanel}
        set_left_panel={setLeftSelectedPanel}
      />
      <Splitter.Root
        panels={[
          { id: "left-leaf", collapsible: true, minSize: 10 },
          { id: "main-panel" },
          { id: "right-leaf", collapsible: true, minSize: 10 },
        ]}
      >
        <Splitter.Panel id="left-leaf">
          <LeftLeaf selected_panel={leftSelectedPanel} />
        </Splitter.Panel>
        <Splitter.ResizeTrigger id="left-leaf:main-panel" aria-label="Resize" />
        <Splitter.Panel id="main-panel">
          <MainPanel />
        </Splitter.Panel>
        <Splitter.ResizeTrigger
          id="main-panel:right-leaf"
          aria-label="Resize"
        />
        <Splitter.Panel id="right-leaf">Right</Splitter.Panel>
      </Splitter.Root>
    </div>
  );
};

export default Workspace;
