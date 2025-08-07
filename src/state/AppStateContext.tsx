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
  const group_1_uuid = crypto.randomUUID();
  const group_2_uuid = crypto.randomUUID();
  return {
    workspace_state: {
      node_type: "node",
      uuid: crypto.randomUUID(),
      orientation: "vertical",
      left: {
        uuid: group_1_uuid,
        node_type: "leaf",
        tabs: [
          {
            uuid: crypto.randomUUID(),
            group_uuid: group_1_uuid,
            title: "New Tab",
            contents: "Nothing to see here",
          },
        ],
      },
      right: {
        uuid: group_2_uuid,
        node_type: "leaf",
        tabs: [
          {
            uuid: crypto.randomUUID(),
            group_uuid: group_2_uuid,
            title: "New Tab 2",
            contents: "Nothing else to see here",
          },
        ],
      },
    },
  };
}
