const express = require('express');
const app = express();
const port = 3000;
var tasksConfig = require('./task.json').tasks;

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
   res.type("application/json").status(200).send(tasksConfig);
});

app.get("/tasks/:id", (req,res) =>{
    const tasks =  tasksConfig;
    let taskIds  = tasks.filter(task => task.id === parseInt(req.params.id));
    if(!taskIds ||taskIds.length == 0){
        return res.status(404).send("task is not avalible");
    }
    let jsonString = JSON.stringify(taskIds);
    res.status(200).send(jsonString);
});

app.post("/tasks",(req,res) => {
    const tasks =  tasksConfig;
    const parsedBody =  req.body;
    const { title, description,completed} = req.body;
    if(title && description && typeof completed !== 'undefined'){
       parsedBody.id = tasks.length+1;
       tasks.push(parsedBody);
      return res.status(200).send("Task Created Sucessfully");
    }else{
        return res.status(400).send("Plese fill mandatory fields");
    }
});

app.put("/tasks/:id", (req,res) =>{
    const tasks =  tasksConfig;
    const taskIds  = tasks.find(task => task.id === parseInt(req.params.id));
    console.log("tasks",taskIds);
    if(!taskIds || taskIds.length == 0){
        return res.status(404).send("task is not avalible");
    }
    const { title, description,completed} = req.body;
    if(title && description && typeof completed !== 'undefined'){
        taskIds.title = req.body.title;
        taskIds.description = req.body.description;
        taskIds.completed = req.body.completed;
        console.log("updated task",taskIds);
        res.status(200).send("Task Updated Sucessfully");
    }else{
        return res.status(400).send("Plese fill mandatory fields");
    }
    
});

app.delete("/tasks/:id", (req,res) =>{
    const taskIds  = tasksConfig.find(task => task.id === parseInt(req.params.id));
    console.log(taskIds);
    if(!taskIds || taskIds.length<=0){
        return res.status(404).send("task is not avalible");
    }
    console.log("taskIds",taskIds);
    const index = tasksConfig.indexOf(taskIds);
    console.log("index",index);
    tasksConfig.splice(index,1);
    console.log("taskConfgi",tasksConfig);
    res.status(200).send("Task Deleted Sucessfully");
});


module.exports = app;