/*global chrome*/
import React, { useEffect, useState } from 'react';
import AddContact from './addContact';
import Contacts from "./contacts";
import { Mic } from './Mic';
import * as BackendActions from "../Actions/BackendActions";
import { sendChromeMessage } from '../Actions/ChromeActions';
import Loader from './Loader';
import '../styles/home.css';
import '../styles/contacts.css';
import '../styles/elements.css';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { motion, AnimatePresence } from "framer-motion"


const commandList = ["send", "copy"]

const Home = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [contactList, setContactList] = useState([]);
    const [addContactVisible, setAddContactVisible] = useState(false);
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

    // const contactList_anim = useAnimation()
    // const addContact_anim = useAnimation()

    // const loadAddContactsComp = async () => {
    //     await contactList_anim.start({
    //         x: "-100%",
    //         opacity: ["1", "0"],
    //         transition: { duration: 1 },
    //         })
    //     await addContact_anim.start({ opacity: 1 })
    //     setAddContactVisible(true)
    // }

    // const loadContactsListcomp = async () => {
    //     await addContact_anim.start({
    //         x: "100%",
    //         opacity: ["1", "0"],
    //         transition: { duration: 1 },
    //         })
    //     setAddContactVisible(false)
    // }

    if (isLoading) return <Loader />

    return (
        <div className='home'>
            {/* <p>{transcript}</p> */}
            {/* <button onClick={()=>sendChromeMessage("toggleRecord")}>send chrome Message</button>
            <button onClick={()=>sendPortMessage()}>send chrome Message</button> */}
            
            <AnimatePresence exitBeforeEnter>
                {/* Add contact component */}
                {addContactVisible &&
                    <motion.div 
                        className='add-contacts'
                        key='add-contacts'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: 200, transition: { duration: 0.5 } }}
                        transition={{ duration: 1 }}>
                        <a  className = "back-button"
                            onClick={()=>setAddContactVisible(false)}>
                            <span className='back-arrow'>
                                <ArrowBackIosIcon fontSize="inherit" />
                            </span>
                            <p className='go-back-text'>Go back</p>
                        </a>
                        <AddContact 
                            contactList={contactList}
                            setContactList={setContactList}
                            setAddContactVisible={setAddContactVisible}
                            token={props.token} />
                    </motion.div>}
            
                {/* Add contact component */}
                {!addContactVisible &&
                    <motion.div 
                        className='contacts' 
                        key="conacts"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -200, transition: { duration: 0.5 } }}
                        transition={{ duration: 1 }}>
                        
                        <Mic transcript={transcript}/>
                        
                        <div className='contacts-header'>
                            <h1 className='heading_main contacts-header-h1'>My Contacts</h1>
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
                    </motion.div>}
            </AnimatePresence>
        </div>
    )
}


export default Home; 