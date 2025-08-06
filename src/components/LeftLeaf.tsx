import NotesView from "./NotesView";

type LeftLeafProps = {
  selected_panel: string;
};

const LeftLeaf: React.FC<LeftLeafProps> = ({ selected_panel }) => {
  var panel: React.ReactNode;
  switch (selected_panel) {
    case "thought":
      panel = <NotesView title="Your Thoughts" directory={""} />;
      break;
    case "concept":
      panel = <NotesView title="Concept Notes" directory={""} />;
      break;
    case "Reference":
      panel = <NotesView title="Reference Notes" directory={""} />;
      break;
    case "search":
      panel = <>Search</>;
      break;
  }
  return <div className="workspace-leaf left-leaf">{panel}</div>;
};

export default LeftLeaf;
