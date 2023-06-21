const express = require("express");
const { SlotsModel } = require("../models/slots.model");

const doctorRoutes = express.Router();

doctorRoutes.post('/slot', async (ask, give) => {
    try {
        let slot = new SlotsModel(ask.body)
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

module.exports={
    doctorRoutes
}