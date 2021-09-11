import React, { useState } from "react";
import { Prompt, useHistory } from "react-router-dom";
import Iframe from "react-iframe";
import PropertyData from "../modules/PropertyData";

//import pictures
import no_img from "../assets/images/noimage.png";
import maps from "../assets/images/maps.jpeg";
import progress from "../assets/images/progress.gif";

//import components
import PropertyPage from "../pages/PropertyPage";
import instance from "../modules/Instance";

//import modules
const PropertyAPI = require("../modules/api/PropertyAPI");

const PropertyForm = ({ data, setIsFetch }) => {
  const history = useHistory();

  const [isBlock, setBlock] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [form, setForm] = useState(
    data
      ? { ...data }
      : {
          property_name: "",
          property_type: "",
          contract_type: "",
          area: "",
          price: "",
          rent_payment: "None",
          rent_requirement: "",
          bedroom: "",
          bathroom: "",
          district: "",
          province: "",
          near_station: "None",
          maps_query: "",
          furnishing: "",
          ownership: "Freehold",
          facilities: {
            air_conditioning: false,
            balcony: false,
            cctv: false,
            concierge: false,
            fitness: false,
            garden: false,
            library: false,
            lift: false,
            parking: false,
            playground: false,
            pet_friendly: false,
            river_view: false,
            security: false,
            single_storey: false,
            swimming_pool: false,
            sport_center: false,
            tv: false,
            wifi: false,
          },
          description: "",
          images: {
            image_cover: null,
            image_1: null,
            image_2: null,
            image_3: null,
            image_4: null,
            image_5: null,
            image_6: null,
            image_7: null,
            image_8: null,
            image_9: null,
            image_10: null,
          },
        }
  );
  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState(data ? { ...data.images } : {});

  //Display
  const [display, setDisplay] = useState(false);
  const handleSwitchDisplay = () => {
    let check = {
      property_name: form.property_name ? false : true,
      property_type: form.property_type ? false : true,
      contract_type: form.contract_type ? false : true,
      rent_payment:
        form.contract_type === "Rent"
          ? form.rent_payment
            ? false
            : true
          : false,
      area: form.area ? false : true,
      price: form.price ? false : true,
      bedroom: form.bedroom ? false : true,
      bathroom: form.bathroom ? false : true,
      district: form.district ? false : true,
      province: form.province ? false : true,
      furnishing: form.furnishing ? false : true,
      description: form.description ? false : true,
      cover: form.images.image_cover ? false : true,
    };
    let pass = true;
    for (let error in check) {
      if (check[error]) {
        pass = false;
        break;
      }
    }
    if (pass) {
      setErrors({ ...errors, form: "" });
      setDisplay(!display);
    } else {
      setErrors({
        ...errors,
        ...check,
        form: "Please fill all required field before preview.",
      });
    }
  };

  //Refs
  const refs = {
    image_cover: React.createRef(),
    image_1: React.createRef(),
    image_2: React.createRef(),
    image_3: React.createRef(),
    image_4: React.createRef(),
    image_5: React.createRef(),
    image_6: React.createRef(),
    image_7: React.createRef(),
    image_8: React.createRef(),
    image_9: React.createRef(),
    image_10: React.createRef(),
  };
  const removeImage = (name) => {
    switch (name) {
      case "image_cover":
      case "image_1":
      case "image_2":
      case "image_3":
      case "image_4":
      case "image_5":
      case "image_6":
      case "image_7":
      case "image_8":
      case "image_9":
      case "image_10":
        refs[name].current.value = "";
        setForm({ ...form, images: { ...form.images, [name]: null } });
        setPreviews({ ...previews, [name]: null });
        break;
      default:
    }
    if (data) {
      setBlock(true);
    }
  };
  const handleOnChange = ({ target }) => {
    setBlock(true);
    setErrors({ ...errors, [target.name]: "", display: "" });
    switch (target.name) {
      case "contract_type":
        if (target.value === "Rent") {
          setForm({
            ...form,
            rent_payment: "Month",
            rent_requirement: "",
            contract_type: "Rent",
          });
        } else {
          setForm({
            ...form,
            rent_payment: "None",
            rent_requirement: "",
            contract_type: target.value,
          });
        }
        break;
      case "image_cover":
      case "image_1":
      case "image_2":
      case "image_3":
      case "image_4":
      case "image_5":
      case "image_6":
      case "image_7":
      case "image_8":
      case "image_9":
      case "image_10":
        try {
          const file = target.files[0];
          switch (file.type) {
            case "image/jpg":
            case "image/jpeg":
            case "image/png":
              setPreviews({
                ...previews,
                [target.name]: URL.createObjectURL(file),
              });
              setForm({
                ...form,
                images: { ...form.images, [target.name]: file },
              });
              if (target.name === "image_cover") {
                setErrors({ ...errors, cover: false });
              }
              break;
            default:
              setErrors({
                ...errors,
                [target.name]: "File type is not supported.",
              });
          }
        } catch (e) {}
        break;
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
        setForm({
          ...form,
          facilities: {
            ...form.facilities,
            [target.name]: !form.facilities[target.name],
          },
        });
        break;
      default:
        setForm({ ...form, [target.name]: target.value });
    }
  };
  const handleOnReset = () => {
    setForm(
      data
        ? { ...data }
        : {
            property_name: "",
            property_type: "",
            contract_type: "",
            area: "",
            price: "",
            rent_payment: "None",
            rent_requirement: "",
            bedroom: 0,
            bathroom: 0,
            district: "",
            province: "",
            near_station: "None",
            maps_query: "",
            furnishing: "",
            ownership: "Freehold",
            facilities: {
              air_conditioning: false,
              balcony: false,
              cctv: false,
              concierge: false,
              fitness: false,
              garden: false,
              library: false,
              lift: false,
              parking: false,
              playground: false,
              pet_friendly: false,
              river_view: false,
              security: false,
              single_storey: false,
              swimming_pool: false,
              sport_center: false,
              tv: false,
              wifi: false,
            },
            description: "",
            images: {
              image_cover: null,
              image_1: null,
              image_2: null,
              image_3: null,
              image_4: null,
              image_5: null,
              image_6: null,
              image_7: null,
              image_8: null,
              image_9: null,
              image_10: null,
            },
          }
    );
    setPreviews(data ? { ...data.images } : {});
    setErrors({});
    setDisplay(false);
    setBlock(false);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (
      form.property_name &&
      form.property_type &&
      form.contract_type &&
      form.area &&
      form.price &&
      form.rent_payment &&
      form.bedroom &&
      form.bathroom &&
      form.district &&
      form.province &&
      form.near_station &&
      form.furnishing &&
      form.ownership &&
      form.description &&
      form.image_cover
    ) {
      setErrors({ ...errors, form: "Please fill all required fields." });
      return;
    }
    setSubmit(true);
    if (data) {
      const updatePropertyForm = PropertyAPI.updatePropertyForm(data, form);
      await instance({
        method: "patch",
        url: `${PropertyAPI.apiUrls.edit}/${data.property_id}`,
        data: updatePropertyForm,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((result) => {
          if (result.status === 201) {
            setBlock(false);
            setIsFetch(true);
            history.goBack();
          }
        })
        .catch((err) => {
          if (err) {
            if (err.response) {
              switch (err.response.status) {
                case 400:
                case 401:
                  setErrors({ ...errors, form: err.response.data.error });
                  break;
                default:
                  console.error(err.response.data);
                  setErrors({ ...errors, form: "Something went wrong." });
                  break;
              }
            } else {
              console.error(err);
            }
          }
        })
        .finally(() => {
          setSubmit(false);
        });
    } else {
      const addPropertyForm = PropertyAPI.addPropertyForm(form);
      await instance({
        method: "post",
        url: PropertyAPI.apiUrls.add,
        data: addPropertyForm,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((result) => {
          if (result.status === 201) {
            setBlock(false);
            history.goBack();
          }
        })
        .catch((err) => {
          if (err) {
            if (err.response) {
              switch (err.response.status) {
                case 400:
                case 401:
                  setErrors({ ...errors, form: err.response.data.error });
                  break;
                default:
                  console.error(err.response.data);
                  setErrors({ ...errors, form: "Something went wrong." });
                  break;
              }
            } else {
              console.error(err);
            }
          }
        })
        .finally(() => {
          setSubmit(false);
        });
    }
  };

  const images = () => {
    const elements = [];
    for (let i = 1; i <= 10; i++) {
      elements.push(
        <div className="relative w-full  h-64 rounded-lg border border-gray-300 text-white hover:border-gray-400 ease-in duration-75">
          <input
            type="file"
            id={`image_${i}`}
            name={`image_${i}`}
            onChange={handleOnChange}
            ref={refs[`image_${i}`]}
            className="hidden"
          />
          <img
            src={previews[`image_${i}`] ? previews[`image_${i}`] : no_img}
            alt=""
            className="w-full  h-full object-contain object-center rounded-lg"
          />
          <button
            type="button"
            onClick={() => {
              if (previews[`image_${i}`]) {
                removeImage(`image_${i}`);
              } else {
                refs[`image_${i}`].current.click();
              }
            }}
            className={`z-20 absolute top-1/2 left-1/2 transform-center w-8 h-8 flex items-center justify-center rounded-full font-normal text-xl ${
              previews[`image_${i}`]
                ? "trans-hover  bg-red-500"
                : "bg-opacity-90 hover:bg-opacity-80 ease-in duration-75 bg-blue-500"
            }`}
          >
            {previews[`image_${i}`] ? "-" : "+"}
          </button>
          <p
            className={`absolute bottom-2 right-3 text-red-500 p-0.5 pr-3 pl-3 bg-white rounded-full shadow ${
              !errors[`image_${i}`] && "hidden"
            }`}
          >
            {errors[`image_${i}`]}
          </p>
        </div>
      );
    }
    return elements;
  };

  return (
    <form
      className="w-full  h-max-content relative p-6 border border-gray-300 rounded-lg shadow place-items-start mb-10 hover:border-gray-400 ease-in duration-75"
      onSubmit={handleOnSubmit}
    >
      <Prompt when={isBlock} message={"Are you sure to dismiss the from ?"} />
      {/* Floating Panel */}
      <div className="sticky top-5 left-0 right-0 w-full  h-fit-content z-40 mb-5 flex items-center justify-between rounded-full border border-gray-300 p-2 pl-3 pr-3 bg-white shadow hover:border-gray-400 ease-in duration-75">
        {/* Display Toggle */}
        <div className="flex items-center">
          <label className="switch mr-3">
            <input
              type="checkbox"
              name="display"
              id="display"
              checked={display}
              onChange={handleSwitchDisplay}
            />
            <span className="slider round"></span>
          </label>
          <p className="font-normal">Preview</p>
          <p className="text-red-500 ml-3">{errors.form}</p>
          {isSubmit && (
            <div className="flex items-center justify-center">
              <img src={progress} alt="" className="w-8 h-8" />
              <p className="ml-2">Processing...</p>
            </div>
          )}
        </div>
        <div className="flex items-center">
          {/* Status */}
          {data && (
            <div className="flex mr-3">
              <p className="mr-2 flex items-center justify-end">
                Status: <sup className="text-red-500">*</sup>
              </p>
              <div className=" w-36 h-8 bg-white pl-2 rounded-lg shadow border border-gray-300 hover:border-gray-400 ease-in duration-75">
                <select
                  type="text"
                  name="status"
                  id="status"
                  value={form.status}
                  onChange={handleOnChange}
                  className="outline-none w-full  h-full"
                  required
                  disabled={display || data.status === "Pending"}
                >
                  {PropertyData.getStatusAsOption()}
                </select>
              </div>
              {form.status === "Sold" && (
                <div className="flex ml-3">
                  <p className="mr-2 flex items-center justify-end">
                    To: <sup className="text-red-500">*</sup>
                  </p>
                  <input
                    type="text"
                    name="buyer"
                    id="buyer"
                    value={form.buyer}
                    onChange={handleOnChange}
                    className=" h-8 bg-white p-2 rounded-lg shadow border border-gray-300 outline-none hover:border-gray-400 ease-in duration-75"
                    disabled={form.status !== "Sold" || display}
                    required={form.status === "Sold"}
                  />
                </div>
              )}
            </div>
          )}
          {/* Reset Button */}
          <button
            type="button"
            onClick={handleOnReset}
            className={`mr-2 flex items-center justify-center w-full  p-1 pl-3 pr-3 rounded-full text-white ${
              isBlock ? "bg-red-500" : "bg-gray-500"
            } font-normal align-middle hover:bg-opacity-90 ease-in duration-75`}
          >
            Reset
          </button>
          {/* Submit Button */}
          <button
            type="submit"
            className={`flex items-center justify-center w-full  p-1 pl-3 pr-3 rounded-full text-white ${
              isBlock ? "bg-blue-500" : "bg-gray-500"
            } font-normal align-middle hover:bg-opacity-90 ease-in duration-75`}
          >
            Submit
          </button>
        </div>
      </div>
      {display ? (
        <div className="w-full  h-max-content border border-gray-300 rounded-md shadow hover:border-gray-400 ease-in duration-75">
          {/* Preview */}
          <PropertyPage
            preview={form}
            preview_images={previews}
            user={{ class: "Customer" }}
          />
        </div>
      ) : (
        <div>
          {/* Form */}
          <div className="flex">
            <div className="w-1/2 flex-shrink-0 flex-grow-0 mb-5">
              {/* Cover Image */}
              <p className="text-lg font-normal mb-2">
                Cover image: <sup className="text-red-500">*</sup>
              </p>
              <div
                className={`relative w-full  h-64 mb-5 rounded-lg border ${
                  errors.cover
                    ? "border-red-400"
                    : "border-gray-300 hover:border-gray-400"
                } text-white ease-in duration-75`}
              >
                <input
                  type="file"
                  id="image_cover"
                  name="image_cover"
                  onChange={handleOnChange}
                  ref={refs.image_cover}
                  className="hidden"
                />
                <img
                  src={previews.image_cover ? previews.image_cover : no_img}
                  alt=""
                  className="w-full  h-full object-cover object-center rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (previews.image_cover) {
                      removeImage("image_cover");
                    } else {
                      refs.image_cover.current.click();
                    }
                  }}
                  className={`z-20 absolute top-1/2 left-1/2 transform-center w-8 h-8 flex items-center justify-center rounded-full font-normal text-xl ${
                    previews.image_cover
                      ? "trans-hover  bg-red-500"
                      : "bg-opacity-90 hover:bg-opacity-80 ease-in duration-75 bg-blue-500"
                  }`}
                >
                  {previews.image_cover ? "-" : "+"}
                </button>
                <p
                  className={`absolute bottom-2 right-3 text-red-500 p-0.5 pr-3 pl-3 bg-white rounded-full shadow ${
                    !errors.image_cover && "hidden"
                  }`}
                >
                  {errors.image_cover}
                </p>
              </div>
              {/* Maps */}
              <p className="text-lg font-normal mb-3">Maps:</p>
              <input
                type="text"
                name="maps_query"
                id="maps_query"
                value={form.maps_query}
                onChange={handleOnChange}
                className="w-full  mb-4 h-8 bg-white p-2 rounded-lg shadow border border-gray-300 outline-none hover:border-gray-400 ease-in duration-75"
                placeholder="Search in Google Maps"
              />
              {form.maps_query ? (
                <Iframe
                  url={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAy2j5w0QgLgcqULL0Kj0jGanCZ3WlEdKk&q=${form.maps_query}&zoom=19`}
                  className="w-full  h-120 border border-gray-300 rounded-md shadow hover:border-gray-400 ease-in duration-75"
                />
              ) : (
                <img
                  src={maps}
                  alt=""
                  className="w-full  h-120 border border-gray-300 rounded-md shadow object-cover object-center hover:border-gray-400 ease-in duration-75"
                />
              )}
            </div>
            <div className="grid grid-cols-4 gap-2 w-1/2 h-fit-content ml-10">
              {/* Property Information */}
              <p className="text-lg font-normal mb-2 col-span-4">
                Property Information:
              </p>
              {/* Property ID */}
              {form.property_id && (
                <p className="mr-1 flex items-center justify-end">
                  Property ID: <sup className="text-red-500">*</sup>
                </p>
              )}
              {form.property_id && (
                <input
                  type="text"
                  name="property_id"
                  id="property_id"
                  value={form.property_id}
                  className=" col-span-3 w-full  h-8 bg-white p-2 rounded-lg shadow border border-gray-300 outline-none hover:border-gray-400 ease-in duration-75"
                  disabled
                  required
                />
              )}
              {/* Property Name */}
              <p className="mr-1 flex items-center justify-end">
                Property name: <sup className="text-red-500">*</sup>
              </p>
              <input
                type="text"
                name="property_name"
                id="property_name"
                value={form.property_name}
                onChange={handleOnChange}
                className={`col-span-3 w-full  h-8 bg-white p-2 rounded-lg shadow border outline-none ease-in duration-75 ${
                  errors.property_name
                    ? "border-red-400"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                required
              />
              {/* Property Type */}
              <p className="mr-1 flex items-center justify-end">
                Property type: <sup className="text-red-500">*</sup>
              </p>
              <div
                className={`col-span-3 w-64 h-8 bg-white pl-2 rounded-lg shadow border ease-in duration-75 ${
                  errors.property_type
                    ? "border-red-400"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <select
                  type="text"
                  name="property_type"
                  id="property_type"
                  value={form.property_type}
                  onChange={handleOnChange}
                  className="outline-none w-full  h-full"
                  required
                >
                  <option value="" hidden disabled>
                    Choose
                  </option>
                  {PropertyData.getTypesAsOption()}
                </select>
              </div>
              {/* Contract */}
              <p className="mr-1 flex items-center justify-end">
                Contract: <sup className="text-red-500">*</sup>
              </p>
              <div
                className={`col-span-3 w-56 h-8 bg-white pl-2 rounded-lg shadow border ease-in duration-75 ${
                  errors.contract_type
                    ? "border-red-400"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <select
                  type="text"
                  name="contract_type"
                  id="contract_type"
                  value={form.contract_type}
                  onChange={handleOnChange}
                  className="outline-none w-full  h-full"
                  required
                >
                  <option value="" hidden disabled>
                    Choose
                  </option>
                  {PropertyData.getContractsAsOption()}
                </select>
              </div>
              {/* Area */}
              <p className="mr-1 flex items-center justify-end">
                Area: <sup className="text-red-500">*</sup>
              </p>
              <div className="col-span-3 flex items-center">
                <input
                  type="number"
                  name="area"
                  id="area"
                  value={form.area}
                  onChange={handleOnChange}
                  className={`w-40 h-8 bg-white p-2 mr-2 rounded-lg shadow border outline-none ease-in duration-75 ${
                    errors.area
                      ? "border-red-400"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  step="0.01"
                  min="0"
                  required
                />
                <p>
                  m<sup>2</sup>
                </p>
              </div>
              {/* Price */}
              <p className="mr-1 flex items-center justify-end">
                Price: <sup className="text-red-500">*</sup>
              </p>
              <div className="col-span-3 flex items-center">
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={form.price}
                  onChange={handleOnChange}
                  className={`w-40 h-8 bg-white p-2 mr-2 rounded-lg shadow border outline-none ease-in duration-75 ${
                    errors.price
                      ? "border-red-400"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  min="0"
                  step="1"
                  required
                />
                {/* Rent Payment */}
                {form.contract_type === "Rent" ? (
                  <div
                    className={`col-span-3 w-full  h-8 bg-white pl-2 rounded-lg shadow border ${
                      errors.rent_payment
                        ? "border-red-400"
                        : "border-gray-300 hover:border-gray-400"
                    } ease-in duration-75`}
                  >
                    <select
                      type="text"
                      name="rent_payment"
                      id="rent_payment"
                      value={form.rent_payment}
                      onChange={handleOnChange}
                      className="outline-none w-full  h-full"
                      required={form.contract_type === "Rent"}
                    >
                      <option value="None" hidden disabled>
                        Choose
                      </option>
                      {PropertyData.getRentPaymentsAsOption()}
                    </select>
                  </div>
                ) : (
                  <p>Baht</p>
                )}
              </div>
              {/* Rent Requirement */}
              {form.contract_type === "Rent" && (
                <p className="mr-1 flex items-center justify-end">
                  Rent Requirement:
                </p>
              )}
              {form.contract_type === "Rent" && (
                <input
                  type="text"
                  name="rent_requirement"
                  id="rent_requirement"
                  value={form.rent_requirement}
                  onChange={handleOnChange}
                  className=" col-span-3 w-full  h-8 bg-white p-2 rounded-lg shadow border border-gray-300 outline-none hover:border-gray-400 ease-in duration-75"
                  placeholder='e.g. "Min. 1 year", "Max. 5 years". (Blank for none)'
                />
              )}
              {/* Bedroom */}
              <p className="mr-1 flex items-center justify-end">
                Bedroom: <sup className="text-red-500">*</sup>
              </p>
              <div
                className={`col-span-3 w-56 h-8 bg-white pl-2 rounded-lg shadow border ease-in duration-75 ${
                  errors.bedroom
                    ? "border-red-400"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <select
                  type="text"
                  name="bedroom"
                  id="bedroom"
                  value={form.bedroom}
                  onChange={handleOnChange}
                  className="outline-none w-full  h-full"
                  required
                >
                  <option value="" hidden disabled>
                    Choose
                  </option>
                  {PropertyData.getBedroomAsOption()}
                </select>
              </div>
              {/* Bathroom */}
              <p className="mr-1 flex items-center justify-end">
                Bathroom: <sup className="text-red-500">*</sup>
              </p>
              <div
                className={`col-span-3 w-56 h-8 bg-white pl-2 rounded-lg shadow border ease-in duration-75 ${
                  errors.bathroom
                    ? "border-red-400"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <select
                  type="text"
                  name="bathroom"
                  id="bathroom"
                  value={form.bathroom}
                  onChange={handleOnChange}
                  className="outline-none w-full  h-full"
                  required
                >
                  <option value="" hidden disabled>
                    Choose
                  </option>
                  {PropertyData.getBathroomAsOption()}
                </select>
              </div>
              {/* Furnishing */}
              <p className="mr-1 flex items-center justify-end">
                Furnishing: <sup className="text-red-500">*</sup>
              </p>
              <div
                className={`col-span-3 w-56 h-8 bg-white pl-2 rounded-lg shadow border ease-in duration-75 ${
                  errors.furnishing
                    ? "border-red-400"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <select
                  type="text"
                  name="furnishing"
                  id="furnishing"
                  value={form.furnishing}
                  onChange={handleOnChange}
                  className="outline-none w-full  h-full"
                  required
                >
                  <option value="" hidden disabled>
                    Choose
                  </option>
                  {PropertyData.getFurnishingAsOption()}
                </select>
              </div>
              {/* Ownership */}
              <p className="mr-1 flex items-center justify-end">Ownership:</p>
              <div className="col-span-3 w-56 h-8 bg-white pl-2 rounded-lg shadow border border-gray-300 hover:border-gray-400 ease-in duration-75">
                <select
                  type="text"
                  name="ownership"
                  id="ownership"
                  value={form.ownership}
                  onChange={handleOnChange}
                  className="outline-none w-full  h-full"
                >
                  {PropertyData.getOwnershipAsOption()}
                </select>
              </div>
              {/* Location */}
              <p className="text-lg font-normal mb-2 col-span-4">Location:</p>
              {/* District */}
              <p className="mr-1 flex items-center justify-end">
                District: <sup className="text-red-500">*</sup>
              </p>
              <div
                className={`col-span-3 w-56 h-8 bg-white pl-2 rounded-lg shadow border ease-in duration-75 ${
                  errors.district
                    ? "border-red-400"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <select
                  type="text"
                  name="district"
                  id="district"
                  value={form.district}
                  onChange={handleOnChange}
                  className="outline-none w-full  h-full"
                  required
                >
                  <option value="" hidden disabled>
                    Choose
                  </option>
                  {PropertyData.getDistrictsAsOption()}
                </select>
              </div>
              {/* Province */}
              <p className="mr-1 flex items-center justify-end">
                Province: <sup className="text-red-500">*</sup>
              </p>
              <div
                className={`col-span-3 w-56 h-8 bg-white pl-2 rounded-lg shadow border ease-in duration-75 ${
                  errors.province
                    ? "border-red-400"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <select
                  type="text"
                  name="province"
                  id="province"
                  value={form.province}
                  onChange={handleOnChange}
                  className="outline-none w-full  h-full"
                  required
                >
                  <option value="" hidden disabled>
                    Choose
                  </option>
                  {PropertyData.getProvincesAsOption()}
                </select>
              </div>
              {/* Near Station */}
              <p className="mr-1 flex items-center justify-end">
                Near station:
              </p>
              <div className="col-span-3 w-full  h-8 bg-white pl-2 rounded-lg shadow border border-gray-300 hover:border-gray-400 ease-in duration-75">
                <select
                  type="text"
                  name="near_station"
                  id="near_station"
                  value={form.near_station}
                  onChange={handleOnChange}
                  className="outline-none w-full  h-full"
                  required
                >
                  {PropertyData.getStationsAsOption()}
                </select>
              </div>
              {/* Facilities */}
              <p className="text-lg font-normal mb-2 col-span-4">Facilities:</p>
              <div className="col-start-2 col-end-5 w-full  flex">
                <div className="w-max mr-20">
                  <div className="flex items-center mb-1.5">
                    <input
                      type="checkbox"
                      id="air_conditioning"
                      name="air_conditioning"
                      checked={form.facilities.air_conditioning}
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
                      checked={form.facilities.cctv}
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
                      checked={form.facilities.fitness}
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
                      checked={form.facilities.library}
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
                      checked={form.facilities.parking}
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
                      checked={form.facilities.pet_friendly}
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
                      checked={form.facilities.security}
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
                      checked={form.facilities.swimming_pool}
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
                      checked={form.facilities.tv}
                      onChange={handleOnChange}
                      className="mr-3 w-4 h-4"
                    />
                    <p>TV</p>
                  </div>
                </div>
                <div className="w-max">
                  <div className="flex items-center mb-1.5">
                    <input
                      type="checkbox"
                      id="balcony"
                      name="balcony"
                      checked={form.facilities.balcony}
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
                      checked={form.facilities.concierge}
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
                      checked={form.facilities.garden}
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
                      checked={form.facilities.lift}
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
                      checked={form.facilities.playground}
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
                      checked={form.facilities.river_view}
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
                      checked={form.facilities.single_storey}
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
                      checked={form.facilities.sport_center}
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
                      checked={form.facilities.wifi}
                      onChange={handleOnChange}
                      className="mr-3 w-4 h-4"
                    />
                    <p>WIFI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* Description */}
            <p className="text-lg font-normal mb-2">
              Description: <sup className="text-red-500">*</sup>
            </p>
            <textarea
              name="description"
              id="description"
              placeholder="Describe your property..."
              onChange={handleOnChange}
              value={form.description}
              className={`w-full  h-60 border rounded-md p-2 outline-none resize-none ease-in duration-75 ${
                errors.description
                  ? "border-red-400"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              required
            ></textarea>
          </div>
          <div>
            {/* Images */}
            <p className="text-lg font-normal mb-2">
              Images: <span>(Maximum: 10 images)</span>
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {images()}
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default PropertyForm;
