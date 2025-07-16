import { EditorState } from "prosemirror-state";
import { schema } from "prosemirror-schema-basic";
import {
  ProseMirror,
  ProseMirrorDoc,
  reactKeys,
} from "@handlewithcare/react-prosemirror";
import { exampleSetup } from 'prosemirror-example-setup';
import { useState } from "react";

const RichEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(
    EditorState.create({
      schema,
      plugins: [
        reactKeys(),
        ...exampleSetup({
          schema: schema,
          menuBar: false,
        })
      ],
    })
  )

  return (
    <ProseMirror
      state={editorState}
      dispatchTransaction={(tr) => {
        setEditorState((s) => s.apply(tr));
      }}
    >
      <ProseMirrorDoc />
    </ProseMirror>
  );
}

export default RichEditor;