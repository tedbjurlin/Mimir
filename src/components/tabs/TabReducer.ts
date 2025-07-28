export type TabState = {
  selected: boolean;
  temporary: boolean;
  title: string;
};

export type TabsState = {
  selected_tab: string,
  temp_tab?: string,
  tabs: Map<string, TabState>
}

export type TabAction = {
  type: "select" | "activate" | "open" | "close";
  file_loc: string;
  file_name?: string;
};

export function tabsReducer(
  prevState: TabsState,
  action: TabAction
): TabsState {
  switch (action.type) {
    case "select": {
      if (action.file_loc == prevState.selected_tab) break;
      if (!prevState.tabs.has(action.file_loc)) break;
      
      prevState.tabs.set(action.file_loc, {
        ...prevState.tabs.get(action.file_loc)!,
        selected: false
      });

      return {
        ...prevState,
        selected_tab: action.file_loc,
      }
    }
    case "open": {
      if (typeof action.file_name == undefined) break;
      if (prevState.tabs.has(action.file_loc)) {

      }
    }
  }
  return prevState;
}

export function createInitialTabState(): TabsState {
  const uuid = crypto.randomUUID();
  const tabMap: Map<string, TabState> = new Map([
    [uuid, {
      selected: true,
      temporary: true,
      title: 'New Tab'
    }]
  ])

  return {
    selected_tab: uuid,
    tabs: tabMap,
  }
}
