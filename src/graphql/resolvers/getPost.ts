import { ValidationError } from 'apollo-server-errors';
import PostModel from '../../models/post';

const getPost = async (parent: any, { id }: { id: string }) => {
    const post = await PostModel.findById(id).exec();
    if (!post) throw new ValidationError("No post found");

    return post;
}

export default getPost;