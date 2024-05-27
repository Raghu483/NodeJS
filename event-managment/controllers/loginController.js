const auth = require("express").Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const userDetails = require("../userDetails.json").user;

auth.post("/", (req, res) => {
    const parsedBody =  req.body;
    const {email,password} = req.body;
    if(email && password){
      const userDetail = userDetails.find(userDetail => userDetail.email === email);
      if(userDetail){
        bcrypt.compare(password, userDetail.password, function(err, data) {
            if (err){
              return res.status(500).send("UnExpected Error");
            }
            if (data) {
                const processSecretKey = process.env.JWT_SECRET_KEY;
                const token = jwt.sign(password, processSecretKey);
                req.body.token = token;
                return res.status(200).send(req.body);
            } else {
              return res.status(401).send("Verify the credentails");
            }
          });
      }else{
        return res.status(500).send("Please enter valid email and password");
      }
    }else{
        return res.status(500).send("Please enter valid email and password");
    }
});

module.exports = auth;