import React from "react";

const CircularProgress = () => {
  return (
    <div
      className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full dark:text-blue-500"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default CircularProgress;
