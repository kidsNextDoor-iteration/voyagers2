import React from "react";
import Image from "../stylesheets/images/background-1.jpg"
import { Link, useNavigate } from 'react-router-dom';
import image2 from '../Images/pexels-cottonbro-studio-2773494.jpg';
import image3 from '../Images/couple-img3.png';
import googleAuthLink from './Utilities/getGoogleOAuthURL.jsx'
import googleImg from '../Images/google.png'

import '@passageidentity/passage-elements/passage-auth'
<script src="https://psg.so/web.js"></script>

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

                <div className="form">
                    <form onSubmit={handleSubmit}>

        <div className="OAuthButton">
            <passage-auth app-id="6bBLeyUAcY4LsweHqYPF1gOB"></passage-auth>
        </div>


                        {/* <a href={googleAuthLink()}>Login with Google</a> */}
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