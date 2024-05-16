const express = require("express"); 
const mongoose = require("mongoose"); 
const cors = require("cors")
const env = require("dotenv")
const app = express(); 

const routes = require("./app/routes/index");


env.config()
app.use(cors()) 
app.use(express.json());
app.use('/public', express.static('public')); 


mongoose.connect(process.env.URL_DB).then(res => {
    console.log("db connected");
}).catch(err => {
    console.log(err)
});

 
app.use(routes);


app.listen(process.env.PORT, () => {
    console.log("server is running...");
});
