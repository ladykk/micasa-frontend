import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";

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
import Loading from "./components/Loading";

//import modules
import UserAPI from "./modules/api/UserAPI";

function App() {
  //Overlay
  const [isOverlayOpen, setOverlay] = useState(false);
  const toggleOverlay = () => {
    setOverlay(!isOverlayOpen);
  };

  //User
  const [user, setUser] = useState({});
  const [isUserFetch, setIsUserFetch] = useState(true);
  const handleSignIn = () => {
    setIsUserFetch(true);
  };
  const handleSignOut = async () => {
    await axios({
      method: "post",
      url: UserAPI.apiUrls.logout,
    });
    setUser({});
  };

  useEffect(() => {
    if (isUserFetch) {
      (async () => {
        await axios({
          method: "get",
          url: UserAPI.apiUrls.getUser,
        })
          .then((result) => {
            if (result.status === 201) {
              setUser(result.data);
              setIsUserFetch(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })();
    }
  });

  return (
    <Router>
      <div className="app">
        <NavBar
          user={user}
          handleSignIn={handleSignIn}
          handleSignOut={handleSignOut}
          isOverlayOpen={isOverlayOpen}
          toggleOverlay={toggleOverlay}
        />
        <div className="pt-12 w-screen h-screen relative overflow-x-hidden">
          <Switch>
            <Route path="/add">
              {!isUserFetch ? (
                user.username ? (
                  <AddPropertyPage user={user} />
                ) : (
                  <Redirect to="/401" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route path="/edit/:id">
              <EditPropertyPage user={user} />
            </Route>
            <Route exact path="/edit/">
              <Redirect to="/400" />
            </Route>
            <Route path="/dashboard/:menu">
              <DashboardPage
                user={user}
                handleSignOut={handleSignOut}
                isUserFetch={isUserFetch}
                setIsUserFetch={setIsUserFetch}
              />
            </Route>
            <Route exact path="/dashboard">
              <Redirect to="/dashboard/profile" />
            </Route>
            <Route path="/property/:id">
              <PropertyPage user={user} toggleOverlay={toggleOverlay} />
            </Route>
            <Route exact path="/property/">
              <Redirect to="/400" />
            </Route>
            <Route path="/search/:contract">
              <SearchPage user={user} toggleOverlay={toggleOverlay} />
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
