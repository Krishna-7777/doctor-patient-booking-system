const jwt = require("jsonwebtoken")
require("dotenv").config()

let authenticate = (role) => {
    return (ask, give, next) => {
        let token = ask.headers.authorization;
        try {
            let decoded = jwt.verify(token,process.env.secret)
            if(decoded.type==role){
                next()
            }else{
                give.send({msg:"Not Authorized!"})
            }

        } catch (error) {
            give.send({msg:"Please Login First!"})
        }
    }
}

module.exports={
    authenticate
}