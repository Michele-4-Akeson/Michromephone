import React, { useEffect, useState } from "react";

const VoiceRecognition = (props) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const mic = new SpeechRecognition()

    mic.continous = true
    mic.intermResults = true
    mic.lang = 'en-US'

    const [isListening, setIsListening] = useState(false);
    const [note, setNotes] = useState();

    const listen = () => {
        setIsListening(!isListening)

        if (!isListening) {
            console.log("starting...")
            mic.start();
        } else {
            mic.stop();
        }
    }

    // const grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
    
    // const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
    // const speechRecognitionList = new SpeechGrammarList();
    // speechRecognitionList.addFromString(grammar, 1);
    // mic.grammars = speechRecognitionList;

    mic.onresult = (e) => {
        console.log("ending")
        console.log(e.results[0][0].transcript);
    }

    return (
        <div>
            <button onClick={() => listen()}>{
                isListening? "Turn off" : "Turn on"
            }</button>
        </div>
    )
} 
export default VoiceRecognition;