/*global chrome*/
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faDiscord } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhoneSquareAlt } from '@fortawesome/free-solid-svg-icons'
import { sendChromeMessage, parseCommand, getLink } from '../Actions/ChromeActions';
import * as BackendActions from "../Actions/BackendActions";
import { ContactInfo } from './ContactInfo';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Contacts = (props) => {
   
    useEffect(()=>{
        chrome.runtime && chrome.runtime.onMessage.addListener(
            async function(message, sender, sendResponse) {
                switch (message.text){
                    case "command":
                        let parsedCommand = parseCommand(message.wordList)
                        console.log("parsed command", parsedCommand);


                        if (parsedCommand.command == "send"){
                            getContactByName(parseCommand.to)

                            /*
                            chrome.tabs && chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                                BackendActions.sendDiscordMessage("hippo_yekim#9461", tabs[0].url)
                                BackendActions.sendEmail("akesonm@mcmaster.ca", "yekim", tabs[0].url)
                            });
                            */
                            
                            //BackendActions.sendDiscordMessage("hippo_yekim#9461", link)

                            /*
                            let contact = getContactByName(parseCommand.to)
                            if (contact){
                                switch (parseCommand.target.toLowerCase()){
                                    case "discord":
                                        switch(parsedCommand.what){
                                            case "link":
                                                console.log("send discord message, to", contact)
                                                BackendActions.sendDiscordMessage(contact.discord, getLink())
                                                break;
                                            case "clipboard":
                                                const text = await navigator.clipboard.readText();
                                                BackendActions.sendDiscordMessage(contact.discord, text);
                                                break;
                                        }
                                        
                                        break;
                                    case "email":
                                        case "link":
                                            break;
                                        case "clipboard":
                                            break;
                                    case "phone":
                                        break;
                                }

                            }
                            */
                          

                        }

                        break;
                }
            });
           
    }, [])




    function getContactByName(name){
        // props.contactList = []
        console.log(props)
        for (let contact of props.contactList){
            console.log(contact)
            if (contact.contact.toLowerCase() == name.toLowerCase()){
                console.log("contact found", contact)
                return contact
            }
        }
    }




   


    
    return (
        <div className='contacts-list'>
            <ul>
                {props.contactList?.map((person, index) => {
                    return (
                        <li onClick={()=>props.openContactInfo(person)}
                            key={index}
                            className="contacts-list-item">
                            <p className='contact-name'>{person.name}</p>
                            {person.phoneNumber != ""? <FontAwesomeIcon className='contact-icon' icon={faPhoneSquareAlt}/>:<></>}
                            {person.email != ""? <FontAwesomeIcon className='contact-icon' icon={faEnvelope}/>:<></>}
                            {person.discord != ""? <FontAwesomeIcon className='contact-icon' icon={faDiscord} />:<></>}
                        
                        </li>)
                })}
            </ul>
        </div>
    )
}
export default Contacts;