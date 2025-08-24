const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const PRoutes = require("./routes/route");
const connect = require("./config/condb");

const app = express();
app.use(express.json());
app.use(cors());

connect();

app.use("/api",PRoutes);

app.listen(5000,()=>{
    console.log("Server started listening on port 5000");
});