const mongoose = require("mongoose");

function getslottype(vehicletype){
    switch(vehicletype){
        case "car":return ["regular","compact"];
        case "bike":return ["bike"];
        case "EV": return ["EV"];
        case "handicap": return ["handicap"];
    }
}

module.exports = getslottype;