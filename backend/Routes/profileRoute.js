require("dotenv/config"); 
const express = require("express");
const router = express.Router();
const Profile = require("../Models/profileModel")


/*
returns array of contackts associated with profile
*/
router.get("/", async function(req, res){
    
    try{
        console.log("GET/Profile Called")
        let queryUsername = req.query.username;
        let queryPassword = req.query.password;
        
        const result = await Profile.findOne({username:queryUsername, password:queryPassword})
        res.json({contacts:result.contacts})

    } catch (error){
        console.log(error)
    }
})


/*
adds a contact to the contacts of a profile and returns true if update was successful and false otherwise
*/
router.post("/", async function(req, res){
    try {
        console.log("POST/Profile Called")
        const username = req.body.username;
        const password = req.body.password;
        const contact = req.body.contact;
        const phoneNumber = req.body.phoneNumber
        const response = await Profile.updateOne({username:username, password:password}, {$push:{contacts:{contact:contact, phoneNumber:phoneNumber}}})
        console.log(response)

        res.json({success:response.modifiedCount==1})

    } catch (error) {
        console.log(error)
    }

})



module.exports = router;

