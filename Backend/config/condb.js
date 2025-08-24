const mongoose = require("mongoose");
require("dotenv").config();

const connect = async() =>{
    try {
        await mongoose.connect(process.env.DB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("Connected");

    } catch (error) {
        console.log(error);
    }
}
module.exports = connect;