import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

//import pictures
import user_icon from "../assets/icons/userform/user.png";
import email_icon from "../assets/icons/userform/email.png";

const ForgetPasswordPage = () => {
  const history = useHistory();
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    password: "",
    confirm_password: "",
    email: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setErrors({ ...errors, [target.name]: "" });
    setForm({ ...form, [target.name]: target.value });
  };

  return (
    <div className="w-screen h-screen absolute top-0 left-0 right-0 bottom-0 pt-12 background-2 bg-black text-white">
      <div className="w-4/5 h-full mx-auto relative flex">
        <div class=" w-1/3 flex flex-col justify-center flex-shrink-0 flex-grow-0 mr-48">
          <div className="w-full flex items-end justify-between mb-4">
            <h1 className="text-4xl">At Mi Casa,</h1>
            <p className="text-xl">
              <span className="text-red-600 font-normal">10,000+</span>{" "}
              properties
            </p>
          </div>
          <p className="text-xl text-justify mb-4">
            We try our best to introduce you a dreamy property that suit to your
            need. Saving your time, stress, and money.
          </p>
          <Link
            to="/about"
            className="text-lg text-gray-400 font-normal underline"
          >
            Learn more...
          </Link>
        </div>
        <form class="w-full h-auto bg-black bg-opacity-60 rounded-xl p-7 mt-12 mb-12">
          <div className="mb-10">
            <h1 className="text-center text-5xl font-semibold mt-5 mb-3">
              Forget Password
            </h1>
            <p className="text-center text-lg text-gray-500">
              Enter information to get recovery email.
            </p>
          </div>
          <div className="flex justify-center">
            <div className=" w-3/5 h/full p-2 text-black">
              <div class="w-full h-10 mb-3 bg-white p-2 rounded-lg flex items-center shadow-md ">
                <img src={user_icon} alt="" className="h-6 w-auto mr-2" />
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  onChange={handleChange}
                  value={form.username}
                  placeholder="Username"
                  className="w-full focus:outline-none h-full"
                />
              </div>
              <p className="text-red-500 mt-1 mb-2">{errors.full_name}</p>
              <div class="w-full h-10 mb-3 bg-white p-2 rounded-lg flex items-center shadow-md ">
                <img src={email_icon} alt="" className="h-6 w-auto mr-2" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  onChange={handleChange}
                  value={form.email}
                  placeholder="Email Address"
                  className="w-full focus:outline-none h-full"
                />
              </div>
              <p className="text-red-500 mt-1 mb-2">{errors.username}</p>
              <button
                type="submit"
                className="flex items-center justify-center w-full h-10 mt-7 rounded-xl text-white bg-blue-500 text-lg font-normal align-middle hover:bg-opacity-90 ease-in duration-75"
              >
                Recover
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
