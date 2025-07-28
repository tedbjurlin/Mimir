import {
  ActionDispatch,
  createContext,
  PropsWithChildren,
  useReducer,
} from "react";
import {
  createInitialTabState,
  TabAction,
  tabsReducer,
  TabsState,
} from "./TabReducer";

export const TabsContext = createContext<TabsState | null>(null);
export const TabsDispatchContext = createContext<ActionDispatch<
  [action: TabAction]
> | null>(null);

export const TabsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tabsState, dispatch] = useReducer(
    tabsReducer,
    createInitialTabState()
  );

  return (
    <TabsContext value={tabsState}>
      <TabsDispatchContext value={dispatch}>{children}</TabsDispatchContext>
    </TabsContext>
  );
};
