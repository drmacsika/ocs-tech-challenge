import { gql } from "apollo-server";

"Defines the GraphQL schema for the server."
const typeDefs = gql`

    "Players from the e-sports world"
    type Player {
        id: ID!

        "The player's full name"
        name: String

        "The player's current rank in the team"
        rank: Int

        "The team this player plays for"
        team: Team!

        "Video game this player plays for his team"
        videogame: Videogame!
    }

    "Teams from the e-sports world"
    type Team {
        id: ID!

        "Name of the team"
        name: String

        "List of Players part of from the team"
        players: [Player!]!

        "The number of competitions won by this team."
        win: Int

        "The number of competitions lost by this team."
        loss: Int

        """
        The number of competitions this team participated
        in that ended in a draw
        """
        draws: Int

        "The videogame that the team plays"
        videogame: Videogame!
    }

    "Video games played by the teams and players"
    type Videogame {
        id: ID!

        "The name of the video game"
        name: String

        "Description of the video game"
        description: Description!

        "The genre of the video game"
        genre: String

        "List of players playing the game"
        players: [Player!]!
    }

    "Description of the video games"
    type Description {

        "Title of the wikipedia article related to this video game."
        title: String!

        "Text of wikipedia article related to this video game."
        text: String!
    }
`;

export default typeDefs;