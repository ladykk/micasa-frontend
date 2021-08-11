import React from "react";
import { Link } from "react-router-dom";

//import pictures
import no_img from "../assets/images/noimage.png";
import unfavorite from "../assets/icons/property/heart.png";
import favorite from "../assets/icons/property/like.png";
import location from "../assets/icons/property/location.png";
import station from "../assets/icons/property/metro.png";
import seen from "../assets/icons/property/eye.png";
import property_type from "../assets/icons/property/type.png";
import bedroom from "../assets/icons/property/double-bed-fill.png";
import bathroom from "../assets/icons/property/toilet-fill.png";
import area from "../assets/icons/property/area.png";
import furnished from "../assets/icons/property/furnitures.png";
import partly_furnished from "../assets/icons/property/sofa.png";
import unfurnished from "../assets/icons/property/box.png";
import leasehold from "../assets/icons/property/contract.png";

const PropertyCard = ({ property, isHasFavorite, isManage }) => {
  const handleFavorite = () => {
    //TODO: handle favorite
  };

  const path = `/${isManage ? "edit" : "property"}/${property.property_id}`;

  const getStatusColor = () => {
    switch (property.status) {
      case "Listing":
        return "bg-green-500";
      case "Sold":
      case "Cancel":
        return "bg-red-500";
      case "Reserved":
        return "bg-yellow-500";
      case "Not Listing":
        return "bg-gray-500";
      default:
        return "bg-gray-500 hidden";
    }
  };

  return (
    <div className="w-full h-fit-content mb-3 border border-gray-300 rounded-xl shadow flex hover:border-gray-400 ease-in duration-75">
      <Link
        to={path}
        className=" w-80 border-r border-gray-300 flex-grow-0 flex-shrink-0 relative"
      >
        <img
          src={property.img ? property.img : no_img}
          alt=""
          className="w-full h-full rounded-tl-xl rounded-bl-xl  object-cover object-center"
        />
        {property.status && (
          <p
            className={`absolute top-0 left-0 shadow text-md mt-2 ml-2 p-0.5 pl-3 pr-3 rounded-full text-white font-normal ${getStatusColor()}`}
          >
            {property.status}
          </p>
        )}

        <div className="absolute top-0 right-0 p-1 pl-2 pr-2 bg-white bg-opacity-90 rounded-bl-lg">
          <div className="flex flex-col justify-center items-end">
            <p>
              <span className="font-normal">{property.contract}:</span>{" "}
              {property.price} ฿{" "}
              {property.payment ? `/ ${property.payment}` : ""}
            </p>
            {property.contract_requirement && (
              <p className="text-red-500 text-sm italic">
                ({property.contract_requirement})
              </p>
            )}
          </div>
        </div>
      </Link>
      <div className="w-full h-full p-5">
        <div className="w-full h-6 flex justify-between items-center mb-3">
          <Link to={path}>
            <h1 className="font-normal text-xl">{property.name}</h1>
          </Link>
          {isHasFavorite && (
            <img
              src={property.favorite ? favorite : unfavorite}
              alt=""
              className=" w-6 h-6 cursor-pointer"
              onClick={handleFavorite}
            />
          )}
        </div>
        <hr className="w-full mb-3" />
        <div className="w-full h-auto flex justify-between items-center mb-3">
          <div className="flex items-center justify-start">
            <div className="flex items-end justify-start mr-4">
              <img src={property_type} alt="" className="w-6 h-6 mr-1" />
              <p>{property.property_type}</p>
            </div>
            <div className="flex items-end justify-start mr-4">
              <img src={location} alt="" className="w-6 h-6 mr-1" />
              <p>{property.location}</p>
            </div>
            {property.near_station && (
              <div className="flex items-end justify-start mr-4">
                <img src={station} alt="" className="w-6 h-6 mr-1" />
                <p>{property.near_station}</p>
              </div>
            )}

            <div className="flex items-end justify-start mr-4">
              <img src={seen} alt="" className="w-6 h-6 mr-1" />
              <p>{property.seen}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex justify-start items-center flex-wrap">
          <div className="flex items-end justify-start mr-4 mb-3">
            <img src={bedroom} alt="" className="w-6 h-6 mr-1" />
            <p>
              {property.bedroom} {property.bedroom > 1 ? "Bedrooms" : "Bedroom"}
            </p>
          </div>
          <div className="flex items-end justify-start mr-4 mb-3">
            <img src={bathroom} alt="" className="w-6 h-6 mr-1" />
            <p>
              {property.bathroom}{" "}
              {property.bathroom > 1 ? "Bathrooms" : "Bathroom"}
            </p>
          </div>
          <div className="flex items-end justify-start mr-4 mb-3">
            <img src={area} alt="" className="w-6 h-6 mr-1" />
            <p>
              {property.area} m<sup>2</sup>
            </p>
          </div>
          <div className="flex items-end justify-start mr-4 mb-3">
            {property.furnishing === "Furnished" && (
              <img src={furnished} alt="" className="w-6 h-6 mr-1" />
            )}
            {property.furnishing === "Unfurnished" && (
              <img src={unfurnished} alt="" className="w-6 h-6 mr-1" />
            )}
            {property.furnishing === "Partly furnished" && (
              <img src={partly_furnished} alt="" className="w-6 h-6 mr-1" />
            )}
            <p>{property.furnishing}</p>
          </div>
          {property.ownership === "Leasehold" && (
            <div className="flex items-end justify-start mr-4 mb-3">
              <img src={leasehold} alt="" className="w-6 h-6 mr-1" />
              <p>{property.ownership}</p>
            </div>
          )}
        </div>
        <p className="mb-1 font-light">Facilities</p>
        <div className="flex flex-wrap">
          {property.facilities.map((facility) => (
            <p className="p1 pr-3 pl-3 rounded-xl bg-blue-500 text-white mb-2 mr-2">
              {facility}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

PropertyCard.defaultProps = {
  isHasFavorite: true,
  isManage: false,
};

export default PropertyCard;
