import React from "react";

const Signup = () => {
    return (
        <div>
            <form action="/signup" method="POST">
                <input name="email" type="text" placeholder="Email"></input>
                <input name="password" type="password" placeholder="Password"></input>
                <input type="submit" value="Signup"></input>
            </form>
        </div>
    )
}

export default Signup;