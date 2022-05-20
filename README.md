# My solution to OCS Technical Challenge.

Table of Contents:

- [Tools](#tools)
- [Installation and Usage](#installation-and-usage)
- [Guide on Query Usage](#guide-on-query-usage)
- [Pagination](#pagination)
- [Project Limitations](#project-limitations)
- [Debugging issues with tests](#debugging-issues-with-tests)

## Tools

- Node.js
- Graphql
- Typescript
- Apollo Graphql Server
- Dotenv
- Jest
- Nodemon

## Installation and Usage

Use the package manager [npm](https://www.npmjs.com/package/download) for installation.

- Clone this repo
- Navigate to the **root** directory where package.json is located.
- Create a **.env** file in the **src** folder, add the two required parameters (PANDASCORE_API_KEY and NODE_ENV) e.g: PANDASCORE_API_KEY=valid_pandascore_api_key
- Run `npm install` to install dependencies and devDependencies
- Run `npm run test` to run the tests
- Run `npm run dev` to run the app in local dev environment
  -- Server runs at http://localhost:4000/
  -- You can also use the Apollo Graphal playground to explore at https://studio.apollographql.com/sandbox

## Guide on Query Usage

There are currently 7 active queries.

### Query points

- ```players(limit: int, page: int)```:- Return a list of players

```
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
```
```
Variables:
{
    limit: 10
    page: 1
}
```

- player(id: int):- Return a single team

```
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
```

Variables:
```
{
    id: 1
}
```
- teams:- Return a list of teams

```
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
```

- team(id: int):- Return a single team
```
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
```
Variables
```
{
    id: 131007
}
```

- videogames:- Returns a list of video games
```
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
```

- videogame(id: int):- Returns a single video game

```
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
```
```
{
    id: 1
}
```

- featured:- Returns random players and teams


query Featured {
```
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
```

## Pagination

- There is pagination for players list endpoints with a preset of 10 objects per page. The pagination utilizes a page format.

## Project Limitations

- There could be possibility of catching more advance edge cases and validations as well as error handling
- End-to-end test

## Debugging issues with tests
- Ensure that a valid Pandascore API Key is set and the NODE ENV is also set
- Clear out the snapshot src/__tests__/__snapshots__/resolvers.test.ts.snap
