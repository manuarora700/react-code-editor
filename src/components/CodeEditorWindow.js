import React, { useState } from "react";
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code }) => {
  const [value, setValue] = useState(code || "");
  const [theme, setTheme] = useState("vs-dark");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };
  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="80vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme="vs-dark"
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;
