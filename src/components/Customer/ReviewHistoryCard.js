import React from "react";
import moment from "moment";

//import modules
import ImageAPI from "../../modules/api/ImageAPI";

//import pictures
import no_img from "../../assets/images/noimage.png";
import star from "../../assets/icons/review/star.png";

const ReviewHistoryCard = ({ property }) => {
  const getPositionColor = () => {
    switch (property.role) {
      case "Buyer":
        return "bg-blue-500";
      case "Seller":
        return "bg-green-500";
      default:
        return "bg-gray-500 hidden";
    }
  };

  const stars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          src={star}
          alt=""
          className={`pl-1 w-6 h-6 box-content ${
            property.rate < i && "grayscale"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <form className="w-full  h-fit-content mb-3 border border-gray-300 rounded-xl shadow flex hover:border-gray-400 ease-in duration-75">
      <div className=" w-80 border-r border-gray-300 flex-grow-0 flex-shrink-0 relative hover:border-gray-400 ease-in duration-75">
        <img
          src={
            property.image_cover
              ? ImageAPI.getImageURL(property.image_cover)
              : no_img
          }
          alt=""
          className="w-full  h-full rounded-tl-xl rounded-bl-xl  object-cover object-center"
        />
        {property.role && (
          <p
            className={`absolute top-0 right-0 text-md mt-2 mr-2 p-0.5 pl-3 pr-3 rounded-full text-white font-normal ${getPositionColor()}`}
          >
            {property.role}
          </p>
        )}
      </div>
      <div className="w-full  h-full p-5">
        <div className="w-full  h-6 flex justify-between items-center mb-3">
          <h1 className="font-normal text-xl">{property.property_name}</h1>
          <div className="flex self-end">{stars()}</div>
        </div>
        <hr className="w-full  mb-3" />
        <div className="relative w-full  h-40">
          <p>{property.message}</p>
          <p className="absolute bottom-0 right-0 text-gray-400">
            {moment(new Date(property.timestamp)).fromNow()}
          </p>
        </div>
      </div>
    </form>
  );
};

export default ReviewHistoryCard;
