/*global chrome*/
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faDiscord } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhoneSquareAlt } from '@fortawesome/free-solid-svg-icons'
import { sendChromeMessage, parseCommand} from '../Actions/ChromeActions';
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
                            const contact = getContactByName(parsedCommand.to)

        
                            if (contact){
                                switch (parsedCommand.target.toLowerCase()){
                                    case "discord":
                                        if (contact.discord != ""){
                                            switch(parsedCommand.what){
                                                case "link":
                                                    chrome.tabs && chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                                                       BackendActions.sendDiscordMessage(contact.discord, tabs[0].url)  
                                                    });
                                                    break;
                                                case "clipboard":
                                                    chrome.storage.sync.get(['clipboard'], function(result) {
                                                        console.log('Value currently is ', result.clipboard);
                                                        BackendActions.sendDiscordMessage(contact.discord, result.clipboard);
                                                      });
                                                   
                                                    
                                                    break;
                                            }

                                        }
                                       
                                        break;
                                    case "email":
                                        if (contact.email != ""){
                                            switch(parsedCommand.what){
                                                case "link":
                                                    chrome.tabs && chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                                                       BackendActions.sendEmail(contact.email, tabs[0].url)  
                                                    });
                                                    break;
                                                case "clipboard":
                                                    chrome.storage.sync.get(['clipboard'], function(result) {
                                                        console.log('Value currently is ', result.clipboard);
                                                        BackendActions.sendEmail(contact.email, result.clipboard);
                                                      });
                                                    break;
                                            }
                                        }
                                        break;
                                        
                                    
                                }

                            }
                            
                            
                          

                        }


                        break;
                }
            });
           
    }, [])




    function getContactByName(name){
        for (let contact of props.contactList){
            if (contact.name.toLowerCase() == name.toLowerCase()){
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