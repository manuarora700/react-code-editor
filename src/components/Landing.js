import React, { useState } from "react";
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";

const REQUEST_STATUSES = {
  REQUEST_INITIATED: "REQUEST_INITIATED",
  REQUEST_QUEUED: "REQUEST_QUEUED",
  CODE_COMPILED: "CODE_COMPILED",
  REQUEST_COMPLETED: "REQUEST_COMPLETED",
  REQUEST_FAILED: "REQUEST_FAILED",
};

const COMPILE_STATUSES = {
  AC: "AC",
  MLE: "MLE",
  TLE: "TLE",
  RE: "RE",
};

const Landing = () => {
  const [code, setCode] = useState("// Some Comment");
  const HACKEREARTH_API = `https://api.hackerearth.com/v4/partner/code-evaluation/submissions/`;
  const [language, setLanguage] = useState("");
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    let formData = {
      lang: "JAVASCRIPT_NODE",
      source: `${code}`,
      input: "",
      memory_limit: 243232,
      time_limit: 5,
      // "context": “{‘id’: 213121}”,
      callback: "https://client.com/callback/",
    };
    axios
      .post(HACKEREARTH_API, formData, {
        headers: {
          "Content-Type": "application/json",
          "client-secret": `${process.env.REACT_APP_HACKEREARTH_CLIENT_SECRET}`,
        },
      })
      .then((res) => {
        console.log("res.data", res.data);
        checkStatus(res.data);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        console.log(error);
      });
  };

  const checkStatus = async (responseData) => {
    let status = responseData?.request_status?.code;
    let statusAPI = responseData?.status_update_url;
    if (status === REQUEST_STATUSES.REQUEST_COMPLETED) {
      console.log("code executed...", responseData);
      return;
    } else if (status === REQUEST_STATUSES.CODE_COMPILED) {
      console.log("code compiled...", responseData);
    } else if (status === REQUEST_STATUSES.REQUEST_FAILED) {
      console.log("code failed...", responseData);
      return;
    } else {
      setTimeout(() => {
        pingStatusAPI(statusAPI);
      }, 1000);
    }
  };

  const pingStatusAPI = (statusAPI) => {
    axios
      .get(statusAPI, {
        headers: {
          "Content-Type": "application/json",
          "client-secret": `${process.env.REACT_APP_HACKEREARTH_CLIENT_SECRET}`,
        },
      })
      .then((res) => {
        console.log("res.data", res.data);
        checkStatus(res.data);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        console.log(error);
      });
  };
  return (
    <>
      <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language}
          />
          <button
            onClick={handleCompile}
            disabled={!code}
            className={classnames(
              "border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2",
              !code ? "opacity-50" : ""
            )}
          >
            Compile and Execute
          </button>
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%]">
          <h1 className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            Status
          </h1>
        </div>
      </div>
      {/* <div className="absolute bottom-0 w-full h-[4.4rem] bg-gray-100 flex flex-row justify-end items-center"></div> */}
    </>
  );
};
export default Landing;
