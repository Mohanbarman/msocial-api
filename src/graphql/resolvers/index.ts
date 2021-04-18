import getPosts from './getPosts';
import register from './register';

const resolvers = {
    Query: {
        getPosts,
    },
    Mutation: {
        register,
    }
}

export default resolvers;