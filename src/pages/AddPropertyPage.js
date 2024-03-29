import React from "react";
import { useHistory } from "react-router-dom";

//import pictures
import arrow from "../assets/icons/property_detail/arrow.png";
import PropertyForm from "../components/PropertyForm";

const AddPropertyPage = () => {
  const history = useHistory();

  return (
    <div className="w-full h-fit-content pt-10 pb-10 overflow-x-hidden">
      <div className="w-full pl-5 pr-5 desktop:w-4/5 desktop:p-0 h-fit-content mx-auto relative">
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
