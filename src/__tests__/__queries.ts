import gql from 'graphql-tag';

/**
 * This will hold the various
 * client sample queries we want to test against
 */

export const GET_PLAYERS = gql`
  query Players($limit: Int, $page: Int) {
    players(limit: $limit, page: $page) {
      id
      slug
      birth_year
      birthday
      team {
        id
        slug
      }
      videogame {
        id
        slug
      }
      first_name
      last_name
      name
      nationality
      image_url
    }
  }
`;
export const GET_PLAYER = gql`
  query Player($id: ID!) {
    player(id: $id) {
      id
      slug
      birth_year
      birthday
      team {
        id
        slug
      }
      videogame {
        id
        slug
      }
      first_name
      last_name
      name
      nationality
      image_url
    }
  }
`;

export const GET_TEAMS = gql`
  query Teams {
    teams {
      id
      slug
      acronym
      name
      location
      players {
        id
        slug
      }
      image_url
      videogame {
        id
        slug
      }
    }
  }
`;

export const GET_TEAM = gql`
  query Team($id: ID!) {
    team(id: $id) {
      id
      slug
      acronym
      name
      location
      image_url
      videogame {
        id
        slug
      }
      players {
        id
        slug
      }
    }
  }
`;

export const GET_VIDEOGAMES = gql`
  query Videogames {
    videogames {
      id
      slug
      name
      description {
        title
        text
      }
      players {
        id
        slug
      }
    }
  }
`;

export const GET_VIDEOGAME = gql`
  query Videogame($id: ID!) {
    videogame(id: $id) {
      id
      slug
      name
      description {
        title
        text
      }
      players {
        id
        slug
      }
    }
  }
`;

export const FEATURED = gql`
  query Featured {
    featured {
      ... on Player {
        id
        slug
        birth_year
        birthday
        team {
          id
          slug
        }
        videogame {
          id
          slug
        }
        first_name
        last_name
        name
        nationality
        image_url
      }
      ... on Team {
        id
        slug
        acronym
        name
        location
        players {
          id
          slug
        }
        image_url
        videogame_by_team: videogame {
          id
          slug
        }
      }
    }
  }
`;
