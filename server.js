const express = require("express");
const app = express();

app.use(express.json());

const Todo = require("./persist/todo");

const memory = require("./persist/memory");

//pull in helpers
const helpers = require("./config")

app.post("/todo", (req, res) => {
    // validate the data
    const vTodo = setupTodo(req.body);
    Todo.create(vTodo)
        .then((todo) => {
            res.json(todo);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

app.get("/todo/:id", (req, res) => {
    const id = req.params.id;
    Todo.findById(id)
        .then((todo) => {
            if (todo == null) {
                res.status(404).json({ messgae: "not found" });
                return;
            }
            res.json(todo);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

app.get("/todos", (req, res) => {
    Todo.find()
        .then((todos) => {
            res.json(todo);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
})

app.delete("/todo/:id", (req, res) => {
    const id = req.params.id;
    Todo.findByIdAndDelete(id)
        .then((todo) => {
            if (todo == null) {
                res.status(404).json({ messgae: "not found" });
                return;
            }
            memory.removeId();
            res.json(todo);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

app.put("/todo/:id", (req, res) => {
    const id = req.params.id;
    // validate the data
    const vTodo = setupTodo(req.body);
    Todo.findByIdAndUpdate(id, vTodo, { new: "True" })
        .then((todo) => {
            if (todo == null) {
                res.status(404).json({ messgae: "not found" });
                return;
            }
            res.json(todo);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

app.patch("/todo/:id", (req, res,) => {
    const id = req.params.id;
    // validate the data
    // this validation is done a bit different than the post and put
    Todo.findByIdAndUpdate(id, { new: "True" })
        .then((todo) => {
            if (todo == null) {
                res.status(404).json({ messgae: "not found" });
                return;
            }
            patchTodo(res.body);
            res.json(todo);
        }).catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = app;