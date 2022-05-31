import React, { useState } from "react";
import { getToken, createProfile } from "../Actions/BackendActions";

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
            <h1 className='heading_main auth-heading'>Register</h1>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <label className='form-label'>Username</label>
                    <input className='form-input' type="text" name="username" value={state.username} required />
                <label className='form-label'>Password</label>
                    <input className='form-input' type="password" name="password" value={state.password} required />
                <label className='form-label'>Confirm Password</label>
                    <input className='form-input' type="password" name="passwordConfirm" value={state.passwordConfirm} required />
                <input className='btn-primary' type="submit" value="Register" />
            </form>
        </div>
    )
}
export default Auth;