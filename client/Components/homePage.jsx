import React from "react";
import { useNavigate } from "react-router";


const HomePage = (props)=>{
  let navigate = useNavigate();
    return(
    <main>
      <div id="home">
        <div className="navbar">
          <nav>
            <div className="logo">Voyager.</div>
            <div className="menu">
              <a href="#about">About</a>
              <a href="/signin">Login</a>
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
        <div className="image"></div>
        <div className="content">
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </div>
    </main>
   )
}

export default HomePage;