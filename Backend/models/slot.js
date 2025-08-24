const mongoose = require("mongoose");

const slotschema = new mongoose.Schema({
    slotnumber:String,
    type:{
        type:String,
        enum:["regular","compact","bike","handicap","EV"],
    },
    status:{
        type:String,
        enum:["available","occupied","maintainance"],
    },
})

module.exports = mongoose.model("slot",slotschema);