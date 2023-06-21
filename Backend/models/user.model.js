const mongoose=require("mongoose")

const schema=mongoose.Schema({
    name: String,
    email: String,
    password: String,
    type: String
  })

const UserModel=mongoose.model("users",schema)

module.exports={
    UserModel
}