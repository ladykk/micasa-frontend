import instance from "../../modules/Instance";
import React, { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";

//import pictures
import avatar_icon from "../../assets/icons/userform/avatar.png";
import contact from "../../assets/images/contact.png";
import loading from "../../assets/images/progress.gif";

//import modules
const ImageAPI = require("../../modules/api/ImageAPI");
const UserAPI = require("../../modules/api/UserAPI");
const CustomerAPI = require("../../modules/api/CustomerAPI");
const DateModule = require("../../modules/DateModule");

const Profile = ({ user, setIsUserFetch }) => {
  const [form, setForm] = useState({
    full_name: user.full_name,
    email: user.email,
    phone_number: user.phone_number,
    gender: user.gender ? user.gender : "",
    birthday: user.birthday ? DateModule.formatDate(user.birthday) : "",
    avatar_file: null,
  });
  const [isBlock, setBlock] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    phone_number: false,
    form: "",
  });
  const [preview, setPreview] = useState(
    user.avatar_id ? ImageAPI.getAvatarURL(user.avatar_id) : null
  );

  const [isAgentFetch, setIsAgentFetch] = useState(true);
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    //Fetch Agent.
    (async () => {
      await instance
        .get(CustomerAPI.apiUrls.agent)
        .then((result) => {
          if (result.status === 200) {
            setAgent(result.data.payload);
          }
        })
        .catch((err) => {
          if (err) {
            if (err.response) {
              console.error(err.response.data);
            }
          } else {
            console.error(err);
          }
        })
        .finally(() => setIsAgentFetch(false));
    })();
  }, [isAgentFetch]);

  //avatar
  const avatar_file = React.createRef();
  const removerAvatar = () => {
    avatar_file.current.value = "";
    setForm({ ...form, avatar_file: null });
    setPreview(null);
    setBlock(true);
  };

  const handleOnChange = ({ target }) => {
    setBlock(true);
    setErrors({ ...errors, [target.name]: false, form: "" });
    switch (target.name) {
      case "avatar_file":
        try {
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
        } catch (e) {}
        break;
      default:
        setForm({ ...form, [target.name]: target.value });
    }
  };

  const handleCancelChange = () => {
    removerAvatar();
    setPreview(user.avatar_id ? ImageAPI.getAvatarURL(user.avatar_id) : null);
    setBlock(false);
    setForm({
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
      gender: user.gender,
      birthday: user.birthday,
      avatar_file: null,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const updateForm = UserAPI.updateFrom(form);
    await instance({
      method: "patch",
      url: UserAPI.apiUrls.update,
      data: updateForm,
      header: { "Content-Type": "multipart/form-data" },
    })
      .then(async (result) => {
        if (preview === null && form.avatar_file === null) {
          await instance.delete(UserAPI.apiUrls.remove_avatar);
        }
        if (result.status === 201) {
          setIsUserFetch(true);
        }
      })
      .catch((err) => {
        if (err) {
          if (err.response) {
            switch (err.response.status) {
              case 400:
                switch (err.response.status) {
                  case 400:
                    const error = err.response.data.error.detail;
                    switch (error) {
                      case "(email) is already exist.":
                        setErrors({
                          ...errors,
                          email: true,
                          form: `${form.email} is already used.`,
                        });
                        break;
                      case "(phone_number) is already exist.":
                        setErrors({
                          ...errors,
                          phone_number: true,
                          form: `${form.phone_number} is already used.`,
                        });
                        break;
                      default:
                        console.error(err.response);
                        setErrors({ ...errors, form: err.response.data.error });
                    }
                    break;
                  default:
                    console.error(err.response);
                    setErrors({ ...errors, form: "Something went wrong." });
                    break;
                }
                break;
              case 401:
                setErrors({
                  ...errors,
                  form: err.response.data.error,
                });
                break;
              default:
                console.error(err.response.data);
                setErrors({ ...errors, form: "Something went wrong." });
                break;
            }
          }
        } else {
          console.error(err);
        }
      });
  };

  return (
    <div className="w-full  h-auto">
      <Prompt when={isBlock} message="Are you sure to dismiss the change?" />
      <h1 className="text-5xl mb-5">My Profile</h1>
      <form
        className="w-full  h-fit-content relative p-6 flex border border-gray-300 rounded-lg shadow place-items-start mb-10 hover:border-gray-400 ease-in duration-75"
        onSubmit={handleOnSubmit}
      >
        <div className="grid grid-cols-4 gap-2 w-max pl-9 mr-auto">
          <p className="mr-1 flex items-center justify-end">Username:</p>
          <p className="col-span-3 h-8 flex items-center">{user.username}</p>
          {user.class === "Agent" && (
            <p className="mr-1 flex items-center justify-end">Agent ID:</p>
          )}
          {user.class === "Agent" && (
            <p className="col-span-3 h-8 flex items-center">{user.agent_id}</p>
          )}
          {user.class === "Webmaster" && (
            <p className="mr-1 flex items-center justify-end">Webmaster ID:</p>
          )}
          {user.class === "Webmaster" && (
            <p className="col-span-3 h-8 flex items-center">
              {user.webmaster_id}
            </p>
          )}
          <p className="mr-1 flex items-center justify-end">Name:</p>
          <input
            type="text"
            name="full_name"
            id="full_name"
            placeholder="Name"
            value={form.full_name}
            onChange={handleOnChange}
            className="col-span-3 w-72 h-8 bg-white p-2 rounded-lg shadow border border-gray-300 outline-none hover:border-gray-400 ease-in duration-75"
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
            className={`col-span-3 w-72 h-8 bg-white p-2 rounded-lg shadow border outline-none ${
              errors.email
                ? "border-red-400"
                : "border-gray-300 hover:border-gray-400"
            }  ease-in duration-75`}
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
            className={`col-span-3 w-72 h-8 bg-white p-2 rounded-lg shadow border outline-none ${
              errors.phone_number
                ? "border-red-400"
                : "border-gray-300 hover:border-gray-400"
            } ease-in duration-75`}
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
            className="col-span-3 w-1/2 h-8 bg-white p-2 rounded-lg shadow border border-gray-300 outline-none hover:border-gray-400 ease-in duration-75"
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
            {errors.form && (
              <p className="text-red-500 col-span-3">{errors.avatar_file}</p>
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
              src={preview ? preview : avatar_icon}
              alt=""
              className="w-full  h-full rounded-full object-cover object-center"
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
        {errors.form && (
          <p className="text-red-500 ml-3 absolute bottom-5 right-5">
            {errors.form}
          </p>
        )}
      </form>
      {user.class === "Customer" && (
        <div>
          <h1 className="text-5xl mb-5">My Real Estate Agent</h1>
          {isAgentFetch ? (
            <div className="w-full  h-fit-content p-6 flex border border-gray-300 rounded-lg shadow items-center justify-center">
              <img src={loading} alt="" className="w-8 h-8 mr-2" />
              <p>Loading...</p>
            </div>
          ) : agent !== null ? (
            <div className="w-full  h-fit-content p-6 flex border border-gray-300 rounded-lg shadow place-items-start hover:border-gray-400 ease-in duration-75">
              <div className="grid grid-cols-4 gap-2 w-max pl-9 mr-auto">
                <p className="mr-1 flex items-center justify-end">Agent ID:</p>
                <p className="col-span-3 h-8 flex items-center">
                  {agent.agent_id}
                </p>
                <p className="mr-1 flex items-center justify-end">Name:</p>
                <p className="col-span-3 h-8 flex items-center">
                  {agent.full_name}
                </p>
                <p className="mr-1 flex items-center justify-end">Email:</p>
                <p className="col-span-3 h-8 flex items-center">
                  {agent.email}
                </p>
                <p className="mr-1 flex items-center justify-end">
                  Phone number:
                </p>
                <p className="col-span-3 h-8 flex items-center">
                  {agent.phone_number}
                </p>
              </div>
              <div className="w-48 h/full p-2 flex flex-col items-center">
                <img
                  src={
                    agent.avatar_id !== null
                      ? ImageAPI.getAvatarURL(agent.avatar_id)
                      : avatar_icon
                  }
                  alt=""
                  className="w-28 h-28 mb-8 mt-4 rounded-full object-cover object-center"
                />
              </div>
            </div>
          ) : (
            <div className="w-full  h-fit-content p-6 flex border border-gray-300 rounded-lg shadow justify-center hover:border-gray-400 ease-in duration-75">
              <div className="flex justify-center items-center">
                <img src={contact} className="w-28 h-28 mr-6" alt="" />
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
