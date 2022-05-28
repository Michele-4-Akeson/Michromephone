/*global chrome*/
import React, { useEffect, useState } from 'react';
import AddContact from './addContact';
import Contacts from "./contacts";
import VoiceRecognition from './voiceRecognition';
import * as BackendActions from "../Actions/BackendActions";
import { sendChromeMessage } from '../Actions/ChromeActions';
import Loader from './Loader';



const Home = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [contactList, setContactList] = useState([]);
    const [addContactVisible, setAddContactVisible] = useState(false);
    const [transcript, setTrascript] = useState("")
    const [port, setPort] = useState(null)
    


    useEffect(() => {

        chrome.runtime.onMessage.addListener(
            function(message, sender, sendResponse) {
               console.log(message)
               setTrascript(message.message)
        });

        setPort(chrome.runtime.connect({ name: "popup" }))


        sendChromeMessage("toggleRecord")
        




        getContacts();

        setIsLoading(false);
    }, []);



   

    async function getContacts(){
        const response = await BackendActions.getContacts(props.token)
        if (response != null){
            setContactList([...response.contacts])
        }
    }

  

    if (isLoading) return <Loader />

    return (
        <div>
            <p>{transcript}</p>
            <button onClick={()=>sendChromeMessage("toggleRecord")}>send chrome Message</button>
            {addContactVisible?

                // Add contact component
                <div>
                    <AddContact 
                        contactList={contactList}
                        setContactList={setContactList}
                        setAddContactVisible={setAddContactVisible}
                        token={props.token} />
                    <button onClick={()=>setAddContactVisible(false)}>Show contacts</button>
                </div>:

                // List of contacts component
                <div>
                    <Contacts
                        contactList={contactList} />
                    <button onClick={()=>setAddContactVisible(true)}>Add Contact</button>
                </div>
            }
        </div>
    )
}


export default Home; 