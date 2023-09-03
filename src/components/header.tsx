import "./header.css";
import logo from "../images/logo.png";
import React from "react";

interface HeaderProps {
  theme: string;
}
const Header: React.FC<HeaderProps> = ({ theme }) => {
  return (
    <div className='top-header'>
      <img src={logo} alt=''></img>
      <div className='top-header-text'>
        <h3>JS JSX</h3>
        <p>An online javaScript compiler</p>
      </div>
    </div>
  );
};

export default Header;
