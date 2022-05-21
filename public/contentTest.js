chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        if (sender.tab){
            console.log("message from a content script:" + sender.tab.url)
        } else {
            console.log("message from extention")
        }

        if (message.greeting == "hello"){
            sendResponse({response:"hello from " + chrome.tab.url});
        }
     
    }
  );




function sendFromContentScript(){
    chrome.runtime.sendMessage({greeting: "hello" + chrome.tab.url}, function(response) {
        console.log(response.farewell);
    });

    console.log('HELLO')
}



sendFromContentScript();