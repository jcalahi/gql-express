const graphql = require('graphql');
const axios = require('axios');
const ActorType = require('./actor_type');
const DirectorType = require('./director_type');

const {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} = graphql;

const JSON_SERVER_URL = 'http://localhost:3000';

const MovieType = new GraphQLObjectType({
  name: 'MovieType',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    rating: { type: GraphQLString },
    year: { type: GraphQLInt },
    actors: {
      type: GraphQLList(ActorType),
      resolve: (parent) => {
        return axios.get(`${JSON_SERVER_URL}/actors`).then(response => {
          return response.data.filter(res => parent.actors.includes(res.id));
        });
      }
    },
    directors: {
      type: GraphQLList(DirectorType),
      resolve: (parent) => {
        return axios.get(`${JSON_SERVER_URL}/directors`).then(response => {
          return response.data.filter(res => parent.directors.includes(res.id));
        });
      }
    }
  })
});

module.exports = MovieType;
