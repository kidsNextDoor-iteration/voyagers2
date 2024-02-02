import React from "react";
import Image from "../stylesheets/images/background-1.jpg"
import { Link, useNavigate } from 'react-router-dom';
import image2 from '../Images/pexels-cottonbro-studio-2773494.jpg';
import image3 from '../Images/couple-img3.png';

import '@passageidentity/passage-elements/passage-auth'
<script src="https://psg.so/web.js"></script>

const Signin = () => {
let navigate = useNavigate();

    return (
        <div id="signin">
            <nav>
                <a href="/" className="logo">Voyager</a>
            </nav>
            <div className="content">
                <div className="form">
                    <form>
                        <div className="OAuthButton">
                            <passage-auth app-id="6bBLeyUAcY4LsweHqYPF1gOB"></passage-auth>
                        </div>
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