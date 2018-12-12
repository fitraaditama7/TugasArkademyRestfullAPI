const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const todo = require('./src/todo/routes/ToDo.route');
const app = express();

// Setting Mongodb
let dev_db_url = 'mongodb://localhost:27017/todolist';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connection Error: '));


// Setting Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/todo', todo)

// set CORS to allow access from any server
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, PATCH, POST, DELETE, GET");
        return res.status(200).json({});
    }

    next();
});


let port = 3000;




app.listen(port, () => {
    console.log('Server Running in port ' + port);
});


