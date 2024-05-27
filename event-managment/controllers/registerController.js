const auth = require("express").Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const saltRounds = 10;
const userDetails = require("../userDetails.json").user;

auth.post("/", (req, res) => {
    const parsedBody =  req.body;
    const { name, email,password,usertype} = req.body;
    if(name && email && password && usertype){
        let processSecretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(password, processSecretKey);
        const hashedPassword = bcrypt.hashSync(password,saltRounds);
        parsedBody.password = hashedPassword;
        userDetails.push(parsedBody)//update in DB
        return res.status(200).send("User Registered Sucessfully");
    }else{
        return res.status(400).send("Please fill all mandatory fields");
    }
});
module.exports = auth;