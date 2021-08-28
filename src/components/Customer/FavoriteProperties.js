import React, { useState, useEffect } from "react";
import { useQuery } from "../../modules/RouterModule";
import axios from "axios";

//import pictures
import avatar_icon from "../../assets/icons/userform/avatar.png";

//import components
import PropertyCard from "../PropertyCard";

//import modules
import CustomerAPI from "../../modules/api/CustomerAPI";
import ImageAPI from "../../modules/api/ImageAPI";

const FavoriteProperties = ({ user }) => {
  const [isFetch, setFetch] = useState(true);
  const [params, setParams] = useState({
    //Query Properties
    page: 1,
    sort_by: "new_added",
    items_per_page: 5,
  });

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    (async () => {
      if (isFetch) {
        await axios
          .get(CustomerAPI.apiUrls.favorite_properties)
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
              setProperties(data);
            }
          });
      }
    })();
  }, [isFetch]);

  const total_page =
    properties.length === 0
      ? 1
      : Math.ceil(properties.length / params.items_per_page);

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
      <h1 className="text-5xl mb-5">Favorite Properties</h1>
      <div className="w-full h-auto">
        {/* Query Options */}
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-500">
            Page {params.page} of {total_page} (Total {properties.length}{" "}
            {properties.length > 1 ? "properties" : "property"})
          </p>
          <div
            className="flex
          "
          >
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
        {properties.map((property, index) => {
          const current_property = index + 1;
          const stop = params.page * params.items_per_page;
          const start = stop - params.items_per_page + 1;
          if (current_property >= start && current_property <= stop) {
            return (
              <PropertyCard
                key={property.property_id}
                data={property}
                user={user}
              />
            );
          }
        })}
        {/* Page Selector */}
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-500">
            Page {params.page} of {total_page} (Total {properties.length}{" "}
            {properties.length > 1 ? "properties" : "property"})
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
                    key={i}
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

export default FavoriteProperties;
