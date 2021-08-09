import React, { useState } from "react";

//import pictures
import no_img from "../../assets/images/noimage.png";
import star from "../../assets/icons/review/star.png";

const ReviewHistoryCard = ({ review_id }) => {
  const [review, setReview] = useState({
    review_id: "1",
    name: "Rhythm Ratchada - Huai Kwang",
    position: "Buyer",
    img: "https://www.angelrealestate.co.th/wp-content/uploads/2019/07/interior.jpg",
    message:
      "Trevor Gill of the Mi Casa Estate Team help me identifying the right review to meet our needs. He was always accessible and willing to make a variety of suggestions and options as we tried to. Are the right decision. We feel we have a trustworthy agent, as well as a friend! Thank you,Trevor!",
    rate: 5,
    date: new Date(),
  });

  const getPositionColor = () => {
    switch (review.position) {
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
          className="pl-1 w-6 h-6 box-content cursor-pointer"
        />
      );
    }
    return stars;
  };

  return (
    <form className="w-full h-fit-content mb-3 border border-gray-300 rounded-xl shadow flex hover:border-gray-400 ease-in duration-75">
      <div className=" w-80 border-r border-gray-300 flex-grow-0 flex-shrink-0 relative">
        <img
          src={review.img ? review.img : no_img}
          alt=""
          className="w-full h-full rounded-tl-xl rounded-bl-xl  object-cover object-center"
        />
        {review.position && (
          <p
            className={`absolute top-0 right-0 text-md mt-2 mr-2 p-0.5 pl-3 pr-3 rounded-full text-white font-normal ${getPositionColor()}`}
          >
            {review.position}
          </p>
        )}
      </div>
      <div className="w-full h-full p-5">
        <div className="w-full h-6 flex justify-between items-center mb-3">
          <h1 className="font-normal text-xl">{review.name}</h1>
          <div className="flex self-end">{stars()}</div>
        </div>
        <hr className="w-full mb-3" />
        <div className="relative w-full h-40">
          <p>{review.message}</p>
          <p className="absolute bottom-0 right-0 text-gray-400">
            {review.date.toUTCString()}
          </p>
        </div>
      </div>
    </form>
  );
};

export default ReviewHistoryCard;
