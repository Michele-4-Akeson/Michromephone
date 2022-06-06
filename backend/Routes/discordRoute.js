require("dotenv/config"); 
const express = require("express");
const router = express.Router();
const discordBot = require("../discordBot.js")
const emailer = require("../emailer.js")


router.post("/invite", async function(req, res){
    try {
        console.log("POST/discord/invite CALLED");
        const targetEmail = req.body.targetEmail;
        const senderName = req.body.senderName;

        const subject = "Discord Server Invite"
        const text = senderName + " is asking you to join the michromephone " + process.env.DISCORD_SERVER_LINK
        const response = emailer.sendServerEmail(targetEmail, subject, text)

        if (response){
            res.json({success:true});
        } else {
            res.json({success:false})
        }


        
       
    } catch (error){
        console.log(error);
        res.json({success:false})
    }
})

router.post("/email", async function(req, res){
    try {
        console.log("POST/email send CALLED");
        const targetEmail = req.body.targetEmail;
        const text = req.body.text

        const response = emailer.sendServerEmail(targetEmail, "message", text)

        if (response){
            res.json({success:true});
        } else {
            res.json({success:false})
        }


        
       
    } catch (error){
        console.log(error);
        res.json({success:false})
    }
})








router.post("/", async function(req, res){
    try {
      console.log("POST/discord message Called")
      const discordUser = req.body.username;
      const message = req.body.message
      const response = await discordBot.sendDiscordMessage(discordUser, message);
      console.log(response)
  
      res.json({success:response})
  
  } catch (error) {
      console.log(error)
      res.json({success:false})
  }
});

module.exports = router;

