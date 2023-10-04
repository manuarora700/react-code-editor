import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      <p style={{color:"white"}} className="text-sm">
        Status:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-500">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p style={{color:"white"}} className="text-sm">
        Memory:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-500">
          {outputDetails?.memory}
        </span>
      </p>
      <p style={{color:"white"}} className="text-sm">
        Time:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-500">
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;
