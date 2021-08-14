import React from "react";

//import pictures
import avatar_icon from "../../assets/icons/userform/avatar.png";

const CustomerCard = ({ user }) => {
  return (
    <div className="border gray-300 rounded-lg p-2 flex items-center">
      <img src={avatar_icon} alt="" className=" w-14 h-14 mr-2" />
      <div>
        <p>{user.full_name}</p>
        <p className="text-gray-500 text-sm">{user.username}</p>
      </div>
    </div>
  );
};

export default CustomerCard;
