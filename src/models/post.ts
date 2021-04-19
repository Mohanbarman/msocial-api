import { model, Schema, Document } from 'mongoose';

interface PostInterface extends Document {
    id: string;
    image: string;
    body: string;
    username: string;
    user: UserType;
    createdAt: string;
    comments: [
        {
            body: string;
            username: string;
            createdAt: string;
        }
    ];
    likes: [
        {
            username: string;
            createdAt: string;
        }
    ]
}

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

export default model<PostInterface>('post', postSchema);