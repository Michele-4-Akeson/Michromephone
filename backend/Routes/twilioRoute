
require("dotenv/config"); 
const express = require("express");
const router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);




// adds a new contact to the verified numbers of the twilio account
router.post("/contact", async function(req, res){
    try {
        console.log("POST: Twilio/contact")
        const contact = req.body.contact;
        const phoneNumber = req.body.phoneNumber
        

        const response = await addVerifiedNumber(contact, phoneNumber)
        console.log(response)

    } catch (error) {
        console.log(error)
    }

})


// sends message to phone number from application via Twilio
router.post("/send", async function(req, res){
    try {
        console.log("POST: Twilio/send")
        const phoneNumber = req.body.phoneNumber
        const message = req.body.message;

        const response = await sendMessageTo(phoneNumber, message);

        if (response){
            res.json({success:true})
        }


    } catch (error) {
        console.log(error)
    }
})







/*
twilio functional calls
*/

async function addVerifiedNumber(contact, phoneNumber){
    const response = await client.validationRequests.create({friendlyName: contact, phoneNumber: phoneNumber})
    console.log(response.friendlyName)
 
 }

async function sendMessageTo(phoneNumber, message){
    const response = await client.messages.create({
        body: message,
        from: twilioPhone,
        to: phoneNumber
    })
    console.log("message id:", response.sid) // used to identify the message later
    console.log("message status:", response.status)


}

















// OTHER

/*
async function deleteMessage(messageSID){
    const response = await client.messages(messageSID).remove();

    if (response.status == 204){
        console.log("message deleted")
    }
}


*/




module.exports = router;