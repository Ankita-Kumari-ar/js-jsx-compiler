import "./code-cell.css";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";
import { BsMoon, BsMoonFill } from "react-icons/bs";
import { SiPrettier } from "react-icons/si";
import { VscDebugStart } from "react-icons/vsc";
import { AiOutlineClear } from "react-icons/ai";

import ToolTip from "./tool-tip";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
  onClickRunBtn(): void;
  onChangeTheme(): void;
  theme: string;
  isRunBtnClicked: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
  onClickRunBtn,
  onChangeTheme,
  theme,
  isRunBtnClicked,
}) => {
  const editorRef = useRef<any>();
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    //get current value form the editor
    const unformated = editorRef.current.getModel().getValue();

    //format the value
    const formated = prettier
      .format(unformated, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");

    //set the formated value back in the editor
    editorRef.current.setValue(formated);
  };

  const onClearClick = () => {
    editorRef.current.setValue("");
  };

  return (
    <div
      className={`editor-wrapper ${
        isRunBtnClicked ? "hide-editor-wrapper" : "unhide-editor-wrapper"
      }`}
    >
      <header className={`header header-${theme} ${theme}`}>
        <div className={`index index-${theme} ${theme}`}>index.js</div>
        <div className={`btn-wrapper btn-wrapper-${theme} ${theme}`}>
          <ToolTip text='Toggle Theme'>
            <button className='is-primary is-small' onClick={onChangeTheme}>
              {theme === "dark" ? <BsMoonFill /> : <BsMoon />}
            </button>
          </ToolTip>
          <ToolTip text='Clear'>
            <button className='is-primary is-small' onClick={onClearClick}>
              <AiOutlineClear />
            </button>
          </ToolTip>
          <ToolTip text='Format'>
            <button className='is-primary is-small' onClick={onFormatClick}>
              <SiPrettier />
            </button>
          </ToolTip>
          <ToolTip text='Run'>
            <button className='is-primary is-small' onClick={onClickRunBtn}>
              <VscDebugStart />
            </button>
          </ToolTip>
        </div>
      </header>
      {/* <div className='monaco-editor-wrapper' style={{ height: "95%" }}> */}
      <div className='monaco-editor-wrapper'>
        <MonacoEditor
          editorDidMount={onEditorDidMount}
          value={initialValue}
          height='100%'
          language='javascript'
          theme={theme}
          options={{
            wordWrap: "on",
            minimap: { enabled: false },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export { CodeEditor };
