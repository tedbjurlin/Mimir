import ReactCodeMirror from "@uiw/react-codemirror";
import { SetStateAction, useCallback, useState } from "react";
import { basicDark } from "@uiw/codemirror-theme-basic";
import { Box } from "@chakra-ui/react";
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

const Editor: React.FC = () => {
  const [value, setValue] = useState("console.log('hello world!');");
  const onChange = useCallback((val: SetStateAction<string>, viewUpdate: any) => {
    console.log('val:', val);
    setValue(val);
  }, []);

  return (
    <Box minH="100%">
      <ReactCodeMirror
        value={value}
        theme={basicDark}
        onChange={onChange}
        extensions={[
          markdown({
            base: markdownLanguage,
            codeLanguages: languages
          }),
        ]}
      />
    </Box>
  )
}

export default Editor;