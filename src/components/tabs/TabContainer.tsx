import TabBar from "./TabBar";
import { TabsProvider } from "./TabContext";

const TabContainer: React.FC = () => {
  return (
    <div className="tab-container">
      <TabsProvider>
        <TabBar></TabBar>
      </TabsProvider>
    </div>
  );
};

export default TabContainer;
