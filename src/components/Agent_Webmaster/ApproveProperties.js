import React, { useState, useEffect } from "react";

//import components
import MiniPropertyCard from "./MiniPropertyCard";
import Loading from "../Loading";
import axios from "axios";

//import images
import box from "../../assets/icons/webmaster/box.png";

//import modules
const WebmasterAPI = require("../../modules/api/WebmasterAPI");

const ApproveProperties = () => {
  const [isFetch, setIsFetch] = useState(true);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    //Fetch properties
    if (isFetch) {
      (async () => {
        await axios
          .get(WebmasterAPI.apiUrls.approve)
          .then((result) => {
            if (result.status === 200) {
              setProperties(result.data);
            }
          })
          .catch((err) => {
            if (err) {
              if (err.response) {
                console.error(err.response.data);
              } else {
                console.error(err);
              }
            }
          })
          .finally(() => setIsFetch(false));
      })();
    }
  }, [isFetch]);

  const handleRemoveProperty = (property_id) => {
    const filtered_properties = properties.filter(
      (property) => property.property_id !== property_id
    );
    setProperties(filtered_properties);
  };

  return isFetch ? (
    <Loading />
  ) : (
    <div className="w-full h-auto">
      <h1 className="text-5xl mb-5">Approving Properties</h1>
      {properties.length === 0 ? (
        <div className="w-full h-auto flex flex-col justify-center items-center pt-5">
          <img src={box} alt="" className="w-20 h-20 mb-2" />
          <p className="text-lg">No property waiting for review.</p>
        </div>
      ) : (
        <div className="w-full h-auto">
          <div className="border border-gray-300 grid grid-cols-7 p-2 pl-3 pr-3 place-content-center place-items-center rounded-lg hover:border-gray-400 ease-in duration-75">
            <p className="font-normal">Property ID</p>
            <p className="font-normal">Status</p>
            <p className="col-span-4 font-normal">Property Name</p>
            <p className="font-normal">Action</p>
          </div>
          <hr className="mt-2 mb-2" />
          <div className="h-screen-70 overflow-x-hidden overflow-y-scroll">
            {properties.map((property) => (
              <MiniPropertyCard
                key={property._property_id}
                property={property}
                handleRemoveProperty={handleRemoveProperty}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApproveProperties;
