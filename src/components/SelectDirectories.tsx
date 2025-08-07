import { open } from "@tauri-apps/plugin-dialog";
import { load, Store } from "@tauri-apps/plugin-store";
import { FolderIcon } from "lucide-react";
import { useState } from "react";
import { debug } from "@tauri-apps/plugin-log";

type SelectDirectoriesProps = {
  setStore: (store: Store | null) => void;
};

const SelectDirectories: React.FC<SelectDirectoriesProps> = ({ setStore }) => {
  const [thoughtsFolder, setThoughtsFolder] = useState<string | null>(null);
  const [conceptsFolder, setConceptsFolder] = useState<string | null>(null);
  const [referenceFolder, setReferenceFolder] = useState<string | null>(null);

  async function handleThoughtsButton() {
    const folder = await open({
      multiple: false,
      directory: true,
      recursive: true,
      title: "Pick a Thoughts Folder",
    });

    setThoughtsFolder(folder);

    debug(`${thoughtsFolder}`);
    debug(`${conceptsFolder}`);
    debug(`${referenceFolder}`);
  }

  async function handleConceptsButton() {
    const folder = await open({
      multiple: false,
      directory: true,
      recursive: true,
      title: "Pick a Concept Note Folder",
    });

    setConceptsFolder(folder);
    debug(`${thoughtsFolder}`);
    debug(`${conceptsFolder}`);
    debug(`${referenceFolder}`);
  }

  async function handleReferenceButton() {
    const folder = await open({
      multiple: false,
      directory: true,
      recursive: true,
      title: "Pick a Reference Note Folder",
    });

    setReferenceFolder(folder);
    debug(`${thoughtsFolder}`);
    debug(`${conceptsFolder}`);
    debug(`${referenceFolder}`);
  }

  async function handleOKButton() {
    debug(`${thoughtsFolder}`);
    debug(`${conceptsFolder}`);
    debug(`${referenceFolder}`);
    if (
      thoughtsFolder === null ||
      conceptsFolder === null ||
      referenceFolder === null
    )
      return;

    const store = await load(".settings.json");

    debug(`${store.length}`);

    store.set("thoughts-notes-folder", thoughtsFolder);
    store.set("concepts-notes-folder", conceptsFolder);
    store.set("reference-notes-folder", referenceFolder);
    store.save();
    setStore(store);
  }

  return (
    <div className="select-directories">
      <h1>Select Notes Folders</h1>
      <hr />
      <button
        className="select-directories-button"
        onClick={handleThoughtsButton}
      >
        Select Thoughts Folder
        <FolderIcon />
      </button>
      <button
        className="select-directories-button"
        onClick={handleConceptsButton}
      >
        Select Concepts Folder
        <FolderIcon />
      </button>
      <button
        className="select-directories-button"
        onClick={handleReferenceButton}
      >
        Select Reference Folder
        <FolderIcon />
      </button>
      <button onClick={handleOKButton}>OK</button>
    </div>
  );
};

export default SelectDirectories;
