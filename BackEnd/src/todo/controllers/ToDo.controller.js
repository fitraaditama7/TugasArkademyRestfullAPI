const Todo = require('../models/ToDo.model');

exports.test = function (req, res) {
    res.send('Greetings from the Test Controller');
};


exports.todo_list = (req, res) => {
    Todo.find({}).sort({_id: -1}).then((todos) => {
        res.send(todos)
    });
};

exports.todo_details = (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (err) return next(err);
        res.send(todo);

    })
}


exports.todo_create = (req, res) => {
    let todo = new Todo({
        title: req.body.title,
    });

    todo.save(function (err) {
        if (err) return next(err);

        res.send('Todo List Tersimpan');
    });
};

exports.todo_update = (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, todo) => {
        if (err) return next(err);
        res.send('Todo diupdate');
    });
};

exports.todo_delete = (req, res) => {
    Todo.findByIdAndDelete(req.params.id, (err) => {
        if (err) return next(err);
        res.send('Delete Successfully');
    })
}