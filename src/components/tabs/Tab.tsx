import { LuFile, LuX } from "react-icons/lu";
import { TabState } from "./TabReducer";
import { TabsDispatchContext } from "./TabContext";
import { useContext } from "react";
import "./Tab.scss";

type TabProps = {
  state: TabState;
};

const Tab: React.FC<TabProps> = ({ state }) => {
  const dispatch = useContext(TabsDispatchContext);

  function handleCloseTab(): void {
    dispatch!({
      type: "close",
      target_key: state.content.key,
    });
  }

  return (
    <div
      className={`tab ${state.selected ? "tab--selected" : "tab--unselected"}`}
    >
      <LuFile className="tab__icon file-icon--text-level" />
      {state.temporary ? <i>{state.content.name}</i> : state.content.name}
      <button
        className="tab__close-button icon-button--text-level"
        onClick={handleCloseTab}
      >
        <LuX className="tab_close-icon icon-button__icon--text-level" />
      </button>
    </div>
  );
};

export default Tab;
