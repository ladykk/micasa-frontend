import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "../modules/RouterModule";
import instance from "../modules/Instance.js";

//import pictures
import user_icon from "../assets/icons/userform/user.png";
import email_icon from "../assets/icons/userform/email.png";
import password from "../assets/icons/userform/key.png";

//import component
import Loading from "../components/Loading";

//import modules
import UserAPI from "../modules/api/UserAPI";

const ForgetPasswordPage = () => {
  const history = useHistory();
  const query = useQuery();

  const [isFetch, setFetch] = useState(query.get("token") ? true : false);
  const [isValid, setValid] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirm_password: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ target }) => {
    setError("");
    setForm({ ...form, [target.name]: target.value });
  };

  const handleGetToken = async (e) => {
    e.preventDefault();
    const getRecoverForm = new FormData();
    getRecoverForm.append("username", form.username);
    getRecoverForm.append("email", form.email);
    await instance({
      method: "post",
      url: UserAPI.apiUrls.recover,
      data: getRecoverForm,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((result) => {
        if (result.status === 201) {
          history.replace("/");
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data) {
            setError(err.response.data.error);
          }
        } else {
          setError("Something went wrong.");
          console.error(err);
        }
      });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) {
      setError("Passwords are not match.");
    } else {
      const updatePasswordForm = new FormData();
      updatePasswordForm.append("token", query.get("token"));
      updatePasswordForm.append("password", form.password);
      await instance({
        method: "patch",
        url: UserAPI.apiUrls.recover,
        data: updatePasswordForm,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((result) => {
          if (result.status === 201) {
            history.replace("/");
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data) {
              setError(err.response.data.error);
            }
          } else {
            setError("Something went wrong.");
            console.error(err);
          }
        });
    }
  };

  useEffect(() => {
    (async () => {
      if (isFetch) {
        await instance
          .get(`${UserAPI.apiUrls.recover}/${query.get("token")}`)
          .then((result) => {
            if (result.status === 200) {
              if (result.data.payload) {
                console.log(result.data.payload);
                setForm({
                  ...form,
                  username: result.data.payload.username,
                  email: result.data.payload.email,
                });
                setValid(true);
              } else {
                setError("Link is invalid or expired.");
                setValid(false);
              }
            }
          })
          .catch((err) => {
            if (err.response) {
              if (err.response.data) {
                if (err.response.status === 401) {
                  setError("Link is invalid or expired.");
                } else {
                  console.error(err.response.data);
                }
              }
            } else {
              setError("Link is invalid or expired.");
              console.error(err);
            }
          })
          .finally(() => setFetch(false));
      }
    })();
  }, [isFetch]);

  return isFetch ? (
    <Loading />
  ) : (
    <div className="w-full h-screen absolute top-0 left-0 right-0  pt-12 background-2 bg-black text-white overflow-x-hidden">
      <div className="w-full  pl-5 pr-5 xl:pl-14 xl:pr-14 desktop:w-4/5 desktop:p-0 h-full mx-auto relative flex">
        <div className=" w-1/3 flex flex-col justify-center flex-shrink-0 flex-grow-0 mr-48">
          <div className="w-full  flex items-end justify-between mb-4">
            <h1 className="text-4xl">At Mi Casa,</h1>
            <p className="text-xl">
              <span className="text-red-600 font-normal">10,000+</span>{" "}
              properties
            </p>
          </div>
          <p className="text-xl text-justify mb-4">
            We try our best to introduce you a dreamy property that suit to your
            need. Saving your time, stress, and money.
          </p>
          <Link
            to="/about"
            className="text-lg text-gray-400 font-normal underline"
          >
            Learn more...
          </Link>
        </div>
        {isValid ? (
          <form
            className="w-full  h-auto bg-black bg-opacity-60 rounded-xl p-7 mt-12 mb-12"
            onSubmit={handleChangePassword}
          >
            <div className="mb-10">
              <h1 className="text-center text-5xl font-semibold mt-5 mb-3">
                Recover Account
              </h1>
              <p className="text-center text-lg text-gray-500">
                Enter new password of account '{form.username}'.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full  xl:w-4/5 h/full p-2 text-black">
                <div className="w-full  h-10 mb-3 bg-white p-2 rounded-lg flex items-center shadow-md ">
                  <img src={password} alt="" className="h-6 w-auto mr-2" />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    onChange={handleChange}
                    value={form.password}
                    placeholder="Password"
                    className="w-full  focus:outline-none h-full"
                  />
                </div>
                <div className="w-full  h-10 mb-3 bg-white p-2 rounded-lg flex items-center shadow-md ">
                  <img src={password} alt="" className="h-6 w-auto mr-2" />
                  <input
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    required
                    onChange={handleChange}
                    value={form.confirm_password}
                    placeholder="Confirm password"
                    className="w-full  focus:outline-none h-full"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center w-full  h-10 mt-7 rounded-xl text-white bg-blue-500 text-lg font-normal align-middle hover:bg-opacity-90 ease-in duration-75"
                >
                  Recover
                </button>
                <p className="text-red-500 mt-5 text-center">{error}</p>
              </div>
            </div>
          </form>
        ) : (
          <form
            className="w-full  h-auto bg-black bg-opacity-60 rounded-xl p-7 mt-12 mb-12"
            onSubmit={handleGetToken}
          >
            <div className="mb-10">
              <h1 className="text-center text-5xl font-semibold mt-5 mb-3">
                Forget Password
              </h1>
              <p className="text-center text-lg text-gray-500">
                Enter information to get recovery email.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full  xl:w-4/5 h/full p-2 text-black">
                <div className="w-full  h-10 mb-3 bg-white p-2 rounded-lg flex items-center shadow-md ">
                  <img src={user_icon} alt="" className="h-6 w-auto mr-2" />
                  <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    onChange={handleChange}
                    value={form.username}
                    placeholder="Username"
                    className="w-full  focus:outline-none h-full"
                  />
                </div>
                <div className="w-full  h-10 mb-3 bg-white p-2 rounded-lg flex items-center shadow-md ">
                  <img src={email_icon} alt="" className="h-6 w-auto mr-2" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    onChange={handleChange}
                    value={form.email}
                    placeholder="Email Address"
                    className="w-full  focus:outline-none h-full"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center w-full  h-10 mt-7 rounded-xl text-white bg-blue-500 text-lg font-normal align-middle hover:bg-opacity-90 ease-in duration-75"
                >
                  Recover
                </button>
                <p className="text-red-500 mt-5 text-center">{error}</p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
