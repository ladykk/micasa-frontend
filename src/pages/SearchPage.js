import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "../modules/RouterModule";
import axios from "axios";

//import components
import Filter from "../components/Filter";
import PropertyCard from "../components/PropertyCard";

//import modules
import PropertyAPI from "../modules/api/PropertyAPI";
import ImageAPI from "../modules/api/ImageAPI";

const SearchPage = ({ user, toggleOverlay }) => {
  const history = useHistory();
  const query = useQuery();

  const { contract } = useParams();
  const [params, setParams] = useState({
    //Terms
    terms: query.get("terms") ? query.get("terms") : "",
    //Property Type
    property_type: query.get("property_type") ? query.get("property_type") : "",
    //Bedroom
    bedroom: query.get("bedroom") ? query.get("bedroom") : "",
    //Bathroom
    bathroom: query.get("bathroom") ? query.get("bathroom") : "",
    //Area
    min_area: query.get("min_area")
      ? Number.parseFloat(query.get("min_area"), 10)
      : 0,
    max_area: query.get("max_area")
      ? Number.parseFloat(query.get("max_area"), 10)
      : 0,
    // Price
    min_price: query.get("min_price")
      ? Number.parseFloat(query.get("min_price"), 10)
      : 0,
    max_price: query.get("max_price")
      ? Number.parseFloat(query.get("max_price"), 10)
      : 0,
    //Furnishing
    furnished: query.get("furnished") === "false" ? false : true,
    unfurnished: query.get("unfurnished") === "false" ? false : true,
    partly_furnished: query.get("partly_furnished") === "false" ? false : true,
    //Ownership
    freehold: query.get("freehold") === "false" ? false : true,
    leasehold: query.get("leasehold") === "false" ? false : true,
    //Facilities
    air_conditioning: query.get("air_conditioning") === "false" ? false : true,
    cctv: query.get("cctv") === "false" ? false : true,
    fitness: query.get("fitness") === "false" ? false : true,
    library: query.get("library") === "false" ? false : true,
    parking: query.get("parking") === "false" ? false : true,
    pet_friendly: query.get("pet_friendly") === "false" ? false : true,
    security: query.get("security") === "false" ? false : true,
    swimming_pool: query.get("swimming_pool") === "false" ? false : true,
    tv: query.get("tv") === "false" ? false : true,
    balcony: query.get("balcony") === "false" ? false : true,
    concierge: query.get("concierge") === "false" ? false : true,
    garden: query.get("garden") === "false" ? false : true,
    lift: query.get("lift") === "false" ? false : true,
    playground: query.get("playground") === "false" ? false : true,
    river_view: query.get("river_view") === "false" ? false : true,
    single_storey: query.get("single_storey") === "false" ? false : true,
    sport_center: query.get("sport_center") === "false" ? false : true,
    wifi: query.get("wifi") === "false" ? false : true,
  });

  const [properties, setProperties] = useState([]);
  const [isFetch, setFetch] = useState(true);

  const [options, setOptions] = useState({
    //Query Properties
    page: query.get("page") ? Number.parseInt(query.get("page"), 10) : 1,
    sort_by: query.get("sort_by") ? query.get("sort_by") : "new_added",
    items_per_page: query.get("items_per_page")
      ? query.get("items_per_page")
      : 5,
  });

  useEffect(() => {
    (async () => {
      if (isFetch || contract) {
        let active_params = {
          contract: contract,
        };
        for (let param in params) {
          switch (param) {
            case "terms":
            case "property_type":
            case "bedroom":
            case "bathroom":
              if (params[param]) {
                active_params[param] = params[param];
              }
              break;
            case "min_area":
            case "max_area":
            case "min_price":
            case "max_price":
              if (params[param] !== 0) {
                active_params[param] = params[param];
              }
              break;
            default:
              if (!params[param]) {
                active_params[param] = "false";
              }
          }
        }
        await axios
          .get(PropertyAPI.apiUrls.query, { params: active_params })
          .then((result) => {
            if (result.status === 200) {
              let withImgUrl_properties = result.data.payload.map(
                (property) => {
                  let images = {};
                  for (let image in property["images"]) {
                    if (property.images[image] !== null) {
                      images[image] = ImageAPI.getImageURL(
                        property.images[image]
                      );
                    } else {
                      images[image] = null;
                    }
                  }
                  return { ...property, images };
                }
              );

              setProperties(withImgUrl_properties);
            }
          })
          .catch()
          .finally(() => {
            setOptions({ ...options, page: 1 });
            setFetch(false);
          });
      }
    })();
  }, [isFetch, contract]);

  const handleOnChange = ({ target }) => {
    setParams({ ...params, [target.name]: target.value });
  };

  const handleOnOptionChange = ({ target }) => {
    setOptions({ ...options, [target.name]: target.value });
  };

  const handlePageChange = ({ target }) => {
    const page = Number.parseInt(options.page, 10);
    switch (target.innerHTML) {
      case "&lt;":
        if (page - 1 !== 0) {
          console.log("left");
          setOptions({ ...options, page: page - 1 });
        }
        break;
      case "&gt;":
        if (page + 1 !== total_page + 1) {
          setOptions({ ...options, page: page + 1 });
        }
        break;
      default:
        setOptions({ ...options, page: Number.parseInt(target.innerHTML, 10) });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    history.replace(
      `/search/${contract}${PropertyAPI.generateQueryString(params, null)}`
    );
    setFetch(true);
  };

  let sorted_properties;
  switch (options.sort_by) {
    case "new_added":
      sorted_properties = properties.sort(
        (a, b) => b.property_id - a.property_id
      );
      break;
    case "most_seen":
      sorted_properties = properties.sort((a, b) => b.seen - a.seen);
      break;
    case "price-low":
      sorted_properties = properties.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      sorted_properties = properties.sort((a, b) => b.price - a.price);
      break;
    default:
      sorted_properties = properties;
  }

  const total_page =
    sorted_properties.length === 0
      ? 1
      : Math.ceil(sorted_properties.length / options.items_per_page);

  return (
    <div className="w-screen h-screen absolute top-0 left-0 right-0 bottom-0 pt-20 pb-10 ">
      <div className="w-full pl-5 pr-5 desktop:w-4/5 h-auto mx-auto flex">
        <Filter
          contract={contract}
          params={params}
          setParams={setParams}
          handleOnSubmit={handleOnSubmit}
        />
        <div className="w-full h-auto">
          {/* Search Bar */}
          <form
            className="flex items-center w-full h-12 bg-white rounded-full pl-4 shadow border border-gray-300 mb-3 hover:border-gray-400 ease-in duration-75"
            onSubmit={handleOnSubmit}
          >
            <input
              type="text"
              name="terms"
              id="terms"
              placeholder="Search by property name, district, train station, or keyword."
              className="w-full h-full focus:outline-none m-2"
              onChange={handleOnChange}
              value={params.terms}
            />
            <button
              type="submit"
              className="h-full flex-grow-0 flex-shrink-0 w-28 bg-blue-500 text-white font-normal text-lg rounded-r-full"
            >
              Search
            </button>
          </form>
          {/* Query Options */}
          <div className="flex justify-between items-center mb-3">
            <p className="text-gray-500">
              Page {options.page} of {total_page} (Total {properties.length}{" "}
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
                  value={options.sort_by}
                  onChange={handleOnOptionChange}
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
                  value={options.items_per_page}
                  onChange={handleOnOptionChange}
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
          {sorted_properties.map((property, index) => {
            const current_property = index + 1;
            const stop = options.page * options.items_per_page;
            const start = stop - options.items_per_page + 1;
            if (current_property >= start && current_property <= stop) {
              return (
                <PropertyCard
                  key={current_property}
                  data={property}
                  user={user}
                  toggleOverlay={toggleOverlay}
                />
              );
            }
          })}
          {/* Page Selector */}
          <div className="flex justify-between items-center mb-3">
            <p className="text-gray-500">
              Page {options.page} of {total_page} (Total {properties.length}{" "}
              {properties.length > 1 ? "properties" : "property"})
            </p>
            <div
              className="flex
          "
            >
              <p
                name="left"
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
                      onClick={handlePageChange}
                      className={`flex items-center justify-center w-8 h-9  ml-3
                      } ${
                        options.page === i
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
                name="right"
                onClick={handlePageChange}
                className="flex items-center justify-center w-8 h-9 ml-3 border-gray-300 border hover:border-gray-400 hover:border-2 ease-in duration-75 rounded-lg shadow cursor-pointer"
              >
                {">"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
