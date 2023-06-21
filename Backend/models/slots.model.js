const mongoose=require("mongoose")

const schema=mongoose.Schema({
    doctorId:String,
    userId:String,
    date:Date,
    start:String,
    end:String,
    available:{
        type: Boolean,
        default: true
      }
  })

const SlotsModel=mongoose.model("slots",schema)

module.exports={
    SlotsModel
}