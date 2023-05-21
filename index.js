const express = require("express");
require("dotenv").config()
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const app = express();



mongoose.connect("mongodb+srv://alanHarper:YsLIiomngYNY2VVD@cluster0.7v5esak.mongodb.net/purelydevine_api?retryWrites=true&w=majority",
    {
        useNewUrlParser : true,
        useUnifiedTopology : true 
    });

mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas."));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/users", userRoutes);
app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Purely Divine",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

if(require.main === module){
    app.listen(process.env.PORT || 4000, () => console.log(`API is now online on port ${process.env.PORT || 4000}`));
}

module.exports = app;