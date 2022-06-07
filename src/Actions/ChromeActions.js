/*global chrome*/


export function sendChromeMessage(message){
    console.log("Chrome API - record")
    chrome.tabs && chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message)
      });
}




const commandList = ["send", "copy", "read", "stop", "say"]

export function parseCommand(wordList){
  /*
  send: "send <x> to <name> <target (phone, email, discord)>" - sends data, <x> to the contact <name> through their (phone, email, discord)
  copy: "copy from <x> to <y>"
  */
  let command;
  let toIndex;
  let fromIndex;
  let what;
  let targets = ["discord", "email", "phone"]
  let targetIndex;

  for (let commandWord of commandList){
      if (wordList.includes(commandWord)){
          command = commandWord
          break;
      }
  }


  try {
      switch(command){
          case "send":
              toIndex = wordList.lastIndexOf("to")
              what = wordList[toIndex - 1];

              for (let target of targets){
                targetIndex = wordList.lastIndexOf(target) 
                if (targetIndex != -1){
                  break; 
                }
              }

              return {command:command, what:what, to:wordList[toIndex + 1], target:wordList[targetIndex] }
          
          case "copy":
              fromIndex = wordList.indexOf("from")
              toIndex = wordList.lastIndexOf("to")
              sendChromeMessage({text:"copy", start:wordList[fromIndex + 1], end:wordList[toIndex + 1]})
              return {command:command, from:wordList[fromIndex + 1], to:wordList[toIndex + 1]}
          
          case "read":
            fromIndex = wordList.indexOf("from")
            toIndex = wordList.lastIndexOf("to")
            sendChromeMessage({text:"read", start:wordList[fromIndex + 1], end:wordList[toIndex + 1]})
            return {command:command, from:wordList[fromIndex + 1], to:wordList[toIndex + 1]}

          case "say":
            wordList[wordList.indexOf("say")] = ""
            let content = wordList.join(" ")
            sendChromeMessage({text:"say", content:content})


      }

  } catch (error){
      console.log("could not parse", error)
  }


}