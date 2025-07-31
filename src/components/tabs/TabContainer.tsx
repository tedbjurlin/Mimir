import { useCallback, useContext } from "react";
import Editor from "../Editor";
import TabBar from "./TabBar";
import { TabsContext, TabsDispatchContext } from "./TabContext";
import { ViewUpdate } from "@uiw/react-codemirror";
import { debug } from "@tauri-apps/plugin-log";
import "./TabContainer.scss";

const TabContainer: React.FC = () => {
  const tabsState = useContext(TabsContext);
  const dispatch = useContext(TabsDispatchContext);

  const selectedTab = tabsState!.tabs[tabsState!.selected_tab];

  const onChange = useCallback(
    (val: string, _viewUpdate: any) => {
      //console.log('val:', val);
      if ("contents" in selectedTab.content) {
        dispatch!({
          type: "update-content",
          content: {
            ...selectedTab.content,
            contents: val,
          },
        });
      }
    },
    [selectedTab]
  );

  var editor;
  if ("filetype" in selectedTab.content) {
    editor = (
      <Editor contents={selectedTab.content.contents} onChange={onChange} />
    );
  }

  for (var tab of tabsState!.tabs) {
    if ("contents" in tab.content) {
      debug(
        `Tab: ${tab.content.name} | Current contents: ${tab.content.contents}`
      );
    }
  }

  return (
    <div className="tab-container">
      <TabBar></TabBar>
      {editor}
    </div>
  );
};

export default TabContainer;
