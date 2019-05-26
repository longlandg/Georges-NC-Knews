# NC-Knews Backend

This is NC-Knews backend, a RESTful API which provides the backend logic for Northcoders News, a reddit style news site and discussion website, which allows users to post articles and comments, vote on articles and comments, filter articles by topic, sort articles by date, number of comments and number of votes, delete their own articles and comments.

## Getting Started 

1. Fork the repository
2. Clone the Fork of this repository to you local machine
3. Initialise the repository using the node package manager

```
npm init 
```

## Prerequisites

The following dependancies will need to be installed: 

```
    "body-parser": "^1.18.3"
    "cors": "^2.8.5"
    "express": "^4.16.4"
    "knex": "^0.15.2"
    "pg": "^7.6.1"
```
Install using the Node Package Manager, eg:

```
npm i express
```

The following development dependencies will also need to be installed: 

```
    "chai": "^4.2.0",
    "eslint": "^5.9.0",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-plugin-import": "^2.14.0",
    "husky": "^1.1.4",
    "mocha": "^6.0.2",
    "supertest": "^3.4.2"
```

To be installed as development dependencies using the -D command, eg:

```
npm i chai -D
```

NC-Knews backend uses PostgreSQL as it's relational database, PostgreSQL should be installed on your local machine. Instructions can be found at the following url https://www.postgresql.org/docs/9.3/tutorial-install.html

## Configuration File

Create a configuration file and name it "knexfile.js" and should be saved in the project root folder. The "knexfile.js" is already listed in the .gitignore file and will not be pushed to github.

```javascript
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';


const baseConfig = {
  client: 'pg',
    seed: {
    directory: './db/seeds',
},
   migrations: {
    directory: './db/migrations',
  },
  },
};

const dbConfig = {
  production: {
     connection: `${DB_URL}?ssl=true`,
  },
  development: {
    connection: {
      database: 'nc_knews',
      username: `${your PSQL username}`, 
      password: `${your PSQL password}`,
    },
  },
  test: {
    connection: {
      database: 'nc_knews_test',
      username: `${your PSQL username}`,
      password: `${your PSQL password}`,
    },
  },
};

module.exports = { ...baseConfig, ...dbConfig[ENV] };
```

Please note in both the "connection" and "test" objects, the fields user & password are not required if you are using a Mac, and should be omitted.

##  Initialising and Seeding the NC_Knews Database

The following commands should be run in the termainal

```
npm run setup-dbs

npm run make-migration

npm run seed
```

## End Points 

The Following end Points are available:

```
GET /api/topics "responds with an array of topic objects"
POST /api/topics "responds with the posted topic object"

GET /api/articles "responds with an article arrray of articles objects"
POST /api/articles "responds with the posted article"

GET /api/articles/:article_id "responds with an article object"
PATCH /api/articles/:article_id "responds with the updated article"
DELETE /api/articles/:article_id "responds with status 204 and no content"

GET /api/articles/:article_id/comments "responds with comments for the given article article_id"
POST /api/articles/:article_id/comments "responds with the posted comment"

PATCH /api/comments/:comments_id "responds with the updated comments"
DELETE /api/comments/:comments_id "responds with status 204 and no content"

GET /api/users "responds with an array of user objects"
POST /api/users "responds with the posted user"

GET /api/users/:username "responds with a user object"

```


## Unit Testing

NC-Knews was created using test driven development

Unit tests are locates in the spec folder

utils.spec.js tests all functions required for seeding the Database

app.spec.js tests end points functionality and error handling

In the terminal:
```
npm test
```
