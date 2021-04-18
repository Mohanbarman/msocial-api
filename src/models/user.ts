import {model, Schema} from 'mongoose';

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    profilePicture: String,
    email: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
})

export default model('user', userSchema);