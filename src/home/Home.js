/*global chrome*/
import React, { useEffect, useState } from 'react';
import AddContact from './addContact';
import Contacts from "./contacts";
import VoiceRecognition from './voiceRecognition';
import * as BackendActions from "../Actions/BackendActions";
import { sendChromeMessage } from '../Actions/ChromeActions';
import Loader from './Loader';



const commandList = ["send", "copy"]

const Home = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [contactList, setContactList] = useState([]);
    const [addContactVisible, setAddContactVisible] = useState(false);
    const [transcript, setTrascript] = useState("")
    const [port, setPort] = useState(null)
    


    useEffect(() => {
        chrome.runtime && chrome.runtime.onMessage.addListener(
            function(message, sender, sendResponse) {
               console.log(message)

               if (message.text == "command"){
                   let x = parseCommand(message.wordList)
                   console.log(x)
                   
               }
        });

        setPort(chrome.runtime && chrome.runtime.connect({ name: "popup" }))

        sendChromeMessage("toggleRecord")
        




        getContacts();

        setIsLoading(false);
    }, []);


    function parseCommand(wordList){
        // we can look at wit.ai API to create more inuitive experience 
        // send: send link to <name>
        // copy: copy from <x> to <y>
        // read: read from <x> to <y>

        let command;
        let commandData;
        for (let commandWord of commandList){
            if (wordList.includes(commandWord)){
                command = commandWord
                break;
            }
        }


        switch(command){
            case "send":
                const toIndex = wordList.lastIndexOf("to")
                if (toIndex != -1 && toIndex < wordList.length - 1){
                    commandData = {command:command, name:wordList[toIndex + 1]}
                    setTrascript("send")
                    return commandData
                }

                break;
            case "copy":
                console.log("copy");
                setTrascript("copy")
                return "copy"
                break;
                
              
              
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
        <div>
            <p>{transcript}</p>
            <button onClick={()=>sendChromeMessage("toggleRecord")}>send chrome Message</button>
            <button onClick={()=>sendPortMessage()}>send chrome Message</button>
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