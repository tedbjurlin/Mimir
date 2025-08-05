import {
  AtomIcon,
  BookMarkedIcon,
  BrainIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";

const SideDock: React.FC = () => {
  return (
    <div className="side-dock">
      <div className="upper-buttons">
        <button className="icon-button side-dock__note-button">
          <BrainIcon className="icon-button__icon side-dock__note-icon" />
        </button>
        <button className="icon-button side-dock__note-button">
          <AtomIcon className="icon-button__icon side-dock__note-icon" />
        </button>
        <button className="icon-button side-dock__note-button">
          <BookMarkedIcon className="icon-button__icon side-dock__note-icon" />
        </button>
        <button className="icon-button side-dock__button">
          <SearchIcon className="icon-button__icon side-dock__icon" />
        </button>
      </div>
      <div className="lower-buttons">
        <button className="icon-button side-dock__button">
          <SettingsIcon className="icon-button__icon side-dock__icon" />
        </button>
      </div>
    </div>
  );
};

export default SideDock;
