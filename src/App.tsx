import "./app.css";
import React, { useState, useEffect } from "react";
import { CodeCell } from "./components/code-cell";
import Header from "./components/header";
import localforage from "localforage";

const themeCache = localforage.createInstance({
  name: "themecache",
});

interface Theme {
  theme: string;
}

const App = () => {
  const [theme, setTheme] = useState("light");

  //=====Accessing the theme stored in the browser =====
  useEffect(() => {
    (async () => {
      const cachedTheme = await themeCache.getItem<Theme>("theme");
      if (cachedTheme) setTheme(cachedTheme.theme);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await themeCache.setItem<Theme>("theme", { theme });
    })();
    const body: HTMLBodyElement | null = document.querySelector("body");
    if (theme === "dark") {
      if (body) body.style.backgroundColor = "#19171A";
    } else {
      if (body) body.style.backgroundColor = "#d3d3d3";
    }
  }, [theme]);

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <div className={`app ${theme}`}>
      <Header theme={theme} />
      <CodeCell theme={theme} onChangeTheme={changeTheme} />
    </div>
  );
};

export default App;
