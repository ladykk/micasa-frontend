import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import instance from "./modules/Instance";

//import pictures
import server from "./assets/icons/database-storage.png";

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
  //Database
  const [isDBConnected, setDBConnected] = useState(true);
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
    //Set Logout
    await instance({
      method: "post",
      url: UserAPI.apiUrls.logout,
    }).catch((err) => {
      if (err) {
        if (err.response) {
          console.error(err.response.data);
        } else {
          console.error(err);
        }
      }
    });
    setUser({});
  };

  useEffect(() => {
    //Fetch user detail.
    if (isUserFetch) {
      (async () => {
        await instance({
          method: "get",
          url: UserAPI.apiUrls.getUser,
        })
          .then((result) => {
            if (result.status === 200) {
              setUser(result.data.payload);
            }
          })
          .catch((err) => {
            if (err) {
              if (err.response) {
                console.error(err.response.data);
              } else {
                console.error(err);
                setDBConnected(false);
              }
            }
          })
          .finally(() => setIsUserFetch(false));
      })();
    }
  });

  useEffect(() => {
    let interval = null;
    if (isDBConnected) {
      interval = setInterval(async () => {
        await instance
          .get("/")
          .then((result) => {
            if (result.status === 200) {
              setDBConnected(true);
            } else {
              setDBConnected(false);
            }
          })
          .catch((err) => {
            setDBConnected(false);
          });
      }, 600000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isDBConnected]);

  return (
    <Router>
      <div className="app w-full h-auto">
        <NavBar
          user={user}
          handleSignIn={handleSignIn}
          handleSignOut={handleSignOut}
          isOverlayOpen={isOverlayOpen}
          toggleOverlay={toggleOverlay}
        />
        <div className="pt-12 w-full h-auto overflow-x-hidden">
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
            <Route path="/search/:contract_type">
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
          {!isDBConnected && (
            <div className="z-50 fixed bottom-10 left-10 flex flex-col items-start justify-center">
              <div className="bg-red-500 w-max p-1 pl-3 pr-3 flex rounded-full mb-2 shadow-lg">
                <img src={server} alt="" className="w-6 h-6 invert-icon mr-2" />
                <p className="font-normal text-white">
                  Cannot connect to server !
                </p>
              </div>

              <p className="bg-white p-2 rounded-lg text-left shadow-lg">
                Some function might not working properly. <br />
                Please refresh the browser or{" "}
                <HashLink
                  to="/about#contact"
                  className=" text-gray-700 underline"
                >
                  contact us
                </HashLink>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
