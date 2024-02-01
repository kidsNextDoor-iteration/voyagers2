import React from "react";
import { Link } from 'react-router-dom';

import '../Styles/header.scss'

const Header = () => {

  return (
    <div className="header">
      <nav>
        <a href="/trips" className="logo">
          Voyager
        </a>
        <div className="menu">
          {/* <Link to="/trips">TRIPS</Link>
          <Link to="/moodboard">MOOD BOARDS</Link>
          <Link to="/collaborations">COLLABORATIONS</Link> */}
          <a href="/internal/signout" >SIGNOUT</a>
        </div>
      </nav>
    </div>
  )
}

export default Header;