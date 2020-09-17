const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String },
    password: { type: String },
    name: { type: String },
    phone: { type: String }
});

const songSchema = new Schema({
    info: { type: Object }
});

module.exports = schema = mongoose.model('user', UserSchema);
module.exports = song = mongoose.model('songs', songSchema);