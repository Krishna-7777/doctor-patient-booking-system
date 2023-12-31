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
        let slots = await SlotsModel.find({doctorId})
        give.send(slots)
    } catch (error) {
      console.log(error)
        give.send({msg:"Error in getting the Slots"})
    }
})

doctorRoutes.get('/bookedSlots', async (ask, give) => {
    try {
        let slots = await SlotsModel.aggregate([
            {
                $match:{
                doctorId:(jwt.decode(ask.headers.authorization)).id,
                available:false
            }
            },
            {
              $addFields: {
                userId: { $toObjectId: "$userId" }
              }
            },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
              }
            },
            {
              $unwind: "$user"
            },
            {
              $project: {
                "user.name": 1,
                date: 1,
                start: 1,
                end: 1
              }
            }
          ])
        give.send(slots)
    } catch (error) {
        console.log(error)
        give.send({msg:"Error in getting the Slots"})
    }
})

module.exports={
    doctorRoutes
}