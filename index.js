//pull in mongo db
const mongodb = require("./persist/mongo");

//pull in memory db
const persist = require("./persist/todo");

//pull in config
const config = require("./config");

//set up server/app
const app = require("./server");

//set up todo
const setTodo = require("./setup");


mongodb.setUpConnectionHandlers(() => {
    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
});
mongodb.connect();

setupTodo(persist);