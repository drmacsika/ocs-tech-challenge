import { ApolloServer } from "apollo-server";
import PandascoreAPI from "../graphql/datasources/pandascore";
import WikipediaAPI from "../graphql/datasources/wikipedia";
import typeDefs from '../graphql/schema';
import resolvers from "../graphql/resolvers";
import context from "../graphql/context";

/**
 * This is a test utils helper
 * We create an instance of ApolloServer that reuse
 * existing dataSources, resolvers, and typeDefs.
 * For testing purposes.
 */


const constructTestServer = () => {
    const pandascoreAPI = new PandascoreAPI();
    const wikipediaAPI = new WikipediaAPI();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ pandascoreAPI, wikipediaAPI }),
    context,
  });

  return { server, pandascoreAPI, wikipediaAPI };
};

export default constructTestServer;
