const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = express();
const port = 3000;
const userDetails = require("./userDetails.json").user;
const news = require("./userDetails.json").news;
const saltRounds = 10;
const promise = require("Promise");
const axios = require("axios").default;
const newsContant = require("./constants/index.js").newsAPIEndpoint;
const validateToken = require("./util/validator.js").validateToken;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});
app.get("/",(req,res) =>{
    console.log("we are listening");
    return res.status(200).send("Hello Welcome");
});
app.post("/users/signup",(req,res)=>  {
    const parsedBody =  req.body;
    const { name, email,password,preferences} = req.body;
    if(name && email && password && preferences){
        let processSecretKey = process.env.JWT_SECRET_KEY;
       // console.log("processKey",processSecretKey);
        const token = jwt.sign(password, processSecretKey);
       // console.log("token is",token);
        const hashedPassword = bcrypt.hashSync(password,saltRounds);
        parsedBody.password = hashedPassword;
        userDetails.push(parsedBody)
        return res.status(200).send(token);

    }else{
        return res.status(400).send("Please fill all mandatory fields");
    }
});
app.post("/users/login",(req,res) => {
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
                let processSecretKey = process.env.JWT_SECRET_KEY;
                console.log("processKey",processSecretKey);
                const token = jwt.sign(password, processSecretKey);
                console.log("token is",token);
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
app.get("/users/preferences", (req,res) => {
    if(validateToken(req,res)){

        
    }else{


    }
});
app.get("/news", async (req,res)=>{
    if(validateToken(req,res)){
        await getNews().then(data => {
            news.push(data);
            return res.status(200).send(data);
          })
          .catch(err => {
            console.log(err);
            return res.status(500).send("Error in fetching news");
          });
    }else{
        return res.status(401).send("unAuthriozed");
    }
     console.log("get News last=======================");
});

  function getNews(){
    const customPromise =  new Promise((resolve, reject) => {
        //userDetails.
        const params = {
            access_key :process.env.accessKey,
        };
        const queryString = new URLSearchParams(params).toString();
            axios.get(newsContant+'?'+queryString).then(function (response) { 
            var dataFromResponse = response.data; 
            resolve(dataFromResponse);
           }).catch(function (error) { 
            reject('Some error');
           });
      })
      return customPromise
}

console.log("this is last line ================================");
module.exports = app;