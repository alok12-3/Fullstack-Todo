const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    age: { type: Number },
    gender: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
