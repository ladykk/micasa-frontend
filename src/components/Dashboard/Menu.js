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
const ImageAPI = require("../../modules/api/ImageAPI");

const Menu = ({ user, handleSignOut, menu }) => {
  return (
    <div className="flex flex-col items-center w-80 h-full p-4 border border-gray-300 rounded-xl shadow mr-16 flex-grow-0 flex-shrink-0 hover:border-gray-400 ease-in duration-75">
      <div className="w-full flex items-center">
        <img
          src={
            user.avatar_id ? ImageAPI.getAvatarURL(user.avatar_id) : avatar_icon
          }
          alt=""
          className=" w-16 h-16 mr-4 rounded-full object-cover object-center"
        />
        <div className="text-black">
          <h1 className="text-xl">Welcome!</h1>
          <h1 className="text-lg">{user.full_name}</h1>
        </div>
      </div>
      <hr className="w-full mt-3 mb-3" />
      <Link
        to="/dashboard/profile"
        className={`w-full h-10 flex items-center pl-2 pr-2 rounded-md text-black cursor-pointer hover:bg-opacity-30 hover:bg-gray-300 ease-in duration-75 ${
          menu === "profile" && "bg-gray-300 bg-opacity-30"
        }`}
      >
        <img src={profile} alt="" className="w-5 h-5 mr-2" />
        <p className="text-md">My Profile</p>
      </Link>
      {user.class === "Customer" && (
        <Link
          to="/dashboard/favorites"
          className={`w-full h-10 flex items-center pl-2 pr-2 rounded-md text-black cursor-pointer hover:bg-opacity-30 hover:bg-gray-300 ease-in duration-75 ${
            menu === "favorites" && "bg-gray-300 bg-opacity-30"
          }`}
        >
          <img src={favorites} alt="" className="w-5 h-5 mr-2" />
          <p className="text-md">Favorite Properties</p>
        </Link>
      )}
      {user.class === "Customer" && (
        <Link
          to="/dashboard/manage"
          className={`w-full h-10 flex items-center pl-2 pr-2 rounded-md text-black cursor-pointer hover:bg-opacity-30 hover:bg-gray-300 ease-in duration-75 ${
            menu === "manage" && "bg-gray-300 bg-opacity-30"
          }`}
        >
          <img src={sell} alt="" className="w-5 h-5 mr-2" />
          <p className="text-md">Manage Properties</p>
        </Link>
      )}
      {user.class === "Customer" && (
        <Link
          to="/dashboard/reviews"
          className={`w-full h-10 flex items-center pl-2 pr-2 rounded-md text-black cursor-pointer hover:bg-opacity-30 hover:bg-gray-300 ease-in duration-75 ${
            menu === "reviews" && "bg-gray-300 bg-opacity-30"
          }`}
        >
          <img src={reviews} alt="" className="w-5 h-5 mr-2" />
          <p className="text-md">Reviews</p>
        </Link>
      )}
      {user.class === "Agent" && (
        <Link
          to="/dashboard/customers"
          className={`w-full h-10 flex items-center pl-2 pr-2 rounded-md text-black cursor-pointer hover:bg-opacity-30 hover:bg-gray-300 ease-in duration-75 ${
            menu === "customers" && "bg-gray-300 bg-opacity-30"
          }`}
        >
          <img src={customers} alt="" className="w-5 h-5 mr-2" />
          <p className="text-md">Customers</p>
        </Link>
      )}
      {user.class === "Webmaster" && (
        <Link
          to="/dashboard/agents"
          className={`w-full h-10 flex items-center pl-2 pr-2 rounded-md text-black cursor-pointer hover:bg-opacity-30 hover:bg-gray-300 ease-in duration-75 ${
            menu === "agents" && "bg-gray-300 bg-opacity-30"
          }`}
        >
          <img src={agents} alt="" className="w-5 h-5 mr-2" />
          <p className="text-md">Manage Agents</p>
        </Link>
      )}
      {user.class === "Webmaster" && (
        <Link
          to="/dashboard/approve"
          className={`w-full h-10 flex items-center pl-2 pr-2 rounded-md text-black cursor-pointer hover:bg-opacity-30 hover:bg-gray-300 ease-in duration-75 ${
            menu === "approve" && "bg-gray-300 bg-opacity-30"
          }`}
        >
          <img src={approving} alt="" className="w-5 h-5 mr-2" />
          <p className="text-md">Approving Properties</p>
        </Link>
      )}
      <Link
        to="/"
        onClick={handleSignOut}
        className={`w-full h-10 flex items-center pl-2 pr-2 rounded-md text-black cursor-pointer hover:bg-opacity-30 hover:bg-gray-300 ease-in duration-75`}
      >
        <img src={signout} alt="" className="w-5 h-5 mr-2" />
        <p className="text-md">Sign Out</p>
      </Link>
    </div>
  );
};

export default Menu;
