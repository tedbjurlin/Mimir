import { LuFile, LuX } from "react-icons/lu";
import { TabState } from "./TabReducer";

type TabProps = {
  state: TabState;
};

const Tab: React.FC<TabProps> = ({ state }) => {
  return (
    <div
      className={`tab ${state.selected ? "tab--selected" : "tab--unselected"}`}
    >
      <LuFile className="tab__icon" />
      {state.temporary ? <i>state.title</i> : state.title}
      <button className="tab__close-button">
        <LuX className="tab_close-icon" />
      </button>
    </div>
  );
};

export default Tab;
