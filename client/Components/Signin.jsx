import React from "react";
import Image from "../stylesheets/images/background-1.jpg"
import { Link, useNavigate } from 'react-router-dom';
import image2 from '../Images/pexels-cottonbro-studio-2773494.jpg';
import image3 from '../Images/couple-img3.png';
import googleAuthLink from './Utilities/getGoogleOAuthURL.jsx'
import googleImg from '../Images/google.png'
import passkeyImg from '../Images/passkey.png'
// import { useEffect, useRef } from "react";


import '@passageidentity/passage-elements/passage-auth'
<script src="https://psg.so/web.js"></script>
// import facebookImg from '../Images/facebook.png'
import facebookImg from '../Images/facebooklogo.png'

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
            // if (response.redirected) {
            //     navigate('/trips')
            // } else {
            //     if (!response.ok) alert('Invalid login credentials');
            // }
            if (!response.ok) alert('Invalid login credentials');
            else navigate('/');
        } catch {
            alert('Signin failed due to unknown error')
        }
    }
    return (
        <div id="signin">
            <nav>
                <a href="/" className="logo">Voyager<a id='capitalS'>S</a></a>
            </nav>
            <div className="content">
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <input name="email" type="text" placeholder="Email"></input>
                        <input name="password" type="password" placeholder="Password"></input>
                        <input type="submit" value="Login"></input>
                        <Link to="/internal/signup">Register Now</Link>


                        <div className='OAuthButtonSection'>
                            <div className="OAuthButton"><a href={googleAuthLink()}>
                                <img src={googleImg}></img>
                                <div>Login with Google</div>
                            </a>
                            </div>
                            <div className="OAuthButton"><a href={'http://localhost:8080/facebook/login'}>
                                <img src={facebookImg}></img>
                                <div>Login with Facebook</div>
                            </a>
                            </div>

                            <div className="OAuthButton"><Link to="/internal/signin/passkey">
                                <img src={passkeyImg} width="40" height="40"></img>
                                <div>Login with Passkey</div>
                            </Link>
                            </div>
                        </div>







                        {/* <div className="FBOAuthButton"><a href={'http://localhost:8080/facebook/login'}>
                            <img src={facebookImg}></img>
                        </a>
                        </div> */}
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