export type WorkspaceState = {
  left: LeafState;
  right: LeafState;
  constraints: WorkspaceConstraints;
};

export type LeafState = {
  size: number;
  collapsed: boolean;
};

export type WorkspaceConstraints = {
  left: PanelConstraints;
  right: PanelConstraints;
};

export type PanelConstraints = {
  minSize: number;
  maxSize: number;
};

export type WorkspaceAction = {
  type: "toggle-collapse" | "resize";
  panel: "left" | "right";
  delta?: number;
};

export function workspaceReducer(
  prevState: WorkspaceState,
  action: WorkspaceAction
): WorkspaceState {
  switch (action.type) {
    case "toggle-collapse": {
      return {
        ...prevState,
        [action.panel]: {
          ...prevState[action.panel],
          collapsed: !prevState[action.panel].collapsed,
        },
      };
    }
    case "resize": {
      if (typeof action.delta !== undefined) {
        if (action.panel == "left") {
          var newSize;

          if (
            prevState[action.panel].size + action.delta! <
            prevState.constraints[action.panel].minSize
          ) {
            newSize = prevState.constraints[action.panel].minSize;
          } else if (
            prevState[action.panel].size + action.delta! >
            prevState.constraints[action.panel].maxSize
          ) {
            newSize = prevState.constraints[action.panel].maxSize;
          } else {
            newSize = prevState[action.panel].size + action.delta!;
          }
          return {
            ...prevState,
            left: {
              size: newSize,
              collapsed: false,
            },
            right: {
              ...prevState.right,
            },
          };
        } else {
          var newSize;

          if (
            prevState[action.panel].size - action.delta! <
            prevState.constraints[action.panel].minSize
          ) {
            newSize = prevState.constraints[action.panel].minSize;
          } else if (
            prevState[action.panel].size - action.delta! >
            prevState.constraints[action.panel].maxSize
          ) {
            newSize = prevState.constraints[action.panel].maxSize;
          } else {
            newSize = prevState[action.panel].size - action.delta!;
          }
          return {
            ...prevState,
            left: {
              ...prevState.left,
            },
            right: {
              size: newSize,
              collapsed: false,
            },
          };
        }
      } else {
        throw Error("Window size must be defined to resize panel.");
      }
    }
  }
  return prevState;
}

export function initialWorkspaceState(
  initialLeftSize: number,
  initialRightSize: number,
  constraints: WorkspaceConstraints
): WorkspaceState {
  return {
    left: {
      size: initialLeftSize,
      collapsed: false,
    },
    right: {
      size: initialRightSize,
      collapsed: true,
    },
    constraints,
  };
}
