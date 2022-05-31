import React, { useState } from "react";
import Login from "./login";
import Register from "./register";
import "../styles/auth.css";

const Auth = (props) => {
    const [loginShowing, setLoginShowing] = useState(true);

    if (loginShowing) return (
        <div className="auth-page">
            <Login setToken={props.setToken} />
            <p className="auth-redirect">
                Don't have an account? 
                <a className="auth-link" onClick={() => setLoginShowing(false)}>Register</a>
            </p>
        </div>
    )

    return (
        <div className="auth-page">
            <Register setToken={props.setToken} />
            <p className="auth-redirect">
                Already have an account? 
                <a className="auth-link" onClick={() => setLoginShowing(true)}>Log In</a>
            </p>
        </div>
    )
}
export default Auth;