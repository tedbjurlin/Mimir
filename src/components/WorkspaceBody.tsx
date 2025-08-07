import {
  AppStateContext,
  AppStateDispatchContext,
} from "@/state/AppStateContext";
import { PanelTreeNode, TabGroupNode } from "@/state/AppStateTypes";
import { Splitter, Tabs } from "@ark-ui/react";
import { useContext } from "react";
import TextEditor from "./TextEditor";
import { XIcon } from "lucide-react";

const WorkspaceBody: React.FC = () => {
  const appState = useContext(AppStateContext)!;
  const dispatch = useContext(AppStateDispatchContext)!;

  function calculateID(path: string[]): string {
    return (
      "workspace-panel" +
      path.reduce((acc, curr) => {
        return acc + "-" + curr;
      })
    );
  }

  function handleCloseTab(
    uuid: `${string}-${string}-${string}-${string}-${string}`,
    path: ("left" | "right")[]
  ) {
    dispatch({
      type: "close_tab",
      uuid,
      path,
    });
  }

  function renderBody(body: PanelTreeNode | TabGroupNode): React.ReactNode {
    switch (body.node_type) {
      case "node":
        return (
          <Splitter.Root
            orientation={body.orientation}
            panels={[
              { id: calculateID([...body.path, "left"]) },
              { id: calculateID([...body.path, "right"]) },
            ]}
          >
            <Splitter.Panel id={calculateID([...body.path, "left"])}>
              {renderBody(body.left)}
            </Splitter.Panel>
            <Splitter.ResizeTrigger
              id={`${calculateID([...body.path, "left"])}:${calculateID([
                ...body.path,
                "right",
              ])}`}
              aria-label="Resize"
            ></Splitter.ResizeTrigger>
            <Splitter.Panel id={calculateID([...body.path, "right"])}>
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
                  <Tabs.Trigger key={tab.uuid} value={tab.uuid}>
                    {tab.title}
                    <button
                      className="close-tab-button icon-button"
                      onClick={() => {
                        handleCloseTab(tab.uuid, body.path);
                      }}
                    >
                      <XIcon />
                    </button>
                  </Tabs.Trigger>
                );
              })}
            </Tabs.List>
            {body.tabs.map((tab) => {
              return (
                <Tabs.Content key={tab.uuid} value={tab.uuid}>
                  <TextEditor file={tab.contents} tab_path={body.path} />
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
