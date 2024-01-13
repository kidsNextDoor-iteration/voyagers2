import React from "react";
import { useNavigate } from "react-router";


const HomePage = (props)=>{
  let navigate = useNavigate();
    return(
    <main>
      <div id="home">
        <div className="navbar">
          <nav>
            <div className="logo">Voyager</div>
            <div className="menu">
              <a>About</a>
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
        
      </div>
    </main>
   )
}

export default HomePage;