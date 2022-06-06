import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faDiscord } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhoneSquareAlt } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { SendForm } from './SendForm'
import { sendDiscordMessage, sendEmail } from '../Actions/BackendActions'

export const ContactInfo = ({contact}) => {

  return (
    <div>
        <div className='user-container'>
            <div className='user-background'>
                <FontAwesomeIcon className='user-icon' icon={faUser}/>
            </div>
          
            <h2 className=''>{contact.name}</h2>
        </div>
       
        
        <SendForm value={contact.phoneNumber} icon={faPhoneSquareAlt}/>
        <SendForm value={contact.email} icon={faEnvelope} sender={sendEmail}/>
        <SendForm value={contact.discord} icon={faDiscord} sender={sendDiscordMessage}/>

    </div>
  )
}
