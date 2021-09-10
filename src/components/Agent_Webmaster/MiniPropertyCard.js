import instance from "../../modules/Instance";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

//import images
import favorite from "../../assets/icons/property/like.png";

//import modules
import WebmasterAPI from "../../modules/api/WebmasterAPI";

const MiniPropertyCard = ({ property, handleRemoveProperty }) => {
  const getStatusColor = () => {
    switch (property.status) {
      case "Listing":
        return "bg-green-500";
      case "Sold":
      case "Cancel":
      case "Rejected":
        return "bg-red-500";
      case "Reserved":
        return "bg-yellow-500";
      case "Not Listing":
      case "Pending":
        return "bg-gray-500";
      default:
        return "bg-gray-500 hidden";
    }
  };

  const handleOnAction = async ({ target }) => {
    const approveForm = WebmasterAPI.approveForm(
      property.property_id,
      target.value
    );
    await instance({
      method: "patch",
      url: WebmasterAPI.apiUrls.approve,
      data: approveForm,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((result) => {
        if (result.status === 201) {
          handleRemoveProperty(property.property_id);
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
      });
  };

  return (
    <div className="border border-gray-300 grid grid-cols-7 p-1.5 pl-3 pr-3 place-content-center place-items-center rounded-lg mb-2 hover:border-gray-400 ease-in duration-75">
      <div className="flex relative w-full h-full items-center">
        {property.is_favorite && (
          <img
            src={favorite}
            alt=""
            className="left-0 top-0 w-4 h-4 bottom-0"
          />
        )}

        <p className=" absolute top-0 left-0 right-0 bottom-0 mr-3 w-full flex items-center justify-center">
          {property.property_id}
        </p>
      </div>

      <p
        className={`shadow text-md w-max p-0.5 pl-3 pr-3 rounded-full text-white font-normal ${getStatusColor()}`}
      >
        {property.status}
      </p>

      <Link
        className=" col-span-4 w-full text-center"
        to={`/property/${property.property_id}`}
        target="_blank"
      >
        {property.property_name}
      </Link>
      {property.timestamp && (
        <p className="text-sm">
          {moment(new Date(property.timestamp)).fromNow()}
        </p>
      )}
      {handleRemoveProperty && (
        <div className="flex">
          <button
            className=" w-7 h-7 bg-green-500 rounded-full font-normal text-sm text-white mr-1"
            value="Listing"
            onClick={handleOnAction}
          >
            A
          </button>
          <button
            className=" w-7 h-7 bg-red-500 rounded-full font-normal text-sm text-white"
            value="Rejected"
            onClick={handleOnAction}
          >
            R
          </button>
        </div>
      )}
    </div>
  );
};

export default MiniPropertyCard;
