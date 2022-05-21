const mongoose = require("mongoose");


const contactSchema = new mongoose.Schema({
    contact: String,
    phoneNumber: String,
})

const profileSchema = new mongoose.Schema({
    username: String,
    password: String,
    token:String,
    contacts:[contactSchema]
   
})



module.exports = mongoose.model("Chrome_Profile", profileSchema, "Chrome_Profile");
