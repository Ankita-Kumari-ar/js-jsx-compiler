import { ReactElement } from "react";
import "./tool-tip.css";

interface ToolTipProps {
  text: string;
  children: ReactElement;
}

const ToolTip: React.FC<ToolTipProps> = ({ text, children }) => {
  return (
    <div className='tool-tip'>
      <span>{children}</span>
      <span className='tool-tip-text'>{text}</span>
    </div>
  );
};

export default ToolTip;
