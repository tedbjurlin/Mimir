import "./App.scss";
import Editor from "./components/Editor";
import BodyContainer from "./components/BodyContainer";
import WorkspaceBody from "./components/workspace/WorkspaceBody";

const App: React.FC = () => {
  return (
    <div
      style={{
        marginLeft: 100,
      }}
    >
      <WorkspaceBody />
    </div>
  );
};

export default App;
