const express= require("express")
const cors=require('cors');
const { connect } = require("./config/db");

const app=express()

app.use(cors("*"));

app.use(express.json())

app.get('/',(ask,give)=>{
    give.send("Doctor-Patient Appointment Booking System Backend")
})

app.listen(4000,()=>{
    try {
        connect
        console.log("Connected to the DB & Server is running at 4000...");
    } catch (error) {
        console.log("Error in connecting to the DB");
    }
})