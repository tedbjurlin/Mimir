export type TabState = {
  selected: boolean;
  temporary: boolean;
  content: TabContent;
};

// all members must at least contain a field called name
export type TabContent = TabContentBase & (TextFile | EmptyTab);

export type TabContentBase = {
  key: TabKey;
  name: string;
}

export type TabKey = string;

export type TextFile = {
  name: string;
  file_loc: string;
  filetype: TextFileType;
}

export type EmptyTab = {}

export enum TextFileType {
  PlainText,
  MarkDown,
}

export type TabsState = {
  selected_tab: number,
  temp_tab?: number,
  tabs: TabState[];
}

export type TabAction = {
  type: "select" | "activate" | "open" | "close";
  target_key?: TabKey;
  content?: TabContent;
};

export function tabsReducer(
  prevState: TabsState,
  action: TabAction
): TabsState {
  switch (action.type) {
    case "select": {
      if (typeof action.target_key == undefined) break;
      if (action.target_key == prevState.tabs[prevState.selected_tab].content.key) break;
      const tab = findTabByKey(action.target_key!, prevState.tabs);

      if (tab != null) {
        const newTab: TabState = {
          ...tab[1],
          selected: true,
        }

        prevState.tabs[tab[0]] = newTab;

        return {
          ...prevState,
          selected_tab: tab[0],
          tabs: prevState.tabs,
        }
      }
      break;
    }
    case "open": {
      if (typeof action.content == undefined) break;
      const tab = findTabByKey(action.content!.key, prevState.tabs);

      if (tab != null) {
        return tabsReducer(prevState, {
          type: "select",
          target_key: tab[1].content.key,
        })
      } else {
        const newTab: TabState = {
          selected: true,
          temporary: true,
          content: action.content!
        }

        if (typeof prevState.temp_tab != undefined) {
          if (prevTempTab != null) {
            prevState.tabs[prevTempTab[0]] = newTab;
          } else {
            prevState.tabs
          }
        } else {
          prevState.tabs.concat(newTab);
        }

        return {
          selected_tab: action.file_loc,
          temp_tab: action.file_loc,
          tabs: copyMap(prevState.tabs)
        }
      }
    }
    case "close": {
      if (!prevState.tabs.has(action.file_loc)) break;

      prevState.tabs.delete(action.file_loc);

      var new_selected_tab;
      if (prevState.selected_tab == action.file_loc) {
        if (prevState.tabs.size > 0) {
          [new_selected_tab] = prevState.tabs.keys();
          prevState.tabs.set(new_selected_tab, {
            ...prevState.tabs.get(new_selected_tab)!,
            selected: true,
          })
        } else {
          new_selected_tab = ""
        }
      } else {
        new_selected_tab = prevState.selected_tab;
      }

      return {
        ...prevState,
        selected_tab: new_selected_tab,
        tabs: copyMap(prevState.tabs),
      }
    }
  }
  return prevState;
}

function findTabByKey(key: TabKey, tabs: TabState[]): [number, TabState] | null {
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].content.key == key) {
      return [i, tabs[i]]
    }
  }
  return null;
}

export function createInitialTabState(): TabsState {
  const uuid = crypto.randomUUID();
  const tabList : TabState[] = [
    {
      selected: true,
      temporary: true,
      content: {
        name: 'New Tab',
        key: uuid,
      }
    }
  ];

  return {
    selected_tab: uuid,
    temp_tab: uuid,
    tabs: tabList,
  }
}
