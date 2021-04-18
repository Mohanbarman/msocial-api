import { model, Schema, ObjectId } from 'mongoose';


const postSchema = new Schema({
    image: String,
    body: String,
    username: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    createdAt: { type: Date, default: Date.now },
    comments: [
        {
            body: String,
            username: String,
            createdAt: { type: Date, default: Date.now },
        }
    ],
    likes: [
        {
            username: String,
            createdAt: { type: Date, default: Date.now },
        }
    ]
});

export default model('post', postSchema);