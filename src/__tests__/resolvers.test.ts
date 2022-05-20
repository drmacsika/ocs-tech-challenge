/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import constructTestServer from './__utils';
import { GET_PLAYERS, GET_PLAYER, GET_TEAMS, GET_TEAM, GET_VIDEOGAMES, GET_VIDEOGAME, FEATURED } from './__queries';

/**
 * This is a test file for testing the resolvers.
 * we create an instance of ApolloServer that reuse
 * existing dataSources, resolvers, and typeDefs.
 * This function returns the server instance as well as our dataSource
 * instances, so we can overwrite the underlying fetchers
 * We use server.executeOperation to run test queries
 * against our instance of ApolloServer
 */
const { server, pandascoreAPI, wikipediaAPI } = constructTestServer();

describe('Players Resolver', () => {
  // We create a test server instance

  test('Fetch list of players 1', async () => {
    // We run test queries
    // against our instance of ApolloServer
    const result = await server.executeOperation({ query: GET_PLAYERS });
    expect(result.errors).toBeUndefined();
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('data.players');
    expect(result).toHaveProperty('data.players[0].team');
    expect(result).toHaveProperty('data.players[0].videogame');
    expect(result).toMatchSnapshot();
  });

  test('Fetch paginated result of list of players 2', async () => {
    const result = await server.executeOperation({ query: GET_PLAYERS, variables: { limit: 11, page: 1 } });
    expect(result.errors).toBeUndefined();
    expect(result?.data?.players.length).toBe(11);
    expect(result).toMatchSnapshot();
  });
  test('Fetch single player 1', async () => {
    // We run test queries different times
    // to cater for different input validation checks
    // before getting the main result
    const noIDResult = await server.executeOperation({ query: GET_PLAYER });
    const result = await server.executeOperation({ query: GET_PLAYER, variables: { id: 1 } });
    expect(noIDResult.errors).toBeDefined();
    expect(result.errors).toBeUndefined();
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('data.player');
    expect(result).toHaveProperty('data.player.team');
    expect(result).toHaveProperty('data.player.videogame');
    expect(result).toMatchSnapshot();
  });
});
describe('Teams Resolver', () => {
  test('Fetch list of teams 1', async () => {
    const result = await server.executeOperation({ query: GET_TEAMS });
    expect(result.errors).toBeUndefined();
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('data.teams');
    expect(result).toHaveProperty('data.teams[0].players');
    expect(result).toHaveProperty('data.teams[0].videogame');
    expect(result).toMatchSnapshot();
  });

  test('Fetch single team 1', async () => {
    const noIDResult = await server.executeOperation({ query: GET_TEAM });
    const result = await server.executeOperation({ query: GET_TEAM, variables: { id: 131007 } });
    expect(noIDResult.errors).toBeDefined();
    expect(result.errors).toBeUndefined();
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('data.team');
    expect(result).toHaveProperty('data.team.players');
    expect(result).toHaveProperty('data.team.videogame');
    expect(result).toMatchSnapshot();
  });
});

describe('Video Games Resolver', () => {
  test('Fetch list of video games 1', async () => {
    const result = await server.executeOperation({ query: GET_VIDEOGAMES });
    expect(result.errors).toBeUndefined();
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('data.videogames[0].players');
    expect(result).toHaveProperty('data.videogames[0].description');
    expect(result).toMatchSnapshot();
  });
  test('Verify Description from wikipedia 1', async () => {
    const result = await server.executeOperation({ query: GET_VIDEOGAME, variables: { id: 1 } });
    expect(result.errors).toBeUndefined();
    expect(result).toHaveProperty('data');

    // This test uses a valid id with an entry that exists
    // in the wikipedia API.
    // We use the wikipediaAPI to get the description
    // We want to check if first, there's a description object
    // next if there's a title within the description object
    // next if there's a text within the description object
    expect(result).toHaveProperty('data.videogame.description');
    expect(result).toHaveProperty('data.videogame.description.title');
    expect(result).toHaveProperty('data.videogame.description.text');
    expect(result).toMatchSnapshot();
  });
  test('Fetch single videogame 1', async () => {
    const noIDResult = await server.executeOperation({ query: GET_VIDEOGAME });
    const result = await server.executeOperation({ query: GET_VIDEOGAME, variables: { id: 1 } });
    expect(noIDResult.errors).toBeDefined();
    expect(result.errors).toBeUndefined();
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('data.videogame');
    expect(result).toHaveProperty('data.videogame.players');
    expect(result).toHaveProperty('data.videogame.description');
    expect(result).toMatchSnapshot();
  });
});
// This test is different from the others as we want to
// check specifically if the responses are randomized
// by at most two query calls
// We expect atleast one out of the two to be different
describe('Random Features', () => {
  test('Fetch featured players 1', async () => {
    const firstFeature = await server.executeOperation({ query: FEATURED });
    const secondFeature = await server.executeOperation({ query: FEATURED });
    expect(firstFeature).toBeDefined();
    expect(secondFeature).toBeDefined();

    // If they are all defined,
    // we simply test one for this test
    // We check to see if they distinctly have the properties
    // we used to differentiate them in the resolver
    // team property only exists in the featured players
    // players property only exists in the featured teams
    expect(firstFeature).toHaveProperty('data.featured');
    expect(firstFeature).toHaveProperty('data.featured[0].team');
    expect(firstFeature).toHaveProperty('data.featured[9].players');

    // We check for list equality
    expect(firstFeature?.data?.featured).not.toEqual(expect.arrayContaining(secondFeature?.data?.featured));
    expect(secondFeature?.data?.featured).not.toEqual(expect.arrayContaining(firstFeature?.data?.featured));

    expect(firstFeature).toMatchSnapshot();
  });
});
