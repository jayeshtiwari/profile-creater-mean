const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const config = require('./config/db');
const path = require('path');
const bodyParser = require('body-parser');
const auth = require('./routes/auth')(router);

mongoose.connect(config.uri, (err) =>{
    if(err){
        console.log("Could not connect database" , err);
    }else{
        console.log("Connected to database" , config.db)
    }
});
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/client'));
app.use('/auth', auth);
app.get('*',(req,res)=>{
    res.send(path.join(__dirname + '/client/dist/client/index.html'));
})
app.listen(3000 , (err)=>{
    if(!err){
        console.log("Successfull");
    }else{
        console.log("connection not established");
    }
})