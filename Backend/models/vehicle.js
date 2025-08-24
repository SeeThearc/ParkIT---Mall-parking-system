const mongoose = require("mongoose");

const vehicleschema = new mongoose.Schema({
    numberplate:String,
    type:{
        type:String,
        enum:["car","bike","EV","handicap"]
    },
    slotnumber:String,
    intime: { type: Date },
    exittime: { type: Date }
})

module.exports = mongoose.model("vehicle",vehicleschema);