// set up flags
const flags = require("flags");
flags.defineNumber("port", 3000, "Ports for the http servier to listen on");
flags.parse();

// set up enviroment
const dotenv = require("dotenv");

// set up port number
const port = flags.get("port") || process.env.PORT || 3000;

module.exports = {
    flags,
    dotenv,
    port,
}