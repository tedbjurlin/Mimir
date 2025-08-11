import {
  createContext,
  PropsWithChildren,
  useLayoutEffect,
  useState,
} from "react";
import { Store } from "@tauri-apps/plugin-store";
import SelectDirectories from "@/components/SelectDirectories";
import { debug } from "@tauri-apps/plugin-log";

const SettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [store, setStore] = useState<Store | null>(null);
  const [loaded, setLoaded] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    async function getStore() {
      const store = await Store.load(".settings.json");
      setStore(store);
      debug(`store acquired: ${store}`);

      if (
        (await store.has("thoughts-notes-folder")) &&
        (await store.has("concepts-notes-folder")) &&
        (await store.has("reference-notes-folder"))
      ) {
        setLoaded(true);
      }
    }
    getStore();
  }, []);

  if (loaded === true) {
    return <SettingsContext value={store}>{children}</SettingsContext>;
  } else if (loaded === false) {
    return <SelectDirectories setStore={setStore} />;
  } else {
    return <div></div>;
  }
};

export const SettingsContext = createContext<Store | null>(null);

export default SettingsProvider;
