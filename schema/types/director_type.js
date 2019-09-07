const graphql = require('graphql');
const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} = graphql;

const DirectorType = new GraphQLObjectType({
  name: 'DirectorType',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    birthday: { type: GraphQLString },
    country: { type: GraphQLString }
  })
});

module.exports = DirectorType;
