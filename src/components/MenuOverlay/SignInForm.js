import React, { useState } from "react";
import { Link } from "react-router-dom";

import user_icon from "../../assets/icons/userform/user.png";
import password_icon from "../../assets/icons/userform/key.png";

import UserAPI from "../../modules/UserAPI";
import axios from "axios";

const SignInForm = ({ toggleOverlay, handleSignIn }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleOnChange = ({ target }) => {
    setError("");
    setForm({ ...form, [target.name]: target.value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const signInForm = UserAPI.signInForm(form);
    await axios({
      method: "post",
      url: UserAPI.apiUrls.login,
      data: signInForm,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((result) => {
        if (result.status === 201) {
          toggleOverlay();
          handleSignIn();
        }
      })
      .catch(({ response }) => {
        if (response) {
          switch (response.status) {
            case 401:
              setError("Username or Password is incorrect.");
              break;
            default:
              console.error(response.data);
              setError("Something went wrong.");
              break;
          }
        }
      });
  };
  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col items-center w-full h-full p-3 pt-4 pb-4"
    >
      <div className="w-full h-10 mb-4 bg-white p-2 rounded-lg flex items-center shadow-md ">
        <img src={user_icon} alt="" className="h-6 w-auto mr-2" />
        <input
          type="text"
          name="username"
          id="username"
          required
          placeholder="Username"
          value={form.username}
          onChange={handleOnChange}
          className="w-full focus:outline-none h-full"
        />
      </div>
      <div
        className={`w-full h-10 ${
          error ? "mb-1" : "mb-4"
        } bg-white p-2 rounded-lg flex items-center shadow-md `}
      >
        <img src={password_icon} alt="" className="h-6 w-auto mr-2" />
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Password"
          value={form.password}
          onChange={handleOnChange}
          className="w-full focus:outline-none h-full"
        />
      </div>
      <p className="text-red-500 mb-1">{error}</p>
      <button
        type="submit"
        className="w-full h-10 rounded-xl bg-blue-500 text-white text-lg font-normal hover:bg-opacity-90 ease-in duration-75 mb-5"
      >
        Sign In
      </button>
      <Link
        onClick={toggleOverlay}
        to="/forgetpassword"
        className="w-full mx-auto text-gray-500 underline font-light italic text-center"
      >
        Forget password?
      </Link>
      <hr className="w-full mt-5" />
      <p className="text-white pt-4 pb-3">Don't have an account yet?</p>
      <Link
        onClick={toggleOverlay}
        to="/signup"
        className="flex items-center justify-center w-full h-10 rounded-xl bg-white text-blue-500 text-lg font-normal align-middle hover:bg-opacity-90 ease-in duration-75"
      >
        Sign Up
      </Link>
    </form>
  );
};

export default SignInForm;
