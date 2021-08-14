import React, { useState } from "react";
import { Link } from "react-router-dom";

//import pictures
import avatar_icon from "../../assets/icons/userform/avatar.png";
import search_icon from "../../assets/icons/form/mag-glass.png";
import MiniPropertyCard from "./MiniPropertyCard";

//import modules
const ImageAPI = require("../../modules/ImageAPI");

const Customers = ({ user }) => {
  const [page, setPage] = useState("favorite");

  const [customer, setCustomer] = useState({ favorite: [], history: [] });
  const handleOnSetChange = ({ target }) => {
    switch (target.id) {
      case "favorite":
      case "history":
        setPage(target.id);
      default:
    }
  };

  //display set
  let display_set = [];
  switch (page) {
    case "favorite":
      display_set = customer.favorite;
      break;
    case "history":
      display_set = customer.history;
      break;
    default:
      display_set = [];
  }

  //params
  const [params, setParams] = useState({
    //Query Properties
    page: 1,
    sort_by: "new_added",
    items_per_page: 5,
  });
  const total_page =
    display_set.length === 0
      ? 1
      : Math.ceil(display_set.length / params.items_per_page);
  const handleOnChange = ({ target }) => {
    setParams({ ...params, [target.name]: target.value });
  };

  const handlePageChange = ({ target }) => {
    switch (target.innerHTML) {
      case "<":
        if (params.page - 1 !== 0) {
          setParams({ ...params, page: params.page - 1 });
        }
        break;
      case ">":
        if (params.page + 1 !== total_page + 1) {
          setParams({ ...params, page: params.page + 1 });
        }
        break;
      default:
    }
  };

  return (
    <div className="w-full h-screen-85 flex">
      <div className="h-full mr-5 w-80 flex-grow-0 flex-shrink-0 flex flex-col">
        <h1 className="text-5xl mb-5 h-fit-content flex-grow-0 flex-shrink-0">
          Customers
        </h1>
        <div className="h-full border border-gray-300 p-2 rounded-lg">
          <form className="w-full h-fit-content mb-2">
            <div className="border border-gray-300 rounded-full pl-2 pr-2 flex items-center h-8">
              <input
                type="text"
                name="terms"
                id="terms"
                className="w-full outline-none"
              />
              <img
                src={search_icon}
                alt=""
                className="w-4 h-4 flex-grow-0 flex-shrink-0 opacity-50 ml-2"
              />
            </div>
          </form>

          <Link
            to="/dashboard/customers/add"
            className="mt-2 w-full flex items-center justify-center h-7 bg-blue-500 rounded-full text-white font-normal"
          >
            Add Customer
          </Link>
        </div>
      </div>
      {customer.username && (
        <div className="w-full h-fit-content p-6 border border-gray-300 rounded-lg shadow mb-10">
          <div className="w-full flex mb-4">
            <div className="grid grid-cols-3 gap-2 w-max pl-9 mr-auto">
              <p className="mr-1 flex items-center justify-end">Username:</p>
              <p className="col-span-2 h-8 flex items-center">
                {user.username}
              </p>
              <p className="mr-1 flex items-center justify-end">Name:</p>
              <p className="col-span-2 h-8 flex items-center">
                {user.full_name}
              </p>
              <p className="mr-1 flex items-center justify-end">Email:</p>
              <p className="col-span-2 h-8 flex items-center">{user.email}</p>
              <p className="mr-1 flex items-center justify-end">
                Phone number:
              </p>
              <p className="col-span-2 h-8 flex items-center">
                {user.phone_number}
              </p>
              <p className="mr-1 flex items-center justify-end">Gender:</p>
              <p className="col-span-2 h-8 flex items-center">{user.gender}</p>
              <p className="mr-1 flex items-center justify-end">Birthday:</p>
              <p className="col-span-2 h-8 flex items-center">
                {user.birthday}
              </p>
            </div>
            <div className="relative w-1/4 h-28 mb-8 mt-4 flex justify-center">
              <img
                src={
                  user.avatar_id
                    ? ImageAPI.getAvatarURL(user.avatar_id)
                    : avatar_icon
                }
                alt=""
                className="w-28 h-28 rounded-full"
              />
            </div>
          </div>
          <div className="p-1 border border-gray-300 rounded-full flex w-max mb-3">
            <p
              id="favorite"
              className={`p-0.5 pl-3 pr-3 rounded-full mr-1 cursor-pointer ease-in duration-75 ${
                page === "favorite"
                  ? "bg-blue-500 text-white font-normal"
                  : "hover:bg-opacity-30 hover:bg-gray-300"
              }`}
              onClick={handleOnSetChange}
            >
              Favorite Properties
            </p>
            <p
              id="history"
              className={`p-0.5 pl-3 pr-3 rounded-full mr-1 cursor-pointer ease-in duration-75 ${
                page === "history"
                  ? "bg-blue-500 text-white font-normal"
                  : "hover:bg-opacity-30 hover:bg-gray-300"
              }`}
              onClick={handleOnSetChange}
            >
              History
            </p>
          </div>
          <div className="p-2 border border-gray-300 rounded-md">
            <MiniPropertyCard />
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
