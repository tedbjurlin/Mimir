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
import { useContext, useEffect, useRef, useState } from "react";
import { AppStateDispatchContext } from "@/state/AppStateContext";
import { FileData } from "@/state/AppStateTypes";
import { debug } from "@tauri-apps/plugin-log";

const TYPING_TIMEOUT = 500;

const TextEditor: React.FC<{
  file: FileData;
  tab_path: ("left" | "right")[];
}> = ({ file, tab_path }) => {
  const dispatch = useContext(AppStateDispatchContext)!;

  const [typing, setTyping] = useState(false);
  const timeout = useRef<number | undefined>(undefined);
  const [editorState, setEditorState] = useState(
    EditorState.create({
      schema: markdownSchema,
      plugins: [reactKeys()],
      doc: defaultMarkdownParser.parse(file.contents),
    })
  );

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    };
  }, []);

  function dispatchTransaction(tr: Transaction) {
    setEditorState((s) => s.apply(tr));
    if (tr.docChanged) {
      if (typing) {
        clearTimeout(timeout.current);
      } else {
        setTyping(true);
      }
      timeout.current = setTimeout(() => {
        setTyping(false);
        dispatch({
          type: "update_content",
          title: file.name,
          data: {
            ...file,
            contents: defaultMarkdownSerializer.serialize(tr.doc),
          },
          path: tab_path,
        });
      }, TYPING_TIMEOUT);
    }
  }

  return (
    <ProseMirror state={editorState} dispatchTransaction={dispatchTransaction}>
      <ProseMirrorDoc />
    </ProseMirror>
  );
};

export default TextEditor;
