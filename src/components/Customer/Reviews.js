import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import instance from "../../modules/Instance";

//import components
import ReviewFormCard from "./ReviewFormCard";
import ReviewHistoryCard from "./ReviewHistoryCard";
import Loading from "../Loading";

//import modules
import ReviewsAPI from "../../modules/api/ReviewsAPI";

const Reviews = ({ user }) => {
  const [isPendingFetch, setPendingFetch] = useState(true);
  const [isReviewedFetch, setReviewedFetch] = useState(true);
  const [pending, setPending] = useState([]);
  const [reviewed, setReviewed] = useState([]);

  useEffect(() => {
    //Fetch pending review
    (async () => {
      if (isPendingFetch) {
        await instance
          .get(ReviewsAPI.apiUrls.pending)
          .then((result) => {
            if (result.status === 200) {
              setPending(result.data.payload);
            }
          })
          .catch((err) => {
            if (err) {
              if (err.response) {
                console.error(err.response.data);
              }
            } else {
              console.error(err);
            }
          })
          .finally(() => setPendingFetch(false));
      }
    })();
  }, [isPendingFetch]);

  useEffect(() => {
    (async () => {
      if (isReviewedFetch) {
        await instance
          .get(ReviewsAPI.apiUrls.history)
          .then((result) => {
            if (result.status === 200) {
              setReviewed(result.data.payload);
            }
          })
          .catch((err) => {
            if (err) {
              if (err.response) {
                console.error(err.response.data);
              }
            } else {
              console.error(err);
            }
          })
          .finally(() => setReviewedFetch(false));
      }
    })();
  }, [isReviewedFetch]);

  const toggleFetch = () => {
    setPendingFetch(true);
    setReviewedFetch(true);
  };

  return isPendingFetch || isReviewedFetch ? (
    <Loading isStatic={true} />
  ) : (
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
          {pending.map((property) => (
            <ReviewFormCard
              key={property.property_id}
              property={property}
              toggleFetch={toggleFetch}
            />
          ))}
        </div>
      )}
      {reviewed.length > 0 && (
        <div>
          <h1 className="text-5xl mb-5">Review History</h1>
          {reviewed.map((property) => (
            <ReviewHistoryCard key={property.property_id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
