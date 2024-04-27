const express = require('express');
const app = express();
const port = 3000;
var tasksConfig = require('./task.json');

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

app.get("/tasks/:id", (req,res) =>{
    const tasks =  tasksConfig.tasks;
    let taskIds  = tasks.filter(task => task.id === parseInt(req.params.id));
    if(taskIds.length == 0){
        return res.status(404).send("task is not avalible");
    }
    let jsonString = JSON.stringify(taskIds);
    res.status(200).send(jsonString);
});

app.post("/tasks",(req,res) => {
    const tasks =  tasksConfig.tasks;
    console.log("body is",req.body);
    let parsedBody =  JSON.parse(req.body);
    tasks.push(req.body);
    //console.log("tasks",tasks);

    res.status(200).send("Task Created Sucessfully");
});

app.put("/tasks/:id", (req,res) =>{
    const tasks =  tasksConfig.tasks;
    //console.log("body is",req.body);
    //console.log(tasks.length);
    let taskIds  = tasks.filter(task => task.id === parseInt(req.params.id));
    if(taskIds.length == 0){
        return res.status(404).send("task is not avalible");
    }
    let jsonString = JSON.stringify(taskIds);
    res.status(200).send(jsonString);
});


module.exports = app;