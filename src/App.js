import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//import components
import NavBar from "./components/NavBar";

// import pages
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ReviewsPage from "./pages/ReviewsPage";
import SignUpPage from "./pages/SignUpPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import PropertyPage from "./pages/PropertyPage";
import DashboardPage from "./pages/DashboardPage";
import EditPropertyPage from "./pages/EditPropertyPage";
import AddPropertyPage from "./pages/AddPropertyPage";

function App() {
  //User
  const [user, setUser] = useState({
    // Customer
    // username: "customer",
    // class: "Customer",
    // full_name: "Customer Account",
    // email: "customer@gmail.com",
    // phone_number: "0600000000",
    // gender: "Not specific",
    // birthday: "2000-01-01",
    // real_estate_id: 1,
    // Agent
    username: "agent",
    real_id: 1,
    class: "Agent",
    full_name: "Agent Account",
    email: "agent@micasa.com",
    phone_number: "0600000000",
    gender: "Not specific",
    birthday: "2000-01-01",
    // Webmaster
    // username: "agent",
    // web_id: 1,
    // class: "Webmaster",
    // full_name: "Webmaster Account",
    // email: "webmaster@micasa.com",
    // phone_number: "0600000000",
    // gender: "Not specific",
    // birthday: "2000-01-01",
  });
  const [fetchUser, setFetchUser] = useState(false);
  const handleSignIn = (e) => {
    const username = e.target.username.value;
    switch (username) {
      case "Customer":
      case "Agent":
      case "Webmaster":
        setUser({
          username: username,
          class: username,
          full_name: `${username} Account`,
        });
        return true;
      default:
        return false;
    }
  };
  const handleSignOut = () => {
    setUser({});
  };

  return (
    <Router>
      <div className="app">
        <NavBar
          user={user}
          handleSignIn={handleSignIn}
          handleSignOut={handleSignOut}
        />
        <div className="pt-12 w-screen h-screen relative overflow-x-hidden">
          <Switch>
            <Route path="/add">
              {user.username ? (
                <AddPropertyPage user={user} />
              ) : (
                <Redirect to="/401" />
              )}
            </Route>
            <Route path="/edit/:id">
              <EditPropertyPage user={user} />
            </Route>
            <Route exact path="/edit/">
              <Redirect to="/400" />
            </Route>
            <Route path="/dashboard/:menu">
              <DashboardPage user={user} handleSignOut={handleSignOut} />
            </Route>
            <Route exact path="/dashboard">
              <Redirect to="/dashboard/profile" />
            </Route>
            <Route path="/property/:id">
              <PropertyPage />
            </Route>
            <Route exact path="/property/">
              <Redirect to="/400" />
            </Route>
            <Route path="/search/:contract">
              <SearchPage />
            </Route>
            <Route path="/search/" exact>
              <Redirect to="/search/buy" />
            </Route>
            <Route path="/forgetpassword">
              <ForgetPasswordPage />
            </Route>
            <Route exact path="/signup">
              <SignUpPage />
            </Route>
            <Route exact path="/reviews">
              <ReviewsPage />
            </Route>
            <Route exact path="/about">
              <AboutUsPage />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/401">
              <NotFoundPage error="401 Unauthorized" />
            </Route>
            <Route exact path="/400">
              <NotFoundPage error="400 Bad Request" />
            </Route>
            <Route exact path="/404">
              <NotFoundPage error="404 Page Not Found" />
            </Route>
            <Route exact path="*">
              <Redirect to="/404" />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
