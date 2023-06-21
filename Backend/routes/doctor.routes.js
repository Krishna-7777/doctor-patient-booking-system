const express = require("express");
const { SlotsModel } = require("../models/slots.model");

const doctorRoutes = express.Router();

doctorRoutes.post('/createSlot', async (ask, give) => {
    try {
        let slot = new SlotsModel(ask.body)
        await slot.save()
        give.send({msg:"Availability Slot has been Created."})
    } catch (error) {
        give.send({msg:"Error in Creating the Slots"})
    }
})

module.exports={
    doctorRoutes
}