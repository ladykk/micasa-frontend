import React, { useState } from "react";
import { Link } from "react-router-dom";

//import pictures
import property_type_icon from "../assets/icons/filter/buildings.png";
import bedroom_icon from "../assets/icons/filter/double-bed.png";
import bathroom_icon from "../assets/icons/filter/toilet.png";
import PropertyData from "../modules/PropertyData";
import PropertyAPI from "../modules/api/PropertyAPI";

const Filter = ({ contract_type, params, setParams, handleOnSubmit }) => {
  const [errors, setErrors] = useState({});
  const [isFurnishingOpen, setFurnishing] = useState(false);
  const [isOwnershipOpen, setOwnership] = useState(false);
  const [isFacilitiesOpen, setFacilities] = useState(false);

  const handleFurnishingToggle = () => {
    setFurnishing(!isFurnishingOpen);
  };
  const handleOwnershipToggle = () => {
    setOwnership(!isOwnershipOpen);
  };
  const handleFacilitiesToggle = () => {
    setFacilities(!isFacilitiesOpen);
  };
  const handleOnChange = ({ target }) => {
    setErrors({ ...errors, [target.name]: "" });
    const number = Number.parseFloat(target.value, 10);
    const min_price = Number.parseFloat(params.min_price, 10);
    const max_price = Number.parseFloat(params.max_price, 10);
    const min_area = Number.parseFloat(params.min_area, 10);
    const max_area = Number.parseFloat(params.max_area, 10);
    if (number < 0) return;
    switch (target.name) {
      case "furnished":
      case "unfurnished":
      case "partly_furnished":
      case "freehold":
      case "leasehold":
      case "air_conditioning":
      case "cctv":
      case "fitness":
      case "library":
      case "parking":
      case "pet_friendly":
      case "security":
      case "swimming_pool":
      case "tv":
      case "balcony":
      case "concierge":
      case "garden":
      case "lift":
      case "playground":
      case "river_view":
      case "single_storey":
      case "sport_center":
      case "wifi":
        setParams({ ...params, [target.name]: !params[target.name] });
        break;
      case "min_price":
        if (number === 0) {
          setParams({ ...params, [target.name]: number });
        } else if (params.max_price && number < max_price) {
          setParams({ ...params, [target.name]: number });
        } else if (params.max_price && number < min_price) {
          setParams({ ...params, [target.name]: number });
        } else if (!params.max_price) {
          setParams({ ...params, [target.name]: number });
        } else if (Number.isNaN(number)) {
          setParams({ ...params, [target.name]: 0 });
        } else {
          setParams({ ...params, [target.name]: number });
          setErrors({
            ...errors,
            [target.name]: "(Min > Max)",
          });
        }
        break;
      case "min_area":
        if (number === 0) {
          setParams({ ...params, [target.name]: number });
        } else if (params.max_area && number < max_area) {
          setParams({ ...params, [target.name]: number });
        } else if (params.max_area && number < min_area) {
          setParams({ ...params, [target.name]: number });
        } else if (!params.max_area) {
          setParams({ ...params, [target.name]: number });
        } else if (Number.isNaN(number)) {
          setParams({ ...params, [target.name]: 0 });
        } else {
          setParams({ ...params, [target.name]: number });
          setErrors({
            ...errors,
            [target.name]: "(Min > Max)",
          });
          break;
        }
        break;
      case "max_price":
        if (number === 0) {
          setParams({ ...params, [target.name]: number });
        } else if (params.min_price && number > min_price) {
          setParams({ ...params, [target.name]: number });
        } else if (params.max_price && number > max_price) {
          setParams({ ...params, [target.name]: number });
        } else if (!params.max_price && params.min_price) {
          setParams({ ...params, [target.name]: min_price + 1500 });
        } else if (!params.max_price) {
          setParams({ ...params, [target.name]: number });
        } else if (Number.isNaN(number)) {
          setParams({ ...params, [target.name]: 0 });
        } else {
          setParams({ ...params, [target.name]: number });
          setErrors({ ...errors, [target.name]: "(Max < Min)" });
        }
        break;
      case "max_area":
        if (number === 0) {
          setParams({ ...params, [target.name]: number });
        } else if (params.min_area && number > min_area) {
          setParams({ ...params, [target.name]: number });
        } else if (params.max_area && number > max_area) {
          setParams({ ...params, [target.name]: number });
        } else if (!params.max_area && params.min_area) {
          setParams({ ...params, [target.name]: min_area + 5 });
        } else if (!params.max_area) {
          setParams({ ...params, [target.name]: number });
        } else if (Number.isNaN(number)) {
          setParams({ ...params, [target.name]: 0 });
        } else {
          setParams({ ...params, [target.name]: number });
          setErrors({ ...errors, [target.name]: "(Max < Min)" });
        }
        break;
      default:
        setParams({ ...params, [target.name]: target.value });
    }
  };

  return (
    <form
      id="filter"
      className=" w-max h-fit-content flex flex-grow-0 flex-shrink-0 mr-10"
      onSubmit={handleOnSubmit}
    >
      <div className="w-full h-auto p-4 pt-8 pb-8 border border-gray-300 rounded-xl shadow hover:border-gray-400 ease-in duration-75">
        {/* Header */}
        <h1 className="text-5xl font-medium mb-3">Filter</h1>
        {/* Contract */}
        <div className="flex h-9 items-center mb-3 justify-between">
          <p className=" mr-3">I'm looking for</p>
          <div className="h-9 flex items-center">
            <Link
              to={`/search/buy${PropertyAPI.generateQueryString(params, {})}`}
              className={`p-4 pt-1 pb-1 ml-1  font-normal rounded-full ${
                contract_type === "buy"
                  ? "bg-blue-500 text-white border border-blue-500"
                  : "bg-white text-blue-500 border border-gray-300 ease-in duration-75 hover:border-gray-400"
              }`}
            >
              Buy
            </Link>
            <Link
              to={`/search/rent${PropertyAPI.generateQueryString(params, {})}`}
              className={`p-4 pt-1 pb-1 ml-1  font-normal rounded-full ${
                contract_type === "rent"
                  ? "bg-blue-500 text-white border border-blue-500"
                  : "bg-white text-blue-500 border border-gray-300 ease-in duration-75 hover:border-gray-400"
              }`}
            >
              Rent
            </Link>
            <Link
              to={`/search/new${PropertyAPI.generateQueryString(params, {})}`}
              className={`p-4 pt-1 pb-1 ml-1 font-normal rounded-full ${
                contract_type === "new"
                  ? "bg-blue-500 text-white border border-blue-500"
                  : "bg-white text-blue-500 border border-gray-300 ease-in duration-75 hover:border-gray-400"
              }`}
            >
              New House
            </Link>
          </div>
        </div>
        {/* Property Type */}
        <div className="w-full h-10 border border-gray-300 rounded-xl flex items-center pl-2 mb-3 hover:border-gray-400 ease-in duration-75">
          <img src={property_type_icon} alt="" className="w-6 h-6 mr-1" />
          <select
            name="property_type"
            id="property_type"
            className="w-full h-full outline-none"
            value={params.property_type ? params.property_type : ""}
            onChange={handleOnChange}
          >
            <option value="">All Property Type</option>
            {PropertyData.getTypesAsOption()}
          </select>
        </div>
        {/* Bedroom & Bathroom */}
        <div className="flex mb-3 w-full">
          <div className="w-full h-10 border border-gray-300 rounded-xl flex items-center pl-2 mr-1 hover:border-gray-400 ease-in duration-75">
            <img src={bedroom_icon} alt="" className="w-6 h-6 mr-1" />
            <select
              name="bedroom"
              id="bedroom"
              className="w-full h-full outline-none"
              value={params.bedroom ? params.bedroom : ""}
              onChange={handleOnChange}
            >
              <option value="">All Bedroom</option>
              {PropertyData.getBedroomAsOption()}
            </select>
          </div>
          <div className="w-full h-10 border border-gray-300 rounded-xl flex items-center pl-2 ml-1 hover:border-gray-400 ease-in duration-75">
            <img src={bathroom_icon} alt="" className="w-6 h-6 mr-1" />
            <select
              name="bathroom"
              id="bathroom"
              className="w-full h-full outline-none"
              value={params.bathroom ? params.bathroom : ""}
              onChange={handleOnChange}
            >
              <option value="">All Bathroom</option>
              {PropertyData.getBathroomAsOption()}
            </select>
          </div>
        </div>
        {/* Price Range */}
        <div className="mb-3">
          <p className="mb-2 flex space justify-between">
            Price Range (Baht)
            <span className="text-red-500">
              {errors.min_price} {errors.min_price && errors.max_price && ":"}{" "}
              {errors.max_price}
            </span>
          </p>
          <div className="flex items-center justify-center">
            <input
              type="number"
              name="min_price"
              id="min_price"
              className=" w-28 h-10 border border-gray-300 rounded-xl flex items-center pl-2 pr-2 outline-none text-center hover:border-gray-400 ease-in duration-75"
              value={params.min_price ? params.min_price : 0}
              onChange={handleOnChange}
              placeholder="Min."
              step="1"
              min="0"
            />
            <p className="m-4 mt-0 mb-0">-</p>
            <input
              type="number"
              name="max_price"
              id="max_price"
              className=" w-28 h-10 border border-gray-300 rounded-xl flex items-center pl-2 pr-2 outline-none text-center hover:border-gray-400 ease-in duration-75"
              value={params.max_price ? params.max_price : 0}
              onChange={handleOnChange}
              placeholder="Max."
              step="1"
              min="0"
            />
          </div>
        </div>
        {/* Area Range */}
        <div className="mb-3">
          <div className="mb-2 flex space justify-between">
            <p>
              Area Range (m<sup>2</sup>)
            </p>

            <span className="text-red-500">
              {errors.min_area} {errors.min_area && errors.max_area && ":"}{" "}
              {errors.max_area}
            </span>
          </div>
          <div className="flex items-center justify-center">
            <input
              type="number"
              name="min_area"
              id="min_area"
              className=" w-28 h-10 border border-gray-300 rounded-xl flex items-center pl-2 pr-2 outline-none text-center hover:border-gray-400 ease-in duration-75"
              value={params.min_area ? params.min_area : 0}
              onChange={handleOnChange}
              placeholder="Min."
              step="0.01"
            />
            <p className="m-4 mt-0 mb-0">-</p>
            <input
              type="number"
              name="max_area"
              id="max_area"
              className=" w-28 h-10 border border-gray-300 rounded-xl flex items-center pl-2 pr-2 outline-none text-center hover:border-gray-400 ease-in duration-75"
              value={params.max_area ? params.max_area : 0}
              onChange={handleOnChange}
              placeholder="Max."
              step="0.01"
            />
          </div>
        </div>
        {/* Furnishing */}
        <div className="mb-2">
          <div
            onClick={handleFurnishingToggle}
            className="flex p-1 pl-4 pr-4 h-9 items-center justify-between cursor-pointer bg-blue-500 rounded-xl text-white"
          >
            <p>Furnishing</p>
            <p className="text-2xl">{isFurnishingOpen ? "-" : "+"}</p>
          </div>
          <div
            className={`pt-2 pl-5 pr-5 trans-toggle ${
              isFurnishingOpen && "active"
            }
            `}
          >
            <div className="flex justify-between items-center mb-2">
              <p>Furnished</p>
              <label className="switch">
                <input
                  type="checkbox"
                  name="furnished"
                  id="furnished"
                  checked={params.furnished}
                  onChange={handleOnChange}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p>Unfurnished</p>
              <label className="switch">
                <input
                  type="checkbox"
                  name="unfurnished"
                  id="unfurnished"
                  checked={params.unfurnished}
                  onChange={handleOnChange}
                />
                <span className=" bg-blue-500 slider round"></span>
              </label>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p>Partly furnished</p>
              <label className="switch">
                <input
                  type="checkbox"
                  name="partly_furnished"
                  id="partly_furnished"
                  checked={params.partly_furnished}
                  onChange={handleOnChange}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        {/* Ownership */}
        <div className="mb-2">
          <div
            onClick={handleOwnershipToggle}
            className="flex p-1 pl-4 pr-4 h-9 items-center justify-between cursor-pointer bg-blue-500 rounded-xl text-white"
          >
            <p>Ownership</p>
            <p className="text-2xl">{isOwnershipOpen ? "-" : "+"}</p>
          </div>
          <div
            className={`pt-2 pl-5 pr-5 trans-toggle ${
              isOwnershipOpen && "active"
            }
            `}
          >
            <div className="flex justify-between items-center mb-2">
              <p>Freehold</p>
              <label className="switch">
                <input
                  type="checkbox"
                  name="freehold"
                  id="freehold"
                  checked={params.freehold}
                  onChange={handleOnChange}
                />
                <span className=" bg-blue-500 slider round"></span>
              </label>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p>Leasehold</p>
              <label className="switch">
                <input
                  type="checkbox"
                  name="leasehold"
                  id="leasehold"
                  checked={params.leasehold}
                  onChange={handleOnChange}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        {/* Facilities */}
        <div className="w-full mb-2">
          <div
            onClick={handleFacilitiesToggle}
            className="flex p-1 pl-4 pr-4 h-9 items-center justify-between cursor-pointer bg-blue-500 rounded-xl text-white"
          >
            <p>Facilities</p>
            <p className="text-2xl">{isFacilitiesOpen ? "-" : "+"}</p>
          </div>
          <div
            className={`w-full pt-2 pl-5 pr-5 trans-toggle ${
              isFacilitiesOpen && "active"
            }
            `}
          >
            <div className="w-full flex">
              <div className="w-50 flex-1">
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="air_conditioning"
                    name="air_conditioning"
                    checked={params.air_conditioning}
                    onChange={handleOnChange}
                    className="mr-3 w-4 h-4"
                  />
                  <p>Air Conditioning</p>
                </div>
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="cctv"
                    name="cctv"
                    checked={params.cctv}
                    onChange={handleOnChange}
                    className="mr-3 w-4 h-4"
                  />
                  <p>CCTV</p>
                </div>
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="fitness"
                    name="fitness"
                    checked={params.fitness}
                    onChange={handleOnChange}
                    className="mr-3 w-4 h-4"
                  />
                  <p>Fitness</p>
                </div>
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="library"
                    name="library"
                    checked={params.library}
                    onChange={handleOnChange}
                    className="mr-3 w-4 h-4"
                  />
                  <p>Library</p>
                </div>
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="parking"
                    name="parking"
                    checked={params.parking}
                    onChange={handleOnChange}
                    className="mr-3 w-4 h-4"
                  />
                  <p>Parking</p>
                </div>
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="pet_friendly"
                    name="pet_friendly"
                    checked={params.pet_friendly}
                    onChange={handleOnChange}
                    className="mr-3 w-4 h-4"
                  />
                  <p>Pet Friendly</p>
                </div>
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="security"
                    name="security"
                    checked={params.security}
                    onChange={handleOnChange}
                    className="mr-3 w-4 h-4"
                  />
                  <p>Security</p>
                </div>
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="swimming_pool"
                    name="swimming_pool"
                    checked={params.swimming_pool}
                    className="mr-3 w-4 h-4"
                    onChange={handleOnChange}
                  />
                  <p>Swimming Pool</p>
                </div>
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="tv"
                    name="tv"
                    checked={params.tv}
                    onChange={handleOnChange}
                    className="mr-3 w-4 h-4"
                  />
                  <p>TV</p>
                </div>
              </div>
              <div className="w-50 flex-1">
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="balcony"
                    name="balcony"
                    checked={params.balcony}
                    onChange={handleOnChange}
                    className="mr-3 w-4 h-4"
                  />
                  <p>Balcony</p>
                </div>
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="concierge"
                    name="concierge"
                    checked={params.concierge}
                    onChange={handleOnChange}
                    className="mr-3 w-4 h-4"
                  />
                  <p>Concierge</p>
                </div>
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="garden"
                    name="garden"
                    checked={params.garden}
                    onChange={handleOnChange}
                    className="mr-3 w-4 h-4"
                  />
                  <p>Garden</p>
                </div>
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="lift"
                    name="lift"
                    checked={params.lift}
                    onChange={handleOnChange}
                    className="mr-3 w-4 h-4"
                  />
                  <p>Lift</p>
                </div>
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="playground"
                    name="playground"
                    checked={params.playground}
                    onChange={handleOnChange}
                    className="mr-3 w-4 h-4"
                  />
                  <p>Playground</p>
                </div>
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="river_view"
                    name="river_view"
                    checked={params.river_view}
                    onChange={handleOnChange}
                    className="mr-3 w-4 h-4"
                  />
                  <p>River View</p>
                </div>
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="single_storey"
                    name="single_storey"
                    checked={params.single_storey}
                    onChange={handleOnChange}
                    className="mr-3 w-4 h-4"
                  />
                  <p>Single Storey</p>
                </div>
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="sport_center"
                    name="sport_center"
                    checked={params.sport_center}
                    onChange={handleOnChange}
                    className="mr-3 w-4 h-4"
                  />
                  <p>Sport Center</p>
                </div>
                <div className="flex items-center mb-1.5">
                  <input
                    type="checkbox"
                    id="wifi"
                    name="wifi"
                    checked={params.wifi}
                    onChange={handleOnChange}
                    className="mr-3 w-4 h-4"
                  />
                  <p>WIFI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-normal h-9 rounded-3xl w-full"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default Filter;
