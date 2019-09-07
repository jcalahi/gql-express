const graphql = require('graphql');
const axios = require('axios');
const MovieType = require('./types/movie_type');
const UserType = require('./types/user_type');

const JSON_SERVER_URL = 'http://localhost:3000';

const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = graphql;

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movies: {
      type: new GraphQLList(MovieType),
      resolve: () => {
        return axios
          .get(`${JSON_SERVER_URL}/movies`)
          .then(response => response.data);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) } 
      },
      resolve: (parent, { username, password }) => {
        return axios.post(`${JSON_SERVER_URL}/register`, {
          "headers": {
            "Content-Type": "application/json",
          },
          "body": JSON.stringify({
            "email": username,
            "password": password
          })
        }).then(res => {
          return response.data;
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({ query, mutation });
