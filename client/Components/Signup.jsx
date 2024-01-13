import React from "react";

const Signup = () => {
    return (
        <div id="signup">
            <div className="image">
            </div>
            <div className="form">
                <form action="/signup" method="POST">
                    <input name="firstName" type="text" placeholder="First Name"></input>
                    <input name="lastName" type="text" placeholder="Last Name"></input>
                    <input name="email" type="text" placeholder="Email"></input>
                    <input name="password" type="password" placeholder="Password"></input>
                    <input type="submit" value="Signup"></input>
                    <a href="/signin">Already have an account? Login here</a>
                </form>
            </div>
        </div>
    )
}

export default Signup;