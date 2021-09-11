import React, { useState } from "react";
import instance from "../../modules/Instance";

//import pictures
import no_img from "../../assets/images/noimage.png";
import star from "../../assets/icons/review/star.png";

//import modules
import ImageAPI from "../../modules/api/ImageAPI";
import ReviewsAPI from "../../modules/api/ReviewsAPI";

const ReviewFormCard = ({ property, toggleFetch }) => {
  const [form, setForm] = useState({
    message: "",
    rate: 0,
  });
  const [errors, setErrors] = useState({});

  const handleOnChange = ({ target }) => {
    setErrors({ ...errors, [target.name]: "" });
    switch (target.name) {
      default:
        setForm({ ...form, [target.name]: target.value });
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    //Check Error
    if (form.message === "" && form.rate === 0) {
      return setErrors({
        ...errors,
        message: "Please don't leave a space.",
        rate: "Please rate this property.",
      });
    } else if (form.message === "") {
      return setErrors({ ...errors, message: "Please don't leave a space." });
    } else if (form.rate === 0) {
      return setErrors({ ...errors, rate: "Please rate this property." });
    }

    const reviewData = new FormData();
    reviewData.append("rate", form.rate);
    reviewData.append("message", form.message);
    reviewData.append("property_id", property.property_id);

    await instance({
      method: "post",
      url: ReviewsAPI.apiUrls.pending,
      data: reviewData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((result) => {
        if (result.status === 201) {
          toggleFetch();
        }
      })
      .catch((err) => {
        if (err) {
          if (err.response) {
            switch (err.response.status) {
              case 400:
              case 401:
                setErrors({ form: err.response.data.error });
                break;
              default:
                console.error(err.response.data);
                setErrors({ form: "Something Wrong." });
                break;
            }
            setTimeout(() => {
              setErrors({ ...errors, form: null });
            }, 6000);
          }
        } else {
          console.error(err);
        }
      });
  };

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
        <label
          className={` pl-1 ease-in duration-75 ${
            i > form.rate && "grayscale"
          }`}
        >
          <input
            type="radio"
            name="rate"
            id={`rate_${i}`}
            value={i}
            checked={form.rate === i}
            onChange={handleOnChange}
            className="absolute w-0 h-0 opacity-0"
            required
          />
          <img src={star} alt="" className="w-6 h-6 cursor-pointer" />
        </label>
      );
    }
    return stars;
  };

  return (
    <div className="relative mb-3">
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
          <div className="w-full  h-40 flex items-center">
            <textarea
              name="message"
              id="message"
              value={form.message}
              onChange={handleOnChange}
              placeholder="Please express how you feel about us..."
              className="w-full  h-full border border-gray-300 rounded-md p-2 outline-none resize-none hover:border-gray-400 ease-in duration-75"
              required
            ></textarea>
            <button
              type="button"
              onClick={handleOnSubmit}
              className="flex items-center justify-center w-20 ml-4 flex-shrink-0 flex-grow-0 h-full rounded-xl text-white bg-blue-500 text-lg font-normal align-middle hover:bg-opacity-90 ease-in duration-75"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <p
        className={`w-max ml-auto p-0.5 pl-3 pr-3 border border-gray-300 hover:border-gray-400 ease-in duration-75 rounded-full text-red-500 ${
          !(errors.rate || errors.message) && "hidden"
        }`}
      >
        {errors.rate}
        {errors.rate && errors.message && " / "}
        {errors.message}
        {errors.form}
      </p>
    </div>
  );
};

export default ReviewFormCard;
