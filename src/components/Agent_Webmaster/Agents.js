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
import WebmasterAPI from "../../modules/api/WebmasterAPI";
const ImageAPI = require("../../modules/api/ImageAPI");

const Agents = () => {
  //Fetch
  const [isAgentsFetch, setAgentsFetch] = useState(true);
  const [isCustomersFetch, setCustomersFetch] = useState(false);
  //Toggle
  const [isAddAgent, setAddAgent] = useState(false);
  const [isAddCustomer, setIsAddCustomer] = useState(false);

  const [agents, setAgents] = useState([]);
  const [agent, setAgent] = useState({});
  const [customers, setCustomers] = useState([]);

  //Agent term
  const [agentTerm, setAgentTerm] = useState("");
  const [filterAgents, setFilterAgents] = useState([]);
  const handleAgentTermChange = ({ target }) => {
    setAgentTerm(target.value);
    if (target.value === "") {
      setFilterAgents(agents);
    } else {
      setFilterAgents(
        agents.filter(
          (agent) =>
            agent.username.startsWith(target.value) ||
            agent.full_name.startsWith(target.value)
        )
      );
    }
  };

  useEffect(() => {
    (async () => {
      //Fetch agents
      if (isAgentsFetch) {
        await instance
          .get(WebmasterAPI.apiUrls.agents)
          .then((result) => {
            if (result.status === 200) {
              let users = result.data.payload;
              setAgents(users);
              setFilterAgents(users);
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
          .finally(() => setAgentsFetch(false));
      }
    })();
  }, [isAgentsFetch]);

  useEffect(() => {
    (async () => {
      if (isCustomersFetch) {
        await instance
          .get(`${WebmasterAPI.apiUrls.customers}/${agent.agent_id}`)
          .then((result) => {
            if (result.status === 200) {
              let users = result.data.payload;
              setCustomers(users);
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
          .finally(() => setCustomersFetch(false));
      }
    })();
  });

  //Agents
  const [addAgentUser, setAddAgentUser] = useState("");
  const [addUserResponse, setAddUserResponse] = useState("");
  const toggleAddAgent = () => {
    if (!isAddAgent === true) {
      setAddAgentUser("");
      setAddUserResponse("");
    }
    setAddAgent(!isAddAgent);
    setAddUserResponse("");
  };
  const handleAddUserChange = ({ target }) => {
    setAddAgentUser(target.value);
  };
  const handleAddAgent = async (e) => {
    e.preventDefault();
    const addAgentForm = new FormData();
    addAgentForm.append("username", addAgentUser);
    await instance({
      method: "post",
      url: WebmasterAPI.apiUrls.addAgent,
      data: addAgentForm,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((result) => {
        if (result.status === 201) {
          toggleAddAgent();
          setAgentsFetch(true);
        }
      })
      .catch((err) => {
        if (err) {
          if (err.response) {
            switch (err.response.status) {
              case 400:
              case 401:
                setAddUserResponse(err.response.data.error);
                break;
              default:
                console.error(err.response.data);
                setAddUserResponse("Something went wrong.");
                break;
            }
          } else {
            console.error(err);
          }
        }
      });
  };
  const handleRemoveAgent = async (user) => {
    await instance
      .delete(`${WebmasterAPI.apiUrls.deleteAgent}/${user.username}`)
      .then((result) => {
        if (result.status === 201) {
          setAgentsFetch(true);
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
  };

  //Add Customer
  const [addCustomer, setAddCustomer] = useState("");
  const [addCustomerResponse, setAddCustomerResponse] = useState("");
  const toggleAddCustomer = () => {
    if (!isAddCustomer === true) {
      setAddCustomer("");
      setAddCustomerResponse("");
    }
    setIsAddCustomer(!isAddCustomer);
    setAddCustomerResponse("");
  };
  const handleAddCustomerChange = ({ target }) => {
    setAddCustomer(target.value);
  };
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    const addCustomerForm = new FormData();
    addCustomerForm.append("username", addCustomer);
    addCustomerForm.append("agent_username", agent.username);
    await instance({
      method: "post",
      url: WebmasterAPI.apiUrls.addCustomer,
      data: addCustomerForm,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((result) => {
        if (result.status === 201) {
          toggleAddCustomer();
          setCustomersFetch(true);
        }
      })
      .catch((err) => {
        if (err) {
          if (err.response) {
            switch (err.response.status) {
              case 400:
              case 401:
                setAddCustomerResponse(err.response.data.error);
                break;
              default:
                console.error(err.response.data);
                setAddCustomerResponse("Something went wrong.");
                break;
            }
          } else {
            console.error(err);
          }
        }
      });
  };
  const handleRemoveCustomer = async (user) => {
    await instance
      .delete(`${WebmasterAPI.apiUrls.deleteCustomer}/${user.username}`)
      .then((result) => {
        if (result.status === 201) {
          setCustomersFetch(true);
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
  };

  const handleChangeAgent = (user) => {
    setAgent(user);
    setCustomersFetch(true);
  };

  return isAgentsFetch ? (
    <Loading isStatic={true} />
  ) : (
    <div className="w-full  h-screen-85 flex">
      <div className="h-full mr-5 w-80 flex-grow-0 flex-shrink-0 flex flex-col">
        <div className="mb-5 h-fit-content flex items-end justify-between">
          <h1 className="text-5xl">Agents</h1>
          <button
            className={`ml-2 mb-2 w-max pl-5 pr-5 flex items-center justify-center h-7 rounded-full text-white font-normal ${
              isAddAgent ? "bg-red-500" : "bg-blue-500"
            }`}
            onClick={toggleAddAgent}
          >
            {isAddAgent ? "Hide" : "Add"}
          </button>
        </div>
        <div className="h-full border border-gray-300 p-2 rounded-lg flex flex-col hover:border-gray-400 ease-in duration-75">
          <form
            onSubmit={handleAddAgent}
            className={`w-full  mb-2 trans-toggle flex-shrink-0 flex-grow-0 ${
              isAddAgent && "active"
            }`}
          >
            <input
              type="text"
              className="border border-gray-300 rounded-full pl-3 pr-3 flex items-center h-8 outline-none w-full  hover:border-gray-400 ease-in duration-75"
              placeholder="Username"
              value={addAgentUser}
              onChange={handleAddUserChange}
              required
            />
            <button
              type="submit"
              className="mt-2 mb-2 w-full  flex items-center justify-center h-7 bg-blue-500 rounded-full text-white font-normal flex-shrink-0 flex-grow-0"
            >
              Add Agent
            </button>
            {addUserResponse && (
              <p className="w-full  mb-2 text-center text-red-500">
                {addUserResponse}
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
                value={agentTerm}
                onChange={handleAgentTermChange}
                placeholder="Search by username or full name"
                id="terms"
                className="w-full  outline-none"
              />
            </div>
          </form>
          <div className="h-full">
            {agents.length > 0 ? (
              filterAgents.map((agent) => (
                <UserCard
                  user={agent}
                  setUser={handleChangeAgent}
                  setRemove={handleRemoveAgent}
                />
              ))
            ) : (
              <p className="w-full  h-5 flex justify-center items-center">
                No Agent
              </p>
            )}
          </div>
        </div>
      </div>
      {agent.username && (
        <div className="w-full  h-fit-content p-6 border border-gray-300 rounded-lg shadow mb-10 hover:border-gray-400 ease-in duration-75">
          <div className="relative w-full  flex mb-4">
            <div className="grid grid-cols-3 gap-2 w-max pl-9 mr-auto">
              <p className="mr-1 flex items-center justify-end">Username:</p>
              <p className="col-span-2 h-8 flex items-center">
                {agent.username}
              </p>
              <p className="mr-1 flex items-center justify-end">Name:</p>
              <p className="col-span-2 h-8 flex items-center">
                {agent.full_name}
              </p>
              <p className="mr-1 flex items-center justify-end">Email:</p>
              <p className="col-span-2 h-8 flex items-center">{agent.email}</p>
              <p className="mr-1 flex items-center justify-end">
                Phone number:
              </p>
              <p className="col-span-2 h-8 flex items-center">
                {agent.phone_number}
              </p>
              <p className="mr-1 flex items-center justify-end">Gender:</p>
              <p className="col-span-2 h-8 flex items-center">
                {agent.gender ? agent.gender : "NO DATA"}
              </p>
              <p className="mr-1 flex items-center justify-end">Birthday:</p>
              <p className="col-span-2 h-8 flex items-center">
                {agent.birthday ? agent.birthday : "NO DATA"}
              </p>
            </div>
            <div className="relative w-1/4 mb-8 mt-4 flex justify-center">
              <img
                src={
                  agent.avatar_id
                    ? ImageAPI.getAvatarURL(agent.avatar_id)
                    : avatar_icon
                }
                alt=""
                className="w-28 h-28 rounded-full"
              />
            </div>
            <div className="absolute bottom-0 right-0">
              <div className="flex">
                <p className="mr-1 flex items-center justify-end">Agent ID:</p>
                <p className="h-8 flex items-center">{agent.agent_id}</p>
              </div>
              <div className="flex">
                <p className="mr-1 flex items-center justify-end">Added By:</p>
                <p className="h-8 flex items-center">{agent.add_by}</p>
              </div>
            </div>
          </div>
          <hr className="mb-2" />
          <div className="flex mb-2 justify-between items-end">
            <h1 className="text-3xl mr-3">Customers</h1>
            <button
              className={`w-max pl-5 pr-5 flex items-center justify-center h-7 rounded-full text-white font-normal ${
                isAddCustomer ? "bg-red-500" : "bg-blue-500"
              }`}
              onClick={toggleAddCustomer}
            >
              {isAddCustomer ? "Hide" : "Add"}
            </button>
          </div>
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
              value={addCustomer}
              onChange={handleAddCustomerChange}
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
          <div className="p-2 border border-gray-300 rounded-md grid-cols-2 gap-2 hover:border-gray-400 ease-in duration-75">
            {isCustomersFetch ? (
              <div className="col-span-2 h-6 flex justify-center items-center">
                <img src={load_gif} alt="" className="h-6 w-6 mr-2" />
                <p>Loading...</p>
              </div>
            ) : customers.length > 0 ? (
              customers.map((customer) => (
                <UserCard user={customer} setRemove={handleRemoveCustomer} />
              ))
            ) : (
              <p className="col-span-2 h-5 flex justify-center items-center">
                No Customer
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Agents;
