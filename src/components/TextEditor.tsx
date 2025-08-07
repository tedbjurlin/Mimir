import {
  ProseMirror,
  ProseMirrorDoc,
  reactKeys,
} from "@handlewithcare/react-prosemirror";
import { DOMParser } from "prosemirror-model";
import { schema as basicSchema } from "prosemirror-schema-basic";
import {
  schema as markdownSchema,
  defaultMarkdownParser,
  defaultMarkdownSerializer,
} from "prosemirror-markdown";
import { EditorState, Transaction } from "prosemirror-state";
import { useContext, useEffect, useState } from "react";
import { AppStateDispatchContext } from "@/state/AppStateContext";
import { FileData } from "@/state/AppStateTypes";

const TYPING_TIMEOUT = 200;

const TextEditor: React.FC<{
  file: FileData;
  tab_path: ("left" | "right")[];
}> = ({ file, tab_path }) => {
  const dispatch = useContext(AppStateDispatchContext)!;

  const [editorState, setEditorState] = useState(
    EditorState.create({
      schema: markdownSchema,
      plugins: [reactKeys()],
      doc: defaultMarkdownParser.parse(file.contents),
    })
  );

  return (
    <ProseMirror
      state={editorState}
      dispatchTransaction={(tr: Transaction) => {
        setEditorState((s) => s.apply(tr));
        dispatch({
          type: "update_content",
          title: file.name,
          data: {
            ...file,
            contents: defaultMarkdownSerializer.serialize(tr.doc),
          },
          path: tab_path,
        });
      }}
    >
      <ProseMirrorDoc />
    </ProseMirror>
  );
};

export default TextEditor;
