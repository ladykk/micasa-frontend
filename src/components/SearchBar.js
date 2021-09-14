import React, { useState, useEffect } from "react";
import instance from "../modules/Instance";
import { useHistory } from "react-router-dom";

//import modules
import DataAPI from "../modules/api/DataAPI";
import PropertyAPI from "../modules/api/PropertyAPI";

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
      case "contract_type":
        setQuery({ ...query, contract_type: target.value });
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

  //Options
  const [types, setTypes] = useState([]);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    (async () => {
      //Fetch Types
      await instance
        .get(DataAPI.apiUrls.type)
        .then((result) => {
          if (result.status === 200) {
            setTypes(result.data.payload);
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data) {
              console.error(err.response.data);
            } else {
              console.error(err.response);
            }
          } else {
            console.log(err);
          }
        });
      //Fetch Contracts
      await instance
        .get(DataAPI.apiUrls.contract)
        .then((result) => {
          if (result.status === 200) {
            setContracts(result.data.payload);
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data) {
              console.error(err.response.data);
            } else {
              console.error(err.response);
            }
          } else {
            console.log(err);
          }
        });
    })();
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { contract_type, ...params } = query;
    history.push(
      `/search/${contract_type}${PropertyAPI.generateQueryString(params, null)}`
    );
  };

  return (
    <form
      className="flex items-center w-full  h-14 bg-white rounded-full pl-4 shadow-xl"
      onSubmit={handleOnSubmit}
    >
      <input
        property_type="text"
        name="terms"
        id="terms"
        placeholder="Search by property name, district, train station, or keyword."
        className="w-full  h-full focus:outline-none m-2"
        onChange={handleChange}
      />
      <select
        name="property_type"
        id="property_type"
        value={query.property_type ? query.property_type : ""}
        className="h-full flex-grow-0 flex-shrink-0 w-40 focus:outline-none"
        onChange={handleChange}
      >
        <option value="">All Property Type</option>
        {types.map((type) => (
          <option value={type}>{type}</option>
        ))}
      </select>
      <select
        name="contract_type"
        id="contract_type"
        value={query.contract_type ? query.contract_type : ""}
        className="h-full flex-grow-0 flex-shrink-0 w-36 focus:outline-none"
        onChange={handleChange}
        required
      >
        <option value="" disabled hidden>
          Contract
        </option>
        {contracts.map((contract) => {
          switch (contract) {
            case "Sell":
              return <option value="buy">Buy</option>;
            case "Rent":
              return <option value="rent">Rent</option>;
            case "New house":
              return <option value="new">New house</option>;
            default:
              return <option value={contract}>{contract}</option>;
          }
        })}
      </select>
      <button className="h-full flex-grow-0 flex-shrink-0 w-28 bg-blue-500 text-white font-normal text-lg rounded-r-full">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
