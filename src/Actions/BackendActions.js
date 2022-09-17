import {nanoid} from 'nanoid'

const backendURL = "https://michromephone.herokuapp.com/"
const twilioPath = "twilio"
const profilePath = "profile"



////////////////////////////////////////
// DATABASE-ACTIONS:
////////////////////////////////////////


/*
post request to add a contact to the contacts of a profile
*/
export async function createProfile(username, password){
    const randomToken = nanoid();
    console.log(randomToken)
    try {
        const response = await fetch(backendURL + profilePath, {
            method:"POST",
            headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
            },
            body: JSON.stringify({token:randomToken, username:username, password:password})
        
        });
        
    return response.json();
    
    } catch (error){
        console.log(error);
    }

}



/*
get request to retreive account token via username and password signIn
*/

export async function getToken(username, password){
    try {
        const response = await fetch(backendURL + profilePath + "/token" + "?username=" + username + "&" + "password=" + password, {
        method:"GET",
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
      });
    
        return response.json();
    
    } catch (error){
        console.log(error);
    }


}






/*
get request to retrieve all contacts belonging to a profile with username and password
*/
export async function getContacts(token){
    try {
        const response = await fetch(backendURL + profilePath + "/contact" + "?token=" + token, {
        method:"GET",
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
      });
    
    return response.json();
    
    } catch (error){
        console.log(error);
    }

}


/*
post request to add a contact to the contacts of a profile
*/
export async function addContactToProfile(token, contact){
    try {
        const response = await fetch(backendURL + profilePath + "/contact", {
            method:"POST",
            headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
            },
            body: JSON.stringify({token:token, contact:contact})
        
        });
        
    return response.json();
    
    } catch (error){
        console.log(error);
        return null
    }

}















////////////////////////////////////////
// TWILIO-ACTIONS:
////////////////////////////////////////


/*
sends a message, message, from twilio to the provided phone number
*/

/*
export async function sendTwilioMessage(message, phoneNumber){
    try {
        const response = await fetch(backendURL + twilioPath + "/send", {
            method:"POST",
            headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
            },
            body: JSON.stringify({message:message, phoneNumber:phoneNumber})
        
        });
        
    return response.json();
    
    } catch (error){
        console.log(error);
    }

}

*/

/*
adds/verifies a provided number and allows twilio to contact the provided number
NOTE: Doesn't work as we are using a trial account
*/
export async function addVerifiedContact(contact, phoneNumber){
    try {
        const response = await fetch(backendURL + twilioPath + "/contact", {
            method:"POST",
            headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
            },
            body: JSON.stringify({contact:contact, phoneNumber:phoneNumber})
        
        });
        
    return response.json();
    
    } catch (error){
        console.log(error);
    }

}


/*
attempts to send a discord message to a user with the given username
*/
export async function sendDiscordMessage(username, message){
    try {
        console.log(username, message)
        const response = await fetch(backendURL + "discord", {
            method:"POST",
            headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
            },
            body: JSON.stringify({username:username, message:message})
        
        });
        
    return response.json();
    
    } catch (error){
        console.log(error);
    }


}


/*
sends an email to a target email to join the discord channel
*/
export async function sendDiscordInvite(targetEmail, senderName){
    try {
        const response = await fetch(backendURL + "discord" + "/invite", {
            method:"POST",
            headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
            },
            body: JSON.stringify({targetEmail:targetEmail, senderName:senderName})
        
        });
        
    return response.json();
    
    } catch (error){
        console.log(error);
    }

}

/*
sends a email to targetEmail with text as the contents
*/
export async function sendEmail(targetEmail, text){
    try {
        const response = await fetch(backendURL + "discord" + "/email", {
            method:"POST",
            headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
            },
            body: JSON.stringify({targetEmail:targetEmail, text:text})
        
        });
        
    return response.json();
    
    } catch (error){
        console.log(error);
    }

}