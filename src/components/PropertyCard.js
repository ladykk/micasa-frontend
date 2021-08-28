import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
import PropertyData from "../modules/PropertyData";

import CustomerAPI from "../modules/api/CustomerAPI";

const PropertyCard = ({
  data,
  isHasFavorite,
  isManage,
  user,
  toggleOverlay,
}) => {
  const [isFavorite, setFavorite] = useState(false);
  const handleFavorite = async () => {
    if (user.username) {
      const favoriteForm = new FormData();
      favoriteForm.append("is_favorite", !isFavorite ? "true" : "false");
      await axios({
        method: "post",
        url: `${CustomerAPI.apiUrls.favorite_property}/${data.property_id}`,
        data: favoriteForm,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((result) => {
          if (result.status === 201) {
            setFavorite(result.data.payload);
          }
        })
        .catch((err) => {
          setFavorite(false);
        });
      setFavorite(!isFavorite);
    } else {
      toggleOverlay();
    }
  };

  useEffect(() => {
    (async () => {
      await axios
        .get(`${CustomerAPI.apiUrls.favorite_property}/${data.property_id}`)
        .then((result) => {
          if (result.status === 200) {
            setFavorite(result.data.payload);
          }
        });
    })();
  });

  const path = `/${isManage ? "edit" : "property"}/${data.property_id}`;

  const getStatusColor = () => {
    switch (data.status) {
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
  const getFacilities = () => {
    const elements = [];
    for (let facility in data.facilities) {
      if (data.facilities[facility]) {
        elements.push(
          <p
            key={facility}
            className="p1 pr-3 pl-3 rounded-xl bg-blue-500 text-white mb-2 mr-2"
          >
            {PropertyData.getFacilityName(facility)}
          </p>
        );
      }
    }
    return elements;
  };

  return (
    <div className="w-full h-fit-content max-h-72 mb-3 border border-gray-300 rounded-xl shadow flex hover:border-gray-400 ease-in duration-75">
      <Link
        to={path}
        className=" w-80 max-h-72 border-r border-gray-300 flex-grow-0 flex-shrink-0 relative"
      >
        <img
          src={data.images.image_cover ? data.images.image_cover : no_img}
          alt=""
          className="w-full h-full rounded-tl-xl rounded-bl-xl  object-cover object-center"
        />
        {data.status && (
          <p
            className={`absolute top-0 left-0 shadow text-md mt-2 ml-2 p-0.5 pl-3 pr-3 rounded-full text-white font-normal ${getStatusColor()}`}
          >
            {data.status}
          </p>
        )}

        <div className="absolute top-0 right-0 p-1 pl-2 pr-2 bg-white bg-opacity-90 rounded-bl-lg">
          <div className="flex flex-col justify-center items-end">
            <p>
              <span className="font-normal">{data.contract}:</span>{" "}
              {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ฿{" "}
              {data.rent_payment !== "None" ? `/ ${data.rent_payment}` : ""}
            </p>
            {data.rent_requirement && (
              <p className="text-red-500 text-sm italic">
                ({data.rent_requirement})
              </p>
            )}
          </div>
        </div>
      </Link>
      <div className="w-full h-full max-h-72 p-5">
        <div className="w-full h-6 flex justify-between items-center mb-3">
          <Link to={path}>
            <h1 className="font-normal text-xl">{data.property_name}</h1>
          </Link>
          {isHasFavorite &&
            user.username !== data.seller &&
            user.class !== "Agent" &&
            user.class !== "Webmaster" && (
              <img
                src={isFavorite ? favorite : unfavorite}
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
              <img src={location} alt="" className="w-6 h-6 mr-1" />
              <p>{`${data.district}, ${data.province}`}</p>
            </div>
            {data.near_station !== "None" && (
              <div className="flex items-end justify-start mr-4">
                <img src={station} alt="" className="w-6 h-6 mr-1" />
                <p>{data.near_station}</p>
              </div>
            )}

            <div className="flex items-end justify-start mr-4">
              <img src={seen} alt="" className="w-6 h-6 mr-1" />
              <p>{data.seen}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex justify-start items-center flex-wrap">
          <div className="flex items-end justify-start mr-4 mb-3">
            <img src={property_type} alt="" className="w-6 h-6 mr-1" />
            <p>{data.property_type}</p>
          </div>
          {data.bedroom !== "None" && (
            <div className="flex items-end justify-start mr-4 mb-3">
              <img src={bedroom} alt="" className="w-6 h-6 mr-1" />
              <p>{PropertyData.getBedroomString(data.bedroom)}</p>
            </div>
          )}
          {data.bathroom !== "None" && (
            <div className="flex items-end justify-start mr-4 mb-3">
              <img src={bathroom} alt="" className="w-6 h-6 mr-1" />
              <p>{PropertyData.getBathroomString(data.bathroom)}</p>
            </div>
          )}
          <div className="flex items-end justify-start mr-4 mb-3">
            <img src={area} alt="" className="w-6 h-6 mr-1" />
            <p>
              {data.area} m<sup>2</sup>
            </p>
          </div>
          <div className="flex items-end justify-start mr-4 mb-3">
            {data.furnishing === "Furnished" && (
              <img src={furnished} alt="" className="w-6 h-6 mr-1" />
            )}
            {data.furnishing === "Unfurnished" && (
              <img src={unfurnished} alt="" className="w-6 h-6 mr-1" />
            )}
            {data.furnishing === "Partly furnished" && (
              <img src={partly_furnished} alt="" className="w-6 h-6 mr-1" />
            )}
            <p>{data.furnishing}</p>
          </div>
          {data.ownership === "Leasehold" && (
            <div className="flex items-end justify-start mr-4 mb-3">
              <img src={leasehold} alt="" className="w-6 h-6 mr-1" />
              <p>{data.ownership}</p>
            </div>
          )}
        </div>
        {!Object.keys(data.facilities).every(
          (key) => data.facilities[key] === false
        ) && <p className="mb-1 font-light">Facilities</p>}
        <div className="flex flex-wrap overflow-clip">{getFacilities()}</div>
      </div>
    </div>
  );
};

PropertyCard.defaultProps = {
  isHasFavorite: true,
  isManage: false,
};

export default PropertyCard;
