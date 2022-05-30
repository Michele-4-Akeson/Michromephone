/*global chrome*/
import React, { useEffect, useState } from 'react';
import AddContact from './addContact';
import Contacts from "./contacts";
import * as BackendActions from "../Actions/BackendActions";
import { sendChromeMessage } from '../Actions/ChromeActions';
import Loader from './Loader';
import '../styles/home.css';
import '../styles/contacts.css';
import '../styles/elements.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const commandList = ["send", "copy"]

const Home = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [contactList, setContactList] = useState([]);
    const [addContactVisible, setAddContactVisible] = useState(true);
    const [transcript, setTrascript] = useState("")
    const [port, setPort] = useState(null)
    


    useEffect(() => {
        setPort(chrome.runtime && chrome.runtime.connect({ name: "popup" }))
        sendChromeMessage("toggleRecord")


        chrome.runtime && chrome.runtime.onMessage.addListener(
            function(message, sender, sendResponse) {
               if (message.text == "command"){
                   let parsedCommand = parseCommand(message.wordList)
                   console.log("parsed command", parsedCommand)
                   
               }


               if (message.text == "transcript"){
                   setTrascript(message.transcript)
               }
        });

        
        




        getContacts();

        setIsLoading(false);
    }, []);


    function parseCommand(wordList){
        // we can look at wit.ai API to create more inuitive experience 
        // send: send link to <name>
        // copy: copy from <x> to <y>
        // read: read from <x> to <y>



        let command;
        let toIndex;
        let fromIndex;
        let what;

        for (let commandWord of commandList){
            if (wordList.includes(commandWord)){
                command = commandWord
                break;
            }
        }


        try {
            switch(command){
                case "send":
                    toIndex = wordList.lastIndexOf("to")
                    what = wordList[toIndex - 1];
                    return {command:command, what:what, to:wordList[toIndex + 1]}
                
                case "copy":
                    fromIndex = wordList.indexOf("from")
                    toIndex = wordList.lastIndexOf("to")
                    return {command:command, from:wordList[fromIndex + 1], to:wordList[toIndex + 1]}
            }

        } catch (error){
            console.log("could not parse", error)
        }
      

    }

   

    async function getContacts(){
        const response = await BackendActions.getContacts(props.token)
        if (response != null){
            setContactList([...response.contacts])
        }
    }

    function sendPortMessage(){
        port.postMessage({text:"hello from port"})
    }

  

    if (isLoading) return <Loader />

    return (
        <div className='home'>
            <p>{transcript}</p>
            <button onClick={()=>sendChromeMessage("toggleRecord")}>send chrome Message</button>
            <button onClick={()=>sendPortMessage()}>send chrome Message</button>
            {addContactVisible?

                // Add contact component
                <div className='add-contacts'>
                    <a  className = "back-button"
                        onClick={()=>setAddContactVisible(false)}>
                        <span className='back-arrow'>
                            <ArrowBackIosIcon fontSize="inherit" />
                        </span>
                        <p>Go back</p>
                    </a>
                    <AddContact 
                        contactList={contactList}
                        setContactList={setContactList}
                        setAddContactVisible={setAddContactVisible}
                        token={props.token} />
                </div>:

                // List of contacts component
                <div className='contacts'>
                    <div className='contacts-header'>
                        <h1 className='heading_main'>My Contacts</h1>
                        <button 
                            className='btn-primary add-contact-button'
                            onClick={()=>setAddContactVisible(true)}>
                            <span className='plus'>&#43;</span>
                            <p>Add Contact</p>
                        </button>
                    </div>
                    <p className='contacts-header-text-sub'>There are {contactList.length} total contacts.</p>
                    <Contacts
                        contactList={contactList} />
                </div>
            }
        </div>
    )
}


export default Home; 