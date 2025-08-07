import { schema } from "prosemirror-schema-basic";
import { EditorState, Transaction } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { useEffect, useRef, useState } from "react";

const TYPING_TIMEOUT = 200;

const TextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  const [view, setView] = useState<EditorView>();
  const [state, setState] = useState<EditorState>();
  const [typing, setTyping] = useState<boolean>();
  const timer = useRef<number | null>(null);

  const postTyping = () => {
    setTyping(false);
    timer.current = null;
    // here is where you would autosave.
  };

  useEffect(() => {
    const dispatchTransaction = (tr: Transaction) => {
      if (tr.docChanged) {
        setTyping(true);
        if (timer.current) {
          clearTimeout(timer.current);
          timer.current = setTimeout(postTyping, TYPING_TIMEOUT);
        } else {
          timer.current = setTimeout(postTyping, TYPING_TIMEOUT);
        }
      }

      const newState = state!.apply(tr);
      view!.updateState(newState);
      setState(newState);
      setView(view);
    };

    const newState = EditorState.create({ schema });
    setState(newState);
    setView(
      new EditorView(editorRef.current, {
        state: newState,
        dispatchTransaction,
      })
    );

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  });

  return <div ref={editorRef} className="text-editor"></div>;
};

export default TextEditor;
