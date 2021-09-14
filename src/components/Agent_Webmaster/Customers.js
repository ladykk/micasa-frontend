import React, { useState, useEffect } from "react";
import instance from "../../modules/Instance";

//import pictures
import avatar_icon from "../../assets/icons/userform/avatar.png";
import search_icon from "../../assets/icons/form/mag-glass.png";
import load_gif from "../../assets/images/progress.gif";

//import components
import UserCard from "./UserCard";
import Loading from "../Loading";

//import modules
import AgentAPI from "../../modules/api/AgentAPI";
import MiniPropertyCard from "./MiniPropertyCard";
import ImageAPI from "../../modules/api/ImageAPI";

const Customers = ({ user }) => {
  //Fetch
  const [isFetch, setFetch] = useState(true);
  const [isPropertiesFetch, setPropertiesFetch] = useState(false);
  //Toggle
  const [isAddCustomer, setIsAddCustomer] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const [properties, setProperties] = useState([]);

  const [page, setPage] = useState("favorite");

  //Agent term
  const [customerTerm, setCustomerTerm] = useState("");
  const [filterCustomers, setFilterCustomers] = useState([]);
  const handleCustomerTermChange = ({ target }) => {
    setCustomerTerm(target.value);
    if (target.value === "") {
      setFilterCustomers(customers);
    } else {
      setFilterCustomers(
        customers.filter(
          (customer) =>
            customer.username.startsWith(target.value) ||
            customer.full_name.startsWith(target.value)
        )
      );
    }
  };

  let display_properties;
  switch (page) {
    case "favorite":
      display_properties = properties.filter(
        (property) => property.is_favorite
      );
      break;
    default:
      display_properties = properties;
  }

  const handlePageChange = ({ target }) => {
    setPage(target.value);
  };

  useEffect(() => {
    //Fetch Customer
    (async () => {
      if (isFetch) {
        await instance
          .get(AgentAPI.apiUrls.customers)
          .then((result) => {
            if (result.status === 200) {
              let users = result.data.payload;
              setCustomers(users);
              setFilterCustomers(users);
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
          })
          .finally(() => setFetch(false));
      }
    })();
  }, [isFetch]);

  useEffect(() => {
    (async () => {
      //Fetch customer's properties
      if (isPropertiesFetch) {
        await instance
          .get(`${AgentAPI.apiUrls.properties}/${customer.username}`)
          .then((result) => {
            if (result.status === 200) {
              let properties = result.data.payload;
              setProperties(properties);
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
          })
          .finally(() => setPropertiesFetch(false));
      }
    })();
  }, [isPropertiesFetch]);

  //Customers
  const [addCustomerUser, setAddCustomerUser] = useState("");
  const [addCustomerResponse, setCustomerResponse] = useState("");
  const toggleAddCustomer = () => {
    if (!isAddCustomer === true) {
      setAddCustomerUser("");
      setCustomerResponse("");
    }
    setIsAddCustomer(!isAddCustomer);
    setCustomerResponse("");
  };
  const handleAddUserChange = ({ target }) => {
    setAddCustomerUser(target.value);
  };
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    const addCustomerForm = new FormData();
    addCustomerForm.append("username", addCustomerUser);
    await instance({
      method: "post",
      url: AgentAPI.apiUrls.addCustomer,
      data: addCustomerForm,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((result) => {
        if (result.status === 201) {
          toggleAddCustomer();
          setFetch(true);
        }
      })
      .catch((err) => {
        if (err) {
          if (err.response) {
            switch (err.response.status) {
              case 400:
              case 401:
                setCustomerResponse(err.response.data.error);
                break;
              default:
                console.error(err.response.data);
                setCustomerResponse("Something went wrong.");
                break;
            }
          } else {
            console.error(err);
          }
        }
      });
  };

  const handleChangeCustomer = (user) => {
    setCustomer(user);
    setPropertiesFetch(true);
  };

  return isFetch ? (
    <Loading isStatic={true} />
  ) : (
    <div className="w-full  h-screen-85 flex">
      <div className="h-full mr-5 w-max flex-grow-0 flex-shrink-0 flex flex-col">
        <div className="mb-5 h-fit-content flex items-end justify-between">
          <h1 className="text-5xl">Customers</h1>
          <button
            className={`ml-2 mb-2 w-max pl-5 pr-5 flex items-center justify-center h-7 rounded-full text-white font-normal ${
              isAddCustomer ? "bg-red-500" : "bg-blue-500"
            }`}
            onClick={toggleAddCustomer}
          >
            {isAddCustomer ? "Hide" : "Add"}
          </button>
        </div>
        <div className="h-full border border-gray-300 p-2 rounded-lg flex flex-col hover:border-gray-400 ease-in duration-75">
          <form
            onSubmit={handleAddCustomer}
            className={`w-full  mb-2 trans-toggle flex-shrink-0 flex-grow-0 ${
              isAddCustomer && "active"
            }`}
          >
            <input
              type="text"
              className="border border-gray-300 rounded-full pl-3 pr-3 flex items-center h-8 outline-none w-full  hover:border-gray-400 ease-in duration-75"
              placeholder="Username"
              value={addCustomerUser}
              onChange={handleAddUserChange}
              required
            />
            <button
              type="submit"
              className="mt-2 mb-2 w-full  flex items-center justify-center h-7 bg-blue-500 rounded-full text-white font-normal flex-shrink-0 flex-grow-0"
            >
              Add Customer
            </button>
            {addCustomerResponse && (
              <p className="w-full  mb-2 text-center text-red-500">
                {addCustomerResponse}
              </p>
            )}

            <hr />
          </form>
          <form className="w-full  h-fit-content mb-2">
            <div className="border border-gray-300 rounded-full pl-2 pr-2 flex items-center h-8 hover:border-gray-400 ease-in duration-75">
              <img
                src={search_icon}
                alt=""
                className="w-4 h-4 flex-grow-0 flex-shrink-0 opacity-50 mr-2"
              />
              <input
                type="text"
                name="terms"
                value={customerTerm}
                onChange={handleCustomerTermChange}
                placeholder="Search by username or full name"
                id="terms"
                className="w-full  outline-none"
              />
            </div>
          </form>
          <div className="h-full">
            {customers.length > 0 ? (
              filterCustomers.map((agent) => (
                <UserCard user={agent} setUser={handleChangeCustomer} />
              ))
            ) : (
              <p className="w-full  h-5 flex justify-center items-center">
                No Customer
              </p>
            )}
          </div>
        </div>
      </div>
      {customer.username && (
        <div className="w-full  h-screen-85 p-6 flex flex-col border border-gray-300 rounded-lg shadow mb-10 hover:border-gray-400 ease-in duration-75">
          <div className="w-full  flex mb-4">
            <div className="grid grid-cols-3 gap-2 w-max pl-9 mr-auto">
              <p className="mr-1 flex items-center justify-end">Username:</p>
              <p className="col-span-2 h-8 flex items-center">
                {customer.username}
              </p>
              <p className="mr-1 flex items-center justify-end">Name:</p>
              <p className="col-span-2 h-8 flex items-center">
                {customer.full_name}
              </p>
              <p className="mr-1 flex items-center justify-end">Email:</p>
              <p className="col-span-2 h-8 flex items-center">
                {customer.email}
              </p>
              <p className="mr-1 flex items-center justify-end">
                Phone number:
              </p>
              <p className="col-span-2 h-8 flex items-center">
                {customer.phone_number}
              </p>
              <p className="mr-1 flex items-center justify-end">Gender:</p>
              <p className="col-span-2 h-8 flex items-center">
                {customer.gender ? customer.gender : "NO DATA"}
              </p>
              <p className="mr-1 flex items-center justify-end">Birthday:</p>
              <p className="col-span-2 h-8 flex items-center">
                {customer.birthday ? customer.birthday : "NO DATA"}
              </p>
            </div>
            <div className="relative w-1/4 mb-8 mt-4 flex justify-center">
              <img
                src={
                  customer.avatar_id
                    ? ImageAPI.getAvatarURL(customer.avatar_id)
                    : avatar_icon
                }
                alt=""
                className="w-28 h-28 rounded-full object-cover object-center"
              />
            </div>
          </div>
          <hr className="mb-2" />
          <div className="w-max mb-2 p-1 border border-gray-300 rounded-full hover:border-gray-400 ease-in duration-75">
            <button
              onClick={handlePageChange}
              value="favorite"
              className={`p-1 pl-2 pr-2 ${
                page === "favorite" && "bg-blue-500 text-white"
              } rounded-full font-normal mr-2`}
            >
              Favorite properties
            </button>
            <button
              onClick={handlePageChange}
              value="history"
              className={`p-1 pl-2 pr-2 ${
                page === "history" && "bg-blue-500 text-white"
              } rounded-full font-normal mr-2`}
            >
              History
            </button>
          </div>
          <div className="p-2 border overflow-y-auto border-gray-300 rounded-md grid-cols-2 gap-2 relative hover:border-gray-400 ease-in duration-75">
            <div className="bg-white border border-gray-300 grid grid-cols-7 p-2 pl-3 pr-3 place-content-center place-items-center rounded-lg mb-3 sticky top-1 z-40 hover:border-gray-400 ease-in duration-75">
              <p className="font-normal">Property ID</p>
              <p className="font-normal">Status</p>
              <p className="col-span-4 font-normal">Property Name</p>
              <p className="font-normal">Timestamp</p>
            </div>
            {isPropertiesFetch ? (
              <div className="col-span-2 h-6 flex justify-center items-center">
                <img src={load_gif} alt="" className="h-6 w-6 mr-2" />
                <p>Loading...</p>
              </div>
            ) : display_properties.length > 0 ? (
              display_properties.map((property) => (
                <MiniPropertyCard property={property} />
              ))
            ) : (
              <p className="col-span-2 h-5 flex justify-center items-center">
                No Property
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
