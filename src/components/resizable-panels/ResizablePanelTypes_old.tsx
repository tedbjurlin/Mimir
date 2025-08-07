export type PanelState = {
  panels: Map<`${string}-${string}-${string}-${string}-${string}`, PanelData>;
  resizers: Map<`${string}-${string}-${string}-${string}-${string}`, number>;
};

export type PanelData = {
  index: number;
  size: number;
  collapsed: number;
  constraints: PanelConstraints;
};

export type PanelConstraints = {
  initialSize: number;
  minSize: number;
  maxSize: number;
  collapsible: boolean;
};

export type ResizerData = {
  position: number;
  afterPanel: number;
};

export type PanelAction =
  | {
      type: "collapse";
      uuid: `${string}-${string}-${string}-${string}-${string}`;
    }
  | {
      type: "expand";
      uuid: `${string}-${string}-${string}-${string}-${string}`;
    }
  | {
      type: "drag-resizer";
      uuid: `${string}-${string}-${string}-${string}-${string}`;
    }
  | {
      type: "resize-panel";
      uuid: `${string}-${string}-${string}-${string}-${string}`;
    }
  | {
      type: "register-panel";
      uuid: `${string}-${string}-${string}-${string}-${string}`;
    }
  | {
      type: "register-resizer";
      uuid: `${string}-${string}-${string}-${string}-${string}`;
    };
