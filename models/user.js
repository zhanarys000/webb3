const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin : {type: Boolean, required : true, default: false}
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
