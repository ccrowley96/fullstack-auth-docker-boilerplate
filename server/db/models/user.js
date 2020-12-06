const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    given_name: String,
    family_name: String,
    picture: String,
    registered: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);