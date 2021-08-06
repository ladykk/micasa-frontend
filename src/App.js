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

function App() {
  //User
  const [user, setUser] = useState({ initialized: false });

  return (
    <Router>
      <div className="app">
        <NavBar user={user} />
        <div className="pt-12 w-screen h-screen">
          <Switch>
            <Route exact path="/about">
              <AboutUsPage />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
