import React, { useState } from 'react';
import { getToken } from '../APIs/BackendAPI';

const Login = (props) => {
    const [state, setState] = useState({"username": "", "password": ""});

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Call login api to get user token
        const token = await getToken(state.username, state.password);
        console.log(token);
    }

    return (
        <div>
            <h1>Log In</h1>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <label>Username</label>
                    <input type="text" name="username" value={state.username} /><br />
                <label>Password</label>
                    <input type="password" name="password" value={state.password} /><br />
                <input type="submit" value="Log in" />
            </form>
        </div>
    )
}
export default Login;