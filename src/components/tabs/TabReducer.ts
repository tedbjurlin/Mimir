export type TabState = {
  selected: boolean;
  temporary: boolean;
  title: string;
};

export type TabsState = {
  selected_tab: `${string}-${string}-${string}-${string}-${string}`,
  temp_tab?: `${string}-${string}-${string}-${string}-${string}`,
  tabs: Map<`${string}-${string}-${string}-${string}-${string}`, TabState>
}

export type TabAction = {
  type: "select" | "activate" | "open" | "close";
  uuid?: `${string}-${string}-${string}-${string}-${string}`;
  file_url?: string;
};

export function tabsReducer(
  prevState: TabsState,
  action: TabAction
): TabsState {
  switch (action.type) {
    case "select": {
      if (typeof action.uuid == undefined) break;
      if (action.uuid! == prevState.selected_tab) break;
      if (!prevState.tabs.has(action.uuid!)) break;
      
      prevState.tabs.set(action.uuid!, {
        ...prevState.tabs.get(action.uuid!)!,
        selected: false
      });

      return {
        ...prevState,
        selected_tab: action.uuid!,
      }
    }
  }
  return prevState;
}

// export function initialWorkspaceState(
//   initialLeftSize: number,
//   initialRightSize: number,
//   constraints: WorkspaceConstraints
// ): WorkspaceState {
//   return {
//     left: {
//       size: initialLeftSize,
//       collapsed: false,
//     },
//     right: {
//       size: initialRightSize,
//       collapsed: true,
//     },
//     constraints,
//   };
// }
