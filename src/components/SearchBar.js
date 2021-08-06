import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState({});
  const handleChange = ({ target }) => {
    switch (target.name) {
      case "terms":
        setQuery({ ...query, terms: target.value });
        break;
      case "type":
        setQuery({ ...query, type: target.value });
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

  return (
    <form className="flex items-center w-full h-14 bg-white rounded-full pl-4 shadow-xl">
      <input
        type="text"
        name="terms"
        id="terms"
        placeholder="Search by property name, district, train station, or keyword."
        className="w-full h-full focus:outline-none m-2"
        onChange={handleChange}
        required
      />
      <select
        name="type"
        id="type"
        value={query.type ? query.type : ""}
        className="h-full flex-grow-0 flex-shrink-0 w-40 focus:outline-none mr-2"
        onChange={handleChange}
        required
      >
        <option value="" disabled hidden>
          Property Type
        </option>
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
        <option value="buy">Buy</option>
        <option value="rent">Rent</option>
        <option value="new">New house</option>
      </select>
      <button className="h-full flex-grow-0 flex-shrink-0 w-28 bg-blue-500 text-white font-normal text-lg rounded-r-full">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
