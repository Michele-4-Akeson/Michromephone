import React, { useState } from "react";
import { getToken, createProfile } from "../APIs/BackendAPI";

const Auth = (props) => {
    const [state, setState] = useState({"username": "", "password": "", "passwordConfirm": ""});

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (state.password !== state.passwordConfirm) {
            alert("Passwords don't match")
            return
        }

        // Create profile
        await createProfile(state.username, state.password);

        // Log profile in
        const userData = await getToken(state.username, state.password);
        if (userData) {
            // Put token in local storage
            props.setToken(userData.token);
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <label>Username</label>
                    <input type="text" name="username" value={state.username} /><br />
                <label>Password</label>
                    <input type="password" name="password" value={state.password} /><br />
                <label>Confirm Password</label>
                    <input type="password" name="passwordConfirm" value={state.passwordConfirm} /><br />
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}
export default Auth;