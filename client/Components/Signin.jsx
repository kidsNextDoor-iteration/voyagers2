import React from "react";
import Navbar from "./Navbar.jsx";

const Signin = () => {
    return (
        <div>
        <Navbar />
          <div>
            <form action="/signin" method="POST">
                <input name="email" type="text" placeholder="Email"></input>
                <input name="password" type="password" placeholder="Password"></input>
                <input type="submit" value="Login"></input>
            </form>
            <a href="/signup">Register Now</a>
        </div>
      </div>
    )
}

export default Signin;