import React, { useState } from 'react';
import Home from "./home/Home";
import Login from './auth/login';
import { useLocalStorage } from './CustomHooks/UseLocalStorage';

const App = () => {
    const [token, setToken] = useLocalStorage("token", null);

    // If token is found, that means the user is logged in and we can re-direct to the home page
    if (token)
        return <Home token={token}/>

    return <Login setToken={setToken} />
}
export default App;