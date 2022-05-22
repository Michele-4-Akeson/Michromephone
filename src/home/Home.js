/*global chrome*/
import React, { useEffect, useState } from 'react';
import AddContact from './addContact';
import Contacts from "./contacts";
import VoiceRecognition from './voiceRecognition';
import * as BackendActions from "../APIs/BackendAPI";

const Home = (props) => {
    const [contactList, setContactList] = useState([]);
    const [addContactVisible, setAddContactVisible] = useState(false);

    useEffect(() => {

        // Get current tab information
        chrome.tabs && chrome.tabs.query({
            active: true,
            currentWindow: true
          }, tabs => {
            console.log(tabs)
          })

        // Get all contacts from database
        getContacts();
    }, []);

    async function getContacts(){
        // const response = await BackendActions.getContacts(username, password)
        // if (response != null){
        //     setContactList([...response.contacts])
        // }
    }

    async function sendMessage(){
        //const response = await BackendActions.sendMessage(message, phoneNumber);
    }

    return (
        <div>
            <VoiceRecognition />
            {addContactVisible?
                // Add contact component
                <div>
                    <AddContact 
                        contactList={contactList}
                        setContactList={setContactList}
                        setAddContactVisible={setAddContactVisible} />
                    <button onClick={()=>setAddContactVisible(false)}>Show contacts</button>
                </div>:

                // List of contacts component
                <div>
                    <Contacts
                        contactList={contactList} />
                    <button onClick={()=>setAddContactVisible(true)}>Add Contact</button>
                    <button onClick={()=>sendMessage()}>Send Message</button>
                </div>
            }
        </div>
    )
}
export default Home; 