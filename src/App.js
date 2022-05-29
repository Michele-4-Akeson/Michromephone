/*global chrome*/

import React, { useState } from 'react';
import Home from "./home/Home";
import Auth from './auth/auth';
import { useLocalStorage } from './CustomHooks/UseLocalStorage';

const App = () => {
    const [token, setToken] = useLocalStorage("token", null);
    const [search, setSearch] = useState("")
    const [response, setResponse] = useState("")

    // If token is found, that means the user is logged in and we can re-direct to the home page

    
   
    if (token)
        return <Home token={token} />

    return <Auth setToken={setToken} />
}
export default App;