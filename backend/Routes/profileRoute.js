require("dotenv/config"); 
const express = require("express");
const router = express.Router();
const Profile = require("../Models/profileModel")


/*
returns array of token associated with profile
*/
router.get("/token", async function(req, res){
    
    try{
        console.log("GET/Profile/SignIn Called")
        const queryUsername = req.query.username;
        const queryPassword = req.query.password;
        
        const result = await Profile.findOne({username:queryUsername, password:queryPassword})
        res.json({token:result.token})

    } catch (error){
        console.log(error)
    }
})



/*
retreives array of contacts associated with profile via account token and  returns in HTTP response
*/
router.get("/contact", async function(req, res){
    
    try{
        console.log("GET/Profile/contact Called")
        const token = req.query.token;

        
        const result = await Profile.findOne({token:token})
        res.json({contacts:result.contacts})

    } catch (error){
        console.log(error)
    }
})



/*
searches database for profile with mathcing username; if no duplicate username exsists, then 
profile is created in database
*/
router.post("/", async function(req, res){
    try {
        console.log("POST/Profile CALLED");
        const username = req.body.username;
        const password = req.body.password;
        const token = req.body.token;
        const searchResult = await Profile.findOne({username:username});

        if (searchResult == null){
            const createResult = await Profile.create({username:username, password:password, token:token})
            console.log("New profile created\n", createResult)
            res.json({success:true});
        }

        res.json({success:false});
        
       
    } catch (error){
        console.log(error);
    }


})


/*
adds a contact to the contacts of a profile and returns true if update was successful and false otherwise
*/
router.post("/contact", async function(req, res){
    try {
        console.log("POST/Profile/contact Called")
        const token = req.body.token;
        const contact = req.body.contact;
        const phoneNumber = req.body.phoneNumber
        const response = await Profile.updateOne({token:token}, {$push:{contacts:{contact:contact, phoneNumber:phoneNumber}}})
        console.log(response)

        res.json({success:response.modifiedCount==1})

    } catch (error) {
        console.log(error)
    }

})



module.exports = router;

