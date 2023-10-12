import React from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      <h1 style={{color:"white"}} className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
        Input
      </h1>
      <textarea
        rows="10"
        cols="40"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        style={{color:"white"}}
        className={classnames(
          "focus:outline-none w-50 h-56 border-2 border-black z-10 rounded-md bg-[#1e293b] mr-5"
        )}
      ></textarea>
    </>
  );
};

export default CustomInput;
