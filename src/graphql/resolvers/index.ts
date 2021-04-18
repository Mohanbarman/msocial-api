import getPosts from './getPosts';

const resolvers = {
    Query: {
        getPosts,
    }
}

export default resolvers;