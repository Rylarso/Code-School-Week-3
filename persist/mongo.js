//pull in mongoose
const mongoose = require('mongoose');

//rename mongoose connection
const db = mongoose.connection;

function connect(user, password, host, port, db) {
    const connectionString = 'mongodb+srv://Rylarso:codeschool@cluster0.er7oi.mongodb.net/?retryWrites=true&w=majority'
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}


function setUpConnectionHandlers(callback) {

    //when its connecting
    db.once("connecting", () => {
        console.log("connecting to mongodb")
    });

    //when its connected
    db.once("connected", () => {
        console.log("Connected to mongodb");
    });

    db.once("open", () => {
        console.log("Opened to mongodb");
        callback();
    });

    db.once("error", () => {
        console.log("Error connecting to mongodb");
    });

}


//export functions
module.exports = {
    setUpConnectionHandlers,
    connect,

};