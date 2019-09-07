const graphql = require('graphql');
const axios = require('axios');

const MovieType = require('./types/movie_type');

const JSON_SERVER_URL = 'http://localhost:3000';

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList
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

// const mutation = new GraphQLObjectType({
//   name: 'Mutation'
// });

module.exports = new GraphQLSchema({ query });
