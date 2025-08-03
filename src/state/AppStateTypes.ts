export type AppState = {
  workspace_state: PanelTreeNode | TabGroup;
}

export type PanelTreeNode = {
  node_type: "node";
  uuid: `${string}-${string}-${string}-${string}-${string}`;
  /// When orientation is vertical: left is top and right is bottom
  orientation: "vertical" | "horizontal";
  left: PanelTreeNode | TabGroup;
  right: PanelTreeNode | TabGroup;
}

export type TabGroup = {
  node_type: "leaf";
  uuid: `${string}-${string}-${string}-${string}-${string}`;
  tabs: Tab[];
}

export type Tab = {
  uuid: `${string}-${string}-${string}-${string}-${string}`;
  group_uuid: `${string}-${string}-${string}-${string}-${string}`;
  title: string;
  contents: string;
}

export type AppStateAction = AppStateTabAction | AppStateContentAction;

type AppStateTabAction = {
  type: "close_tab";
  uuid: `${string}-${string}-${string}-${string}-${string}`;
}

type AppStateContentAction = {
  type: "open_file" | "update_content";
  title: string;
  content: string;
}