const  mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true, "FIRST NAME is required!"]
    },
    lastName : {
        type : String,
        required : [true, "LAST NAME is required!"]
    },
    email : {
        type : String,
        required : [true, "EMAIL is required!"]
    },
    password : {
        type : String,
        required : [true, "PASSWORD is required!"]
    },
    role : {
        type : String,
        default : 'user'
    },
    credits : {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model("User", userSchema);