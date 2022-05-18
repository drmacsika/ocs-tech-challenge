import { resolveDescription } from "../utils"

const resolvers = {
    // Resolvers for queries
    Query: {

        // Resolver to populate the fields of a list of players
        players: async (_: any, args: any, {dataSources}: any) => {
          return await dataSources.pandascoreAPI.getPlayers(args.limit, args.page);
        },

        // Resolver to populate the fields of a team
        player: async (_: any, args: any, {dataSources}: any) => {
          return await dataSources.pandascoreAPI.getPlayerById(args.id);
        },

        // Resolver to populate the fields of a list of teams
        teams: async (_: any, __: any, {dataSources}: any) => {
          return await dataSources.pandascoreAPI.getTeams();
        },

        // Resolver to populate the fields of a team
        team: async (_: any, args: any, {dataSources}: any) => {
          return await dataSources.pandascoreAPI.getTeamById(args.id);
        },

        // Resolver to populate the fields of a list of video games
        videogames: async (_: any, __: any, {dataSources}: any) => {
          return await dataSources.pandascoreAPI.getVideoGames();
        },

        // Resolver to populate the fields of a video game
        videogame: async (_: any, args: any, {dataSources}: any) => {
          return await dataSources.pandascoreAPI.getVideoGameById(args.id);
        },

        featured: async (_: any, __: any, {dataSources}: any) => {
          return await dataSources.pandascoreAPI.getFeatured();
        }
    },

    // Resolvers for object types found in players
    Player: {
        team: (parent: any, _: any, {dataSources}: any) => {
          return parent.current_team && dataSources.pandascoreAPI.getTeamById(parent.current_team.id);
        },
        videogame: (parent: any, _: any, {dataSources}: any) => {
          return parent.current_videogame && dataSources.pandascoreAPI.getVideoGameById(parent.current_videogame.id);
        }
    },

    // Resolvers for custom object types used in team
    Team: {
      videogame: async (parent: any, _: any, {dataSources}: any) => {
          return await dataSources.pandascoreAPI.getVideoGameById(parent.current_videogame.id);
      },
    },

    // Resolvers for custom object types used in videogame
    Videogame: {
        description: async (parent: any, args: any, {dataSources}: any) => {
          const data = await dataSources.wikipediaAPI.getDescription(parent.name);
          return resolveDescription(data);
        },
        players: async (parent: any, args: any, {dataSources}: any) => {
          const data = await dataSources.pandascoreAPI.getPlayers()
          return data.filter((player: any) => player.current_videogame.id === parent.id);
        }
    },

    // Resolvers for custom Participant type for random mix of players and teams
    Participant: {
      __resolveType(obj: any, context: any, info: any){
        if(obj.current_team){
          return "Player";
        }
        if (obj.players){
          return "Team";
        }
        return null;
      },
    }
}

export default resolvers;