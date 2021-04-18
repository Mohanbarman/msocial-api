import PostModel from '../../models/post';

const getPosts = async () => {
    const posts = await PostModel.find();
    return posts;
}

export default getPosts;