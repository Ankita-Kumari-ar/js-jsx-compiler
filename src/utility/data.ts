export const initialData = `// Welcome to JS JSX!
// Write Javascript and JSX code and run it here.

//JS code
// const a=10;
// console.log(a);

//JSX Code
//import React from "react";
//import ReactDOM from "react-dom/client";
//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<div>Welcome to JS JSX! </div>);`;

const modifyConsoleFunc = `
(() => {
  console.oldLog = console.log;
  console.log = function(...value){
    console.oldLog.apply(this,value);
    const root = document.getElementById("root");
    const content = document.createElement("pre");
    let result = "";
    for(let each of value){
      result += " " + JSON.stringify(each);
    }
    content.innerHTML = result;
    root.appendChild(content);
  }
})();
`;

export const htmlForIframe = `
  <html>
    <head >
    </head>
    <body >
      <div id ="root"></div>
      <script>

        const handleError = (err) => {
          const root = document.querySelector("#root");
          root.innerHTML = "<div style='color: red;'> <h4>Runtime Error</h4>" + err + "</div>";
          // throw new Error(err);
          console.error(err);
        };

        window.addEventListener("error", (event)=>{
          event.preventDefault();
          handleError(event.error);
        })

        window.addEventListener("message", (event)=>{
          try{
            const {code, theme}= event.data;
            const bgColor = theme === "dark" ? "#202124":"white";
            const textColor= theme === "dark" ? "white":"black";
            const styleElement = document.createElement("style");
            const head = document.querySelector("head");
            styleElement.innerHTML = "html{background-color:" + bgColor + ";color:" + textColor + ";}"
            head.appendChild(styleElement);

            const finalCode = code + ${modifyConsoleFunc};
            // console.log(typeof code, finalCode);
            eval(finalCode);

            // eval(code); 
          
          } catch(err){
            handleError(err);
          }
        }, false);
      </script>
    </body>
  </html>
`;
