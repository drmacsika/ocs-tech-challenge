require('dotenv').config()

import { ApolloServer } from "apollo-server";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import dataSources from './graphql/datasources/index';
import context from './graphql/context';


// Set up Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    dataSources,
    context,
  });

// Start the Apollo server if we're not running in a test environment.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test') {
  server.listen().then(({ url }) => {
    console.log(`
      Server is running!
      Listening on port 4000
      🚀  Server ready at ${url}
      Explore at https://studio.apollographql.com/sandbox
    `);
  });
}
