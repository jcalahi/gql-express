const graphql = require('graphql');
const ActorType = require('./actor_type');
const DirectorType = require('./director_type');
const UserService = require('../../services/api');

const {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} = graphql;

const MovieType = new GraphQLObjectType({
  name: 'MovieType',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    rating: { type: GraphQLString },
    year: { type: GraphQLInt },
    scoutbase_rating: {
      type: GraphQLString,
      resolve: (parent, args, context) => {
        return context.user
          ? Math.floor(Math.random() * (9 - 5 + 1) + 5).toFixed(2)
          : 'User is not authenticated'
      }
    },
    actors: {
      type: GraphQLList(ActorType),
      resolve: async (parent) => {
        const response = await UserService.getActors();
        return response.data.filter(res => parent.actors.includes(res.id));
      }
    },
    directors: {
      type: GraphQLList(DirectorType),
      resolve: async (parent) => {
        const response = await UserService.getDirectors();
        return response.data.filter(res => parent.directors.includes(res.id));
      }
    }
  })
});

module.exports = MovieType;
