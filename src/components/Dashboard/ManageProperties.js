import React, { useState } from "react";
import { Link } from "react-router-dom";

//import pictures
import add from "../../assets/icons/property_detail/add.png";

//import components
import PropertyCard from "../PropertyCard";

const ManageProperties = ({ user }) => {
  const [page, setPage] = useState("approved");

  const [approved, setApproved] = useState([]);
  const [pending, setPending] = useState([]);
  const [sold, setSold] = useState([]);
  const handleOnSetChange = ({ target }) => {
    switch (target.id) {
      case "approved":
      case "pending":
      case "sold":
        setPage(target.id);
      default:
    }
  };

  //display set
  let display_set;
  switch (page) {
    case "approved":
      display_set = approved;
      break;
    case "pending":
      display_set = pending;
      break;
    case "sold":
      display_set = sold;
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
    <div className="w-full h-auto">
      <h1 className="text-5xl mb-5">Manage Properties</h1>
      <div className="flex items-center justify-between">
        <div className="p-1 border border-gray-300 rounded-full flex w-max mb-3">
          <p
            id="approved"
            className={`p-0.5 pl-3 pr-3 rounded-full mr-1 cursor-pointer ease-in duration-75 ${
              page === "approved"
                ? "bg-blue-500 text-white font-normal"
                : "hover:bg-opacity-30 hover:bg-gray-300"
            }`}
            onClick={handleOnSetChange}
          >
            Approved Properties
          </p>
          <p
            id="pending"
            className={`p-0.5 pl-3 pr-3 rounded-full mr-1 cursor-pointer ease-in duration-75 ${
              page === "pending"
                ? "bg-blue-500 text-white font-normal"
                : "hover:bg-opacity-30 hover:bg-gray-300"
            }`}
            onClick={handleOnSetChange}
          >
            Pending Properties
          </p>
          <p
            id="sold"
            className={`p-0.5 pl-3 pr-3 rounded-full cursor-pointer ease-in duration-75 ${
              page === "sold"
                ? "bg-blue-500 text-white font-normal"
                : "hover:bg-opacity-30 hover:bg-gray-300"
            }`}
            onClick={handleOnSetChange}
          >
            Sold Properties
          </p>
        </div>
        <div className="p-0.5 flex w-max mb-3">
          <Link
            to="/add"
            className="p-1 pl-4 pr-4 rounded-full cursor-pointer ease-in duration-75 bg-green-500 text-white font-normal flex hover:bg-opacity-90"
          >
            <img src={add} alt="" className="w-6 h-6 mr-2 invert-icon" />
            Add Properties
          </Link>
        </div>
      </div>
      <div className="w-full h-auto">
        {/* Query Options */}
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-500">
            Page {params.page} of {total_page} (Total {display_set.length}{" "}
            {display_set.length > 1 ? "properties" : "property"})
          </p>
          <div
            className="flex
          "
          >
            <div className="w-44 h-9 border border-gray-300 rounded-xl flex items-center pl-2 pr-2 ml-1">
              <select
                name="sort_by"
                id="sort_by"
                className="w-full h-full outline-none"
                value={params.sort_by}
                onChange={handleOnChange}
              >
                <option value="new_added">Newly Added</option>
                <option value="most_seen">Most Seen</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            <div className=" w-44 h-9 border border-gray-300 rounded-xl flex items-center pl-2 pr-2 ml-1">
              <select
                name="items_per_page"
                id="items_per_page"
                className="w-full h-full outline-none"
                value={params.items_per_page}
                onChange={handleOnChange}
              >
                <option value="5">5 Items / Page</option>
                <option value="10">10 Items / Page</option>
                <option value="15">15 Items / Page</option>
                <option value="20">20 Items / Page</option>
              </select>
            </div>
          </div>
        </div>
        {/* Cards */}
        {}
        {display_set.map((property, index) => {
          const current_property = index + 1;
          const stop = params.page * params.items_per_page;
          const start = stop - params.items_per_page + 1;
          if (current_property >= start && current_property <= stop) {
            return (
              <PropertyCard
                key={property.id}
                data={property}
                isHasFavorite={false}
                isManage={true}
              />
            );
          }
        })}
        {/* Page Selector */}
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-500">
            Page {params.page} of {total_page} (Total {display_set.length}{" "}
            {display_set.length > 1 ? "properties" : "property"})
          </p>
          <div
            className="flex
          "
          >
            <p
              onClick={handlePageChange}
              className="flex items-center justify-center w-8 h-9 border-gray-300 border hover:border-gray-400 hover:border-2 ease-in duration-75 rounded-lg shadow cursor-pointer"
            >
              {"<"}
            </p>
            {(() => {
              let elements = [];
              for (let i = 1; i <= total_page; i++) {
                elements.push(
                  <p
                    className={`flex items-center justify-center w-8 h-9  ml-3
                      } ${
                        params.page === i
                          ? "border-blue-300 border-2"
                          : "border-gray-300 border hover:border-gray-400 hover:border-2 ease-in duration-75"
                      } rounded-lg shadow cursor-pointer`}
                  >
                    {i}
                  </p>
                );
              }
              return elements;
            })()}
            <p
              onClick={handlePageChange}
              className="flex items-center justify-center w-8 h-9 ml-3 border-gray-300 border hover:border-gray-400 hover:border-2 ease-in duration-75 rounded-lg shadow cursor-pointer"
            >
              {">"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProperties;
