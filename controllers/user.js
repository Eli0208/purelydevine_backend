const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require('../auth')

// Check if email already exist

// routes for checking if email already exists.

module.exports.registerUser = (reqBody) => {
    return User.findOne({email : reqBody.email}).then(result => {
        if(result != null){
            return 'Email is already Registered'
        } else{
            let newUser = new User({
                firstName: reqBody.firstName,
                lastName: reqBody.lastName,
                email: reqBody.email,
                password: bcrypt.hashSync(reqBody.password, 10)
            }) 


            return newUser.save().then((user, error) => {
                if(error) {
                    return false;
                } else {
                    return true;
                }
            })
        }
    }
)};



module.exports.loginUser = (reqBody) => {

    if(reqBody.email != "" && reqBody.password != ""){
        return User.findOne({email : reqBody.email}).then(result => {
            if(result == null){
                return 'Email error'
            } else {
                const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)

                if(isPasswordCorrect){
                    return {access: auth.createAccessToken(result)}
                }else{
                    return 'password error'
                }
            }
        })
    }else{
        return Promise.resolve("EmailPass empty")
    }

}

module.exports.pay = async (data) => {
    console.log(data);
    let updateUser = {
        credits : data.credits
    }
    return User.findByIdAndUpdate(data.userId, updateUser).then((User, error) => {
        if(error){
            return false;
        }else{
            return true
        }
    })
}
