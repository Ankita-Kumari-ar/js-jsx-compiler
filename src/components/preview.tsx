import "./preview.css";
import "./code-cell.css";
import { useEffect, useRef } from "react";
import { htmlForIframe } from "../utility/data";
import ToolTip from "./tool-tip";

interface PreviewProps {
  code: string;
  bundlingError: string;
  theme: string;
  isRunBtnClicked: boolean;
  showCodeEditor(): void;
}

const Preview: React.FC<PreviewProps> = ({
  code,
  bundlingError,
  theme,
  isRunBtnClicked,
  showCodeEditor,
}) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = htmlForIframe;

    const timer = setTimeout(() => {
      iframe.current.contentWindow.postMessage({ code, theme }, "*");
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [code, theme]);

  return (
    <div
      className={`preview ${
        isRunBtnClicked ? "unhide-preview" : "hide-preview"
      }`}
    >
      <header className={`header header-${theme} ${theme}`}>
        <div className={`output output-${theme} ${theme}`}>Output</div>
        <div className='btn-wrapper'>
          {isRunBtnClicked && (
            <ToolTip text='Back To Code'>
              <button className='back-btn' onClick={showCodeEditor}>
                Code-Editor
              </button>
            </ToolTip>
          )}
        </div>
      </header>
      <div
        className={`preview-wrapper ${theme}${
          theme === "dark" ? "dark-preview" : "light-preview"
        }`}
      >
        <iframe
          title='code preview'
          ref={iframe}
          sandbox='allow-scripts'
          srcDoc={htmlForIframe}
        />
        {bundlingError && <div className='preview-error'>{bundlingError}</div>}
      </div>
    </div>
  );
};

export default Preview;
