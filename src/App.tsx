import "./App.scss";
import TitleBar from "./components/TitleBar";
import WorkspaceContainer from "./components/WorkspaceContainer";
import AppStateProvider from "./state/AppStateContext";

const App: React.FC = () => {
  return (
    <AppStateProvider>
      <TitleBar />
      <WorkspaceContainer />
    </AppStateProvider>
  );
};

export default App;
