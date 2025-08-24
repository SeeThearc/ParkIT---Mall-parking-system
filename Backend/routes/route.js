const express = require("express");
const Slot = require("../models/slot");
const Vehicle = require("../models/vehicle");
const router = express.Router();

function getslottype(vehicletype){
    switch(vehicletype){
        case "car":return ["regular","compact"];
        case "bike":return ["bike"];
        case "EV": return ["EV"];
        case "handicap": return ["handicap"];
    }
}
router.post("/entry",async(req,res) => {
    const {numberplate,type,manualId} = req.body;
    console.log("req recived");
    try {
        const vehicle = await Vehicle.findOneAndUpdate(
            {numberplate},
            {numberplate,type},
            {new:true,upsert:true}
        );
        let slot;
        if(manualId){
            slot = await Slot.findOne({slotnumber:manualId,status:"available"});
            if (slot.status !== "available") {
                return res.json({ message: "Slot already occupied" });
            }
        }
        else{
            const allowedTypes = getslottype(type);
            slot = await Slot.findOne({
                type:{$in:allowedTypes},
                status:"available"
            }).sort({slotnumber:1});
        }
        if(!slot){
            return res.json({message:"no available slots"});
        }
        
        slot.status="occupied";
        await slot.save();
        vehicle.slotnumber = slot.slotnumber;
        vehicle.intime = new Date();
        vehicle.exittime=null;
        await vehicle.save();
        res.json({
            message:"slot assigned",
            slotId:slot._id,
            slotNumber : slot.slotnumber
        });
    } catch (error) {
        res.json({message:"error in giving slot"});
    }
});

router.post("/exit", async (req, res) => {
    const { numberplate } = req.body;

    try {
        // Find the vehicle by number plate
        const vehicle = await Vehicle.findOne({ numberplate });
        if (!vehicle) {
            return res.json({ message: "Vehicle not found" });
        }

        // Check if vehicle is currently parked (has a slot assigned)
        if (!vehicle.slotnumber) {
            return res.json({ message: "Vehicle not currently parked" });
        }

        // Free the slot
        const slot = await Slot.findOne({ slotnumber: vehicle.slotnumber });
        if (slot) {
            slot.status = "available";
            await slot.save();
        }

        // Set exit time and clear slot assignment
        vehicle.exittime = new Date();
        vehicle.slotnumber = null;
        await vehicle.save();

        return res.json({
            message: "Vehicle checked out",
            exitTime: vehicle.exittime
        });
    } catch (error) {
        console.error("Error in /exit route:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

router.get("/dashboard",async(req,res)=>{
    try {
        const total = await Slot.countDocuments();
        const available = await Slot.countDocuments({status:"available"});
        const occupied = await Slot.countDocuments({status:"occupied"});
        const maintainance = await Slot.countDocuments({status:"maintainance"});
        const bytypecount = await Slot.aggregate([
            {
                $group:{
                    _id:{type:"$type", status:"$status"},
                    count:{$sum:1}
                }
            }
        ]);
        res.json({total,available,occupied,maintainance,bytypecount});
    } catch (error) {
        console.log(error);
    }
});

router.get("/vehicle", async (req, res) => {
    const { numberplate } = req.query;

    try {
        const vehicle = await Vehicle.findOne({ numberplate });
        if (!vehicle) {
            return res.json({ message: "Vehicle not found" });
        }

        res.json(vehicle);
    } catch (error) {
        res.json({ message: "error" });
    }
});
router.get("/vehicles", async (req, res) => {
    const { type } = req.query;
    try {
        let query = Vehicle.find().where('slotnumber').ne(null);
        query = query.where('type').equals(type);
        const vehicles = await query;
        // const vehicles = await Vehicle.find((type ) ? { type } : {});
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vehicles" });
    }
});
router.put("/slots/:slotIdentifier/maintenance", async (req, res) => {
    const { slotIdentifier } = req.params;

    try {
        const slot = await Slot.findOne({slotnumber: slotIdentifier});
        if (!slot) {
            return res.json({ message: "Slot not found" });
        }

        if (slot.status === "occupied") {
            return res.json({ message: "Cannot mark as maintenance" });
        }

        slot.status = "maintainance";
        await slot.save();

        res.json({ message: "Slot marked for maintenance", slot });
    } catch (error) {
        res.json({ message: "Server error" });
    }
});

router.put("/slots/:slotIdentifier/maintenance-remove", async (req, res) => {
    const { slotIdentifier } = req.params;

    try {
        const slot = await Slot.findOne({slotnumber: slotIdentifier});
        if (!slot) {
            return res.json({ message: "Slot not found" });
        }

        if (slot.status === "occupied") {
            return res.json({ message: "Cannot mark as available" });
        }

        slot.status = "available";
        await slot.save();

        res.json({ message: "Slot marked as available", slot });
    } catch (error) {
        res.json({ message: "Server error" });
    }
});
module.exports = router;