/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-prototype-builtins */
/* eslint-disable max-len */
import { resolveDescription } from '../utils';

const resolvers = {
  // Resolvers for queries
  Query: {
    // Resolver to populate the fields of a list of players
    players: async (_: any, args: any, { dataSources }: any) => {
      const data = await dataSources.pandascoreAPI.getPlayers(args.limit, args.page);
      return data;
    },

    // Resolver to populate the fields of a team
    player: async (_: any, args: any, { dataSources }: any) => {
      const data = await dataSources.pandascoreAPI.getPlayerById(args.id);
      return data;
    },

    // Resolver to populate the fields of a list of teams
    teams: async (_: any, __: any, { dataSources }: any) => {
      const data = await dataSources.pandascoreAPI.getTeams();
      return data;
    },

    // Resolver to populate the fields of a team
    team: async (_: any, args: any, { dataSources }: any) => {
      const data = await dataSources.pandascoreAPI.getTeamById(args.id);
      return data;
    },

    // Resolver to populate the fields of a list of video games
    videogames: async (_: any, __: any, { dataSources }: any) => {
      const data = await dataSources.pandascoreAPI.getVideoGames();
      return data;
    },

    // Resolver to populate the fields of a video game
    videogame: async (_: any, args: any, { dataSources }: any) => {
      const data = await dataSources.pandascoreAPI.getVideoGameById(args.id);
      return data;
    },

    featured: async (_: any, __: any, { dataSources }: any) => {
      const data = await dataSources.pandascoreAPI.getFeatured();
      return data;
    },
  },

  // Resolvers for object types found in players
  Player: {
    team: (parent: any, _: any, { dataSources }: any) => {
      return parent.current_team && dataSources.pandascoreAPI.getTeamById(parent.current_team.id);
    },
    videogame: (parent: any, _: any, { dataSources }: any) => {
      return parent.current_videogame && dataSources.pandascoreAPI.getVideoGameById(parent.current_videogame.id);
    },
  },

  // Resolvers for custom object types used in team
  Team: {
    videogame: async (parent: any, _: any, { dataSources }: any) => {
      const data = await dataSources.pandascoreAPI.getVideoGameById(parent.current_videogame.id);
      return data;
    },
  },

  // Resolvers for custom object types used in videogame
  Videogame: {
    description: async (parent: any, _: any, { dataSources }: any) => {
      const data = await dataSources.wikipediaAPI.getDescription(parent.name);
      return resolveDescription(data);
    },
    players: async (parent: any, _: any, { dataSources }: any) => {
      const data = await dataSources.pandascoreAPI.getPlayers();
      return data.filter((player: any) => {
        return player.current_videogame.id === parent.id;
      });
    },
  },

  // Resolvers for custom Participant type for random mix of players and teams
  Participant: {
    __resolveType(obj: any, _: any) {
      if (obj.hasOwnProperty('current_team')) {
        return 'Player';
      }
      if (obj.hasOwnProperty('players')) {
        return 'Team';
      }
      return null;
    },
  },
};

export default resolvers;
