const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String },
    password: { type: String },
    name: { type: String },
    phone: { type: String }
});

module.exports = schema = mongoose.model('user', UserSchema);