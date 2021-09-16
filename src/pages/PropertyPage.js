import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import Iframe from "react-iframe";
import instance from "../modules/Instance";

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
import edit_icon from "../assets/icons/property_detail/edit.png";
import account from "../assets/icons/property_detail/user.png";
import full_name from "../assets/icons/property_detail/id-card.png";
import avatar_icon from "../assets/icons/userform/avatar.png";

//import components
import Facilities from "../components/Facilities";
import Loading from "../components/Loading";

//import modules
import ImageAPI from "../modules/api/ImageAPI";
import PropertyAPI from "../modules/api/PropertyAPI";
import CustomerAPI from "../modules/api/CustomerAPI";

const PropertyPage = ({
  user,
  edit,
  preview,
  preview_images,
  toggleOverlay,
}) => {
  const { id } = useParams();
  const history = useHistory();
  const [isFetch, setFetch] = useState(preview || edit ? false : true);
  const [isFavorite, setFavorite] = useState(false);
  const [canFavorite, setCanFavorite] = useState(false);
  const [property, setProperty] = useState(
    edit
      ? {
          ...edit,
        }
      : preview
      ? {
          property_id: "None",
          seen: 1,
          favorite: false,
          status: "Preview",
          ...preview,
          images: { ...preview_images },
        }
      : {}
  );
  const [seller, setSeller] = useState({});
  useEffect(() => {
    //Fetch detail
    (async () => {
      if (isFetch && !edit && !preview) {
        await instance
          .get(`${PropertyAPI.apiUrls.byId}/${id}`)
          .then((result) => {
            if (result.status === 200) {
              let property = result.data.payload;
              for (let image in property.images) {
                property.images[image] = ImageAPI.getImageURL(
                  property.images[image]
                );
              }
              setProperty(property);
              setFetch(false);
            }
          })
          .catch((err) => {
            if (err) {
              if (err.response) {
                switch (err.response.status) {
                  case 400:
                  case 401:
                  case 404:
                    history.replace(`/${err.response.status}`);
                    break;
                  default:
                    console.error(err.response.data);
                }
              }
            } else {
              console.error(err);
            }
          });
      }
    })();
  }, [isFetch]);

  const handleFavorite = async () => {
    if (user.username) {
      const favoriteForm = new FormData();
      favoriteForm.append("is_favorite", !isFavorite ? "true" : "false");
      await instance({
        method: "post",
        url: `${CustomerAPI.apiUrls.favorite_property}/${id}`,
        data: favoriteForm,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((result) => {
          if (result.status === 201) {
            setFavorite(result.data.payload);
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
        });
    } else {
      toggleOverlay();
    }
  };

  useEffect(() => {
    //Fetch is favorite.
    (async () => {
      if (id) {
        await instance
          .get(`${CustomerAPI.apiUrls.favorite_property}/${id}`)
          .then((result) => {
            if (result.status === 200) {
              setFavorite(result.data.payload);
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
          });
      }
    })();
  },[id]);

  useEffect(() => {
    //Fetch can favorite this property
    (async () => {
      if (id) {
        await instance
          .get(`${PropertyAPI.apiUrls.favorite}/${id}`)
          .then((result) => {
            if (result.status === 200) {
              setCanFavorite(result.data.payload);
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
          });
      }
    })();
  },[id]);

  useEffect(() => {
    //Fetch seller
    (async () => {
      if (user.class !== "Customer") {
        await instance
          .get(`${PropertyAPI.apiUrls.contact}/${id}`)
          .then((result) => {
            if (result.status === 200) {
              setSeller(result.data.payload);
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
          });
      }
    })();
  },[user]);

  const [page, setPage] = useState("overview");

  const getStatusColor = () => {
    switch (property.status) {
      case "Listing":
        return "bg-green-500";
      case "Sold":
      case "Cancel":
      case "Rejected":
        return "bg-red-500";
      case "Reserved":
        return "bg-yellow-500";
      case "Not Listing":
      default:
        return "bg-gray-500";
    }
  };
  const getFacilities = () => {
    const elements = [];
    for (const facility in property.facilities) {
      if (property.facilities[facility]) {
        elements.push(facility);
      }
    }
    return elements.map((facility, index) => (
      <Facilities key={index} facility={facility} />
    ));
  };
  const getImages = () => {
    const elements = [];
    for (const image in property.images) {
      if (image !== "image_cover" && property.images[image] !== null) {
        elements.push(
          <img
            src={property.images[image]}
            alt=""
            className="w-auto h-auto max-h-96 object-contain object-center shadow rounded mb-6"
          />
        );
      }
    }
    return elements;
  };

  return isFetch ? (
    <Loading />
  ) : property ? (
    <div
      className={`${
        preview
          ? "relative w-full h-full"
          : "w-full h-ful absolute top-0 left-0 right-0 overflow-x-hidden"
      }`}
    >
      <div
        className={`w-full ${
          preview ? "h-120 rounded-t-md" : "h-screen-75"
        } background-cover-centered pt-20`}
        style={{
          backgroundImage: `url('${
            property.images.image_cover ? property.images.image_cover : no_img
          }')`,
        }}
      >
        {!preview && (
          <div className="w-4/5 h-auto mx-auto relative flex justify-between">
            { history.length > 1 && <div
              className="flex bg-blue-500 text-white p-1 pl-3 pr-4 w-max items-center rounded-2xl cursor-pointer hover:bg-opacity-90 ease-in duration-75"
              onClick={() => {
                history.goBack();
              }}
            >
              <img src={arrow} alt="" className="invert-icon w-5 h-5 mr-2" />
              <p className="font-normal">Back to result</p>
            </div> }
            {edit ? (
              edit.status !== "Sold" ? (
                <Link
                  to={`/edit/${property.property_id}/form`}
                  className="flex bg-green-500 text-white p-1 pr-3 pl-4 w-max items-center rounded-2xl cursor-pointer hover:bg-opacity-90 ease-in duration-75 "
                >
                  <p className="font-normal">Edit Properties</p>
                  <img
                    src={edit_icon}
                    alt=""
                    className="w-5 h-5 ml-2 invert-icon"
                  />
                </Link>
              ) : null
            ) : (
              user.class === "Customer" &&
              canFavorite && (
                <div
                  onClick={handleFavorite}
                  className={`flex bg-white text-red-500 p-1 pr-3 pl-4 w-max items-center rounded-2xl cursor-pointer hover:bg-opacity-90 ease-in duration-75 ${
                    isFavorite && "hover:line-through"
                  }`}
                >
                  <p className="font-normal">
                    {isFavorite ? "Favorite" : "Add to Favorite"}
                  </p>
                  <img
                    src={isFavorite ? favorite : unfavorite}
                    alt=""
                    className="w-5 h-5 ml-2"
                  />
                </div>
              )
            )}
          </div>
        )}
      </div>
      <div
        className={`h-16 ${
          preview ? " w-full " : "w-full desktop:h-20 overflow-x-hidden"
        }  mx-auto bg-gray-200`}
      >
        <div
          className={`w-full  ${!preview && "xl:w-4/5"}  h-full mx-auto flex`}
        >
          <div
            onClick={() => setPage("overview")}
            className={`w-auto h-full flex flex-1 items-center justify-center cursor-pointer ease-in duration-75 ${
              page === "overview" && "bg-blue-500 text-white"
            }`}
          >
            <img
              src={overview}
              alt=""
              className={`w-12 h-12 ${
                !preview && "desktop:w-14 desktop:h-14"
              } mr-4 ${page === "overview" && "invert-icon"}`}
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
              className={`w-12 h-12 ${
                !preview && "desktop:w-14 desktop:h-14"
              } mr-4 ${page === "images" && "invert-icon"}`}
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
              className={`w-12 h-12 ${
                !preview && "desktop:w-14 desktop:h-14"
              } mr-4 ${page === "map" && "invert-icon"}`}
            />
            <h1 className="text-2xl">Map</h1>
          </div>
        </div>
      </div>
      <div
        className={`w-full  ${
          preview ? "pr-3 pl-3 border-box" : "xl:w-4/5 xl:p-0 mx-auto"
        }   h-auto`}
      >
        <div className="mt-10 mb-10">
          <div className="flex justify-between items-end mb-3">
            <div className="flex items-end">
              <h1 className="text-3xl font-bold mr-3">
                {property.property_name}
              </h1>
              <p
                className={`text-xl p-0.5 pl-3 pr-3 rounded-full text-white font-normal ${getStatusColor()}`}
              >
                {property.status}
              </p>
            </div>

            <p className="text-xl text-gray-400">
              Property ID: {property.property_id}
            </p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-lg">
              <span className="font-normal">{property.contract_type}:</span>{" "}
              {property.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              ฿{" "}
              {property.rent_payment !== "None" && `/ ${property.rent_payment}`}{" "}
              {property.rent_requirement && (
                <span className="text-red-500 italic">
                  ({property.rent_requirement})
                </span>
              )}
            </p>
            <div className="flex items-center">
              <img src={seen} alt="" className="w-8 h-8 mr-3" />
              <p className="text-lg">
                {property.seen} people have seen this property.
              </p>
            </div>
          </div>
        </div>
        <div className={`w-full  h-max-content pb-12`}>
          {/* Overview */}
          <div
            className={`flex h-fit-content trans-hide ${
              page === "overview" && "active"
            }`}
          >
            <div className="w-full  flex-1">
              <h1 className="w-full  text-xl underline mb-4">Description</h1>
              <p className="text-lg mb-8 text-justify">
                {property.description}
              </p>
              <h1 className="w-full  text-xl underline mb-4">Facilities</h1>
              <div className="flex flex-wrap items-center justify-start">
                {getFacilities()}
              </div>
            </div>
            <div className=" w-max ml-28 mr-10 flex-shrink-0 flex-grow-0">
              <h1 className="w-full  text-xl underline mb-4">
                Property Information
              </h1>
              <div className="w-full  pl-6 mb-8">
                <div className="w-full  flex items-center justify-start mb-3">
                  <img className="w-7 h-7 mr-3" src={property_type} alt="" />
                  <p className="text-lg">{property.property_type}</p>
                </div>
                <div className="w-full  flex items-center justify-start mb-3">
                  <img className="w-7 h-7 mr-3" src={location} alt="" />
                  <p className="text-lg">{`${property.province}, ${property.district}`}</p>
                </div>
                {property.near_station && (
                  <div className="w-full  flex items-center justify-start mb-3">
                    <img className="w-7 h-7 mr-3" src={station} alt="" />
                    <p className="text-lg">{property.near_station}</p>
                  </div>
                )}
                {property.bedroom !== "None" && (
                  <div className="w-full  flex items-center justify-start mb-3">
                    <img className="w-7 h-7 mr-3" src={bedroom} alt="" />
                    <p className="text-lg">{property.bedroom}</p>
                  </div>
                )}
                {property.bathroom !== "None" && (
                  <div className="w-full  flex items-center justify-start mb-3">
                    <img className="w-7 h-7 mr-3" src={bathroom} alt="" />
                    <p className="text-lg">{property.bathroom}</p>
                  </div>
                )}
                <div className="w-full  flex items-center justify-start mb-3">
                  <img className="w-7 h-7 mr-3" src={area} alt="" />
                  <p className="text-lg">
                    {property.area} m<sup>2</sup>
                  </p>
                </div>
                {property.furnishing === "Furnished" && (
                  <div className="w-full  flex items-center justify-start mb-3">
                    <img className="w-7 h-7 mr-3" src={furnished} alt="" />
                    <p className="text-lg">{property.furnishing}</p>
                  </div>
                )}
                {property.furnishing === "Unfurnished" && (
                  <div className="w-full  flex items-center justify-start mb-3">
                    <img className="w-7 h-7 mr-3" src={unfurnished} alt="" />
                    <p className="text-lg">{property.furnishing}</p>
                  </div>
                )}
                {property.furnishing === "Partly furnished" && (
                  <div className="w-full  flex items-center justify-start mb-3">
                    <img
                      className="w-7 h-7 mr-3"
                      src={partly_furnished}
                      alt=""
                    />
                    <p className="text-lg">{property.furnishing}</p>
                  </div>
                )}
                {property.ownership === "Leasehold" && (
                  <div className="w-full  flex items-center justify-start mb-3">
                    <img className="w-7 h-7 mr-3" src={leasehold} alt="" />
                    <p className="text-lg">{property.ownership}</p>
                  </div>
                )}
              </div>
              <h1 className="w-full  text-xl underline mb-5">Contact</h1>
              {seller.hasOwnProperty("username") ? (
                <div className="w-full  pl-6 mb-5">
                  <img
                    src={
                      seller.avatar_id
                        ? ImageAPI.getAvatarURL(seller.avatar_id)
                        : avatar_icon
                    }
                    className="w-24 h-24 rounded-full object-cover object-center mb-2 mx-auto"
                    alt=""
                  />
                  <div className="w-full  flex items-center justify-start mb-3">
                    <img className="w-7 h-7 mr-3" src={account} alt="" />
                    <p className="text-lg">{seller.username}</p>
                  </div>
                  <div className="w-full  flex items-center justify-start mb-3">
                    <img className="w-7 h-7 mr-3" src={full_name} alt="" />
                    <p className="text-lg">{seller.full_name}</p>
                  </div>
                  <div className="w-full  flex items-center justify-start mb-3">
                    <img className="w-7 h-7 mr-3" src={phone} alt="" />
                    <p className="text-lg">{seller.phone_number}</p>
                  </div>
                  <div className="w-full  flex items-center justify-start mb-3">
                    <img className="w-7 h-7 mr-3" src={email} alt="" />
                    <p className="text-lg">{seller.email}</p>
                  </div>
                </div>
              ) : (
                <div className="w-full  pl-6 mb-5">
                  <div className="w-full  flex items-center justify-start mb-3">
                    <img className="w-7 h-7 mr-3" src={phone} alt="" />
                    <p className="text-lg">02-000-0000</p>
                  </div>
                  <div className="w-full  flex items-center justify-start mb-3">
                    <img className="w-7 h-7 mr-3" src={email} alt="" />
                    <p className="text-lg">micasacorp2000@gmail.com</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Images */}
          <div
            className={`w-full  h-fit-content trans-hide flex flex-wrap items-center justify-around ${
              page === "images" && "active"
            }`}
          >
            {getImages()}
          </div>
          {/* Map */}
          <div
            className={`flex ${edit ? "h-fit-content" : "h-screen-75"} trans-hide ${
              page === "map" && "active"
            }`}
          >
            <Iframe
              url={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAy2j5w0QgLgcqULL0Kj0jGanCZ3WlEdKk&q=${property.maps_query}&zoom=19`}
              className={`w-full  ${preview ? "h-120" : "h-screen-80"} `}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/400" />
  );
};

PropertyPage.defaultProps = {
  edit: null,
  preview: null,
  preview_images: null,
};

export default PropertyPage;
