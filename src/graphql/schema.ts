import { gql } from "apollo-server";

"Defines the GraphQL schema for the server."
const typeDefs = gql`
    """
    Defines the schema indicating a mix of a player and team.
    We intend to use it to set Random player and a random team.
    """
    union Participant = Player | Team

    "Players from the e-sports world"
    type Player {
        id: ID!

        "The player's full name"
        name: String

        "The player's age"
        age: Int

        "The player's nationality"
        nationality: String

        "The slug for accessing the player's page"
        slug: String!

        "The team this player plays for"
        team: Team

        "Video game this player plays for his team"
        videogame: Videogame
    }

    "Teams from the e-sports world"
    type Team {
        id: ID!

        "Name of the team"
        name: String

        "Location of the team"
        location: String

        "The slug for accessing the team's page"
        slug: String!

        "List of Players part of from the team"
        players: [Player]

        "The video game that the team plays"
        videogame: Videogame
    }

    "Video games played by the teams and players"
    type Videogame {
        id: ID!

        "The name of the video game"
        name: String

        "The slug for accessing the video game's page"
        slug: String!

        "Description of the video game"
        description: Description!

        "List of players playing the game"
        players: [Player]
    }

    "Description of the video games"
    type Description {

        "Title of the wikipedia article related to this video game."
        title: String

        "Text of wikipedia article related to this video game."
        text: String
    }

    """
    The Query type, represents all of 
    the entry points into our object graph.
    """
    type Query {
        "Returns a list of players"
        players(limit: Int, page: Int): [Player!]!

        "Return all the info for a Player"
        player(id: ID!): Player

        "Returns a list of video games"
        videogames: [Videogame!]!

        "Return all the details of a Video Game"
        videogame(id: ID!): Videogame

        "Returns a list of teams"
        teams: [Team!]!

        "Return all the details of a Team"
        team(id: ID!): Team

        "Returns a random mix of players and teams"
        featured: [Participant!]!
    }
`;

export default typeDefs;