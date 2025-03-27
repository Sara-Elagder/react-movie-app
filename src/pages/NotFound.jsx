import { Link } from "react-router-dom";
import React from "react";


const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold text-gray-700">404 - Page Not Found</h1>
      <Link to="/" className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
