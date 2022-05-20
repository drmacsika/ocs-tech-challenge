import { gql } from "apollo-server";
/**
 * GraphQL schema Used to define the schema for the application
 * @param {*} typeDefs
 * There are four main schema Types, one Sib Type and a Union Type
 * 1. Query: This is a general query schema that can be 
 * used to query any data
 * 2. Player: This is a custom object type used to define 
 * the player attributes
 * 3. Team: This is a custom object type used to define Team attribute
 * 4. Videogame: This is a custom object type used 
 * to define Videogame attribute
 * 
 * The Sub Type, called the Article type is used to describe the structure
 * of the description field present only in the video game type
 * 
 * There is a Union type called Participant used to retrieve 
 * a random mix of players and teams
 * 
 * We use docstring to aid the description and when accessed using
 * the GraphiQL tool or the Apollo playground
 */

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

        "The slug for accessing the player's page"
        slug: String!

        "The players's birth year."
        birth_year: Int

        "The player's birthday."
        birthday: String

        "The team this player plays for"
        team: Team

        "Video game this player plays for his team"
        videogame: Videogame!

        "The player's first name"
        first_name: String

        "The player's last name"
        last_name: String

        "The player's name"
        name: String

        "The player's nationality"
        nationality: String

        "The player's image."
        image_url: String
    }

    "Teams from the e-sports world"
    type Team {
        id: ID!

        "The slug for accessing the team's page"
        slug: String!

        "Abbreviation of the name of the team"
        acronym: String

        "Name of the team"
        name: String

        "Location of the team"
        location: String

        "List of Players that are part of from the team"
        players: [Player]

        "The Team's image."
        image_url: String

        "The video game that the team plays"
        videogame: Videogame
    }

    "Video games played by the teams and players"
    type Videogame {
        id: ID!

        "The slug for accessing the video game's page"
        slug: String!

        "The name of the video game"
        name: String

        "Description of the video game"
        description: Article

        "List of players playing the game"
        players: [Player]
    }

    "Description of the video games"
    type Article {

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
        players(limit: Int, page: Int): [Player!]

        "Return all the info for a Player"
        player(id: ID!): Player

        "Returns a list of video games"
        videogames: [Videogame!]

        "Return all the details of a Video Game"
        videogame(id: ID!): Videogame

        "Returns a list of teams"
        teams: [Team!]

        "Return all the details of a Team"
        team(id: ID!): Team

        "Returns a random mix of players and teams"
        featured: [Participant]
    }
`;

export default typeDefs;