import React from "react";

//import pictures

import airConditioning from "../assets/icons/facilities/air-conditioner.png";
import bbqArea from "../assets/icons/facilities/grill.png";
import cctv from "../assets/icons/facilities/cctv.png";
import concierge from "../assets/icons/facilities/bellboy.png";
import fitness from "../assets/icons/facilities/fitness.png";
import garden from "../assets/icons/facilities/park.png";
import library from "../assets/icons/facilities/library.png";
import lift from "../assets/icons/facilities/elevator.png";
import parking from "../assets/icons/facilities/parked-car.png";
import playground from "../assets/icons/facilities/playground.png";
import petFriendly from "../assets/icons/facilities/pet-house.png";
import riverView from "../assets/icons/facilities/river.png";
import security from "../assets/icons/facilities/policeman.png";
import singleStorey from "../assets/icons/facilities/house.png";
import swimmingPool from "../assets/icons/facilities/swimming.png";
import sportCenter from "../assets/icons/facilities/sport-center.png";
import tv from "../assets/icons/facilities/television.png";
import wifi from "../assets/icons/facilities/wifi-router.png";

const getIcon = (name) => {
  let icon;
  switch (name) {
    case "Air conditioning":
      icon = airConditioning;
      break;
    case "BBQ Area":
      icon = bbqArea;
      break;
    case "CCTV":
      icon = cctv;
      break;
    case "Concierge":
      icon = concierge;
      break;
    case "Fitness":
      icon = fitness;
      break;
    case "Garden":
      icon = garden;
      break;
    case "Library":
      icon = library;
      break;
    case "Lift":
      icon = lift;
      break;
    case "Parking":
      icon = parking;
      break;
    case "Playground":
      icon = playground;
      break;
    case "Pet Friendly":
      icon = petFriendly;
      break;
    case "River View":
      icon = riverView;
      break;
    case "Security":
      icon = security;
      break;
    case "Single Storey":
      icon = singleStorey;
      break;
    case "Swimming Pool":
      icon = swimmingPool;
      break;
    case "Sport Center":
      icon = sportCenter;
      break;
    case "TV":
      icon = tv;
      break;
    case "WIFI":
      icon = wifi;
      break;
    default:
  }
  return icon;
};

const Facilities = ({ name }) => {
  const icon = getIcon(name);

  return (
    <div className="flex p-2 mb-3 mr-2 justify-start items-center">
      <img src={icon} alt="" className="w-7 h-7 mr-2" />
      <p className="text-lg">{name}</p>
    </div>
  );
};

export default Facilities;
