export type AppState = {
  workspace_state: PanelTreeNode | TabGroupNode;
}

export type WorkspaceNode = PanelTreeNode | TabGroupNode;

export type PanelTreeNode = {
  node_type: "node";
  uuid: `${string}-${string}-${string}-${string}-${string}`;
  /// When orientation is vertical: left is top and right is bottom
  orientation: "vertical" | "horizontal";
  left: WorkspaceNode;
  right: WorkspaceNode;
  path: ("left" | "right")[]
}

export type TabGroupNode = {
  node_type: "leaf";
  path: ("left" | "right")[]
  tabs: Tab[];
}

export type Tab = {
  uuid: `${string}-${string}-${string}-${string}-${string}`;
  title: string;
  contents: FileData;
}

export type AppStateAction = AppStateTabAction | AppStateContentAction | AppStateOpenAction;

type AppStateTabAction = {
  type: "close_tab";
  uuid: `${string}-${string}-${string}-${string}-${string}`;
  path: ("left" | "right")[];
}

type AppStateOpenAction = {
  type: "open_file";
  title: string;
  data: FileData;
}

type AppStateContentAction = {
  type: "update_content";
  title: string;
  data: FileData;
  path: ("left" | "right")[];
}

export type FileData = {
  name: string;
  filepath: string;
  contents: string;
}