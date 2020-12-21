import mongoose from 'mongoose';
import { User } from '../index'

const postSchema = new mongoose.Schema({
    author: User,
    title: String,
    content: String
})

export default mongoose.model('Post', postSchema);