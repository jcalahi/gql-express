const graphql = require('graphql');

const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} = graphql;

const ActorType = new GraphQLObjectType({
  name: 'ActorType',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    birthday: { type: GraphQLString },
    country: { type: GraphQLString }
  })
});

module.exports = ActorType;
