import "./App.scss";
import Editor from "./components/Editor";
import BodyContainer from "./components/BodyContainer";
import WorkspaceBody from "./components/workspace/WorkspaceBody";
import { TabsProvider } from "./components/tabs/TabContext";

const App: React.FC = () => {
  return (
    <div
      style={{
        marginLeft: 100,
      }}
    >
      <TabsProvider>
        <WorkspaceBody />
      </TabsProvider>
    </div>
  );
};

export default App;
