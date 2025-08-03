import "./App.scss";
import TitleBar from "./components/TitleBar";
import WorkspaceContainer from "./components/WorkspaceContainer";

const App: React.FC = () => {
  return (
    <>
      <TitleBar />
      <WorkspaceContainer />
    </>
  );
};

export default App;
