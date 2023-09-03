import "./code-cell.css";
import { useState } from "react";
import { CodeEditor } from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";
import { initialData } from "../utility/data";

interface CodeCellProps {
  theme: string;
  onChangeTheme(): void;
}

const CodeCell: React.FC<CodeCellProps> = ({ theme, onChangeTheme }) => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [isRunBtnClicked, setIsRunBtnClicked] = useState(false);

  const onClickRunBtn = async () => {
    const output = await bundle(input);
    // console.log("inside ,codecell after clicking submit button", output);
    setCode(output.code);
    setErr(output.err);
    setIsRunBtnClicked(true);
  };
  const showCodeEditor = () => {
    setIsRunBtnClicked(false);
  };

  return (
    <div className='code-cell'>
      <CodeEditor
        initialValue={initialData}
        onChange={(value) => setInput(value)}
        onClickRunBtn={onClickRunBtn}
        onChangeTheme={onChangeTheme}
        theme={theme}
        isRunBtnClicked={isRunBtnClicked}
      />
      <Preview
        code={code}
        bundlingError={err}
        theme={theme}
        isRunBtnClicked={isRunBtnClicked}
        showCodeEditor={showCodeEditor}
      />
    </div>
  );
};

export { CodeCell };
