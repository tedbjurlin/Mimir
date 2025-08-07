import {
  createContext,
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Store } from "@tauri-apps/plugin-store";
import { open } from "@tauri-apps/plugin-dialog";
import SelectDirectories from "@/components/SelectDirectories";

const SettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [store, setStore] = useState<Store | null>(null);

  useLayoutEffect(() => {
    async function getStore() {
      const store = await Store.get(".settings.json");
      setStore(store);
    }
    getStore();
  });

  return store !== null ? (
    <SettingsContext value={store}>{children}</SettingsContext>
  ) : (
    <SelectDirectories setStore={setStore} />
  );
};

export const SettingsContext = createContext<Store | null>(null);

export default SettingsProvider;
