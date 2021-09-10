import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import instance from "../../modules/Instance";

//import pictures
import add from "../../assets/icons/property_detail/add.png";
import box from "../../assets/icons/webmaster/box.png";

//import components
import PropertyCard from "../PropertyCard";

//import modules
import PropertyAPI from "../../modules/api/PropertyAPI";
import ImageAPI from "../../modules/api/ImageAPI";
import Loading from "../Loading";

const ManageProperties = ({ user }) => {
  const [page, setPage] = useState("approved");
  const [isFetch, setIsFetch] = useState(true);
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
        break;
    }
  };

  useEffect(() => {
    //Fetch properties
    (async () => {
      if (isFetch) {
        await instance
          .get(PropertyAPI.apiUrls.seller)
          .then((result) => {
            if (result.status === 200) {
              let data = result.data.payload.map((property) => {
                let withImageUrl = property;
                for (let image in withImageUrl.images) {
                  withImageUrl.images[image] = ImageAPI.getImageURL(
                    withImageUrl.images[image]
                  );
                }
                return withImageUrl;
              });
              setApproved(
                data.filter(
                  (property) =>
                    property.status !== "Pending" &&
                    property.status !== "Rejected" &&
                    property.status !== "Sold" &&
                    property.status !== "Cancel"
                )
              );
              setPending(
                data.filter(
                  (property) =>
                    property.status === "Pending" ||
                    property.status === "Rejected"
                )
              );
              setSold(
                data.filter(
                  (property) =>
                    property.status === "Sold" || property.status === "Cancel"
                )
              );
            }
          })
          .catch((err) => {
            if (err) {
              if (err.response) {
                console.error(err.response.data);
              }
            } else {
              console.error(err);
            }
          })
          .finally(() => setIsFetch(false));
      }
    })();
  }, [isFetch]);

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

  let filter_set;
  switch (params.sort_by) {
    case "new_added":
      filter_set = display_set.sort((a, b) => b.property_id - a.property_id);
      break;
    case "most_seen":
      filter_set = display_set.sort((a, b) => b.seen - a.seen);
      break;
    case "price-low":
      filter_set = display_set.sort((a, b) => b.price - a.price);
      break;
    case "price-high":
      filter_set = display_set.sort((a, b) => a.price - b.price);
      break;
    default:
      filter_set = display_set;
  }

  const handlePageChange = ({ target }) => {
    const page = Number.parseInt(params.page, 10);
    switch (target.innerHTML) {
      case "&lt;":
        if (page - 1 !== 0) {
          setParams({ ...params, page: page - 1 });
        }
        break;
      case "&gt;":
        if (page + 1 !== total_page + 1) {
          setParams({ ...params, page: page + 1 });
        }
        break;
      default:
        setParams({ ...params, page: Number.parseInt(target.innerHTML, 10) });
    }
  };

  return isFetch ? (
    <Loading />
  ) : (
    <div className="w-full h-auto">
      <h1 className="text-5xl mb-5">Manage Properties</h1>
      <div className="flex items-center justify-between">
        <div className="p-1 border border-gray-300 rounded-full flex w-max mb-3 hover:border-gray-400 ease-in duration-75">
          <button
            id="approved"
            className={`p-0.5 pl-3 pr-3 rounded-full mr-1 cursor-pointer ease-in duration-75 ${
              page === "approved"
                ? "bg-blue-500 text-white"
                : "hover:bg-opacity-30 hover:bg-gray-300"
            }`}
            onClick={handleOnSetChange}
          >
            Approved Properties
          </button>
          <button
            id="pending"
            className={`p-0.5 pl-3 pr-3 rounded-full mr-1 cursor-pointer ease-in duration-75 ${
              page === "pending"
                ? "bg-blue-500 text-white"
                : "hover:bg-opacity-30 hover:bg-gray-300"
            }`}
            onClick={handleOnSetChange}
          >
            Pending Properties
          </button>
          <button
            id="sold"
            className={`p-0.5 pl-3 pr-3 rounded-full cursor-pointer ease-in duration-75 ${
              page === "sold"
                ? "bg-blue-500 text-white"
                : "hover:bg-opacity-30 hover:bg-gray-300"
            }`}
            onClick={handleOnSetChange}
          >
            Sold Properties
          </button>
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
            <div className="w-44 h-9 border border-gray-300 rounded-xl flex items-center pl-2 pr-2 ml-1 hover:border-gray-400 ease-in duration-75">
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
            <div className=" w-44 h-9 border border-gray-300 rounded-xl flex items-center pl-2 pr-2 ml-1 hover:border-gray-400 ease-in duration-75">
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
        {display_set.length > 0 ? (
          display_set.map((property, index) => {
            const current_property = index + 1;
            const stop = params.page * params.items_per_page;
            const start = stop - params.items_per_page + 1;
            if (current_property >= start && current_property <= stop) {
              return (
                <PropertyCard
                  key={property.property_id}
                  data={property}
                  isHasFavorite={false}
                  isManage={true}
                />
              );
            } else {
              return null;
            }
          })
        ) : (
          <div className="w-full h-auto flex flex-col justify-center items-center pt-5">
            <img src={box} alt="" className="w-20 h-20 mt-5 mb-5" />
            <p className="text-lg">No property found.</p>
          </div>
        )}
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
            <button
              name="left"
              onClick={handlePageChange}
              className="flex items-center justify-center w-8 h-9 border-gray-300 border hover:border-gray-400 hover:border-2 ease-in duration-75 rounded-lg shadow cursor-pointer"
            >
              {"<"}
            </button>
            {(() => {
              let elements = [];
              if (total_page > 15) {
                return <p className="ml-3 text-xl">. . .</p>;
              } else {
                for (let i = 1; i <= total_page; i++) {
                  elements.push(
                    <button
                      key={i}
                      onClick={handlePageChange}
                      className={`flex items-center justify-center w-8 h-9  ml-3
                        } ${
                          params.page === i
                            ? "border-blue-300 border-2"
                            : "border-gray-300 border hover:border-gray-400 hover:border-2 ease-in duration-75"
                        } rounded-lg shadow cursor-pointer`}
                    >
                      {i}
                    </button>
                  );
                }
              }
              return elements;
            })()}
            <button
              name="right"
              onClick={handlePageChange}
              className="flex items-center justify-center w-8 h-9 ml-3 border-gray-300 border hover:border-gray-400 hover:border-2 ease-in duration-75 rounded-lg shadow cursor-pointer"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProperties;
