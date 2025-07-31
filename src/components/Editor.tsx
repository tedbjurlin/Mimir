import ReactCodeMirror, {
  drawSelection,
  EditorView,
  highlightActiveLine,
  keymap,
  rectangularSelection,
  ViewUpdate,
} from "@uiw/react-codemirror";
import { SetStateAction, useCallback, useContext, useState } from "react";
import { basicDark } from "@uiw/codemirror-theme-basic";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import { indentOnInput } from "@codemirror/language";
import "./Editor.scss";

export type EditorProps = {
  contents: string;
  onChange: (value: string, viewUpdate: ViewUpdate) => void;
};

const Editor: React.FC<EditorProps> = ({ contents, onChange }) => {
  // const onChange = useCallback(
  //   (val: SetStateAction<string>, viewUpdate: any) => {
  //     //console.log('val:', val);
  //     dispatch!({
  //       type: "update-content",
  //     });
  //   },
  //   []
  // );

  return (
    <ReactCodeMirror
      value={contents}
      theme={basicDark}
      onChange={onChange}
      style={{
        flex: "1 1 auto",
      }}
      extensions={[
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
        }),
        EditorView.lineWrapping,
        history(),
        drawSelection(),
        rectangularSelection(),
        highlightActiveLine(),
        indentOnInput(),
        keymap.of([indentWithTab, ...defaultKeymap, ...historyKeymap]),
      ]}
    />
  );
};

export default Editor;
