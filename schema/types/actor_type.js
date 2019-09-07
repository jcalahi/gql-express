const graphql = require('graphql');

const {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} = graphql;

const JSON_SERVER_URL = 'http://localhost:3000';

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
