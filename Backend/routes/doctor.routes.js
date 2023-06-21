const express = require("express");
const jwt = require("jsonwebtoken")
const { SlotsModel } = require("../models/slots.model");

const doctorRoutes = express.Router();

doctorRoutes.post('/slot', async (ask, give) => {
    try {
        let payload=ask.body
        let doctorId=(jwt.decode(ask.headers.authorization)).id
        payload.doctorId=doctorId
        let slot = new SlotsModel(payload)
        await slot.save()
        give.send({msg:"Availability Slot has been Created."})
    } catch (error) {
        give.send({msg:"Error in Creating the Slots"})
    }
})

doctorRoutes.delete('/slot/:id', async (ask, give) => {
    try {
        await SlotsModel.findByIdAndDelete(ask.params.id)
        give.send({msg:"Slot has been Deleted."})
    } catch (error) {
        give.send({msg:"Error in Deleting the Slot."})
    }
})

doctorRoutes.get('/slot', async (ask, give) => {
    try {
        let doctorId=(jwt.decode(ask.headers.authorization)).id
        let slots = await SlotsModel.findAll({doctorId})
        give.send(slots)
    } catch (error) {
        give.send({msg:"Error in getting the Slots"})
    }
})

module.exports={
    doctorRoutes
}