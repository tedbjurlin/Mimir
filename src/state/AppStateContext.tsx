import {
  ActionDispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { AppState, AppStateAction } from "./AppStateTypes";
import { appStateReducer } from "./AppStateReducer";
import Database from "@tauri-apps/plugin-sql";
import { debug } from "@tauri-apps/plugin-log";
import {
  CONCEPTS_NOTES_FOLDER,
  REFERENCE_NOTES_FOLDER,
  SettingsContext,
  THOUGHTS_NOTES_FOLDER,
} from "./SettingsContext";
import { exists, lstat, readDir, watch } from "@tauri-apps/plugin-fs";
import { join } from "@tauri-apps/api/path";

const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appState, dispatch] = useReducer(appStateReducer, initialAppState());
  const settings = useContext(SettingsContext)!;

  useEffect(() => {
    const getFiles = async (filepath: string) => {
      const dir = await readDir(filepath);
      var files: { path: string; name: string }[] = [];

      for (const loc of dir) {
        if (loc.isDirectory) {
          files = files.concat(await getFiles(await join(filepath, loc.name)));
        } else {
          files.push({ path: await join(filepath, loc.name), name: loc.name });
        }
      }

      return files;
    };

    const checkFiles = async () => {
      const db = await Database.load("sqlite:test.db");

      const files = await db
        .select<{ filepath: string }[]>("SELECT filepath from documents")
        .catch((e) => debug(`Error: ${e}`))
        .then((fs) => new Set(fs!.map((f) => f.filepath)));

      debug(`${files.size}`);

      const thoughts_folder = await settings.get<string>(THOUGHTS_NOTES_FOLDER);
      const concepts_folder = await settings.get<string>(CONCEPTS_NOTES_FOLDER);
      const reference_folder = await settings.get<string>(
        REFERENCE_NOTES_FOLDER
      );

      const thoughts_files = await getFiles(thoughts_folder!);
      const concepts_files = await getFiles(concepts_folder!);
      const references_files = await getFiles(reference_folder!);

      for (const file of thoughts_files) {
        if (!files.has(file.path)) {
          db.execute(
            "INSERT into documents (filepath, name, type) VALUES ($1, $2, $3)",
            [file.path, file.name, "thought"]
          );
        }
      }
      for (const file of concepts_files) {
        if (!files.has(file.path)) {
          db.execute(
            "INSERT into documents (filepath, name, type) VALUES ($1, $2, $3)",
            [file.path, file.name, "concept"]
          );
        }
      }
      for (const file of references_files) {
        if (!files.has(file.path)) {
          db.execute(
            "INSERT into documents (filepath, name, type) VALUES ($1, $2, $3)",
            [file.path, file.name, "reference"]
          );
        }
      }
      for (const file of files) {
        debug(`Checking file: ${file}`);
        if (!(await exists(file)) || (await lstat(file)).isDirectory) {
          db.execute("DELETE FROM documents WHERE filepath = $1", [file]);
        }
        debug(`Done checking file: ${file}`);
      }

      debug(`${thoughts_folder!}`);

      await watch(
        thoughts_folder!,
        (_event) => {
          checkFiles();
        },
        {
          delayMs: 500,
          recursive: true,
        }
      );

      await watch(
        concepts_folder!,
        (_event) => {
          checkFiles();
        },
        {
          delayMs: 500,
          recursive: true,
        }
      );

      await watch(
        reference_folder!,
        (_event) => {
          checkFiles();
        },
        {
          delayMs: 500,
          recursive: true,
        }
      );
    };
    checkFiles();
  }, []);

  return (
    <AppStateDispatchContext value={dispatch}>
      <AppStateContext value={appState}>{children}</AppStateContext>
    </AppStateDispatchContext>
  );
};

export const AppStateContext = createContext<AppState | null>(null);
export const AppStateDispatchContext = createContext<ActionDispatch<
  [action: AppStateAction]
> | null>(null);

export default AppStateProvider;

function initialAppState(): AppState {
  return {
    workspace_state: {
      node_type: "leaf",
      path: [],
      tabs: [],
    },
  };
}
