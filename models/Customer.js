const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    middleName: {type: String, required: false},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
})

module.exports = mongoose.model('Customer', customerSchema);