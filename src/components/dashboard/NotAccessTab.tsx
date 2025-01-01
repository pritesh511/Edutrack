import React from "react";

const NotAccessTab = () => {
  return (
    <div className="h-1/2 flex flex-col items-center justify-center">
      <p className="max-w-96 w-full p-4 bg-red-500 text-white text-center rounded-lg mx-auto">
        You do not have permissions to access this page. Please contact admin.
      </p>
    </div>
  );
};

export default NotAccessTab;
