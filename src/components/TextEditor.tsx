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
import { useEffect, useState } from "react";

const TYPING_TIMEOUT = 200;

const TextEditor: React.FC<{ content: string }> = ({ content }) => {
  const [editorState, setEditorState] = useState(
    EditorState.create({
      schema: markdownSchema,
      plugins: [reactKeys()],
      doc: defaultMarkdownParser.parse(content),
    })
  );

  useEffect(() => {}, [content]);

  return (
    <ProseMirror
      state={editorState}
      dispatchTransaction={(tr: Transaction) => {
        setEditorState((s) => s.apply(tr));
      }}
    >
      <ProseMirrorDoc />
    </ProseMirror>
  );
};

export default TextEditor;
