import {nanoid} from 'nanoid'

const backendURL = "http://localhost:3001/"
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
export async function addContactToProfile(token, contact, phoneNumber){
    try {
        const response = await fetch(backendURL + profilePath + "/contact", {
            method:"POST",
            headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
            },
            body: JSON.stringify({token:token, contact:contact, phoneNumber:phoneNumber})
        
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