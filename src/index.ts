import { ApolloServer, gql } from 'apollo-server';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import {resolvers, typeDefs} from './graphql';


async function startServer() {
    // Loading environment variables from .env file
    dotenv.config();
    const databse_url: string | undefined = process.env["DATABASE_URL"];
    if (!databse_url) throw "DATABASE_URL is not present in the environment variables";

    await mongoose.connect(databse_url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('🗄️  Connected to the databse');

    const server = new ApolloServer({ typeDefs, resolvers });
    const serverInfo = await server.listen({ port: 4000 });

    console.log(`🚀 Server running on ${serverInfo.url}`);
}

startServer();