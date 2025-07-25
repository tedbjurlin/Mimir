import { LuChevronRight, LuFile } from "react-icons/lu";
import { FileListItem } from "./File";
import { useState } from "react";
import "./FileTreeItem.scss";

interface FileTreeItemProps {
  item: FileListItem;
  renderingFunction: (item: FileListItem) => React.ReactNode;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({
  renderingFunction,
  item,
}) => {
  const [expanded, setExpanded] = useState(true);

  const handleClickItemCard = () => {
    if (item.isDirectory) {
      setExpanded(!expanded);
    }
  };

  return (
    <div className="file-tree-item">
      <div className="file-tree-item__card" onClick={handleClickItemCard}>
        {item.isDirectory ? (
          <button className="file-tree-item__leading-box file-tree-item__leading-box--contians-chevron">
            <LuChevronRight
              className={`file-tree-item__chevron file-tree-item__icon ${
                expanded && "file-tree-item__chevron--expanded"
              }`}
            />
          </button>
        ) : (
          <div className="file-tree-item__leading-box">
            <LuFile className="file-tree-item__icon" />
          </div>
        )}
        <div className="file-tree-item__name">{item.name}</div>
      </div>
      {item.isDirectory && expanded && (
        <div className="file-tree-item__children">
          {item.children!.map(renderingFunction)}
        </div>
      )}
    </div>
  );
};

export default FileTreeItem;
