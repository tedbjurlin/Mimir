import { Provider } from "@/components/ui/provider";
import "./App.css";
import Editor from "./components/Editor";

const App: React.FC = () => {
  return (
    <Provider>
      <Editor />
    </Provider>
  );
}

export default App;
