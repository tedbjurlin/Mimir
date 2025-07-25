export type FileListItem = {
  name: string;
  isDirectory: boolean;
  filetype?: string;
  file_location: string;
  children?: FileListItem[];
}

export const testItems: FileListItem[] = [
  {
    name: "File.ts",
    isDirectory: false,
    filetype: "typescript",
    file_location: "",
  },
  {
    name: "src",
    isDirectory: true,
    file_location: "",
    children: [
      {
        name: "Sidedock.tsx",
        isDirectory: false,
        filetype: "tsx",
        file_location: "",
      },
      {
        name: "Hello_World.docx",
        isDirectory: false,
        filetype: "Microsoft Word Document",
        file_location: "",
      }
    ]
  }
]