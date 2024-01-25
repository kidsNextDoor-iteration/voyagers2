import React from "react";
import Image from "../stylesheets/images/background-1.jpg"
import { Link, useNavigate } from 'react-router-dom';
import image2 from '../Images/pexels-cottonbro-studio-2773494.jpg';
import image3 from '../Images/couple-img3.png';
import googleAuthLink from './Utilities/getGoogleOAuthURL.jsx'

const Signin = () => {
    let navigate = useNavigate();
    const handleSubmit = async event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        try {
            const response = await fetch('/internal/signin', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            if (response.redirected) {
                navigate('/trips')
            } else {
                if (!response.ok) alert('Invalid login credentials');
            }
        } catch {
            alert('Signin failed due to unknown error')
        }
    }
    return (
        <div id="signin">
            <nav>
                <a href="/" className="logo">Voyager</a>
            </nav>
            <div className="content">
                <a href={googleAuthLink()}>Login with Google</a>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <input name="email" type="text" placeholder="Email"></input>
                        <input name="password" type="password" placeholder="Password"></input>
                        <input type="submit" value="Login"></input>
                        <Link to="/internal/signup">Register Now</Link>
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