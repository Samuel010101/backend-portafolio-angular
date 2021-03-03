const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = Schema({
    userName: String,
    password: String,
    name: String,
    lastName: String,
    email: String,
    description: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)