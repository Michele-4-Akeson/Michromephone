/*global chrome*/

import React, { useState } from 'react';
import Home from "./home/Home";
import Login from './auth/login';
import { useLocalStorage } from './CustomHooks/UseLocalStorage';

const App = () => {
    const [token, setToken] = useLocalStorage("token", null);
    const [search, setSearch] = useState("")
    const [response, setResponse] = useState("")

    function find(e){
        e.preventDefault();
        console.log("Search");
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
              console.log(response.farewell);
              setResponse(response.farewell)
            });
          });

    }

    // If token is found, that means the user is logged in and we can re-direct to the home page
   
    if (token)
        return <Home token={token}/>

    return (
    <div>
        <h1>{response}</h1>
        
        <form onSubmit={(e)=>find(e)}>
            <input type="text" onChange={(e)=>{setSearch(e.target.value)}}/>
        </form>

        <button onClick={(e)=>find(e)}>x</button>
    </div>
       
   )
}
export default App;