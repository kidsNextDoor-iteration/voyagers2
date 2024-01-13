import React from "react";

const Signin = () => {
    return (
        <div id="signin">
            <div className="form">
                <form action="/signin" method="POST">
                    <input name="email" type="text" placeholder="Email"></input>
                    <input name="password" type="password" placeholder="Password"></input>
                    <input type="submit" value="Login"></input>
                    <a href="/signup">Register Now</a>
                </form>
            </div>
            <div className="image">
            </div>
        </div>
    )
}

export default Signin;