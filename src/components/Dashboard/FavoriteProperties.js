import React, { useState } from "react";
import { useQuery } from "../../modules/RouterModule";

//import pictures
import avatar_icon from "../../assets/icons/userform/avatar.png";

//import components
import PropertyCard from "../PropertyCard";

//import modules
const ImageAPI = require("../../modules/ImageAPI");

const FavoriteProperties = ({ user }) => {
  const query = useQuery();
  const [params, setParams] = useState({
    //Terms
    terms: query.get("terms"),
    //Query Properties
    page: query.get("page") ? query.get("page") : 1,
    sort_by: query.get("sort_by") ? query.get("sort_by") : "new_added",
    items_per_page: query.get("items_per_page")
      ? query.get("items_per_page")
      : 5,
    //Property Type
    property_type: query.get("property_type"),
    //Bedroom
    bedroom: query.get("bedroom"),
    //Bathroom
    bathroom: query.get("bathroom"),
    //Area
    min_area: query.get("min_area"),
    max_area: query.get("max_area"),
    // Price
    min_price: query.get("min_price"),
    max_price: query.get("max_price"),
    //Furnishing
    furnished: query.get("furnished"),
    unfurnished: query.get("unfurnished"),
    partly_furnished: query.get("partly_furnished"),
    //Ownership
    freehold: query.get("freehold"),
    leasehold: query.get("leasehold"),
    //Facilities
    air_conditioning: query.get("air_conditioning"),
    fitness: query.get("fitness"),
    library: query.get("library"),
    pet_friendly: query.get("pet_friendly"),
    security: query.get("security"),
    swimming_pool: query.get("swimming_pool"),
    tv: query.get("tv"),
    bbq: query.get("bbq"),
    concierge: query.get("concierge"),
    garden: query.get("garden"),
    lift: query.get("lift"),
    playground: query.get("playground"),
    river: query.get("river"),
    single_storey: query.get("single_storey"),
    sport: query.get("sport"),
    wifi: query.get("wifi"),
  });

  const [properties, setProperties] = useState([
    {
      property_id: "1",
      name: "Rhythm Ratchada - Huai Kwang",
      location: "Bangkok, Huai Kwang",
      img: "https://www.angelrealestate.co.th/wp-content/uploads/2019/07/interior.jpg",
      seen: 452,
      status: "Listing",
      favorite: true,
      contract: "Rent",
      contract_requirement: "Min. 1 year contract",
      price: 18000,
      payment: "Month",
      property_type: "Condo",
      bedroom: 2,
      bathroom: 2,
      area: 69.19,
      ownership: "Leasehold",
      furnishing: "Furnished",
      near_station: "MRT-Ratchada",
      facilities: [
        "Air conditioning",
        "CCTV",
        "Garden",
        "Parking",
        "Security",
        "Swimming Pool",
      ],
    },
  ]);
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
        {properties.map((property, index) => {
          const current_property = index + 1;
          const stop = params.page * params.items_per_page;
          const start = stop - params.items_per_page + 1;
          if (current_property >= start && current_property <= stop) {
            return <PropertyCard key={property.id} property={property} />;
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
