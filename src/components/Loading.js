import React from "react";

//import pictures
import loading from "../assets/images/loading.gif";

const Loading = () => {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 right-0 bottom-0 pt-12 pb-12">
      <div className="w-full pl-5 pr-5 desktop:w-4/5 desktop:p-0 h-full mx-auto relative flex items-center justify-center flex-col">
        <img src={loading} className=" w-40 h-40 mb-3" alt="" />
        <h1 className="text-4xl">Loading the information</h1>
      </div>
    </div>
  );
};

export default Loading;
