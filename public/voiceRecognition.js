
console.log("voiceRecognition.js running...")




const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continous = true
mic.intermResults = true
mic.lang = 'en-US'
let isListening = false
let transcript = ""
let lastWord = ""


mic.onstart = () => {
    console.log("Mic's on");
}

mic.onend = () => {
    if (isListening) {
        mic.start();
    } 
}

mic.onresult = (e) => {
    lastWord = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')
    
    if (transcript.length == 0){
        transcript += lastWord
    } else {
        transcript += " " + lastWord
    }
    
    console.log(transcript);
    const transcriptList = transcript.toLocaleLowerCase().split(" ");

    if (transcriptList.length >= 4){
        chrome.runtime.sendMessage({wordList:transcriptList, text: "command"})
        chrome.runtime.sendMessage({text: "transcript", transcript:transcript})
        transcript = "";
       
    }
   
   

}

mic.onerror = event => {
    console.log(event.error)
}




chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        console.log(message)
        switch (message.text){
            case "toggleRecord":
                toggleRecord()
                break
            case "startRecording":
                startRecording()
                break
            case "stopRecording":
                stopRecording();
                break
        }
       
       
});



function toggleRecord(){
    if (isListening) {
       stopRecording();
        
    } else {
        startRecording();   
    }

}



function startRecording(){
    console.log("recording starting...")
    isListening = true
    mic.start()

}



function stopRecording(){
    console.log("stopped recording")
    isListening = false
    mic.stop();
}



