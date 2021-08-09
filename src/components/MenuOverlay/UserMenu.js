import React from "react";
import { Link } from "react-router-dom";

//import pictures
import avatar_icon from "../../assets/icons/userform/avatar.png";
import profile from "../../assets/icons/menu/user.png";
import favorites from "../../assets/icons/menu/favorite.png";
import sell from "../../assets/icons/menu/condo.png";
import reviews from "../../assets/icons/menu/satisfaction.png";
import customers from "../../assets/icons/menu/multiple-users-silhouette.png";
import agents from "../../assets/icons/menu/realtor.png";
import approving from "../../assets/icons/menu/auction.png";
import signout from "../../assets/icons/menu/logout.png";

//import modules
const ImageAPI = require("../../modules/ImageAPI");

const UserMenu = ({ user, handleSignOut, toggleOverlay }) => {
  return (
    <div className="flex flex-col items-center w-full h-full p-3 pt-4 pb-4">
      <div className="w-full flex items-center">
        <img
          src={
            user.avatar_id ? ImageAPI.getAvatarURL(user.avatar_id) : avatar_icon
          }
          alt=""
          className=" w-16 h-16 mr-4"
        />
        <div className="text-white">
          <h1 className="text-xl">Welcome!</h1>
          <h1 className="text-lg">{user.full_name}</h1>
        </div>
      </div>
      <hr className="w-full mt-3 mb-3" />
      <Link
        to="/dashboard/profile"
        onClick={toggleOverlay}
        className="w-full h-10 flex items-center pl-2 pr-2 rounded-md text-white cursor-pointer hover:bg-opacity-40 hover:bg-black ease-in duration-75"
      >
        <img src={profile} alt="" className="w-5 h-5 mr-2 invert-icon" />
        <p className="text-md">My Profile</p>
      </Link>
      {user.class === "Customer" && (
        <Link
          to="/dashboard/favorites"
          onClick={toggleOverlay}
          className="w-full h-10 flex items-center pl-2 pr-2 rounded-md text-white cursor-pointer hover:bg-opacity-40 hover:bg-black ease-in duration-75"
        >
          <img src={favorites} alt="" className="w-5 h-5 mr-2 invert-icon" />
          <p className="text-md">Favorite Properties</p>
        </Link>
      )}
      {user.class === "Customer" && (
        <Link
          to="/dashboard/manage"
          onClick={toggleOverlay}
          className="w-full h-10 flex items-center pl-2 pr-2 rounded-md text-white cursor-pointer hover:bg-opacity-40 hover:bg-black ease-in duration-75"
        >
          <img src={sell} alt="" className="w-5 h-5 mr-2 invert-icon" />
          <p className="text-md">Manage Properties</p>
        </Link>
      )}
      {user.class === "Customer" && (
        <Link
          to="/dashboard/reviews"
          onClick={toggleOverlay}
          className="w-full h-10 flex items-center pl-2 pr-2 rounded-md text-white cursor-pointer hover:bg-opacity-40 hover:bg-black ease-in duration-75"
        >
          <img src={reviews} alt="" className="w-5 h-5 mr-2 invert-icon" />
          <p className="text-md">Reviews</p>
        </Link>
      )}
      {user.class === "Agent" && (
        <Link
          to="/dashboard/customer"
          onClick={toggleOverlay}
          className="w-full h-10 flex items-center pl-2 pr-2 rounded-md text-white cursor-pointer hover:bg-opacity-40 hover:bg-black ease-in duration-75"
        >
          <img src={customers} alt="" className="w-5 h-5 mr-2 invert-icon" />
          <p className="text-md">Customers</p>
        </Link>
      )}
      {user.class === "Webmaster" && (
        <Link
          to="/dashboard/agents"
          onClick={toggleOverlay}
          className="w-full h-10 flex items-center pl-2 pr-2 rounded-md text-white cursor-pointer hover:bg-opacity-40 hover:bg-black ease-in duration-75"
        >
          <img src={agents} alt="" className="w-5 h-5 mr-2 invert-icon" />
          <p className="text-md">Manage Agents</p>
        </Link>
      )}
      {user.class === "Webmaster" && (
        <Link
          to="/dashboard/approve"
          onClick={toggleOverlay}
          className="w-full h-10 flex items-center pl-2 pr-2 rounded-md text-white cursor-pointer hover:bg-opacity-40 hover:bg-black ease-in duration-75"
        >
          <img src={approving} alt="" className="w-5 h-5 mr-2 invert-icon" />
          <p className="text-md">Approving Properties</p>
        </Link>
      )}
      <div
        onClick={() => {
          handleSignOut();
          toggleOverlay();
        }}
        className="w-full h-10 flex items-center pl-2 pr-2 rounded-md text-white cursor-pointer hover:bg-opacity-40 hover:bg-black ease-in duration-75"
      >
        <img src={signout} alt="" className="w-5 h-5 mr-2 invert-icon" />
        <p className="text-md">Sign Out</p>
      </div>
    </div>
  );
};

export default UserMenu;
