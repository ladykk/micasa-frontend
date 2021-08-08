import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Iframe from "react-iframe";

//import pictures
import no_img from "../assets/images/noimage.png";
import unfavorite from "../assets/icons/property/heart.png";
import favorite from "../assets/icons/property/like.png";
import location from "../assets/icons/property/location.png";
import station from "../assets/icons/property/metro.png";
import seen from "../assets/icons/property/eye.png";
import property_type from "../assets/icons/property/type.png";
import bedroom from "../assets/icons/property/double-bed-fill.png";
import bathroom from "../assets/icons/property/toilet-fill.png";
import area from "../assets/icons/property/area.png";
import furnished from "../assets/icons/property/furnitures.png";
import partly_furnished from "../assets/icons/property/sofa.png";
import unfurnished from "../assets/icons/property/box.png";
import leasehold from "../assets/icons/property/contract.png";
import arrow from "../assets/icons/property_detail/arrow.png";
import overview from "../assets/icons/property_detail/file.png";
import images from "../assets/icons/property_detail/image.png";
import map from "../assets/icons/property_detail/map.png";
import phone from "../assets/icons/property_detail/phone-call-fill.png";
import email from "../assets/icons/property_detail/email-fill.png";
import Facilities from "../components/Facilities";

const PropertyPage = () => {
  const { id } = useParams();
  const history = useHistory();

  const [property, setProperty] = useState({
    property_id: "1",
    name: "Rhythm Ratchada - Huai Kwang",
    location: "Bangkok, Huai Kwang",
    img: "https://www.angelrealestate.co.th/wp-content/uploads/2019/07/interior.jpg",
    seen: 452,
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
    maps_query: "RHYTHM+Ratchada-Huaikwang",
    description:
      "1 Bedroom Condo for Sale or Rent in RHYTHM RATCHADA, Sam Sen Nok, Bangkok near MRT Ratchadaphisek ** For Rent / Sale Condo ** Rhythm Ratchada(near Ratchada-Ladprao Intersection) High floor,very nice view, Sky Kitchen, View 1 bedroom, 1 bathroom,size 45.49 sq.m.,23th floor✅ Ready to use electrical appliances, including television, stereo, refrigerator, washing machine, microwave✅ There is a sauna and swimming pool.✅ Convenient transportation, next to MRT Ratchadaphisek✅ Near department stores such as Central Rama 9, Esplanade Ratchada, the street Ratchada, Big C, Ratchada, Lotus, Fortune✅ Near the train market, Ratchada market, Huay Kwang marketRent 20,000 baht / monthSelling 5.2 baht, including everything (Personal income tax 1% + 0.5% duty tax + 2% transfer fee.  *** Don't pay for business ***☎️  Contact: Kung",
  });

  const [page, setPage] = useState("overview");

  return (
    <div className="w-screen h-screen absolute top-0 left-0 right-0 bottom-0 ">
      <div
        className="w-screen h-3/4 background-cover-centered pt-12"
        style={{ backgroundImage: `url('${property.img}')` }}
      >
        <div className="w-4/5 h-auto mx-auto relative flex justify-between pt-5">
          <div
            className="flex bg-blue-500 text-white p-1 pl-3 pr-4 w-max items-center rounded-2xl cursor-pointer hover:bg-opacity-90 ease-in duration-75"
            onClick={() => history.goBack()}
          >
            <img src={arrow} alt="" className="invert-icon w-5 h-5 mr-2" />
            <p className="font-normal">Back to result</p>
          </div>
          <div className="flex bg-white text-red-500 p-1 pr-3 pl-4 w-max items-center rounded-2xl cursor-pointer hover:bg-opacity-90 ease-in duration-75 hover:line-through">
            <p className="font-normal">
              {property.favorite ? "Favorite" : "Add to Favorite"}
            </p>
            <img
              src={property.favorite ? favorite : unfavorite}
              alt=""
              className="w-5 h-5 ml-2"
            />
          </div>
        </div>
      </div>
      <div className="w-screen h-16 2xl:h-20 mx-auto bg-gray-200">
        <div className="w-full xl:w-4/5 h-full mx-auto flex">
          <div
            onClick={() => setPage("overview")}
            className={`w-auto h-full flex flex-1 items-center justify-center cursor-pointer ease-in duration-75 ${
              page === "overview" && "bg-blue-500 text-white"
            }`}
          >
            <img
              src={overview}
              alt=""
              className={`w-12 h-12 2xl:w-14 2xl:h-14 mr-4 ${
                page === "overview" && "invert-icon"
              }`}
            />
            <h1 className="text-2xl">Overview</h1>
          </div>
          <div
            onClick={() => setPage("images")}
            className={`w-auto h-full flex flex-1 items-center justify-center cursor-pointer ease-in duration-75 ${
              page === "images" && "bg-blue-500 text-white"
            }`}
          >
            <img
              src={images}
              alt=""
              className={`w-12 h-12 2xl:w-14 2xl:h-14 mr-4 ${
                page === "images" && "invert-icon"
              }`}
            />
            <h1 className="text-2xl">Images</h1>
          </div>
          <div
            onClick={() => setPage("map")}
            className={`w-auto h-full flex flex-1 items-center justify-center cursor-pointer ease-in duration-75 ${
              page === "map" && "bg-blue-500 text-white"
            }`}
          >
            <img
              src={map}
              alt=""
              className={`w-12 h-12 2xl:w-14 2xl:h-14 mr-4 ${
                page === "map" && "invert-icon"
              }`}
            />
            <h1 className="text-2xl">Map</h1>
          </div>
        </div>
      </div>
      <div className="w-full pr-12 pl-12 xl:w-4/5 xl:p-0 h-auto mx-auto relative">
        <div className="mt-10 mb-10">
          <div className="flex justify-between items-end mb-3">
            <h1 className="text-3xl font-bold">{property.name}</h1>
            <p className="text-xl text-gray-400">
              Property ID: {property.property_id}
            </p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-lg">
              <bold className="font-normal">{property.contract}:</bold>{" "}
              {property.price} ฿ {property.payment && `/ ${property.payment}`}{" "}
              <span className="text-red-500 italic">
                ({property.contract_requirement})
              </span>
            </p>
            <div className="flex items-center">
              <img src={seen} alt="" className="w-8 h-8 mr-3" />
              <p className="text-lg">
                {property.seen} people have seen this property.
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          {/* Overview */}
          <div
            className={`flex h-fit-content pb-12 absolute top-0 left-0 right-0 trans-hide ${
              page === "overview" && "active"
            }`}
          >
            <div className="w-full flex-1">
              <h1 className="w-full text-xl underline mb-4">Description</h1>
              <p className="text-lg mb-8 text-justify">
                {property.description}
              </p>
              <h1 className="w-full text-xl underline mb-4">Facilities</h1>
              <div className="flex flex-wrap items-center justify-start">
                {property.facilities.map((facility) => (
                  <Facilities name={facility} />
                ))}
              </div>
            </div>
            <div className=" w-max ml-28 mr-10 flex-shrink-0 flex-grow-0">
              <h1 className="w-full text-xl underline mb-4">
                Property Information
              </h1>
              <div className="w-full pl-6 mb-8">
                <div className="w-full flex items-center justify-start mb-3">
                  <img className="w-7 h-7 mr-3" src={property_type} alt="" />
                  <p className="text-lg">{property.property_type}</p>
                </div>
                <div className="w-full flex items-center justify-start mb-3">
                  <img className="w-7 h-7 mr-3" src={location} alt="" />
                  <p className="text-lg">{property.location}</p>
                </div>
                {property.near_station && (
                  <div className="w-full flex items-center justify-start mb-3">
                    <img className="w-7 h-7 mr-3" src={station} alt="" />
                    <p className="text-lg">{property.near_station}</p>
                  </div>
                )}
                <div className="w-full flex items-center justify-start mb-3">
                  <img className="w-7 h-7 mr-3" src={bedroom} alt="" />
                  <p className="text-lg">
                    {property.bedroom}{" "}
                    {property.bedroom > 1 ? "Bedrooms" : "Bedroom"}
                  </p>
                </div>
                <div className="w-full flex items-center justify-start mb-3">
                  <img className="w-7 h-7 mr-3" src={bathroom} alt="" />
                  <p className="text-lg">
                    {property.bathroom}{" "}
                    {property.bathroom > 1 ? "Bathrooms" : "Bathroom"}
                  </p>
                </div>
                <div className="w-full flex items-center justify-start mb-3">
                  <img className="w-7 h-7 mr-3" src={area} alt="" />
                  <p className="text-lg">
                    {property.area} m<sup>2</sup>
                  </p>
                </div>
                {property.furnishing === "Furnished" && (
                  <div className="w-full flex items-center justify-start mb-3">
                    <img className="w-7 h-7 mr-3" src={furnished} alt="" />
                    <p className="text-lg">{property.furnishing}</p>
                  </div>
                )}
                {property.furnishing === "Unfurnished" && (
                  <div className="w-full flex items-center justify-start mb-3">
                    <img className="w-7 h-7 mr-3" src={unfurnished} alt="" />
                    <p className="text-lg">{property.furnishing}</p>
                  </div>
                )}
                {property.furnishing === "Partly furnished" && (
                  <div className="w-full flex items-center justify-start mb-3">
                    <img
                      className="w-7 h-7 mr-3"
                      src={partly_furnished}
                      alt=""
                    />
                    <p className="text-lg">{property.furnishing}</p>
                  </div>
                )}
                {property.ownership === "Leasehold" && (
                  <div className="w-full flex items-center justify-start mb-3">
                    <img className="w-7 h-7 mr-3" src={leasehold} alt="" />
                    <p className="text-lg">{property.ownership}</p>
                  </div>
                )}
              </div>
              <h1 className="w-full text-xl underline mb-8">Contact</h1>
              <div className="w-full pl-6 mb-5">
                <div className="w-full flex items-center justify-start mb-3">
                  <img className="w-7 h-7 mr-3" src={phone} alt="" />
                  <p className="text-lg">02-000-0000</p>
                </div>
                <div className="w-full flex items-center justify-start mb-3">
                  <img className="w-7 h-7 mr-3" src={email} alt="" />
                  <p className="text-lg">sales@micasa.com</p>
                </div>
              </div>
            </div>
          </div>
          {/* Images */}
          <div
            className={`flex h-fit-content pb-12 absolute top-0 left-0 right-0 trans-hide ${
              page === "images" && "active"
            }`}
          ></div>
          {/* Map */}
          <div
            className={`flex h-fit-content pb-12 absolute top-0 left-0 right-0 trans-hide ${
              page === "map" && "active"
            }`}
          >
            <Iframe
              url={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAy2j5w0QgLgcqULL0Kj0jGanCZ3WlEdKk&q=${property.maps_query}&zoom=19`}
              className="w-full h-screen-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
