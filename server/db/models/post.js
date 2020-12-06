const mongoose = require('mongoose');
const { User } = require('../index')

const postSchema = mongoose.Schema({
    author: User,
    title: String,
    content: String
})

module.exports = mongoose.model('Post', postSchema);