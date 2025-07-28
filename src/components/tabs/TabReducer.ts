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
        return tabsReducer(prevState, {
          type: "select",
          file_loc: action.file_loc,
        })
      } else {
        const newTab: TabState = {
          selected: true,
          temporary: true,
          title: action.file_name!
        }

        // Not the behaviour I want. I would like new temp
        // tabs to replace in place, not at the end of the list.
        // As it stands, I would need to track tabs with uuids,
        // so that I could store them independently of contents.
        // This would need a more effective lookup method to find
        // tabs to file name.
        if (typeof prevState.temp_tab != undefined) {
          prevState.tabs.delete(prevState.temp_tab!);
        }
        prevState.tabs.set(action.file_loc, newTab)
        return {
          selected_tab: action.file_loc,
          temp_tab: action.file_loc,
          tabs: prevState.tabs
        }
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
