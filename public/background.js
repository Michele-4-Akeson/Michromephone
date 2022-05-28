

/*
Purpose
    the background.js file is run as a service worker for the chrome extention and
    continues to run even when the popup isn't open:

    This could be a functionally important script as it may allow us to 
    execute commands such as sending data to a user even when the popup is 
    closed - just depends on if that's how we want to structure the project

    - would require use of local/chrome storage to access contacts of the user
    - would make calls to twilio API to send message to a desired user
    - would parse voice command to desired command and initate it

    => the popup frontend would be used for:
        -signIn/SignUp
        -adding contacts
        -displaying voice command (when open)
        -allowing for manual/non-voice ability to send users data
*/


console.log("Background.js running..");


let tabId = null;

chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "popup") {
        port.onDisconnect.addListener(function() {
           console.log("popup has been closed")
           sendChromeMessage("stopRecording")
        });
    }
});




function sendChromeMessage(text){
    try {
        console.log("Message sent by background")
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {text: text})
          });

    } catch (error) {
        console.log(error)

    }
    
}


chrome.tabs.onActivated.addListener(()=>{
    if (tabId){
        chrome.tabs.sendMessage(tabId, {text:"stopRecording"})
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        tabId = tabs[0].id
      });
})


/*

// activates recording when navigation to new tab


chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse){
        console.log("message recived", message)
        if (message.text == "tab changed"){
            sendChromeMessage("startRecording")
        }
    }
)
*/



