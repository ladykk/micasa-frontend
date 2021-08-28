import React, { useState } from "react";

//import modules
import PropertyData from "../modules/PropertyData";
import PropertyAPI from "../modules/api/PropertyAPI";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const history = useHistory();
  const [query, setQuery] = useState({});
  const handleChange = ({ target }) => {
    switch (target.name) {
      case "terms":
        setQuery({ ...query, terms: target.value });
        break;
      case "property_type":
        setQuery({ ...query, property_type: target.value });
        break;
      case "contract":
        setQuery({ ...query, contract: target.value });
        break;
      default:
        console.error({
          message: "handleChange() target error.",
          error: {
            target: target,
          },
        });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { contract, ...params } = query;
    history.push(
      `/search/${contract}${PropertyAPI.generateQueryString(params, null)}`
    );
  };

  return (
    <form
      className="flex items-center w-full h-14 bg-white rounded-full pl-4 shadow-xl"
      onSubmit={handleOnSubmit}
    >
      <input
        property_type="text"
        name="terms"
        id="terms"
        placeholder="Search by property name, district, train station, or keyword."
        className="w-full h-full focus:outline-none m-2"
        onChange={handleChange}
      />
      <select
        name="property_type"
        id="property_type"
        value={query.property_type ? query.property_type : ""}
        className="h-full flex-grow-0 flex-shrink-0 w-40 focus:outline-none mr-2"
        onChange={handleChange}
      >
        <option value="">All Property Type</option>
        {PropertyData.getTypesAsOption()}
      </select>
      <select
        name="contract"
        id="contract"
        value={query.contract ? query.contract : ""}
        className="h-full flex-grow-0 flex-shrink-0 w-36 focus:outline-none mr-2"
        onChange={handleChange}
        required
      >
        <option value="" disabled hidden>
          Contract
        </option>
        {PropertyData.getContractsAsOption()}
      </select>
      <button className="h-full flex-grow-0 flex-shrink-0 w-28 bg-blue-500 text-white font-normal text-lg rounded-r-full">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
