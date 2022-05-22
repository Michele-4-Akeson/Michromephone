/*global chrome*/
import React, { useEffect, useState } from 'react';
import * as BackendAPI from "./APIs/BackendAPI"

const App = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [contact, setContact] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("")
    const [contactList, setContactList] = useState([])
    const [token, setToken] = useState("")
    const [URL, setURL] = useState("")

    useEffect(()=>{
        chrome.runtime.onMessage.addListener(
            function(message, sender, sendResponse) {
                if (sender.tab){
                    console.log("message from a content script:" + sender.tab.url)
                } else {
                    console.log("message from extention")
                }
        
                console.log(message.greeting);
                setURL(message.greeting);
                sendResponse({msg:"hi from chrome tab"})
             
            }
          );

    }, [])


    /*
    useEffect(() => {
        chrome.tabs && chrome.tabs.query({
            active: true,
            currentWindow: true
          }, tabs => {
            console.log(tabs)
          })
    });
    */

    useEffect(()=>{
        console.log(token)
    }, [token])

    async function signIn(){
        const response = await BackendAPI.getToken(username, password)
        if (response != null){
            setToken(response.token)
            const x = await BackendAPI.getContacts(response.token)
            
            if (x != null){
                setContactList([...x.contacts])
            }
        
        }

    }

    async function signUp(){
        const response = await BackendAPI.createProfile(username, password);

        if (response.success){
            BackendAPI.getToken(username, password)
        }
    }

    async function addContact(){
        const response = await BackendAPI.addContactToProfile(token, contact, phoneNumber);

        if (response.success){
            console.log("success")
        }

    }

    async function sendMessage(){
        const response = await BackendAPI.sendTwilioMessage(message, phoneNumber);

    }


    function sendChromeMessage(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
              console.log(response.farewell);
            });
        });
        
    }

    return (
        <div>
            <p>{token}</p>
            <form>
                <label>username</label>
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Add Contact...'/>
                <label>password</label>
                <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Add Phone Number...'/>
                <label>contact name</label>
                <input type="text" value={contact} onChange={(e)=>setContact(e.target.value)} placeholder='Add Contact...'/>
                <label>contact number</label>
                <input type="text" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder='Add Phone Number...'/>
                <label>message</label>
                <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Add Phone Number...'/>
            </form>
            <button onClick={()=>signIn()}>Sign In</button>
            <button onClick={()=>signUp()}>Sign Up</button>
            <button onClick={()=>addContact()}>Add Contact</button>
            <button onClick={()=>sendMessage()}>Send Message</button>
            <button onClick={()=>signIn()}>Get Contacts</button>
            <button onClick={()=>sendChromeMessage()}>Send Chrome Message</button>

            <p>{URL}</p>
            <ul>
                {contactList?.map((person, index) =><li key={index}>{person.contact} {person.phoneNumber}</li>)}
            </ul>
        </div>
    )
}
export default App; 