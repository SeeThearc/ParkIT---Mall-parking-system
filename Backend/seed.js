const mongoose = require("mongoose");
const Slot = require("./models/slot");

mongoose.connect("mongodb+srv://ayushagrawal2334:motorq@cluster0.1lumafg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(async()=>{
    await Slot.deleteMany();
    await Slot.insertMany([
        { slotnumber: "A1", type: "regular", status: "available" },
        { slotnumber: "A2", type: "regular", status: "available" },
        { slotnumber: "A3", type: "regular", status: "available" },
        { slotnumber: "A4", type: "compact", status: "available" },
        { slotnumber: "A5", type: "compact", status: "available" },
        { slotnumber: "A6", type: "compact", status: "available" },
        { slotnumber: "B1", type: "bike", status: "available" },
        { slotnumber: "B2", type: "bike", status: "available" },
        { slotnumber: "B3", type: "bike", status: "available" },
        { slotnumber: "B4", type: "bike", status: "available" },
        { slotnumber: "B5", type: "bike", status: "available" },
        { slotnumber: "B6", type: "bike", status: "available" },
        { slotnumber: "C1", type: "EV", status: "available" },
        { slotnumber: "C2", type: "EV", status: "available" },
        { slotnumber: "C3", type: "EV", status: "available" },
        { slotnumber: "C4", type: "EV", status: "available" },
        { slotnumber: "C5", type: "EV", status: "available" },
        { slotnumber: "C6", type: "EV", status: "available" },
        { slotnumber: "D1", type: "handicap", status: "available" },
        { slotnumber: "D2", type: "handicap", status: "available" },
        { slotnumber: "D3", type: "handicap", status: "available" },
        { slotnumber: "D4", type: "handicap", status: "available" },
    ]);
    console.log("Inserted Succesfully");
    mongoose.disconnect();
});