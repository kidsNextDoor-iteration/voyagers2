import React from "react";

const Signup = () => {
    return (
        <div>
            <form action="/signup" method="POST">
                <input name="firstName" type="text" placeholder="First Name"></input>
                <input name="lastName" type="text" placeholder="Last Name"></input>
                <input name="email" type="text" placeholder="Email"></input>
                <input name="password" type="password" placeholder="Password"></input>
                <input type="submit" value="Signup"></input>
            </form>
            <a href="/signin">Already have an account? Login here</a>
        </div>
    )
}

export default Signup;