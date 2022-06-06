import React, { useState } from 'react'
import "../styles/mic.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'

export const Mic = ({transcript, isRecording, toggleRecord}) => {


    

  return (
    <div className='mic-container'>
        <div className={isRecording? "mic-background pulse" : "mic-background"} onClick={()=>toggleRecord()}>
            <FontAwesomeIcon className={isRecording? "mic-icon white": "mic-icon"} icon={faMicrophone}/>
        </div>

        <p>{transcript}</p>
    </div>
  )
}
