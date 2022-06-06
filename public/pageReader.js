
console.log("pageReader.js running...")

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch (message.text){
            case "copy":
                perform("copy", message)
                break
            
            case "read":
                perform("read", message)
                break
            
            case "stop":
                stopeTextReading();
                break;
    

        }
       
});



function perform(type, message){
    console.log("type:", type)
    const start = message.start;
    const end = message.end
    const elements = getAllElementsInViewPort();
    let foundElement = false;
    for (let i = 0; i < elements.length && !foundElement; i++){
        foundElement = useElement(elements[i], start, end, type)

        if (foundElement){
            console.log(elements[i])
        }
    }


}




function getAllElementsInViewPort(){
    const pageElements = document.body.getElementsByTagName("*")
    let visibleElements = []
    for (let i = 0; i <= pageElements.length; i++) {
        let element = pageElements[i];
        
        if (isElementInViewport(element) && isValidElement(element)){
            visibleElements.push(element)
        
        }

    }

    return visibleElements;
}


function isElementInViewport (element) {
    if (element != undefined && element != null){
        let rect = element.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
        );

    }
   
}




function isValidElement(element){
    if (element != undefined && element != null){
        if (element.textContent != "" && element.nodeName != "SCRIPT" && element.offsetParent != null && element.nodeName != "STYLE" && element.nodeName != "NOSCRIPT" && element.style.visibilty != "hidden"){
            return true
        }
    }

    return false
}





function useElement(element, start, end, type){
    let lowercaseText = element.textContent.toLowerCase().replaceAll(",", "").replaceAll("\n", "")
    if (lowercaseText.includes(start) && lowercaseText.includes(end)){
        let textlist = lowercaseText.split(" ")
        textlist = textlist.slice(textlist.indexOf(start), textlist.indexOf(end) + 1)
       

        for (let word of textlist){
            highlight(element, word)
        }

        let text = textlist.join(" ")

        if (type == "copy"){
            copy(text)
        } else {
            startTextReading(text)
        }

      
        return true
    }

    return false;
}




function highlight(element, searchText) {
    let text = element.innerHTML;
    let re = new RegExp(searchText,"gi"); // search for all instances
    let newText = text.replace(re, `<mark>${searchText}</mark>`);

    if (text != newText){
        element.innerHTML = newText;
    }
    

}




function copy(text) {
    const textarea = document.createElement('textarea');
    textarea.style.cssText = 'opacity:0; position:fixed; width:1px; height:1px; top:0; left:0;';
    textarea.value = text;
    try {
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
    } catch (error) {
        console.log(error)
    }
    
  }






  
/*
READING TEXT OUT-LOUD
*/

function startTextReading(text){
    console.log("startTextReading")
    
    if (speechSynthesis.speaking){
        stopeTextReading()
    }
    
   try {
    console.log(text)
    const speaker = new SpeechSynthesisUtterance(text)
    speaker.rate = 1
    speechSynthesis.speak(speaker)

   } catch (error){
       console.log(error)
   }
  

    

    
}

function resumeTextReading(){
    if (speechSynthesis.paused && speechSynthesis.speaking){
        speechSynthesis.resume();
    }
}


function pauseTextReading(){
    if (speechSynthesis.speaking){
        speechSynthesis.pause();
    }
}



function stopeTextReading(){
    speechSynthesis.resume()
    speechSynthesis.cancel();
}
