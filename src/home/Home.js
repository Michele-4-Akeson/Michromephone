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
import '../styles/contactInfo.css';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { motion, AnimatePresence } from "framer-motion"
import { ContactInfo } from './ContactInfo';




const Home = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [contactList, setContactList] = useState([]);
    const [addContactVisible, setAddContactVisible] = useState(false);
    const [contactVisible, setContactVisible] = useState(true);
    const [contactInfoVisible, setContactInforVisible] = useState(false)
    const [contactInfo, setContactInfo] = useState(null);
    const [isRecording, setIsRecording] = useState(true);
    const [transcript, setTrascript] = useState("")
    const [port, setPort] = useState(null)
    


    useEffect(() => {
        setPort(chrome.runtime && chrome.runtime.connect({ name: "popup" }))
        sendChromeMessage({text:"toggleRecord"})
        getContacts();

        chrome.runtime && chrome.runtime.onMessage.addListener(
            function(message, sender, sendResponse) {
                switch (message.text){
                    case "transcript":
                        setTrascript(message.transcript)
                        break;
                }
           
        });

        setIsLoading(false);


    }, []);


    function toggleRecord(){
        sendChromeMessage({text:"toggleRecord"})
        setIsRecording(!isRecording)
    }



   

    async function getContacts(){
        const response = await BackendActions.getContacts(props.token)
        if (response != null){
            setContactList([...response.contacts])
        }
    }

    function togglePage(page){
        setContactVisible(false)
        setContactInforVisible(false)
        setAddContactVisible(false)
        switch(page){
            case "addContact":
                setAddContactVisible(true)
                break;

            case "contacts":
                setContactVisible(true)
                break;

            case "contactInfo":
                setContactInforVisible(true)
                break;
        }
                
    }


    function openContactInfo(person){
        setContactInfo(person)
        togglePage("contactInfo")
    }


    if (isLoading) return <Loader />

    return (
        <div className='home'>
            
            <br/>
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
                            onClick={()=>togglePage("contacts")}>
                            <span className='back-arrow'>
                                <ArrowBackIosIcon fontSize="inherit" />
                            </span>
                            <p className='go-back-text'>Go back</p>
                        </a>
                        <AddContact 
                            contactList={contactList}
                            setContactList={setContactList}
                            togglePage={togglePage}
                            token={props.token} />
                    </motion.div>}
            
                {/* Add contact component */}
                {contactVisible &&
                    <motion.div 
                        className='contacts' 
                        key="contacts"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -200, transition: { duration: 0.5 } }}
                        transition={{ duration: 1 }}>
                        <a  className = "back-button"
                            onClick={()=>props.signOut()}>
                            <span className='back-arrow'>
                                <ArrowBackIosIcon fontSize="inherit" />
                            </span>
                            <p className='go-back-text'>sign out</p>
                            </a>
                        <Mic transcript={transcript} toggleRecord={toggleRecord} isRecording={isRecording}/>
                        
                        <div className='contacts-header'>
                            <h1 className='heading_main contacts-header-h1'>My Contacts</h1>
                            <button 
                                className='btn-primary add-contact-button'
                                onClick={()=>togglePage("addContact")}>
                                <span className='plus'>&#43;</span>
                                <p>Add Contact</p>
                            </button>
                        </div>
                        <p className='contacts-header-text-sub'>There are {contactList.length} total contacts.</p>
                        <Contacts 
                            contactList={contactList} openContactInfo={openContactInfo} />
                    </motion.div>}


                 {/* Add contact component */}
                 {contactInfoVisible &&
                    <motion.div 
                        className='contacts' 
                        key="contactInfo"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -200, transition: { duration: 0.5 } }}
                        transition={{ duration: 1 }}>
                        <a  className = "back-button"
                            onClick={()=>togglePage("contacts")}>
                            <span className='back-arrow'>
                                <ArrowBackIosIcon fontSize="inherit" />
                            </span>
                            <p className='go-back-text'>Go back</p>
                        </a>
                        <ContactInfo contact={contactInfo}/>
                    </motion.div>}
            </AnimatePresence>
        </div>
    )
}

export default Home; 