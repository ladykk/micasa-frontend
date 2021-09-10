import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "../modules/RouterModule";
import instance from "../modules/Instance";

//import components
import Filter from "../components/Filter";
import PropertyCard from "../components/PropertyCard";
import Loading from "../components/Loading";

//import images
import box from "../assets/icons/webmaster/box.png";

//import modules
import PropertyAPI from "../modules/api/PropertyAPI";
import ImageAPI from "../modules/api/ImageAPI";

const SearchPage = ({ user, toggleOverlay }) => {
  const history = useHistory();
  const query = useQuery();

  const { contract_type } = useParams();
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
    air_conditioning: query.get("air_conditioning") === "true" ? true : false,
    cctv: query.get("cctv") === "true" ? true : false,
    fitness: query.get("fitness") === "true" ? true : false,
    library: query.get("library") === "true" ? true : false,
    parking: query.get("parking") === "true" ? true : false,
    pet_friendly: query.get("pet_friendly") === "true" ? true : false,
    security: query.get("security") === "true" ? true : false,
    swimming_pool: query.get("swimming_pool") === "true" ? true : false,
    tv: query.get("tv") === "true" ? true : false,
    balcony: query.get("balcony") === "true" ? true : false,
    concierge: query.get("concierge") === "true" ? true : false,
    garden: query.get("garden") === "true" ? true : false,
    lift: query.get("lift") === "true" ? true : false,
    playground: query.get("playground") === "true" ? true : false,
    river_view: query.get("river_view") === "true" ? true : false,
    single_storey: query.get("single_storey") === "true" ? true : false,
    sport_center: query.get("sport_center") === "true" ? true : false,
    wifi: query.get("wifi") === "true" ? true : false,
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
      if (isFetch || contract_type) {
        let active_params = {
          contract_type: contract_type,
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
              if (params[param]) {
                active_params[param] = "true";
              }
          }
        }
        await instance
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
          .catch((err) => {
            if (err) {
              if (err.response) {
                console.error(err.response.data);
              } else {
                console.error(err);
              }
            }
          })
          .finally(() => {
            setOptions({ ...options, page: 1 });
            setFetch(false);
          });
      }
    })();
  }, [isFetch, contract_type]);

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
      `/search/${contract_type}${PropertyAPI.generateQueryString(params, null)}`
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
          contract_type={contract_type}
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
              <div className="w-44 h-9 border border-gray-300 rounded-xl flex items-center pl-2 pr-2 ml-1 hover:border-gray-400 ease-in duration-75">
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
              <div className=" w-44 h-9 border border-gray-300 rounded-xl flex items-center pl-2 pr-2 ml-1 hover:border-gray-400 ease-in duration-75">
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
          {isFetch ? (
            <div className="w-full h-auto">
              <Loading isStatic={true} />
            </div>
          ) : sorted_properties.length > 0 ? (
            sorted_properties.map((property, index) => {
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
              Page {options.page} of {total_page} (Total {properties.length}{" "}
              {properties.length > 1 ? "properties" : "property"})
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
                          options.page === i
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
    </div>
  );
};

export default SearchPage;
