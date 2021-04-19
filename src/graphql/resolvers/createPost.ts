import PostModel from '../../models/post';
import validateToken from '../../utils/validateToken';


const createPost = async (parent: any, { postInput }: { postInput: PostInputType }, context: any) => {
    // verifying jwt token from the headers
    const user = validateToken(context.headers.authorization);

    const post = new PostModel({
        body: postInput.body,
        username: user.username,
    })

    try { await post.save() }
    catch (e) { return new Error(e) }

    return post;
}

export default createPost;