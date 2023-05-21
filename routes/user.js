const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.js");
const auth = require("../auth.js")


router.post("/register", (req, res) =>{
    userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
});

router.post("/login", (req,res) => {
    userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
})

router.put("/pay", auth.verify, (req,res) => {
    let data = {
        userId : auth.decode(req.headers.authorization).id,
        role : auth.decode(req.headers.authorization).role,
        credits : req.body.credits
    }
    userController.pay(data).then(resultFromController => res.send(resultFromController))
}
)


// Allows us to export the "router" object that will be access in our index.js file
module.exports = router;