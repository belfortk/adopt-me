import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";

import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

// this function creates a React components when invoked
const App = () => {

  // if you need to have more properites in global state, pass an object instead of string
  
  const themeHook = useState("darkblue");

  return (
    <ThemeContext.Provider value={themeHook}>
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

// this stamps it into the DOM at the #root node
render(<App />, document.getElementById("root"));
