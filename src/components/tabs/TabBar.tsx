import { useContext } from "react";
import { TabsContext } from "./TabContext";
import Tab from "./Tab";

type TabBarProps = {
  children?: React.ReactNode;
};

const TabBar: React.FC<TabBarProps> = ({ children }) => {
  const tabsState = useContext(TabsContext);

  const tabs = tabsState?.tabs.entries().map(([uuid, tabState]) => {
    return <Tab key={uuid} uuid={uuid} state={tabState} />;
  });

  return (
    <div className="tab-bar">
      <div className="tab-bar__scroll-container">{tabs}</div>
      <div className="tab-bar__right-menu">{children}</div>
    </div>
  );
};

export default TabBar;
