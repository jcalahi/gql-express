const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

const movies = [
  { title: 'Movie1', rating: '5.0', year: 1999, actor: 'Actor2' },
  { title: 'Movie2', rating: '6.0', year: 2000, actor: 'Actor3' },
  { title: 'Movie3', rating: '7.0', year: 2001, actor: 'Actor1' }
];

const actors = [
  { name: 'Actor1', birthdate: '01/01/1991', country: 'ph' },
  { name: 'Actor2', birthdate: '02/02/1992', country: 'ph' },
  { name: 'Actor3', birthdate: '03/03/1993', country: 'ph' }
];

const MovieType = new GraphQLObjectType({
  name: 'MovieType',
  fields: () => ({
    title: { type: GraphQLString },
    rating: { type: GraphQLString },
    year: { type: GraphQLInt },
    actor: {
      type: ActorType,
      resolve: (parent) => {
        return actors.find(actor => actor.name === parent.actor);
      }
    }
  })
});

const ActorType = new GraphQLObjectType({
  name: 'ActorType',
  fields: () => ({
    name: { type: GraphQLString },
    birthdate: { type: GraphQLString },
    country: { type: GraphQLString }
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movies: {
      type: new GraphQLList(MovieType),
      resolve: () => {
        return movies;
      }
    },

  }
});

module.exports = new GraphQLSchema({
  query: RootQueryType
});