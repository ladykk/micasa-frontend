import React from "react";
import { useParams } from "react-router";
import { Redirect, Route, Switch } from "react-router-dom";

//import components
import Menu from "../components/Dashboard/Menu";
import Profile from "../components/Dashboard/Profile";
import FavoriteProperties from "../components/Dashboard/FavoriteProperties";
import Reviews from "../components/Dashboard/Reviews";
import ManageProperties from "../components/Dashboard/ManageProperties";
import Customers from "../components/Dashboard/Customers";

const DashboardPage = ({ user, handleSignOut }) => {
  let { menu } = useParams();
  return user.username ? (
    <div className="w-screen h-screen absolute top-0 left-0 right-0 bottom-0 pt-20 pb-10 ">
      <div className="w-full pl-5 pr-5 2xl:w-4/5 h-auto mx-auto flex">
        <Menu user={user} handleSignOut={handleSignOut} menu={menu} />
        <Switch>
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
            <Profile user={user} />
          </Route>
          <Route path="/dashboard/*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </div>
    </div>
  ) : (
    <Redirect to="/401" />
  );
};

export default DashboardPage;
