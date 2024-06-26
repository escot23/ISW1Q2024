const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const AuthModel = mongoose.model('User', userSchema);

module.exports = AuthModel;
