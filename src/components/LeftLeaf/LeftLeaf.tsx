import { useContext, useEffect, useState } from "react";
import NotesView from "@/components/FileListing";
import {
  CONCEPTS_NOTES_FOLDER,
  REFERENCE_NOTES_FOLDER,
  SettingsContext,
  THOUGHTS_NOTES_FOLDER,
} from "@/components/SettingsProvider";

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
      setThoughtsFolder(await settings.get(THOUGHTS_NOTES_FOLDER));
      setConceptsFolder(await settings.get(CONCEPTS_NOTES_FOLDER));
      setReferenceFolder(await settings.get(REFERENCE_NOTES_FOLDER));
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
