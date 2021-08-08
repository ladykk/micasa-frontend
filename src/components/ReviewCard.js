import React from "react";

//import pictures
import avatar_icon from "../assets/icons/userform/avatar.png";
import star from "../assets/icons/review/star.png";
import quote from "../assets/icons/review/quote.png";

const ReviewCard = ({ review, id }) => {
  const { message, rate, full_name, avatar_id } = review;
  const even = Number.parseInt(id, 10) % 2 === 0;
  const stars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        stars.push(<img src={star} alt="" className="w-6 pl-1" />);
      } else {
        stars.push(<img src={star} alt="" className="w-6 pl-1 grayscale" />);
      }
    }
    return stars;
  };

  return (
    <div
      className={` max-w-4xl mx-auto flex ${even && "flex-row-reverse"} mb-16`}
    >
      <img
        src={avatar_id ? `/images/avatar/${avatar_id}` : avatar_icon}
        alt=""
        className={`rounded-full w-24 h-24 ${
          even ? "ml" : "mr"
        }-2 flex-shrink-0 flex-grow-0`}
      />
      <div
        className={`w-full h-auto flex items-center bg-white p-4 rounded-lg ${
          even ? "rounded-tr-none" : "rounded-tl-none"
        }`}
      >
        <img
          src={quote}
          alt=""
          className="w-10 h-10 flex-shrink-0 flex-grow-0 self-start"
        />
        <div className="flex flex-col ml-5 mr-5">
          <div className="flex self-end mb-3">{stars()}</div>
          <p className="text-justify mb-3">{message}</p>
          <p className="font-normal">{full_name}</p>
        </div>
        <img
          src={quote}
          alt=""
          className="w-10 h-10 transform-rotate-180 flex-shrink-0 flex-grow-0 self-end"
        />
      </div>
    </div>
  );
};

export default ReviewCard;
