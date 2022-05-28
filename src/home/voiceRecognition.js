import React, { useEffect, useState } from "react";

const VoiceRecognition = (props) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const mic = new SpeechRecognition()

    mic.continous = true
    mic.intermResults = true
    mic.lang = 'en-US'

    const [isListening, setIsListening] = useState(false);
    const [note, setNotes] = useState();

    useEffect(() => {
        listen();
    }, [isListening])

    const listen = () => {
        if (isListening) {
            console.log("starting...")
            mic.start();
        } else {
            console.log("stopped")
            mic.stop();
        }

        mic.onstart = () => {
            console.log("Mic's on");
        }

        mic.onend = () => {
            if (isListening) {
                mic.start();
            }
        }

        mic.onresult = (e) => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
            
            console.log(transcript);
        }

        mic.onerror = event => {
            console.log(event.error)
        }
    }

    return (
        <div>
            <button onClick={() => setIsListening(!isListening)}>{
                isListening? "Turn off" : "Turn on"
            }</button>
        </div>
    )
} 
export default VoiceRecognition;