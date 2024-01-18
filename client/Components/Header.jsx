import React from "react";
import { Link } from 'react-router-dom';

import '../Styles/header.scss'

const Header = () => {
  
  return (
    <div className="header"> 
      <div className="brand">
        Voyager
      </div>
      <div>
        <Link to="/trips" className="links">Trips </Link>
        <Link to="/moodboard" className="links">Moodboard </Link>
        <Link to="/collaborations" className="links">Collaborations </Link>
        <a href="/signout" className="links">Signout</a>
      </div>
    </div>      
  )
}

export default Header;