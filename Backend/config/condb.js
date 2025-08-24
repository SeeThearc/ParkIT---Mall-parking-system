const mongoose = require("mongoose");

const connect = async() =>{
    try {
        await mongoose.connect("mongodb+srv://ayushagrawal2334:motorq@cluster0.1lumafg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("Connected");

    } catch (error) {
        console.log(error);
    }
}
module.exports = connect;