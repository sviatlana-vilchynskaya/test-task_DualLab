import React from 'react';
import "./App.css"
import Rates from "./component/Rates";
import {
  BrowserRouter as Router,

} from "react-router-dom";


const NavBar = () => {
    return(
      <div className="App">
        <Router>
          <Rates />
        </Router>
      </div>
    )
}

export default NavBar;