require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('./users')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");



//middlewares

app.use(express.json());
app.use(cors())

//Connecting to mongodb

mongoose.connect(process.env.mongoUrl, {
    useNewUrlParser: true
})
.then(() => console.log('Connected to MongoDB...'))
.catch((e) => console.log(e));

// Registering a user in the Database

const User = mongoose.model("UserInfo");
app.post("/register", async(req,res) => {
    const {fname, lname, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10)
    try {

        //Check if user already exists

        const existingUser = await User.findOne({ email })

        if(existingUser){
            return res.status(400).send({ status: "Error- user already registered" })
        }

        //Create a new user
        await User.create({
           fname,
           lname,
           email,
           password: hashedPassword
        })
        res.status(201).send({status:"created"})
    } catch (error) {
        res.status(400).send({status:"error"})
    }
})

//Login

app.post("/login", async(req,res) => {
    const {email, password} = req.body;

    //Check if user exists

    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({status: "No user found"})
    }
if(await bcrypt.compare(password, user.password)){
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

    if(res.status(201)){
        return res.json({status: "ok", data: token});
    }else{
        return res.json({error: "error"});
    }
}
 res.json({status: "error", error: "Invalid credentials"});
})

// Dashboard upon succesful login

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = user.email;
    User.findOne({ email: userEmail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

//Connecting to server

app.listen(5500, () => {
    console.log("Server Started on port 5500...");
  });