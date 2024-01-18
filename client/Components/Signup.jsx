import React from "react";
import Image from "../stylesheets/images/background-1.jpg"
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div id="signup">
            <nav>
                <a href="/" className="logo">Voyager</a>
            </nav>
            <div className="content">
                <div className="image">
                    <img src={Image}></img>
                </div>
                <div className="form">
                    <form action="/signup" method="POST">
                        <input name="firstName" type="text" placeholder="First Name"></input>
                        <input name="lastName" type="text" placeholder="Last Name"></input>
                        <input name="email" type="text" placeholder="Email"></input>
                        <input name="password" type="password" placeholder="Password"></input>
                        <input type="submit" value="Signup"></input>
                        <Link to="/signin">Already have an account? Login here</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;