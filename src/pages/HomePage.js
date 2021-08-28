import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 right-0 bottom-0 pt-12 background-1 bg-black">
      <div className="w-full pl-5 pr-5 desktop:w-4/5 desktop:p-0 h-full mx-auto relative">
        <div className=" absolute bottom-1/4 left-0 right-0 max-w-6xl h-auto mx-auto flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold text-white text-shadow text-shadow text-center mb-5">
            THE NEW WAY TO FIND THE PERFECT HOUSE IN BANGKOK.
          </h1>
          <SearchBar />
          <Link
            to="/search"
            className="text-white font-light underline self-end mt-2"
          >
            More search options
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
