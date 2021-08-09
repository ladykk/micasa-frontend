import React, { useState } from "react";
import { Link } from "react-router-dom";

//import components
import ReviewFormCard from "./ReviewFormCard";
import ReviewHistoryCard from "./ReviewHistoryCard";

const Reviews = ({ user }) => {
  const [pending, setPending] = useState([1]);
  const [reviewed, setReviewed] = useState([1]);
  return (
    <div className="w-full h-auto">
      {pending.length === 0 && reviewed.length === 0 && (
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-2xl mb-2">
            You haven't purchased any property from ours yet!
          </h1>
          <p className="text-xl">Let's find ones and come back once you did.</p>
          <Link
            to="/search"
            className="flex items-center justify-center w-96 h-10 mt-7 rounded-xl text-white bg-blue-500 text-lg font-normal align-middle hover:bg-opacity-90 ease-in duration-75"
          >
            Find a property
          </Link>
        </div>
      )}
      {pending.length > 0 && (
        <div className="mb-8">
          <h1 className="text-5xl mb-5">Pending Review</h1>
          {pending.map((property_id) => (
            <ReviewFormCard key={property_id} property_id={property_id} />
          ))}
        </div>
      )}
      {reviewed.length > 0 && (
        <div>
          <h1 className="text-5xl mb-5">Review History</h1>
          {pending.map((review_id) => (
            <ReviewHistoryCard key={review_id} review_id={review_id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
