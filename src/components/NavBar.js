import React, { useState } from "react";
import { Link } from "react-router-dom";

//import pictures
import logo from "../assets/icons/logo.png";
import avatar_icon from "../assets/icons/userform/avatar.png";
import MenuOverlay from "./MenuOverlay";

//import modules
const ImageAPI = require("../modules/ImageAPI");

const NavBar = ({ user, handleSignIn, handleSignOut }) => {
  //Overlay
  const [isOverlayOpen, setOverlay] = useState(false);
  const toggleOverlay = () => {
    setOverlay(!isOverlayOpen);
  };
  const handleOverlayOnClick = (e) => {
    console.log(e.target.id);
    if (e.target.id === "overlay-menu-overlay") {
      toggleOverlay();
    }
  };

  return (
    <header className="w-screen h-12 bg-black bg-opacity-40 fixed top-0 left-0 right-0 z-50">
      <div className="w-full pl-5 pr-5 2xl:w-4/5 2xl:p-0 mx-auto h-full">
        <nav className="w-full h-12 flex justify-between">
          <Link
            className="flex items-center hover:bg-black hover:bg-opacity-30 ease-in duration-75"
            to="/"
          >
            <img src={logo} alt="" className="p-2 h-full w-auto" />
            <h1 className="font-semibold text-2xl p-2 text-white text-shadow">
              MI CASA
            </h1>
          </Link>
          <div className="flex items-center h-full">
            <div className="flex h-full mr-4">
              <Link
                className="flex items-center justify-center h-full pl-5 pr-5 text-white font-normal hover:bg-black hover:bg-opacity-30 ease-in duration-75"
                to="/search/buy"
              >
                Buy
              </Link>
              <Link
                className="flex items-center justify-center h-full pl-5 pr-5 text-white font-normal hover:bg-black hover:bg-opacity-30 ease-in duration-75"
                to="/search/rent"
              >
                Rent
              </Link>
              <Link
                className="flex items-center justify-center h-full pl-5 pr-5 text-white font-normal hover:bg-black hover:bg-opacity-30 ease-in duration-75"
                to="/search/new"
              >
                New House
              </Link>
              <Link
                className="flex items-center justify-center h-full pl-5 pr-5 text-white font-normal hover:bg-black hover:bg-opacity-30 ease-in duration-75"
                to="/reviews"
              >
                Reviews
              </Link>
              <Link
                className="flex items-center justify-center h-full pl-5 pr-5 text-white font-normal hover:bg-black hover:bg-opacity-30 ease-in duration-75"
                to="/about"
              >
                About Us
              </Link>
            </div>
            <Link
              to="/dashboard/sell"
              className="pl-5 pr-5 pt-1 pb-1 mr-4 bg-white rounded-xl text-blue-500 font-normal ease-in duration-75 hover:bg-opacity-90"
            >
              Sell
            </Link>
            {user.username ? (
              <div
                className="flex items-center h-full w-auto pl-2 pr-2 hover:bg-black hover:bg-opacity-30 ease-in duration-75 cursor-pointer"
                onClick={toggleOverlay}
              >
                <p className="mr-3 text-white">
                  {user.full_name ? user.full_name : "NO NAME"}
                </p>
                <img
                  src={
                    user.avatar_id
                      ? ImageAPI.getAvatarURL(user.avatar_id)
                      : avatar_icon
                  }
                  alt=""
                  className=" w-10 rounded-full"
                />
              </div>
            ) : (
              <div
                className="pl-5 pr-5 pt-1 pb-1 bg-blue-500 rounded-xl text-white font-normal cursor-pointer ease-in duration-75 hover:bg-opacity-90"
                onClick={toggleOverlay}
              >
                Sign In
              </div>
            )}
          </div>
        </nav>
        <div
          className={`flex w-full h-full items-start justify-start trans-visibility ${
            isOverlayOpen && "active"
          }`}
        >
          <div
            id="overlay-menu-overlay"
            className="flex w-full h-full cursor-pointer"
            onClick={handleOverlayOnClick}
          ></div>
          <MenuOverlay
            user={user}
            handleSignIn={handleSignIn}
            handleSignOut={handleSignOut}
            toggleOverlay={toggleOverlay}
          />
        </div>
      </div>
      <div
        id="overlay-menu-overlay"
        className={`fixed top-0 bottom-0 left-0 right-0 -z-1 cursor-pointer ${
          !isOverlayOpen && "hidden"
        }`}
        onClick={handleOverlayOnClick}
      ></div>
    </header>
  );
};

export default NavBar;
