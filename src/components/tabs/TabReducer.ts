import { debug } from "@tauri-apps/plugin-log";

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
  Markdown,
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
  var newTabs = [...prevState.tabs];
  switch (action.type) {
    case "select": {
      if (typeof action.target_key === "undefined") break;
      if (action.target_key == prevState.tabs[prevState.selected_tab].content.key) break;
      const tab = findTabByKey(action.target_key!, prevState.tabs);

      if (tab != null) {
        const newTab: TabState = {
          ...tab[1],
          selected: true,
        }

        newTabs[tab[0]] = newTab;

        return {
          ...prevState,
          selected_tab: tab[0],
          tabs: newTabs,
        }
      }
      break;
    }
    case "open": {
      if (typeof action.content === "undefined") break;
      debug(`${action.content.key}`);
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

        var newTabLoc;

        if (typeof prevState.temp_tab !== "undefined") {
            newTabs[prevState.temp_tab!] = newTab;
            newTabLoc = prevState.temp_tab!;
        } else {
          newTabs.concat(newTab);
          newTabLoc = prevState.tabs.length;
        }

        return {
          selected_tab: newTabLoc,
          temp_tab: newTabLoc,
          tabs: newTabs
        }
      }
    }
    case "close": {
      if (typeof action.target_key === "undefined") break;
      const tab = findTabByKey(action.target_key!, prevState.tabs);

      if (tab == null) {
        break;
      } else {
        newTabs.splice(tab[0])
        
        var new_selected_tab;
        if (prevState.selected_tab == tab[0]) {
          if (newTabs.length > 0) {
            new_selected_tab = 0;
            newTabs[new_selected_tab] = {
              ...newTabs[new_selected_tab],
              selected: true,
            }
          } else {
            return createInitialTabsState();
          }
        } else {
          new_selected_tab = prevState.selected_tab;
        }
  
        return {
          temp_tab: prevState.temp_tab == tab[0] ? undefined : prevState.temp_tab,
          selected_tab: new_selected_tab,
          tabs: newTabs,
        }
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

export function createInitialTabsState(): TabsState {
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
    selected_tab: 0,
    temp_tab: 0,
    tabs: tabList,
  }
}
