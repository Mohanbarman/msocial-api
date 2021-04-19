import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

import getPosts from './resolvers/getPosts';
import getToken from './resolvers/getToken';
import registerUser from './resolvers/registerUser';

// merging all types from ./types directory
const typesArray = loadFilesSync(path.join(__dirname, 'types'), { extensions: ['graphql'] });
export const typeDefs = mergeTypeDefs(typesArray);

export const resolvers = {
    Query: {
        getPosts,
        getToken,
    },
    Mutation: {
        registerUser,
    }
}
