import React from "react";
import Image from "../stylesheets/images/background-1.jpg"
import { Link } from 'react-router-dom';
import image2 from '../Images/pexels-cottonbro-studio-2773494.jpg';
import image3 from '../Images/couple-img3.png';

const Signin = () => {
    return (
        <div id="signin">
            <nav>
                <a href="/" className="logo">Voyager</a>
            </nav>
            <div className="content">
                <div className="form">
                    <form action="/signin" method="POST">
                        <input name="email" type="text" placeholder="Email"></input>
                        <input name="password" type="password" placeholder="Password"></input>
                        <input type="submit" value="Login"></input>
                        <Link to="/signup">Register Now</Link>
                    </form>
                </div>
                <div className="image">
                    <img src={image3}></img>
                </div>
            </div>
        </div>
    )
}

export default Signin;