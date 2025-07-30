import { useContext } from "react";
import { TabsContext } from "./TabContext";
import Tab from "./Tab";
import "./TabBar.scss";
import { debug } from "@tauri-apps/plugin-log";

type TabBarProps = {
  children?: React.ReactNode;
};

const TabBar: React.FC<TabBarProps> = ({ children }) => {
  const tabsState = useContext(TabsContext);

  // debug(`${tabsState?.tabs.size}`);

  const tabs = tabsState?.tabs.entries().map(([file_loc, tabState]) => {
    debug(file_loc);
    return <Tab key={file_loc} file_loc={file_loc} state={tabState} />;
  });

  return (
    <div className="tab-bar">
      <div className="tab-bar__scroll-container">{tabs}</div>
      <div className="tab-bar__right-menu">{children}</div>
    </div>
  );
};

export default TabBar;
