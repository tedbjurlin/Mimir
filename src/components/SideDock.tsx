import {
  AtomIcon,
  BookMarkedIcon,
  BrainIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";
import "@/style/SideDock.scss";

type SideDockProps = {
  left_panel: string;
  set_left_panel: (left_panel: string) => void;
};

const SideDock: React.FC<SideDockProps> = ({ left_panel, set_left_panel }) => {
  return (
    <div className="side-dock">
      <div className="button-group">
        <button
          className={`icon-button side-dock__note-button ${
            left_panel === "thought" && "selected"
          }`}
          onClick={() => set_left_panel("thought")}
        >
          <BrainIcon className="icon-button__icon side-dock__note-icon" />
        </button>
        <button
          className={`icon-button side-dock__note-button ${
            left_panel === "concept" && "selected"
          }`}
          onClick={() => set_left_panel("concept")}
        >
          <AtomIcon className="icon-button__icon side-dock__note-icon" />
        </button>
        <button
          className={`icon-button side-dock__note-button ${
            left_panel === "reference" && "selected"
          }`}
          onClick={() => set_left_panel("reference")}
        >
          <BookMarkedIcon className="icon-button__icon side-dock__note-icon" />
        </button>
        <button
          className={`icon-button side-dock__note-button ${
            left_panel === "search" && "selected"
          }`}
          onClick={() => set_left_panel("search")}
        >
          <SearchIcon className="icon-button__icon side-dock__icon" />
        </button>
      </div>
      <div className="button-group">
        <button className="icon-button side-dock__button">
          <SettingsIcon className="icon-button__icon side-dock__icon" />
        </button>
      </div>
    </div>
  );
};

export default SideDock;
