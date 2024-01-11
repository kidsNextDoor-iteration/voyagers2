import React from "react";

const Login = () => {
    return (
        <div className="login-container">
            <form action="/login" method="POST">
                <input name="email" type="text" placeholder="Email"></input>
                <input name="password" type="password" placeholder="Password"></input>
                <input type="submit" value="Login"></input>
            </form>
            <a href="/signup">Register Now</a>
        </div>
    )
}

export default Login;