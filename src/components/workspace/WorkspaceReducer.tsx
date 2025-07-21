export type WorkspaceState = {
  mainPanelSize: number;
  left: LeafState;
  right: LeafState;
  constraints: WorkspaceConstraints;
};

export type LeafState = {
  size: number;
  collapsed: boolean;
};

export type WorkspaceConstraints = {
  leftLeafMinSize: number;
  leftLeafMaxSize: number;
  rightLeafMinSize: number;
  rightLeafMaxSize: number;
};

export type WorkspaceAction = {
  type: "collapse" | "expand" | "resize";
  panel: "left" | "right";
  size?: number;
  windowSize?: number;
};

export function workspaceReducer(
  prevState: WorkspaceState,
  action: WorkspaceAction
): WorkspaceState {
  switch (action.type) {
    case "collapse": {
      if (!prevState[action.panel].collapsed) {
        return {
          ...prevState,
          [action.panel]: {
            ...prevState[action.panel],
            collapsed: true,
          },
        };
      }
      break;
    }
    case "expand": {
      if (prevState[action.panel].collapsed) {
        return {
          ...prevState,
          [action.panel]: {
            ...prevState[action.panel],
            collapsed: false,
          },
        };
      }
      break;
    }
    case "resize": {
      if (
        typeof action.size === undefined &&
        typeof action.windowSize !== undefined
      ) {
        const main: number = computeMain(
          prevState.left.size,
          prevState.right.size,
          action.windowSize!
        );

        return {
          ...prevState,
          mainPanelSize: main,
        };
      } else if (
        typeof action.size !== undefined &&
        typeof action.windowSize !== undefined
      ) {
        return {
          ...prevState,
          [action.panel]: {
            ...prevState[action.panel],
            collapsed: true,
          },
        };
      }
    }
  }
  return prevState;
}

function computeMain(left: number, right: number, windowSize: number): number {
  return windowSize - (left + right);
}

export function initialWorkspaceState(
  initialLeftSize: number,
  initialRightSize: number,
  initialMainPanelSize: number,
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
    mainPanelSize: initialMainPanelSize,
    constraints,
  };
}
