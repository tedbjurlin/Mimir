import {
  createTreeCollection,
  Progress,
  TreeCollection,
  TreeView,
} from "@ark-ui/react";
import { readDir } from "@tauri-apps/plugin-fs";
import { join } from "@tauri-apps/api/path";
import {
  CheckSquareIcon,
  ChevronRightIcon,
  FileIcon,
  FolderIcon,
} from "lucide-react";
import { JSX, useEffect, useState } from "react";

type NotesViewProps = {
  title: string;
  directory: string;
};

const NotesView: React.FC<NotesViewProps> = ({ title, directory }) => {
  const [files, setFiles] = useState<TreeCollection<Node> | undefined>(
    undefined
  );

  useEffect(() => {
    async function getNodes(name: string, path: string): Promise<Node> {
      const contents = await readDir(path);

      const node: Node = {
        id: path,
        name: name,
        filepath: path,
        children: [],
      };

      contents.forEach(async (entry) => {
        if (entry.isSymlink) return;
        const newPath = await join(path, entry.name);
        if (entry.isDirectory) {
          node.children!.push(
            await getNodes(entry.name, await join(path, entry.name))
          );
        } else {
          node.children!.push({
            id: newPath,
            name: entry.name,
            filepath: newPath,
          });
        }
      });

      return node;
    }

    async function getFiles() {
      const files = createTreeCollection<Node>({
        nodeToString: (node) => node.name,
        nodeToValue: (node) => node.id,
        rootNode: await getNodes(title, directory),
      });

      setFiles(files);
    }

    getFiles();
  }, [directory]);

  return typeof files === "undefined" ? (
    <Progress.Root
      translations={{
        value({ value, max }) {
          if (value === null) return "Loading...";
          return `${value} of ${max} files loaded`;
        },
      }}
    >
      <Progress.Label>Loading Files</Progress.Label>
      <Progress.ValueText />
      <Progress.Circle>
        <Progress.CircleTrack />
        <Progress.CircleRange />
      </Progress.Circle>
    </Progress.Root>
  ) : (
    <TreeView.Root collection={files}>
      <TreeView.Label>{files.rootNode.name}</TreeView.Label>
      <TreeView.Tree>
        {files.rootNode.children?.map((node, index) => (
          <TreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView.Root>
  );
};

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  const { node, indexPath } = props;
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children ? (
        <TreeView.Branch>
          <TreeView.BranchControl>
            <TreeView.BranchIndicator>
              <ChevronRightIcon className="tree-icon" />
            </TreeView.BranchIndicator>
            <TreeView.BranchText>{node.name}</TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent>
            <TreeView.BranchIndentGuide />
            {node.children.map((child, index) => (
              <TreeNode
                key={child.id}
                node={child}
                indexPath={[...indexPath, index]}
              />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item>
          <TreeView.ItemText>
            <FileIcon className="tree-icon" />
            {node.name}
          </TreeView.ItemText>
        </TreeView.Item>
      )}
    </TreeView.NodeProvider>
  );
};

interface Node {
  id: string;
  name: string;
  filepath: string;
  children?: Node[] | undefined;
}

export default NotesView;
