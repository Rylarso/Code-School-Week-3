const todo_db = {};
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const addTodo = function (todo) {
    id = makeid(8);
    username = "ryan"
    password = "this is a password"
    todo.id = id;
    todo.username = username;
    todo.password = password;
    todo_db[username] = todo;
    console.log(todo_db);
    return todo;
};

const getTodo = function (id) {
    return todo_db[id];
};

const removeId = function (id) {
    const todo = todo_db[id];
    delete todo_db[id];
    console.log('Deleted');
    return todo;
};

const setTodo = function (id, todo) {
    todo_db[id] = todo;
    return todo;
};

const patchTodo = function (id, todoData) {
    // loop over the data and set each individual item
    for (const key in todoData) {
        todo_db[id][key] = todoData[key];
    }
};

module.exports = {
    addTodo: addTodo,
    getTodo: getTodo,
    removeId: removeId,
    setTodo: setTodo,
    patchTodo: patchTodo,
};
