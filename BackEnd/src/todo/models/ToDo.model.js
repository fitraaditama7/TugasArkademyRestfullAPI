const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TodoSchema = new Schema({
    title: { type: String, required: true, max: 100 }
});

// export the model
module.exports = mongoose.model('ToDo', TodoSchema);