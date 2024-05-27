const auth = require("express").Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const userDetails = require("../userDetails.json").user;
const authenticateToken = require("../validator/loginvalidator");


exports.getEvents = (req, res) => {

    console.log("events");
   

};