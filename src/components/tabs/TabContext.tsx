import {
  ActionDispatch,
  createContext,
  PropsWithChildren,
  useReducer,
} from "react";
import {
  createInitialTabsState,
  TabAction,
  tabsReducer,
  TabsState,
} from "./TabReducer";
import { debug } from "@tauri-apps/plugin-log";

export const TabsContext = createContext<TabsState | null>(null);
export const TabsDispatchContext = createContext<ActionDispatch<
  [action: TabAction]
> | null>(null);

export const TabsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tabsState, dispatch] = useReducer(
    tabsReducer,
    createInitialTabsState()
  );

  return (
    <TabsContext value={tabsState}>
      <TabsDispatchContext value={dispatch}>{children}</TabsDispatchContext>
    </TabsContext>
  );
};
