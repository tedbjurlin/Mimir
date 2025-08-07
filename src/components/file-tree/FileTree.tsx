import { ReactElement } from "react";
import FileTreeItem from "./FileTreeItem";
import { FileListItem } from "./File";
import { LuChevronRight } from "react-icons/lu";

interface FileTreeProps {
  items: FileListItem[];
}

const FileTree: React.FC<FileTreeProps> = ({ items }) => {
  function renderItem(item: FileListItem): React.ReactNode {
    return (
      <FileTreeItem
        item={item}
        key={item.name}
        renderingFunction={renderItem}
      />
    );
  }

  return <div className="file-tree">{items.map(renderItem)}</div>;
};

export default FileTree;
