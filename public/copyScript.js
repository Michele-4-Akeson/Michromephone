


chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch (message.text){
            case "test":
                console.log(message)
                const start = message.start;
                const end = message.end
                const elements = getAllElementsInViewPort();
                //console.log(elements)
                let foundElement = false;
                for (let i = 0; i < elements.length && !foundElement; i++){
                    foundElement = checkElement(elements[i], start, end)

                    if (foundElement){
                        console.log(elements[i])
                    }
                }
        }
       
});


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


function checkElement(element, start, end){
    let lowercaseText = element.textContent.toLowerCase().replaceAll(",", "").replaceAll("\n", "")
    if (lowercaseText.includes(start) && lowercaseText.includes(end)){
        let textlist = lowercaseText.split(" ")
        console.log(textlist)
        textlist = textlist.slice(textlist.indexOf(start), textlist.indexOf(end) + 1)
        console.log(textlist)

        for (let word of textlist){
            highlight(element, word)
        }

        let text = textlist.join(" ")
        copy(text)
        /*
        navigator.clipboard.writeText(text).then(function(){
            alert("Copied the text: " + text);
        });
        */
        console.log(text)
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