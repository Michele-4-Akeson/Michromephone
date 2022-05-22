/*
SERVER INITILIZATION:
*/

const http = require("http")
const express = require('express');
const app = express();
const cors = require("cors");
const httpServer = http.createServer(app)
const mongoose = require("mongoose");
const bodyParser = require('body-parser');  
const querystring = require('querystring');
require("dotenv/config"); 

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
    console.log("Server started and listing on Port: " + PORT)
});


const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }

 app.use(cors(corsOptions));
 app.use(express.json());
 app.use(bodyParser.json())


 /*
Database Connection
*/

mongoose.connect(process.env.MONGO_DB_CONNECTION)
  .then(()=>console.log('connected to mongoDB'))
  .catch(e=>console.log(e));






/*
EXPRESS ROUTERS
*/

const profileRoute = require("./Routes/profileRoute")
const twilioRoute = require("./Routes/twilioRoute"); 


app.use("/profile", profileRoute);
app.use("/twilio", twilioRoute);
