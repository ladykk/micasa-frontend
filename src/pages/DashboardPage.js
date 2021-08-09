import React from "react";
import { useParams } from "react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import FavoriteProperties from "../components/FavoriteProperties";
import Menu from "../components/Menu";

//import components
import Profile from "../components/Profile";

const DashboardPage = ({ user, handleSignOut }) => {
  let { menu } = useParams();
  return user.username ? (
    <div className="w-screen h-screen absolute top-0 left-0 right-0 bottom-0 pt-20 pb-10 ">
      <div className="w-full pl-5 pr-5 2xl:w-4/5 h-auto mx-auto flex">
        <Menu user={user} handleSignOut={handleSignOut} menu={menu} />
        <Switch>
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
        </Switch>
      </div>
    </div>
  ) : (
    <Redirect to="/401" />
  );
};

export default DashboardPage;
