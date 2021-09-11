import React from "react";
import { useParams } from "react-router";
import { Redirect, Route, Switch } from "react-router-dom";

//import components
import Menu from "../components/Dashboard/Menu";
import Profile from "../components/Dashboard/Profile";
import FavoriteProperties from "../components/Customer/FavoriteProperties";
import Reviews from "../components/Customer/Reviews";
import ManageProperties from "../components/Customer/ManageProperties";
import Customers from "../components/Agent_Webmaster/Customers";
import Loading from "../components/Loading";
import ApproveProperties from "../components/Agent_Webmaster/ApproveProperties";
import Agents from "../components/Agent_Webmaster/Agents";

const DashboardPage = ({
  user,
  handleSignOut,
  isUserFetch,
  setIsUserFetch,
}) => {
  let { menu } = useParams();
  return !isUserFetch ? (
    user.username ? (
      <div className="w-full h-auto absolute top-0 left-0 right-0  pt-20 pb-10 overflow-x-hidden">
        <div className="w-full  pl-5 pr-5 desktop:w-4/5 h-auto mx-auto flex">
          <Menu user={user} handleSignOut={handleSignOut} menu={menu} />
          <Switch>
            <Route path="/dashboard/agents">
              {user.class === "Webmaster" ? <Agents /> : <Redirect to="/401" />}
            </Route>
            <Route path="/dashboard/approve">
              {user.class === "Webmaster" ? (
                <ApproveProperties />
              ) : (
                <Redirect to="/401" />
              )}
            </Route>
            <Route path="/dashboard/customers/">
              {user.class === "Agent" ? (
                <Customers user={user} />
              ) : (
                <Redirect to="/401" />
              )}
            </Route>
            <Route path="/dashboard/manage/">
              <ManageProperties user={user} />
            </Route>
            <Route path="/dashboard/reviews">
              {user.class === "Customer" ? (
                <Reviews user={user} />
              ) : (
                <Redirect to="/401" />
              )}
            </Route>
            <Route path="/dashboard/favorites">
              {user.class === "Customer" ? (
                <FavoriteProperties user={user} />
              ) : (
                <Redirect to="/401" />
              )}
            </Route>
            <Route path="/dashboard/profile">
              <Profile user={user} setIsUserFetch={setIsUserFetch} />
            </Route>
            <Route path="/dashboard/*">
              <Redirect to="/404" />
            </Route>
          </Switch>
        </div>
      </div>
    ) : (
      <Redirect to="/401" />
    )
  ) : (
    <Loading />
  );
};

export default DashboardPage;
