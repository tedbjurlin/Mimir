import { ActionDispatch, createContext, useReducer } from "react";
import { AppState, AppStateAction } from "./AppStateTypes";
import { appStateReducer } from "./AppStateReducer";

const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appState, dispatch] = useReducer(appStateReducer, initialAppState());

  return (
    <AppStateContext value={appState}>
      <AppStateDispatchContext value={dispatch}>
        {children}
      </AppStateDispatchContext>
    </AppStateContext>
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
      uuid: crypto.randomUUID(),
      tabs: [],
    },
  };
}
