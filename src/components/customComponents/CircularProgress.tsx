import React from "react";

interface Props {
  size?: number;
  color?: string;
}

const CircularProgress = (props: Props) => {
  const { size, color } = props;
  const newsize = size ? size : 6;
  const newcolor = color ? color : "white";
  return (
    <div className={`w-${newsize} h-${newsize}`}>
      <div
        className={`animate-spin inline-block size-full border-[3px] border-current border-t-transparent text-[${newcolor}] rounded-full dark:text-blue-500`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default CircularProgress;
