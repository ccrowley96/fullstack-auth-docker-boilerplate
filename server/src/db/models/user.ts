import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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

export default mongoose.model('User', userSchema);