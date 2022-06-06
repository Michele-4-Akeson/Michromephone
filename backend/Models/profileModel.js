const mongoose = require("mongoose");


const contactSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    discord: String
})

const profileSchema = new mongoose.Schema({
    username: String,
    password: String,
    token: String,
    contacts:[contactSchema]
   
})



module.exports = mongoose.model("Chrome_Profile", profileSchema, "Chrome_Profile");
