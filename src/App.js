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

function App() {
  //User
  const [user, setUser] = useState({
    // username: "micasa",
    // class: "Customer",
    // full_name: "Mi Casa",
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
            <Route path="/dashboard"></Route>
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
