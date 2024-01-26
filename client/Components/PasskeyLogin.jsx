import React from "react";
import '@passageidentity/passage-elements/passage-auth'
<script src="https://psg.so/web.js"></script>


const Login = () => {
    return (
        <>
        <div className="login-container">
            <form action="/login" method="POST">
                <input name="email" type="text" placeholder="Email"></input>
                <input name="password" type="password" placeholder="Password"></input>
                <input type="submit" value="Login"></input>
            </form>
            <a href="/signup">Register Now</a>
        </div>
        <div className="login-container">
            <passage-auth app-id='6bBLeyUAcY4LsweHqYPF1gOB'></passage-auth>
        </div>
        </>
    )
}

export default Login;