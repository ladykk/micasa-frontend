import React from "react";
import { Link } from "react-router-dom";

import user_icon from "../../assets/icons/userform/user.png";
import password_icon from "../../assets/icons/userform/key.png";

const LoginForm = () => {
  return (
    <form className="flex flex-col items-center w-full h-full p-3 pt-4 pb-4">
      <div class="w-full h-10 mb-4 bg-white p-2 rounded-lg flex items-center shadow-md ">
        <img src={user_icon} alt="" className="h-6 w-auto mr-2" />
        <input
          type="text"
          name="username"
          id="username"
          required
          placeholder="Username"
          className="w-full focus:outline-none h-full"
        />
      </div>
      <div class="w-full h-10 mb-4 bg-white p-2 rounded-lg flex items-center shadow-md ">
        <img src={password_icon} alt="" className="h-6 w-auto mr-2" />
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Password"
          className="w-full focus:outline-none h-full"
        />
      </div>
      <button
        type="submit"
        className="w-full h-10 rounded-xl bg-blue-500 text-white text-lg font-normal hover:bg-opacity-90 ease-in duration-75 mb-5"
      >
        Sign In
      </button>
      <Link
        to="/forget_password"
        className="w-full mx-auto text-gray-500 underline font-light italic text-center"
      >
        Forget password?
      </Link>
      <hr className="w-full mt-5" />
      <p className="text-white pt-4 pb-3">Don't have an account yet?</p>
      <Link
        to="/signup"
        className="flex items-center justify-center w-full h-10 rounded-xl bg-white text-blue-500 text-lg font-normal align-middle hover:bg-opacity-90 ease-in duration-75"
      >
        Sign Up
      </Link>
    </form>
  );
};

export default LoginForm;
