import { EyeClosed, Maximize, Minimize, X } from "lucide-react";
import TitleBarMenu from "./title-bar-components/TitleBarMenu";

const TitleBar: React.FC = () => {
  return (
    <header className="title-bar">
      <div className="title-bar__left-group">
        {/* Temporary placeholder for logo */}
        <EyeClosed className="title-bar__logo" />
        <TitleBarMenu />
      </div>
      <div className="title-bar__title">Title</div>
      <div className="title-bar__right-group">
        <button className="icon-button title-bar__button title-bar__minimize-button">
          <Minimize className="title-bar__minimize-icon" />
        </button>
        <button className="icon-button title-bar__button title-bar__close-button">
          <Maximize className="title-bar__button title-bar__close-icon" />
        </button>
        <button className="icon-button title-bar__button title-bar__close-button">
          <X className="title-bar__close-icon" />
        </button>
      </div>
    </header>
  );
};

export default TitleBar;
