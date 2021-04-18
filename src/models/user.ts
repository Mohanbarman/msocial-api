import { model, Schema, Document } from 'mongoose';

interface UserInterface extends Document {
    firstName: string,
    lastName: string,
    username: string,
    profilePicture: string,
    email: string,
    password: string,
    createdAt?: string,
    updatedAt?: string,
};

const userSchema = new Schema<UserInterface>({
    firstName: String,
    lastName: String,
    profilePicture: String,
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
})

export default model<UserInterface>('user', userSchema);