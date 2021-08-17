import React from "react";
import { Link } from "react-router-dom";

const MiniPropertyCard = ({ property }) => {
  return (
    <Link
      to={`/property/${property.property_id}`}
      target="_blank"
      className="border border-gray-300 grid grid-cols-4 p-1"
    >
      <p className="mr-3">Property ID: {property.property_id}</p>
      <p className="col-span-3">{property.property_name}</p>
    </Link>
  );
};

export default MiniPropertyCard;
