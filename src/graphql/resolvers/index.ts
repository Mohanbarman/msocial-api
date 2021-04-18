import getPosts from './getPosts';
import registerUser from './registerUser';

const resolvers = {
    Query: {
        getPosts,
    },
    Mutation: {
        registerUser,
    }
}

export default resolvers;