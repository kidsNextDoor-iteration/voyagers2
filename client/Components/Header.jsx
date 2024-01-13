import React from "react";
import { Link } from 'react-router-dom';

const Header = () => {
  
  return (
    <div className="header"> 
      Voyage
        <Link to="/trips">Trips </Link>
        <Link to="/moodboard">Moodboard </Link>
        <Link to="/collaborations">Collaborations </Link>
    </div>      
  )
}

export default Header;