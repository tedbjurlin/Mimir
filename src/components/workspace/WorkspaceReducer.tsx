export type WorkspaceState = {
  mainPanelSize: number;
  left: LeafState;
  right: LeafState;
  constraints: WorkspaceConstraints;
};

export type LeafState = {
  size: number;
  collapsed: boolean;
  resizerLoc: number;
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
  size?: number;
  windowSize?: number;
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
      if (
        typeof action.size === undefined &&
        typeof action.windowSize !== undefined
      ) {
        const [main, leftResizerPos, rightResizerPos] = computeMainAndResizers(
          prevState.left.size,
          prevState.right.size,
          action.windowSize!
        );

        return {
          ...prevState,
          mainPanelSize: main,
          left: {
            ...prevState.left,
            resizerLoc: leftResizerPos,
          },
          right: {
            ...prevState.right,
            resizerLoc: rightResizerPos,
          },
        };
      } else if (
        typeof action.size !== undefined &&
        typeof action.windowSize !== undefined
      ) {
        var newSize;

        if (action.size! < prevState.constraints[action.panel].minSize) {
          newSize = prevState.constraints[action.panel].minSize;
        } else if (action.size! > prevState.constraints[action.panel].maxSize) {
          newSize = prevState.constraints[action.panel].maxSize;
        } else {
          newSize = action.size!;
        }
        if (action.panel == "left") {
          const [main, leftResizerPos, rightResizerPos] =
            computeMainAndResizers(
              newSize,
              prevState.right.size,
              action.windowSize!
            );
          return {
            ...prevState,
            mainPanelSize: main,
            left: {
              size: newSize,
              collapsed: true,
              resizerLoc: leftResizerPos,
            },
            right: {
              ...prevState.right,
              resizerLoc: rightResizerPos,
            },
          };
        } else {
          const [main, leftResizerPos, rightResizerPos] =
            computeMainAndResizers(
              prevState.left.size,
              newSize,
              action.windowSize!
            );
          return {
            ...prevState,
            mainPanelSize: main,
            left: {
              ...prevState.left,
              resizerLoc: leftResizerPos,
            },
            right: {
              size: newSize,
              collapsed: true,
              resizerLoc: rightResizerPos,
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

function computeMainAndResizers(
  left: number,
  right: number,
  windowSize: number
): [number, number, number] {
  return [windowSize - (left + right), left, windowSize - right];
}

export function initialWorkspaceState(
  initialLeftSize: number,
  initialRightSize: number,
  initialMainPanelSize: number,
  constraints: WorkspaceConstraints
): WorkspaceState {
  return {
    left: {
      resizerLoc: initialLeftSize,
      size: initialLeftSize,
      collapsed: false,
    },
    right: {
      resizerLoc: initialLeftSize + initialMainPanelSize,
      size: initialRightSize,
      collapsed: true,
    },
    mainPanelSize: initialMainPanelSize,
    constraints,
  };
}
