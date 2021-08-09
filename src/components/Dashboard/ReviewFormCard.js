import React, { useState } from "react";

//import pictures
import no_img from "../../assets/images/noimage.png";
import star from "../../assets/icons/review/star.png";

const ReviewFormCard = ({ property_id }) => {
  const [property, setProperty] = useState({
    property_id: "1",
    name: "Rhythm Ratchada - Huai Kwang",
    position: "Buyer",
    img: "https://www.angelrealestate.co.th/wp-content/uploads/2019/07/interior.jpg",
  });

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

  const handleOnSubmit = ({ target }) => {
    if (form.message === "" && form.rate === 0) {
      setErrors({
        ...errors,
        message: "Please don't leave a space.",
        rate: "Please rate this property.",
      });
    } else if (form.message === "") {
      setErrors({ ...errors, message: "Please don't leave a space." });
    } else if (form.rate === 0) {
      setErrors({ ...errors, rate: "Please rate this property." });
    }
  };

  const getPositionColor = () => {
    switch (property.position) {
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
      <form className="w-full h-fit-content mb-3 border border-gray-300 rounded-xl shadow flex hover:border-gray-400 ease-in duration-75">
        <div className=" w-80 border-r border-gray-300 flex-grow-0 flex-shrink-0 relative">
          <img
            src={property.img ? property.img : no_img}
            alt=""
            className="w-full h-full rounded-tl-xl rounded-bl-xl  object-cover object-center"
          />
          {property.position && (
            <p
              className={`absolute top-0 right-0 text-md mt-2 mr-2 p-0.5 pl-3 pr-3 rounded-full text-white font-normal ${getPositionColor()}`}
            >
              {property.position}
            </p>
          )}
        </div>
        <div className="w-full h-full p-5">
          <div className="w-full h-6 flex justify-between items-center mb-3">
            <h1 className="font-normal text-xl">{property.name}</h1>
            <div className="flex self-end">{stars()}</div>
          </div>
          <hr className="w-full mb-3" />
          <div className="w-full h-40 flex items-center">
            <textarea
              name="message"
              id="message"
              value={form.value}
              onChange={handleOnChange}
              placeholder="Please express how you feel about us..."
              className="w-full h-full border border-gray-300 rounded-md p-2 outline-none resize-none"
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
        className={`w-max ml-auto p-0.5 pl-3 pr-3 border border-gray-300 rounded-full text-red-500 ${
          !(errors.rate || errors.message) && "hidden"
        }`}
      >
        {errors.rate}
        {errors.rate && errors.message && " / "}
        {errors.message}
      </p>
    </div>
  );
};

export default ReviewFormCard;
