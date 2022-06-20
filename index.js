//initiate the express server
const express = require('express');
const app = express();

app.use(express.json());

//pull in db
const persist = require("./persist");

//put in command line flags
const flags = require("flags");
flags.defineNumber("port", 3000, "Ports for the http server to listen");
flags.parse();

//put in env vars
const dotenv = require("dotenv");

//set up port number
const port = flags.get("port") || process.env.PORT || 3000;

//set up server paths and handlers
app.get("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.getTodo(id);
    res.json(todo);
});

app.post("/todo", (req, res) => {
    const id = req.params.id;
    const todo = persist.getTodo(id);
    persist.addTodo(req.body);
    res.send(req.body);
});

app.delete("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.removeId(id);
    res.json(todo);
});

//sends entire object with a change
app.put("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.getTodo(id);
    res.json(todo);
});

//sends part of an object with a change
app.patch("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.getTodo(id);
});

//start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})