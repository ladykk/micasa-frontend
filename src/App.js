import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App font-body w-screen h-screen bg-black">
      <h1 className="text-white text-6xl">Micasa Frontend</h1>
      <p class="text-xl text-white">This is paragraph.</p>
    </div>
  );
}

export default App;
