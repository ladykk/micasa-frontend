import React, { useState } from "react";

//import pictures
import avatar_icon from "../assets/icons/userform/avatar.png";
import contact from "../assets/images/contact.png";

//import modules
const ImageAPI = require("../modules/ImageAPI");

const Profile = ({ user }) => {
  const [form, setForm] = useState(user);
  const [isBlock, setBlock] = useState(false);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  //real estate info
  const [realEstate, setRealEstate] = useState({
    real_id: 1,
    full_name: "Agent Account",
    email: "agent@micasa.com",
    phone_number: "02000000",
  });
  const realEstate_avatar = realEstate.avatar_id
    ? ImageAPI.getAvatarURL(realEstate.avatar_id)
    : avatar_icon;

  //avatar
  const current_avatar = user.avatar_id
    ? ImageAPI.getAvatarURL(user.avatar_id)
    : avatar_icon;
  const avatar_file = React.createRef();
  const removerAvatar = () => {
    avatar_file.current.value = "";
    setForm({ ...form, avatar_file: null });
    setPreview(null);
  };

  const handleOnChange = ({ target }) => {
    setBlock(true);
    switch (target.name) {
      case "avatar_file":
        const file = target.files[0];
        switch (file.type) {
          case "image/jpg":
          case "image/jpeg":
          case "image/png":
            setPreview(URL.createObjectURL(file));
            setForm({
              ...form,
              [target.name]: file,
            });
            break;
          default:
            setErrors({
              ...errors,
              [target.name]: "File type is not supported.",
            });
        }
        break;
      default:
        setForm({ ...form, [target.name]: target.value });
    }
  };

  const handleCancelChange = () => {
    removerAvatar();
    setBlock(false);
    setForm(user);
  };

  return (
    <div className="w-full h-auto">
      <h1 className="text-5xl mb-5">My Profile</h1>
      <form className="w-full h-fit-content p-6 flex border border-gray-300 rounded-lg shadow place-items-start mb-10">
        <div className="grid grid-cols-4 gap-2 w-max pl-9 mr-auto">
          <p className="mr-1 flex items-center justify-end">Username:</p>
          <p className="col-span-3 h-8 flex items-center">{user.username}</p>
          {user.class === "Agent" && (
            <p className="mr-1 flex items-center justify-end">REAL-ID:</p>
          )}
          {user.class === "Agent" && (
            <p className="col-span-3 h-8 flex items-center">{user.real_id}</p>
          )}
          {user.class === "Webmaster" && (
            <p className="mr-1 flex items-center justify-end">WEB-ID:</p>
          )}
          {user.class === "Webmaster" && (
            <p className="col-span-3 h-8 flex items-center">{user.web_id}</p>
          )}
          <p className="mr-1 flex items-center justify-end">Name:</p>
          <input
            type="text"
            name="full_name"
            id="full_name"
            placeholder="Name"
            value={form.full_name}
            onChange={handleOnChange}
            className=" col-span-3 w-72 h-8 bg-white p-2 rounded-lg shadow border border-gray-300 outline-none"
            required
          />
          <p className="mr-1 flex items-center justify-end">Email:</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleOnChange}
            className=" col-span-3 w-72 h-8 bg-white p-2 rounded-lg shadow border border-gray-300 outline-none"
            required
          />
          <p className="mr-1 flex items-center justify-end">Phone number:</p>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            onChange={handleOnChange}
            value={form.phone_number}
            placeholder="Phone number"
            pattern="((\+66|0)(\d{1,2}\-?\d{3}\-?\d{3,4}))|((\+๖๖|๐)([๐-๙]{1,2}\-?[๐-๙]{3}\-?[๐-๙]{3,4}))"
            gm
            className=" col-span-3 w-72 h-8 bg-white p-2 rounded-lg shadow border border-gray-300 outline-none"
            required
          />
          <p className="mr-1 flex items-center justify-end">Gender:</p>
          <div className="col-span-3 h-8 flex items-center justify-start">
            <input
              type="radio"
              name="gender"
              id="Male"
              value="Male"
              onChange={handleOnChange}
              checked={form.gender === "Male"}
              className="m-1 w-4 h-4"
              required
            />
            <p className="mr-3">Male</p>
            <input
              type="radio"
              name="gender"
              id="Female"
              value="Female"
              onChange={handleOnChange}
              checked={form.gender === "Female"}
              className="m-1 w-4 h-4"
              required
            />
            <p className="mr-3">Female</p>
            <input
              type="radio"
              name="gender"
              id="Not specific"
              value="Not specific"
              onChange={handleOnChange}
              checked={form.gender === "Not specific"}
              className="m-1 w-4 h-4"
              required
            />
            <p className="mr-3">Not specific</p>
          </div>
          <p className="mr-1 flex items-center justify-end">Birthday:</p>
          <input
            type="date"
            name="birthday"
            id="birthday"
            value={form.birthday}
            onChange={handleOnChange}
            className=" col-span-3 w-1/2 h-8 bg-white p-2 rounded-lg shadow border border-gray-300 outline-none"
            required
          />
          <div></div>
          <div className="col-span-3 flex">
            <button
              type="submit"
              className={`flex items-center justify-center w-max h-8 pl-2 pr-2 mr-3 rounded-xl text-white ${
                isBlock ? "bg-blue-500" : "bg-gray-400"
              } text-sm font-normal align-middle hover:bg-opacity-90 ease-in duration-75`}
            >
              Change Profile
            </button>
            {isBlock && (
              <button
                type="button"
                onClick={handleCancelChange}
                className="col-span-3 flex items-center justify-center w-max h-8 pl-2 pr-2 rounded-xl text-white bg-red-500 text-sm font-normal align-middle hover:bg-opacity-90 ease-in duration-75"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
        <div className="w-48 h/full p-2 flex flex-col items-center">
          <input
            type="file"
            id="avatar_file"
            name="avatar_file"
            onChange={handleOnChange}
            ref={avatar_file}
            className="hidden"
          />
          <div className="relative w-28 h-28 mb-8 mt-4">
            <img
              src={preview ? preview : current_avatar}
              alt=""
              className="w-full h-full rounded-full"
            />
            <button
              type="button"
              onClick={() => {
                if (preview) {
                  removerAvatar();
                } else {
                  avatar_file.current.click();
                }
              }}
              className={`z-20 absolute top-1/2 left-1/2 transform-center w-8 h-8 flex items-center justify-center rounded-full font-normal text-xl text-white ${
                preview
                  ? "trans-hover  bg-red-500"
                  : "bg-opacity-90 hover:bg-opacity-80 ease-in duration-75 bg-blue-500"
              }`}
            >
              {preview ? "-" : "+"}
            </button>
          </div>

          <p>File Supported: .jpg, .png</p>

          <p className="text-red-500">{errors.avatar_file}</p>
        </div>
      </form>
      {user.class === "Customer" && (
        <div>
          <h1 className="text-5xl mb-5">My Real Estate Agent</h1>
          {realEstate.real_id ? (
            <div className="w-full h-fit-content p-6 flex border border-gray-300 rounded-lg shadow place-items-start">
              <div className="grid grid-cols-4 gap-2 w-max pl-9 mr-auto">
                <p className="mr-1 flex items-center justify-end">REAL-ID:</p>
                <p className="col-span-3 h-8 flex items-center">
                  {realEstate.real_id}
                </p>
                <p className="mr-1 flex items-center justify-end">Name:</p>
                <p className="col-span-3 h-8 flex items-center">
                  {realEstate.full_name}
                </p>
                <p className="mr-1 flex items-center justify-end">Email:</p>
                <p className="col-span-3 h-8 flex items-center">
                  {realEstate.email}
                </p>
                <p className="mr-1 flex items-center justify-end">
                  Phone number:
                </p>
                <p className="col-span-3 h-8 flex items-center">
                  {realEstate.phone_number}
                </p>
              </div>
              <div className="w-48 h/full p-2 flex flex-col items-center">
                <img
                  src={realEstate_avatar}
                  alt=""
                  className="w-28 h-28 mb-8 mt-4 rounded-full"
                />
              </div>
            </div>
          ) : (
            <div className="w-full h-fit-content p-6 flex border border-gray-300 rounded-lg shadow justify-center">
              <div className="flex justify-center items-center">
                <img src={contact} class="w-28 h-28 mr-6" alt="" />
                <div>
                  <p className="text-xl mb-2">
                    Contact Mi Casa Team to find you a real estate agent.
                  </p>
                  <div className="pl-10">
                    <p className="mb-1">Phone: 02-000-000</p>
                    <p>Email: sales@micasa.com</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
