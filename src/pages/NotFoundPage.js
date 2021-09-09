import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = ({ error }) => {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 right-0 bottom-0 pt-12 background-3 bg-black">
      <div className="w-4/5 h-full mx-auto relative">
        <div className="max-w-6xl h-full mx-auto flex flex-col items-center justify-center">
          <h1 className="text-7xl font-semibold text-white text-shadow text-shadow text-center mb-5">
            {error ? error : "404 Page Not Found"}
          </h1>
          <Link
            to="/"
            className="p-10 pt-2 pb-2 mt-6 rounded-3xl bg-blue-500 text-white text-lg font-normal hover:bg-opacity-90 ease-in duration-75 mb-5"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
