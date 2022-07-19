const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    nickname: { type: String, required: true},
    id: {type: String, required: true, unique: true},
    name: {
        first: String,
        last: String
    },
    age: Number,
    email: String,
}, {timestamps: true});

const User = model('user',UserSchema);
module.exports = { User }

