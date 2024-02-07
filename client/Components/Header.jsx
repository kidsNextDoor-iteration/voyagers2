import React from "react";
import { Link, useNavigate } from 'react-router-dom';

import '../Styles/header.scss'

const Header = () => {
  const navigate = useNavigate();

  function onClick(){
    //response is not always a json. 
    fetch('/internal/signout')
      // .then((data) => data.json())
      // .then((data) => console.log('response: ', data))
      .then(() => navigate('/home'))
      .catch(err => alert(err));
  }

  return (
    <div className="header">
      <nav>
        <a style={{cursor: "pointer"}} onClick={() => navigate('/')} className="logo">
          Voyager<a id='capitalS'>S</a>
        </a>
        <div className="menu">
          {/* <Link to="/trips">TRIPS</Link>
          <Link to="/moodboard">MOOD BOARDS</Link>
          <Link to="/collaborations">COLLABORATIONS</Link> */}
          {/* <a href="/internal/signout" >SIGNOUT</a> */}
          <a style={{cursor: "pointer"}} onClick={onClick} >SIGNOUT</a>
        </div>
      </nav>
    </div>
  )
}

export default Header;