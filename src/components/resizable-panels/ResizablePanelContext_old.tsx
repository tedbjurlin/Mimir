import {
  ActionDispatch,
  Context,
  createContext,
  PropsWithChildren,
  useReducer,
} from "react";
import { PanelAction, PanelState } from "./ResizablePanelTypes_old";

export const ResizablePanelContext: Context<PanelState | null> =
  createContext<PanelState | null>(null);
export const ResizablePanelDispatchContext: Context<ActionDispatch<
  [action: PanelAction]
> | null> = createContext<ActionDispatch<[action: PanelAction]> | null>(null);

export const ResizablePanelProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [panelState, dispatch] = useReducer(
    resizablePanelReducer,
    initialPanelState
  );

  return (
    <ResizablePanelContext value={panelState}>
      <ResizablePanelDispatchContext value={dispatch}>
        {children}
      </ResizablePanelDispatchContext>
    </ResizablePanelContext>
  );
};

function resizablePanelReducer(
  prevState: PanelState,
  action: PanelAction
): PanelState {
  switch (action.type) {
    case "register-resizer": {
      if (prevState.panels.size == 0) {
        throw Error(
          "Cannot register panel resizer before any panels have been registered."
        );
      }

      return {
        ...prevState,
        panelResizerPositions: [
          ...prevState.panelResizerPositions,
          prevState.panelSizes.reduceRight((acc, num) => acc + num, 0),
        ],
        resizerLocs: [...prevState.resizerLocs, prevState.panelSizes.length],
      };
    }
    case "register-panel"
  }
  return prevState;
}

const initialPanelState: PanelState = {
  panels: new Map(),
  resizers: new Map(),
};