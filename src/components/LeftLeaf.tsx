import { useContext, useEffect, useState } from "react";
import NotesView from "./NotesView";
import { SettingsContext } from "@/state/SettingsContext";

type LeftLeafProps = {
  selected_panel: string;
};

const LeftLeaf: React.FC<LeftLeafProps> = ({ selected_panel }) => {
  const settings = useContext(SettingsContext)!;
  const [thoughtsFolder, setThoughtsFolder] = useState<string | undefined>(
    undefined
  );
  const [conceptsFolder, setConceptsFolder] = useState<string | undefined>(
    undefined
  );
  const [referenceFolder, setReferenceFolder] = useState<string | undefined>(
    undefined
  );

  const panelStyle = (panel: string) => {
    return selected_panel === panel
      ? {}
      : {
          style: {
            display: "none",
          },
        };
  };

  useEffect(() => {
    async function getFilePaths() {
      setThoughtsFolder(await settings.get("thoughts-notes-folder"));
      setConceptsFolder(await settings.get("concepts-notes-folder"));
      setReferenceFolder(await settings.get("reference-notes-folder"));
    }
    getFilePaths();
  }, [settings]);

  return (
    <div className="workspace-leaf left-leaf">
      <NotesView
        title="Thought Notes"
        directory={thoughtsFolder}
        {...panelStyle("thought")}
      />
      <NotesView
        title="Concept Notes"
        directory={conceptsFolder}
        {...panelStyle("concept")}
      />
      <NotesView
        title="Reference Notes"
        directory={referenceFolder}
        {...panelStyle("reference")}
      />
      <div {...panelStyle("search")}>Search</div>
    </div>
  );
};

export default LeftLeaf;
