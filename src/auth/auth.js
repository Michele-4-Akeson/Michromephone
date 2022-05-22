import React, { useState } from "react";
import Login from "./login";
import Register from "./register";

const Auth = (props) => {
    const [loginShowing, setLoginShowing] = useState(true);

    if (loginShowing) return (
        <div>
            <Login setToken={props.setToken} />
            <p>Don't have an account? <a onClick={() => setLoginShowing(false)}>Register</a></p>
        </div>
    )

    return (
        <div>
            <Register setToken={props.setToken} />
            <p>Already have an account? <a onClick={() => setLoginShowing(true)}>Log In</a></p>
        </div>
    )
}
export default Auth;