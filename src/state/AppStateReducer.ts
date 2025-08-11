import { debug } from "@tauri-apps/plugin-log";
import { AppState, AppStateAction, TabGroupNode, WorkspaceNode } from "./AppStateTypes";
import { writeTextFile } from "@tauri-apps/plugin-fs";

export function appStateReducer(prevState: AppState, action: AppStateAction): AppState {
  switch (action.type) {
    case "close_tab": {
      const node = getNode(action.path, prevState.workspace_state);
      if (node === null || node.node_type !== "leaf") break;
      var idx = -1;
      for (let i = 0; i < node.tabs.length; i++) {
        if (node.tabs[i].uuid === action.uuid) {
          idx = i;
          break;
        }
      }
      if (idx === -1) break;
      // const newTabs = node.tabs.toSpliced(idx, 1);
      // const newNode = {
      //   ...node,
      //   tabs: newTabs,
      // }
      const newTabs = [...node.tabs]
      newTabs.splice(idx, 1);
      const newNode = {
        ...node,
        tabs: newTabs
      }
      const newState = setNode(action.path, prevState.workspace_state, newNode);
      if (newState !== null) {
        return {
          ...prevState,
          workspace_state: newState,
        }
      }
      break;
    }
    case "open_file": {
      const leaf = findFirstLeaf(prevState.workspace_state);
      const newTabs = [...leaf.tabs];
      newTabs.push({
        uuid: crypto.randomUUID(),
        title: action.title,
        contents: action.data,
      })
      const newState = setNode(leaf.path, prevState.workspace_state, {...leaf, tabs: newTabs});
      if (newState !== null) {
        return {
          ...prevState,
          workspace_state: newState,
        }
      }
      break;
    }
    case "update_content": {
      debug(action.data.contents);
      writeTextFile(action.data.filepath, action.data.contents);
      const node = getNode(action.path, prevState.workspace_state);
      if (node === null || node.node_type !== "leaf") break;
      var idx = -1;
      for (var i = 0; i < node.tabs.length, i++;) {
        if (node.tabs[i].title = action.title) {
          idx = i;
          break;
        }
      }
      if (idx === -1) break;
      const newTabs = [...node.tabs];
      newTabs[idx] = {
        ...newTabs[idx],
        contents: action.data
      }
      const newNode = {
        ...node,
        tabs: newTabs,
      }
      const newState = setNode(action.path, prevState.workspace_state, newNode);
      if (newState !== null) {
        return {
          ...prevState,
          workspace_state: newState,
        }
      }

      break;
    }
  }
  return prevState;
}

function getNode(path: ("left" | "right")[], root: WorkspaceNode): WorkspaceNode | null {
  if (path.length > 0 && root.node_type !== "node") {
    return null
  } else if (path.length <= 0) {
    return root;
  } else if (root.node_type === "node") {
    return getNode(path.slice(1), root[path[0]])
  } else {
    return null;
  }
}

function setNode(path: ("left" | "right")[], root: WorkspaceNode, node: WorkspaceNode): WorkspaceNode | null {
  if (path.length > 0 && root.node_type !== "node") {
    return null
  } else if (path.length <= 0) {
    return node;
  } else if (root.node_type === "node") {
    const newNode = setNode(path.slice(1), root[path[0]], node);
    if (newNode === null) return null;
    if (path[0] === "left") {
      return {
        ...root,
        left: newNode,
      }
    } else {
      return {
        ...root,
        right: newNode,
      }
    }
  } else {
    return null;
  }
}

function findFirstLeaf(root: WorkspaceNode): TabGroupNode {
  if (root.node_type === "leaf") {
    return root;
  } else {
    return findFirstLeaf(root.left);
  }
}