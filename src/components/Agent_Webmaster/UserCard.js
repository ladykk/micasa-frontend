import React from "react";

//import pictures
import avatar_icon from "../../assets/icons/userform/avatar.png";

//import modules
import ImageAPI from "../../modules/api/ImageAPI";

const UserCard = ({ user, setUser, setRemove }) => {
  const onClickCustomer = () => {
    setUser(user);
  };

  const handleOnRemove = () => {
    setRemove(user);
  };

  return (
    <div
      className="border border-gray-300 rounded-lg p-2 flex items-center mb-2 justify-between hover:border-gray-400 ease-in duration-75"
      onClick={setUser && onClickCustomer}
    >
      <div className={`flex items-center ${setUser && "cursor-pointer"}`}>
        <img
          src={
            user.avatar_id ? ImageAPI.getAvatarURL(user.avatar_id) : avatar_icon
          }
          alt=""
          className=" w-14 h-14 mr-2 rounded-full object-cover object-center"
        />
        <div>
          <p>{user.full_name}</p>
          <p className="text-gray-500 text-sm">{user.username}</p>
        </div>
      </div>
      {setRemove && (
        <button
          className="text-red-500 font-normal rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 hover:text-white"
          onClick={handleOnRemove}
        >
          -
        </button>
      )}
    </div>
  );
};

export default UserCard;
