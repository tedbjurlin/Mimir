import { useEffect } from "react";
import "./App.scss";
import TitleBar from "@/components/TitleBar";
import Workspace from "@/components/Workspace";
import AppStateProvider from "@/components/AppStateProvider";

const App: React.FC = () => {
  useEffect(() => {});

  useEffect(() => {
    document.body.setAttribute("data-theme", "light");

    return () => {
      document.body.removeAttribute("data-theme");
    };
  });

  return (
    <AppStateProvider>
      <TitleBar />
      <Workspace />
    </AppStateProvider>
  );
};

export default App;
