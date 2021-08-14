import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "../modules/RouterModule";

//import components
import Filter from "../components/Filter";
import PropertyCard from "../components/PropertyCard";
import PropertyMock from "../mock/PropertyMock";

const SearchPage = () => {
  const history = useHistory();
  const query = useQuery();

  const { contract } = useParams();
  const [params, setParams] = useState({
    //Terms
    terms: query.get("terms") ? query.get("terms") : "",
    //Query Properties
    page: query.get("page") ? query.get("page") : 1,
    sort_by: query.get("sort_by") ? query.get("sort_by") : "new_added",
    items_per_page: query.get("items_per_page")
      ? query.get("items_per_page")
      : 5,
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
    furnished: query.get("furnished"),
    unfurnished: query.get("unfurnished"),
    partly_furnished: query.get("partly_furnished"),
    //Ownership
    freehold: query.get("freehold"),
    leasehold: query.get("leasehold"),
    //Facilities
    air_conditioning: query.get("air_conditioning"),
    cctv: query.get("cctv"),
    fitness: query.get("fitness"),
    library: query.get("library"),
    parking: query.get("parking"),
    pet_friendly: query.get("pet_friendly"),
    security: query.get("security"),
    swimming_pool: query.get("swimming_pool"),
    tv: query.get("tv"),
    balcony: query.get("balcony"),
    concierge: query.get("concierge"),
    garden: query.get("garden"),
    lift: query.get("lift"),
    playground: query.get("playground"),
    river_view: query.get("river_view"),
    single_storey: query.get("single_storey"),
    sport_center: query.get("sport_center"),
    wifi: query.get("wifi"),
  });

  const [isFetch, setFetch] = useState(true);

  const [properties, setProperties] = useState([]);
  const total_page =
    properties.length === 0
      ? 1
      : Math.ceil(properties.length / params.items_per_page);

  useEffect(() => {
    (async () => {
      if (isFetch) {
        const properties = PropertyMock.getPropertiesByContract(contract);
        // const properties = PropertyMock.getPropertiesByContract(contract);
        console.log(properties);
        setProperties(properties);
        setFetch(false);
      }
    })();
  }, [isFetch]);

  useEffect(() => {
    if (!isFetch) {
      setFetch(true);
    }
  }, [contract]);

  const handleOnChange = ({ target }) => {
    setParams({ ...params, [target.name]: target.value });
  };

  const handlePageChange = ({ target }) => {
    const page = Number.parseInt(params.page, 10);
    switch (target.innerHTML) {
      case "&lt;":
        if (page - 1 !== 0) {
          console.log("left");
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

  return (
    <div className="w-screen h-screen absolute top-0 left-0 right-0 bottom-0 pt-20 pb-10 ">
      <div className="w-full pl-5 pr-5 2xl:w-4/5 h-auto mx-auto flex">
        <Filter contract={contract} params={params} setParams={setParams} />
        <div className="w-full h-auto">
          {/* Search Bar */}
          <form
            id="terms"
            className="flex items-center w-full h-12 bg-white rounded-full pl-4 shadow border border-gray-300 mb-3 hover:border-gray-400 ease-in duration-75"
          >
            <input
              type="text"
              name="terms"
              id="terms"
              placeholder="Search by property name, district, train station, or keyword."
              className="w-full h-full focus:outline-none m-2"
              onChange={handleOnChange}
              value={params.terms}
              required
            />
            <button className="h-full flex-grow-0 flex-shrink-0 w-28 bg-blue-500 text-white font-normal text-lg rounded-r-full">
              Search
            </button>
          </form>
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
              return <PropertyCard key={current_property} data={property} />;
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
