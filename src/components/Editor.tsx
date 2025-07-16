import ReactCodeMirror, { drawSelection, EditorView, highlightActiveLine, keymap, rectangularSelection } from "@uiw/react-codemirror";
import { SetStateAction, useCallback, useState } from "react";
import { basicDark } from "@uiw/codemirror-theme-basic";
import { Box } from "@chakra-ui/react";
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { indentOnInput } from "@codemirror/language";

const Editor: React.FC = () => {
  const [value, setValue] = useState("console.log('hello world!');");
  const onChange = useCallback((val: SetStateAction<string>, viewUpdate: any) => {
    console.log('val:', val);
    setValue(val);
  }, []);

  return (
    <Box h="100%">
      <ReactCodeMirror
        value={value}
        theme={basicDark}
        onChange={onChange}
        height="100vh"
        extensions={[
          markdown({
            base: markdownLanguage,
            codeLanguages: languages
          }),
          EditorView.lineWrapping,
          history(),
          drawSelection(),
          rectangularSelection(),
          highlightActiveLine(),
          indentOnInput(),
          keymap.of([indentWithTab, ...defaultKeymap, ...historyKeymap])
        ]}
      />
    </Box>
  )
}

export default Editor;