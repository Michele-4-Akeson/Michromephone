import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faNoteSticky, faBookReader, faShare, faClipboard, faMicrophoneLines } from '@fortawesome/free-solid-svg-icons'
import { CommandInfo } from './CommandInfo'
export const CommandsPage = () => {
  return (
      <div>
        <div className='user-container'>
                <div className='user-background'>
                    <FontAwesomeIcon className='user-icon' icon={faList}/>
                </div>
                
                <h2>Voice Commands</h2>
        </div>

        <h4>send link:</h4>
        <CommandInfo 
            command={"send link to <contact> <contact option>"}
            description={"sends the link of the open tab to the specified contact via the contact option (one of: discord, email)"}
            icon={faShare}
        />


        <h4>send clipboard:</h4>
        <CommandInfo 
            command={"send clipboard to <contact> <contact option>"}
            description={"sends the text stored in your clipboard to the specified contact via the contact option (one of: discord, email)"}
            icon={faClipboard}
        />

        <h4>copy:</h4>
        <CommandInfo 
            command={"copy from <x> to <y>"}
            description={"copies words from a paragraph on a website staring from word x, and ending at word y"}
            icon={faNoteSticky}
        />

        <h4>read:</h4>
        <CommandInfo 
            command={"read from <x> to <y>"}
            description={"reads words from a paragraph on a website starting from word x, and ending at word y"}
            icon={faBookReader}
        />

        <h4>say:</h4>
        <CommandInfo 
            command={"say ..."}
            description={"stores all words spoken after 'say' into your clipboard. This data can now be sent to contacts via the send clipboard commands as a message"}
            icon={faMicrophoneLines}
        />
       

        

      
      </div>
    
  )
}
