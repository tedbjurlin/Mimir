import NotesView from "./NotesView";

type LeftLeafProps = {
  selected_panel: string;
};

const LeftLeaf: React.FC<LeftLeafProps> = ({ selected_panel }) => {
  var panel: React.ReactNode;
  switch (selected_panel) {
    case "thought":
      panel = <NotesView />;
      break;
    case "search":
      panel = <>Search</>;
      break;
    default:
      panel = <NotesView />;
  }
  return <div className="workspace-leaf left-leaf">{panel}</div>;
};

export default LeftLeaf;
