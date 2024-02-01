import React from "react";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import Image from "../stylesheets/images/background-1.jpg";
import image2 from '../Images/landingImg2.png';


const HomePage = (props) => {
  let navigate = useNavigate();
  return (
    <main>
      <div id="home">
        <div className="navbar">
          <nav>
            <a href="/" className="logo">Voyager<a id='capitalS'>S</a></a>
            <div className="menu">
              <a href="#about">ABOUT</a>
              <Link to="/internal/signin">LOGIN</Link>
            </div>
          </nav>
        </div>
        <div className="hero">
          <div className="content">
            <h1>Welcome to Voyager<a id='capitalS'>S</a></h1>
            <p>Travel planning made eas<a id='capitalS'>ier</a></p>
            <button onClick={() => navigate('/internal/signup')}>Get Started</button>
          </div>
        </div>
      </div>
      <div id="about">
        <div className="image">
          <img src={image2}></img>
        </div>
        <div className="content">
          <h1>Let's take a voyage...</h1>
          <p className="about-blerb">Voyager<a id='capitalS'>S</a> is an all in one<a id='capitalS'>+</a> application to plan, organize, and manage upcoming trips through the lens of a Content Creator or Influencer. Voyager allows users to plan upcoming trips and create mood boards as a creative space to manage their thoughts and ensure created content is in line with client expectations. </p>
        </div>
      </div>
    </main>
  )
}

export default HomePage;