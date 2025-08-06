import { useEffect } from "react";
import "./App.scss";
import TitleBar from "./components/TitleBar";
import WorkspaceContainer from "./components/WorkspaceContainer";
import AppStateProvider from "./state/AppStateContext";

const App: React.FC = () => {
  useEffect(() => {
    document.body.setAttribute("data-theme", "light");

    return () => {
      document.body.removeAttribute("data-theme");
    };
  });

  return (
    <AppStateProvider>
      <TitleBar />
      <WorkspaceContainer />
    </AppStateProvider>
  );
};

export default App;
