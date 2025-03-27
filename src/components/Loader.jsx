import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute inset-0 border-4 border-yellow-400 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
