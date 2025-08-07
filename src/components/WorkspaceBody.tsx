import { AppStateContext } from "@/state/AppStateContext";
import { PanelTreeNode, TabGroup } from "@/state/AppStateTypes";
import { Splitter, Tabs } from "@ark-ui/react";
import { useContext } from "react";
import TextEditor from "./TextEditor";

const WorkspaceBody: React.FC = () => {
  const appState = useContext(AppStateContext);

  function renderBody(body: PanelTreeNode | TabGroup): React.ReactNode {
    switch (body.node_type) {
      case "node":
        return (
          <Splitter.Root
            orientation={body.orientation}
            panels={[{ id: body.left.uuid }, { id: body.right.uuid }]}
          >
            <Splitter.Panel id={body.left.uuid}>
              {renderBody(body.left)}
            </Splitter.Panel>
            <Splitter.ResizeTrigger
              id={`${body.left.uuid}:${body.right.uuid}`}
              aria-label="Resize"
            ></Splitter.ResizeTrigger>
            <Splitter.Panel id={body.right.uuid}>
              {renderBody(body.right)}
            </Splitter.Panel>
          </Splitter.Root>
        );
      case "leaf":
        return (
          <Tabs.Root>
            <Tabs.List>
              {body.tabs.map((tab) => {
                return (
                  <Tabs.Trigger value={tab.uuid}>{tab.title}</Tabs.Trigger>
                );
              })}
            </Tabs.List>
            {body.tabs.map((tab) => {
              return (
                <Tabs.Content value={tab.uuid}>
                  <TextEditor content={tab.contents.contents} />
                </Tabs.Content>
              );
            })}
          </Tabs.Root>
        );
    }
  }

  return renderBody(appState!.workspace_state);
};

export default WorkspaceBody;
