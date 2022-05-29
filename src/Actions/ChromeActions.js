/*global chrome*/


export function sendChromeMessage(text){
    console.log("Chrome API - record")
    chrome.tabs && chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {text: text})
      });
}