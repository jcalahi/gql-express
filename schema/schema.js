const graphql = require('graphql');
const axios = require('axios');
const MovieType = require('./types/movie_type');
const UserType = require('./types/user_type');
const AuthType = require('./types/auth_type');

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
      type: AuthType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLString } 
      },
      resolve: (parentValue, { email, password }) => {
        return axios
          .post(`${JSON_SERVER_URL}/register`, { email, password })
          .then(res => res.data);
      }
    },
    login: {
      type: AuthType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLString } 
      },
      resolve: (parentValue, { email, password }, req) => {
        return axios
          .post(`${JSON_SERVER_URL}/login`, { email, password })
          .then(res => {
            if (res.data.accessToken) {
              return res.data;
            }
          }).catch(err => {
            console.log(err.response.data);
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({ query, mutation });
