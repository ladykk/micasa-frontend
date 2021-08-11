import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//import pictures
import arrow from "../assets/icons/property_detail/arrow.png";
import PropertyForm from "../components/PropertyForm";

const AddPropertyPage = () => {
  const history = useHistory();

  return (
    <div className="w-screen h-fit-content absolute top-0 left-0 right-0 bottom-0 pt-20">
      <div className="w-full pl-5 pr-5 2xl:w-4/5 2xl:p-0 h-fit-content mx-auto pb-20 relative">
        <div className="flex items-center mb-5">
          <img
            src={arrow}
            className="w-10 h-10 cursor-pointer mr-3"
            alt=""
            onClick={() => history.goBack()}
          />
          <h1 className="text-5xl">Add Property Form</h1>
        </div>
        <PropertyForm />
      </div>
    </div>
  );
};

export default AddPropertyPage;
