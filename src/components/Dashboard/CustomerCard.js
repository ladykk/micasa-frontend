import React from "react";

//import pictures
import avatar_icon from "../../assets/icons/userform/avatar.png";

const CustomerCard = ({ customer, setCustomer }) => {
  const onClickCustomer = () => {
    console.log(customer);
    setCustomer(customer);
  };

  return (
    <div
      className="border gray-300 rounded-lg p-2 flex items-center"
      onClick={onClickCustomer}
    >
      <img src={avatar_icon} alt="" className=" w-14 h-14 mr-2" />
      <div>
        <p>{customer.full_name}</p>
        <p className="text-gray-500 text-sm">{customer.username}</p>
      </div>
    </div>
  );
};

export default CustomerCard;
