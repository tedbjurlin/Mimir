import { LuFile, LuX } from "react-icons/lu";
import { TabState } from "./TabReducer";
import { TabsDispatchContext } from "./TabContext";
import { useContext } from "react";
import "./Tab.scss";

type TabProps = {
  uuid: `${string}-${string}-${string}-${string}-${string}`;
  state: TabState;
};

const Tab: React.FC<TabProps> = ({ uuid, state }) => {
  const dispatch = useContext(TabsDispatchContext);

  function handleCloseTab(): void {
    dispatch!({
      type: "close",
      uuid,
    });
  }

  return (
    <div
      className={`tab ${state.selected ? "tab--selected" : "tab--unselected"}`}
    >
      <LuFile className="tab__icon file-icon--text-level" />
      {state.temporary ? <i>{state.title}</i> : state.title}
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
