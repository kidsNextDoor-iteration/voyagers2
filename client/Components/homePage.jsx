import React from "react";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import Image from "../stylesheets/images/background-1.jpg"


const HomePage = (props)=>{
  let navigate = useNavigate();
    return(
    <main>
      <div id="home">
        <div className="navbar">
          <nav>
            <a href="/" className="logo">Voyager</a>
            <div className="menu">
              <a href="#about">ABOUT</a>
              <Link to="/signin">LOGIN</Link>
            </div>
          </nav>
        </div>
        <div className="hero">
          <div className="content">
            <h1>Welcome to Voyager</h1>
            <p>Travel planning made easy</p>
            <button onClick={() => navigate('/signup')}>Get Started</button>
          </div>
        </div>
      </div>
      <div id="about">
        <div className="image">
          <img src={Image}></img>
        </div>
        <div className="content">
          <h1>More about us</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </div>
    </main>
   )
}

export default HomePage;