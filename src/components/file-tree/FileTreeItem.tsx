import { LuChevronRight, LuFile } from "react-icons/lu";
import { FileListItem } from "./File";
import { useContext, useState } from "react";
import "./FileTreeItem.scss";
import { TabsDispatchContext } from "../tabs/TabContext";
import { TextFileType } from "../tabs/TabReducer";

interface FileTreeItemProps {
  item: FileListItem;
  renderingFunction: (item: FileListItem) => React.ReactNode;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({
  renderingFunction,
  item,
}) => {
  const [expanded, setExpanded] = useState(true);
  const tabsDispatch = useContext(TabsDispatchContext);

  const handleClickItemCard = () => {
    if (item.isDirectory) {
      setExpanded(!expanded);
    } else {
      tabsDispatch!({
        type: "open",
        content: {
          key: item.file_location,
          name: item.name,
          file_loc: item.file_location,
          filetype: TextFileType.PlainText,
        },
      });
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
            <LuFile className="file-tree-item__icon file-icon--text-level" />
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
