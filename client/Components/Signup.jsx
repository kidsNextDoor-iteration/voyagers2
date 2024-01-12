import React from "react";

const Signup = () => {
    return (
<<<<<<< HEAD
        <div className="signup-container">
            <form action="/signup" method="POST">
=======
        <div>
            <form action="/signup" method="POST">
                <input name="firstName" type="text" placeholder="First Name"></input>
                <input name="lastName" type="text" placeholder="Last Name"></input>
>>>>>>> dev
                <input name="email" type="text" placeholder="Email"></input>
                <input name="password" type="password" placeholder="Password"></input>
                <input type="submit" value="Signup"></input>
            </form>
<<<<<<< HEAD
=======
            <a href="/signin">Already have an account? Login here</a>
>>>>>>> dev
        </div>
    )
}

export default Signup;