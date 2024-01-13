import React from "react";
import { Link } from 'react-router-dom';

import '../Styles/header.scss'

const Header = () => {
  
  return (
    <div className="header"> 
      <div className="brand">
        Voyage
      </div>
      <div>
        <Link to="/trips" className="links">Trips </Link>
        <Link to="/moodboard" className="links">Moodboard </Link>
        <Link to="/collaborations" className="links">Collaborations </Link>
      </div>
    </div>      
  )
}

export default Header;