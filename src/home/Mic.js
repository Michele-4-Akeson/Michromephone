import React, { useState } from 'react'
import "../styles/mic.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { sendChromeMessage } from '../Actions/ChromeActions';
export const Mic = ({transcript}) => {
    const [isRecording, setIsRecording] = useState(true);


    function toggleRecord(){
        sendChromeMessage("toggleRecord")
        setIsRecording(!isRecording)
    }

  return (
    <div className='mic-container'>
        <div className={isRecording? "mic-background pulse" : "mic-background"} onClick={()=>toggleRecord()}>
            <FontAwesomeIcon className={isRecording? "mic-icon white": "mic-icon"} icon={faMicrophone}/>
        </div>

        <p>{transcript}</p>
    </div>
  )
}
