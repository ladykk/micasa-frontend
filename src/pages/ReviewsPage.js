import instance from "../modules/Instance";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//import pictures
import logo from "../assets/images/logo512.png";
import phone from "../assets/icons/userform/phone-call.png";
import email from "../assets/icons/userform/email.png";

//import components
import ReviewCard from "../components/ReviewCard";

//import modules
import ReviewsAPI from "../modules/api/ReviewsAPI";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    //Fetch reviews
    (async () => {
      await instance.get(ReviewsAPI.apiUrls.reviews).then((result) => {
        if (result.status === 200) {
          setReviews(result.data.payload);
        }
      });
    })();
  });

  return (
    <div className="w-full h-auto absolute top-0 left-0 right-0 overflow-x-hidden">
      <div className="w-full  h-screen pt-12 background-1 relative bg-black">
        <div className=" w-96 h-auto flex items-center flex-col absolute top-1/2 left-1/2 transform-center">
          <h1 className="text-white text-7xl font-semibold text-shadow">
            Reviews
          </h1>
          <hr className="w-full  mt-2 mb-2" />
          <p className="text-white text-xl text-shadow">
            *All reviews are from real-users' data.
          </p>
        </div>
      </div>
      <div className="w-full  min-h-screen p-20 bg-black text-black">
        <div className=" w-full  h-full mx-auto">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ReviewCard key={index + 1} id={index + 1} review={review} />
            ))
          ) : (
            <p className="text-white text-center text-2xl">No review yet.</p>
          )}
        </div>
      </div>
      <div
        className="w-full  h-screen pt-12 background-3 bg-black relative"
        id="contact"
      >
        <div className="w-full  h-auto flex flex-col items-center justify-center pt-10">
          <h1 className="text-7xl text-center mb-10 text-white text-shadow">
            Contact us
          </h1>
          <div className="flex justify-center items-center">
            <img src={logo} alt="" className="w-40 h-40 mr-10" />
            <div className="w-full  pl-6 mb-5">
              <div className="w-full  flex items-center justify-start mb-5">
                <img className="w-8 h-8 mr-5 invert-icon" src={phone} alt="" />
                <p className="text-xl text-white text-shadow">02-000-0000</p>
              </div>
              <div className="w-full  flex items-center justify-start">
                <img className="w-8 h-8 mr-5 invert-icon" src={email} alt="" />
                <p className="text-xl text-white text-shadow">
                  sales@micasa.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-96 h-auto flex items-center flex-col absolute bottom-1/4 left-1/2 transform-center">
          <h1 className="text-white text-4xl font-semibold text-shadow mb-5">
            Join us today
          </h1>
          <Link
            to="/signup"
            className="flex items-center justify-center w-80 h-10 rounded-xl text-white bg-blue-500 text-lg font-normal align-middle hover:bg-opacity-90 ease-in duration-75"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
