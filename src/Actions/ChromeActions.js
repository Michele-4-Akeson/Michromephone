/*global chrome*/


export function sendChromeMessage(message){
    console.log("Chrome API - record")
    chrome.tabs && chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message)
      });
}