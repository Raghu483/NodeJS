const express = require('express');
const app = express();
const port = 3000;
const tasks = require('./task.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

app.get("/",(req,res) =>{
    console.log("Hello World");
    res.send("Server is up");
});

app.get("/tasks", (req,res)=>{
   res.type("application/json").status(200).send(tasks);
});
//test

module.exports = app;