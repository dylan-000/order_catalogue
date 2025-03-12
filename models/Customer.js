const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    middleName: {type: String, required: false},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
})

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;