
console.log("contentTest.js running...")
//chrome.runtime.sendMessage({text:"tab changed"})

chrome.runtime.onConnect.addListener(()=>{
    console.log("connected")
})

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continous = true
mic.intermResults = true
mic.lang = 'en-US'
let isListening = false
let transcript = ""


mic.onstart = () => {
    console.log("Mic's on");
}

mic.onend = () => {
    if (isListening) {
        mic.start();
    } 
}

mic.onresult = (e) => {
    transcript += " " + Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
    
    console.log(transcript);
    const transcriptList = transcript.split(" ");

    if (transcriptList.length >= 5){
        transcript = "";
        chrome.runtime.sendMessage({wordList:transcriptList, text: "command"})
    }
   
   

}

mic.onerror = event => {
    console.log(event.error)
}





        

   

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        console.log(message)
        if (message.text == "toggleRecord"){
            toggleRecord()
        }

        if (message.text == "startRecording"){
            startRecording();
        }

        if (message.text == "stopRecording"){
            stopRecording();
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
