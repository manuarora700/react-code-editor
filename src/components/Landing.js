import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import Editor from "@monaco-editor/react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";
import { customStyles } from "../constants/customStyles";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import monacoThemes from "monaco-themes/themes/themelist";
import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import Footer from "./Footer";

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

const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;

const Landing = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [output, setOutput] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const HACKEREARTH_API = `https://api.hackerearth.com/v4/partner/code-evaluation/submissions/`;

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
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
    setProcessing(true);
    let formData = {
      lang: language.apiLanguage,
      source: `${code}`,
      memory_limit: 243232,
      time_limit: 5,
      input: customInput,
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
        setProcessing(false);
        console.log(error);
      });
  };

  const checkStatus = async (responseData) => {
    let status = responseData?.request_status?.code;
    let statusAPI = responseData?.status_update_url;
    if (status === REQUEST_STATUSES.REQUEST_COMPLETED) {
      console.log("code executed...", responseData);
      setOutputDetails(responseData?.result);
      readFile(responseData?.result?.run_status?.output);
      setProcessing(false);
      showSuccessToast();
      return;
    } else if (status === REQUEST_STATUSES.CODE_COMPILED) {
      console.log("code compiled...", responseData);
      let compileStatus = responseData?.result?.compile_status;
      if (compileStatus !== "OK") {
        // throw error
        setOutputDetails(responseData?.result);
        setProcessing(false);
        return;
      } else {
        setTimeout(() => {
          pingStatusAPI(statusAPI);
        }, 1000);
      }
    } else if (status === REQUEST_STATUSES.REQUEST_FAILED) {
      console.log("code failed...", responseData);
      setProcessing(false);
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
        setProcessing(false);
        console.log(error);
      });
  };

  const readFile = (fileUrl) => {
    axios
      .get(fileUrl)
      .then((res) => {
        console.log("output...", res.data);
        setOutput(res.data);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        console.log(error);
      });
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <Select
            placeholder={`Filter By Category`}
            options={languageOptions}
            styles={customStyles}
            defaultValue={languageOptions[0]}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
          />
        </div>
        <div className="px-4 py-2">
          <Select
            placeholder={`Select Theme`}
            // options={languageOptions}
            options={Object.entries(monacoThemes).map(
              ([themeId, themeName]) => ({
                label: themeName,
                value: themeId,
                key: themeId,
              })
            )}
            value={theme}
            styles={customStyles}
            onChange={handleThemeChange}
          />
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
            Output
          </h1>
          <div className="w-full h-56 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto">
            {outputDetails ? (
              <>
                {outputDetails?.run_status?.status !== COMPILE_STATUSES.AC ? (
                  <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {outputDetails?.run_status?.stderr ||
                      outputDetails?.compile_status}
                  </pre>
                ) : (
                  <pre className="px-2 py-1 font-normal text-xs text-green-500">
                    {`${output}`}
                  </pre>
                )}
              </>
            ) : null}
          </div>
          <div className="flex flex-col items-end">
            <textarea
              rows="5"
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder={`Custom input`}
              className={classnames(
                "focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2"
              )}
            ></textarea>
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2 flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          {outputDetails && (
            <div className="metrics-container mt-4 flex flex-col space-y-2">
              <p className="text-sm">
                Compile Status:{" "}
                <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                  {outputDetails?.compile_status}
                </span>
              </p>
              <p className="text-sm">
                Status:{" "}
                <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                  {outputDetails?.run_status?.status}
                </span>
              </p>
              <p className="text-sm">
                Memory:{" "}
                <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                  {outputDetails?.run_status?.memory_used}
                </span>
              </p>
              <p className="text-sm">
                Time:{" "}
                <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                  {outputDetails?.run_status?.time_used}
                </span>
              </p>
              {outputDetails?.run_status?.status !== COMPILE_STATUSES.AC ? (
                <p className="text-sm">
                  Status Detail:{" "}
                  <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                    {outputDetails?.run_status?.status_detail}
                  </span>
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Landing;
