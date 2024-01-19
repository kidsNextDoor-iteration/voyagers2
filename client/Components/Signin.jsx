import React from "react";
import Image from "../stylesheets/images/background-1.jpg"
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
    let navigate = useNavigate();
    const handleSubmit = async event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        try {
            const response = await fetch('/signin', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password})
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
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <input name="email" type="text" placeholder="Email"></input>
                        <input name="password" type="password" placeholder="Password"></input>
                        <input type="submit" value="Login"></input>
                        <Link to="/signup">Register Now</Link>
                    </form>
                </div>
                <div className="image">
                    <img src={Image}></img>
                </div>
            </div>
        </div>
    )
}

export default Signin;