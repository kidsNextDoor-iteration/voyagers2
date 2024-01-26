import React from "react";
import Image from "../stylesheets/images/background-1.jpg"
import newImg from '../Images/pexels-ricky-esquivel-1563256.jpg';
import { useNavigate, Link } from "react-router-dom";


const Signup = () => {
    let navigate = useNavigate();
    async function handleSignup(event) {
        event.preventDefault();
        const firstname = event.target.firstName.value;
        const lastname = event.target.lastName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        try {
            const response = await fetch('/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({firstname, lastname, email, password})
            });
            if (response.redirected) {
                navigate('/signin')
            } else {
                const data = await response.json();
                if (data.err) {
                    alert(data.err)
                }
            }
        } catch {
            alert('Signup failed due to unknown error')
        }
    }
    return (
        <div id="signup">
            <nav>
                <a href="/" className="logo">Voyager</a>
            </nav>
            <div className="content">
                <div className="image">
                    <img src={newImg}></img>
                </div>
                <div className="form">
                    <form onSubmit={handleSignup}>
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