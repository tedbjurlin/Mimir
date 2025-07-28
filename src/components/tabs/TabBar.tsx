import { useContext } from "react";
import { TabsContext } from "./TabContext";
import Tab from "./Tab";

type TabBarProps = {
  children?: React.ReactNode;
};

const TabBar: React.FC<TabBarProps> = ({ children }) => {
  const tabsState = useContext(TabsContext);

  const tabs = tabsState?.tabs.entries().map(([file_loc, tabState]) => {
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
